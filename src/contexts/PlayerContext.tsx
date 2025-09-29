import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { SpotifyTrack } from '@/services/spotify';

// Spotify Web Playback SDK types
declare global {
  interface Window {
    Spotify: {
      Player: new (options: {
        name: string;
        getOAuthToken: (cb: (token: string) => void) => void;
        volume?: number;
      }) => SpotifyPlayer;
    };
  }
}

interface SpotifyPlayer {
  connect(): Promise<boolean>;
  disconnect(): void;
  addListener(event: string, callback: (state: any) => void): boolean;
  removeListener(event: string, callback: (state: any) => void): boolean;
  getCurrentState(): Promise<SpotifyPlayerState | null>;
  setName(name: string): Promise<void>;
  getVolume(): Promise<number>;
  setVolume(volume: number): Promise<void>;
  pause(): Promise<void>;
  resume(): Promise<void>;
  togglePlay(): Promise<void>;
  seek(positionMs: number): Promise<void>;
  previousTrack(): Promise<void>;
  nextTrack(): Promise<void>;
}

interface SpotifyPlayerState {
  context: {
    uri: string;
    metadata: any;
  };
  disallows: {
    pausing_reason?: string;
    resuming?: boolean;
    seeking?: boolean;
    skipping_prev?: boolean;
    skipping_next?: boolean;
    toggling_repeat_context?: boolean;
    toggling_repeat_track?: boolean;
    toggling_shuffle?: boolean;
  };
  paused: boolean;
  position: number;
  repeat_mode: number;
  shuffle: boolean;
  track_window: {
    current_track: SpotifyTrack;
    previous_tracks: SpotifyTrack[];
    next_tracks: SpotifyTrack[];
  };
}

interface PlayerContextType {
  // Player state
  isReady: boolean;
  isPlaying: boolean;
  currentTrack: SpotifyTrack | null;
  position: number;
  duration: number;
  volume: number;
  isPaused: boolean;
  deviceId: string | null;
  
  // Player actions
  playTrack: (track: SpotifyTrack) => Promise<void>;
  pause: () => Promise<void>;
  resume: () => Promise<void>;
  togglePlay: () => Promise<void>;
  seek: (positionMs: number) => Promise<void>;
  setVolume: (volume: number) => Promise<void>;
  nextTrack: () => Promise<void>;
  previousTrack: () => Promise<void>;
  
  // Player initialization
  initializePlayer: () => Promise<void>;
  disconnect: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

interface PlayerProviderProps {
  children: ReactNode;
}

export function PlayerProvider({ children }: PlayerProviderProps) {
  const [player, setPlayer] = useState<SpotifyPlayer | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(50);
  const [isPaused, setIsPaused] = useState(true);
  const [deviceId, setDeviceId] = useState<string | null>(null);

  // Initialize Spotify Web Playback SDK
  const initializePlayer = useCallback(async () => {
    console.log('Initializing Spotify player...');
    console.log('Window object:', typeof window);
    console.log('Spotify object:', window.Spotify);
    
    if (typeof window === 'undefined' || !window.Spotify) {
      console.error('Spotify Web Playback SDK not loaded');
      return;
    }

    try {
      const spotifyPlayer = new window.Spotify.Player({
        name: 'SoundSpace Player',
        getOAuthToken: (cb) => {
          const token = localStorage.getItem('spotify_access_token');
          if (token) {
            cb(token);
          } else {
            console.error('No access token available');
          }
        },
        volume: 0.5
      });

      // Error handling
      spotifyPlayer.addListener('initialization_error', ({ message }) => {
        console.error('Failed to initialize Spotify player:', message);
      });

      spotifyPlayer.addListener('authentication_error', ({ message }) => {
        console.error('Failed to authenticate with Spotify:', message);
      });

      spotifyPlayer.addListener('account_error', ({ message }) => {
        console.error('Failed to validate Spotify account:', message);
      });

      spotifyPlayer.addListener('playback_error', ({ message }) => {
        console.error('Failed to perform playback:', message);
      });

      // Playback status updates
      spotifyPlayer.addListener('player_state_changed', (state) => {
        if (!state) return;

        console.log('Player state changed:', state);
        
        setIsPlaying(!state.paused);
        setIsPaused(state.paused);
        setPosition(state.position);
        setCurrentTrack(state.track_window.current_track);
        setDuration(state.track_window.current_track?.duration_ms || 0);
      });

      // Ready
      spotifyPlayer.addListener('ready', ({ device_id }) => {
        console.log('Spotify player is ready with device ID:', device_id);
        setDeviceId(device_id);
        setIsReady(true);
      });

      // Not Ready
      spotifyPlayer.addListener('not_ready', ({ device_id }) => {
        console.log('Spotify player has gone offline with device ID:', device_id);
        setIsReady(false);
      });

      // Connect to the player
      const success = await spotifyPlayer.connect();
      if (success) {
        console.log('Successfully connected to Spotify player');
        setPlayer(spotifyPlayer);
      } else {
        console.error('Failed to connect to Spotify player');
      }
    } catch (error) {
      console.error('Error initializing Spotify player:', error);
    }
  }, []);

  // Play a specific track
  const playTrack = useCallback(async (track: SpotifyTrack) => {
    console.log('playTrack called with:', track.name);
    console.log('Player state:', { player: !!player, isReady, isPlaying, deviceId });
    
    // Check if we have a preview URL as fallback
    if (track.preview_url) {
      console.log('Using preview URL for track:', track.name);
      const audio = new Audio(track.preview_url);
      audio.play().catch(error => {
        console.error('Error playing preview:', error);
      });
      return;
    }
    
    if (!player || !isReady || !deviceId) {
      console.error('Player not ready and no preview URL available', { player: !!player, isReady, deviceId });
      return;
    }

    try {
      // First, we need to play the track using the Spotify Web API
      const token = localStorage.getItem('spotify_access_token');
      if (!token) {
        console.error('No access token available');
        return;
      }
      
      console.log('Playing track via Spotify Web API:', track.uri);
      console.log('Using device ID:', deviceId);

      // Add a small delay to ensure the device is fully ready
      await new Promise(resolve => setTimeout(resolve, 500));

      // Play the track using the Web API with device ID
      const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uris: [track.uri],
          offset: { uri: track.uri },
          position_ms: 0
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to play track:', response.status, errorText);
        return;
      }

      console.log('Successfully started playing track:', track.name);
    } catch (error) {
      console.error('Error playing track:', error);
    }
  }, [player, isReady, deviceId]);

  // Pause playback
  const pause = useCallback(async () => {
    if (!player || !isReady) return;
    
    try {
      await player.pause();
    } catch (error) {
      console.error('Error pausing playback:', error);
    }
  }, [player, isReady]);

  // Resume playback
  const resume = useCallback(async () => {
    if (!player || !isReady) return;
    
    try {
      await player.resume();
    } catch (error) {
      console.error('Error resuming playback:', error);
    }
  }, [player, isReady]);

  // Toggle play/pause
  const togglePlay = useCallback(async () => {
    if (!player || !isReady) return;
    
    try {
      await player.togglePlay();
    } catch (error) {
      console.error('Error toggling playback:', error);
    }
  }, [player, isReady]);

  // Seek to position
  const seek = useCallback(async (positionMs: number) => {
    if (!player || !isReady) return;
    
    try {
      await player.seek(positionMs);
    } catch (error) {
      console.error('Error seeking:', error);
    }
  }, [player, isReady]);

  // Set volume
  const setVolume = useCallback(async (newVolume: number) => {
    if (!player || !isReady) return;
    
    try {
      await player.setVolume(newVolume / 100);
      setVolumeState(newVolume);
    } catch (error) {
      console.error('Error setting volume:', error);
    }
  }, [player, isReady]);

  // Next track
  const nextTrack = useCallback(async () => {
    if (!player || !isReady) return;
    
    try {
      await player.nextTrack();
    } catch (error) {
      console.error('Error skipping to next track:', error);
    }
  }, [player, isReady]);

  // Previous track
  const previousTrack = useCallback(async () => {
    if (!player || !isReady) return;
    
    try {
      await player.previousTrack();
    } catch (error) {
      console.error('Error skipping to previous track:', error);
    }
  }, [player, isReady]);

  // Disconnect player
  const disconnect = useCallback(() => {
    if (player) {
      player.disconnect();
      setPlayer(null);
      setIsReady(false);
      setIsPlaying(false);
      setCurrentTrack(null);
    }
  }, [player]);

  // Initialize player when component mounts
  useEffect(() => {
    const token = localStorage.getItem('spotify_access_token');
    console.log('PlayerProvider useEffect - token:', !!token);
    
    if (token) {
      // Wait for Spotify SDK to load
      const checkSpotify = () => {
        if (window.Spotify) {
          console.log('Spotify SDK loaded, initializing player...');
          initializePlayer();
        } else {
          console.log('Spotify SDK not loaded yet, retrying...');
          setTimeout(checkSpotify, 1000);
        }
      };
      
      checkSpotify();
    }
  }, [initializePlayer]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (player) {
        player.disconnect();
      }
    };
  }, [player]);

  const value: PlayerContextType = {
    isReady,
    isPlaying,
    currentTrack,
    position,
    duration,
    volume,
    isPaused,
    deviceId,
    playTrack,
    pause,
    resume,
    togglePlay,
    seek,
    setVolume,
    nextTrack,
    previousTrack,
    initializePlayer,
    disconnect
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}

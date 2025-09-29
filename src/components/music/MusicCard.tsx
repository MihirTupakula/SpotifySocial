import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Share, Play, Pause, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { SpotifyTrack } from '@/services/spotify';
import { usePlayer } from '@/contexts/PlayerContext';

interface MusicCardProps {
  track: SpotifyTrack;
}

export function MusicCard({ track }: MusicCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 100)); // Random likes for demo
  const { playTrack, togglePlay, isPlaying, currentTrack, isReady, deviceId } = usePlayer();

  // Add error handling for missing track data
  if (!track) {
    console.error('MusicCard: No track provided');
    return null;
  }

  if (!track.album || !track.artists) {
    console.error('MusicCard: Invalid track data:', track);
    return null;
  }

  // Check if this track is currently playing
  const isCurrentTrack = currentTrack?.id === track.id;
  const isCurrentlyPlaying = isCurrentTrack && isPlaying;

  const handlePlayPause = async () => {
    console.log('MusicCard handlePlayPause called');
    console.log('Player state:', { isReady, isCurrentTrack, isCurrentlyPlaying, deviceId });
    console.log('Track:', track.name);
    console.log('Preview URL available:', !!track.preview_url);
    
    if (!isReady && !track.preview_url) {
      console.log('Player not ready and no preview URL available');
      return;
    }

    if (isCurrentTrack && isReady) {
      // If this is the current track, toggle play/pause
      console.log('Toggling play/pause for current track');
      await togglePlay();
    } else {
      // If this is a different track, play it
      console.log('Playing new track:', track.name);
      await playTrack(track);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleSpotifyLink = () => {
    window.open(track.external_urls.spotify, '_blank');
  };

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  try {
    return (
      <Card className="p-4 hover:scale-[1.02] transition-all duration-300 group">
        {/* Album art and song info */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative group">
            <img 
              src={track.album?.images?.[0]?.url || '/placeholder-album.png'} 
              alt={`${track.name || 'Unknown Track'} album art`}
              className="w-16 h-16 rounded-lg object-cover"
            />
          <Button
            size="sm"
            variant="secondary"
            className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            onClick={handlePlayPause}
            disabled={(!isReady || !deviceId) && !track.preview_url}
            title={(!isReady || !deviceId) && !track.preview_url ? "Player not ready" : "Play track"}
          >
            {isCurrentlyPlaying ? <Pause size={16} /> : <Play size={16} />}
          </Button>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{track.name}</h3>
          <p className="text-sm text-muted-foreground truncate">
            {track.artists.map(artist => artist.name).join(', ')}
          </p>
          <p className="text-xs text-muted-foreground truncate">{track.album.name}</p>
        </div>
      </div>

      {/* Track details */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {formatDuration(track.duration_ms)}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {track.popularity}% popular
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSpotifyLink}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ExternalLink size={14} />
        </Button>
      </div>

      {/* Audio wave visualization (mock) */}
      {isPlaying && (
        <div className="flex items-center gap-1 mb-4 px-2">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="w-1 bg-accent wave-animation rounded-full"
              style={{ 
                animationDelay: `${i * 0.1}s`,
                height: Math.random() * 20 + 8 + 'px' 
              }}
            />
          ))}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`${isLiked ? 'text-red-500' : 'text-muted-foreground'} hover:text-red-500`}
          >
            <Heart size={16} className={isLiked ? 'fill-current' : ''} />
            <span className="ml-1 text-sm">{likes}</span>
          </Button>
          
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <MessageCircle size={16} />
            <span className="ml-1 text-sm">0</span>
          </Button>
        </div>
        
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <Share size={16} />
        </Button>
      </div>
    </Card>
    );
  } catch (error) {
    console.error('Error rendering MusicCard:', error, track);
    return (
      <Card className="p-4">
        <div className="text-center text-muted-foreground">
          <p>Error loading track</p>
        </div>
      </Card>
    );
  }
}
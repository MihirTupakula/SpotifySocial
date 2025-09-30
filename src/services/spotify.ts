import { supabase } from '@/integrations/supabase/client';

const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const SPOTIFY_REDIRECT_URI = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI || 'http://127.0.0.1:8080/auth/callback';

const SPOTIFY_SCOPES = [
  'user-read-private',
  'user-read-email',
  'user-top-read',
  'user-read-recently-played',
  'user-follow-read',
  'playlist-read-private',
  'playlist-read-collaborative',
  'user-library-read',
  'user-read-playback-state',
  'user-modify-playback-state',
  'streaming'
].join(' ');

export interface SpotifyUser {
  id: string;
  display_name: string;
  email: string;
  images: Array<{ url: string; height: number; width: number }>;
  followers: { total: number };
  country: string;
  product: string;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ id: string; name: string }>;
  album: {
    id: string;
    name: string;
    images: Array<{ url: string; height: number; width: number }>;
  };
  duration_ms: number;
  preview_url: string | null;
  external_urls: { spotify: string };
  popularity: number;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  images: Array<{ url: string; height: number; width: number }>;
  tracks: {
    total: number;
    items: Array<{ track: SpotifyTrack }>;
  };
  owner: {
    display_name: string;
    id: string;
  };
}

class SpotifyService {
  private accessToken: string | null = null;
  
  constructor() {
    console.log('SpotifyService constructor called');
    // Get token from localStorage on initialization
    this.accessToken = localStorage.getItem('spotify_access_token');
  }

  // Generate Spotify OAuth URL
  getAuthUrl(): string {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: SPOTIFY_CLIENT_ID,
      scope: SPOTIFY_SCOPES,
      redirect_uri: SPOTIFY_REDIRECT_URI,
      show_dialog: 'true'
    });

    return `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  // Handle OAuth callback and exchange code for token
  async handleAuthCallback(code: string): Promise<boolean> {
    try {
      console.log('Exchanging authorization code for access token...');
      
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)}`
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: SPOTIFY_REDIRECT_URI
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Token exchange failed:', errorData);
        throw new Error(`Failed to exchange code for token: ${errorData.error_description || errorData.error}`);
      }

      const data = await response.json();
      console.log('Successfully obtained access token');
      
      this.accessToken = data.access_token;
      
      // Store token in localStorage
      localStorage.setItem('spotify_access_token', data.access_token);
      localStorage.setItem('spotify_refresh_token', data.refresh_token);
      localStorage.setItem('spotify_token_expires', (Date.now() + data.expires_in * 1000).toString());

      return true;
    } catch (error) {
      console.error('Spotify auth error:', error);
      return false;
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.accessToken !== null && !this.isTokenExpired();
  }

  // Get current access token
  getAccessToken(): string | null {
    return this.accessToken;
  }

  // Check if token is expired
  private isTokenExpired(): boolean {
    const expiresAt = localStorage.getItem('spotify_token_expires');
    if (!expiresAt) return true;
    return Date.now() > parseInt(expiresAt);
  }

  // Get authenticated user info
  async getCurrentUser(): Promise<SpotifyUser | null> {
    if (!this.isAuthenticated()) return null;

    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': `Bearer ${this.getAccessToken()}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  // Get user's top tracks
  async getTopTracks(timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term', limit: number = 20): Promise<SpotifyTrack[]> {
    if (!this.isAuthenticated()) return [];

    try {
      const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${this.getAccessToken()}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch top tracks');
      }

      const data = await response.json();
      return data.items;
    } catch (error) {
      console.error('Error fetching top tracks:', error);
      return [];
    }
  }

  // Get user's recently played tracks
  async getRecentlyPlayed(limit: number = 20): Promise<SpotifyTrack[]> {
    if (!this.isAuthenticated()) return [];

    try {
      const response = await fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${this.getAccessToken()}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recently played');
      }

      const data = await response.json();
      return data.items.map((item: any) => item.track);
    } catch (error) {
      console.error('Error fetching recently played:', error);
      return [];
    }
  }

  // Get user's followed artists with fallback methods
  async getFollowedArtists(limit: number = 20): Promise<Array<{ id: string; name: string; images: Array<{ url: string }> }>> {
    if (!this.isAuthenticated()) return [];

    try {
      console.log('Attempting to fetch followed artists...');
      
      // Try the main following endpoint first
      const response = await fetch(`https://api.spotify.com/v1/me/following?type=artist&limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${this.getAccessToken()}`
        }
      });

      if (!response.ok) {
        console.warn('Main following endpoint failed, trying alternative methods...');
        throw new Error(`Following endpoint failed: ${response.status}`);
      }

      const data = await response.json();
      console.log('Followed artists fetched successfully:', data.artists.items.length);
      
      // Check if we got valid data
      if (data.artists && data.artists.items && data.artists.items.length > 0) {
        return data.artists.items;
      } else {
        console.warn('No followed artists found, trying alternative methods...');
        throw new Error('No followed artists in response');
      }
    } catch (error) {
      console.error('Error fetching followed artists, trying fallback methods:', error);
      
      // Fallback 1: Try to get artists from user's top artists
      try {
        console.log('Trying fallback: top artists...');
        const topArtistsResponse = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=${limit}`, {
          headers: {
            'Authorization': `Bearer ${this.getAccessToken()}`
          }
        });

        if (topArtistsResponse.ok) {
          const topArtistsData = await topArtistsResponse.json();
          if (topArtistsData.items && topArtistsData.items.length > 0) {
            console.log('Using top artists as fallback:', topArtistsData.items.length);
            return topArtistsData.items;
          }
        }
      } catch (fallbackError) {
        console.error('Top artists fallback failed:', fallbackError);
      }

      // Fallback 2: Try to get artists from recently played tracks
      try {
        console.log('Trying fallback: recently played artists...');
        const recentTracks = await this.getRecentlyPlayed(20);
        const artistMap = new Map();
        
        recentTracks.forEach(track => {
          track.artists.forEach(artist => {
            if (!artistMap.has(artist.id)) {
              artistMap.set(artist.id, {
                id: artist.id,
                name: artist.name,
                images: artist.images || []
              });
            }
          });
        });

        const uniqueArtists = Array.from(artistMap.values()).slice(0, limit);
        if (uniqueArtists.length > 0) {
          console.log('Using recently played artists as fallback:', uniqueArtists.length);
          return uniqueArtists;
        }
      } catch (fallbackError) {
        console.error('Recently played artists fallback failed:', fallbackError);
      }

      // Fallback 3: Return empty array and let the calling function handle it
      console.warn('All fallback methods failed, returning empty array');
      return [];
    }
  }

  // Get new releases from followed artists
  async getNewReleasesFromFollowedArtists(limit: number = 20): Promise<SpotifyTrack[]> {
    if (!this.isAuthenticated()) return [];

    try {
      console.log('Getting new releases from followed artists...');
      const followedArtists = await this.getFollowedArtists(20);
      
      if (followedArtists.length === 0) {
        console.log('No followed artists found, trying to get popular new releases instead');
        // Fallback to popular new releases
        return this.getPopularNewReleases(limit);
      }

      console.log(`Found ${followedArtists.length} artists, getting their new releases...`);
      const allTracks: SpotifyTrack[] = [];

      // Get albums for each artist (limit to first 5 to avoid too many API calls)
      for (const artist of followedArtists.slice(0, 5)) {
        try {
          console.log(`Getting albums for artist: ${artist.name}`);
          const albumsResponse = await fetch(`https://api.spotify.com/v1/artists/${artist.id}/albums?include_groups=album,single&limit=3&market=US`, {
            headers: {
              'Authorization': `Bearer ${this.getAccessToken()}`
            }
          });

          if (albumsResponse.ok) {
            const albumsData = await albumsResponse.json();
            console.log(`Found ${albumsData.items.length} albums for ${artist.name}`);
            
            for (const album of albumsData.items.slice(0, 2)) { // Limit to 2 albums per artist
              try {
                const tracksResponse = await fetch(`https://api.spotify.com/v1/albums/${album.id}/tracks?market=US`, {
                  headers: {
                    'Authorization': `Bearer ${this.getAccessToken()}`
                  }
                });

                if (tracksResponse.ok) {
                  const tracksData = await tracksResponse.json();
                  const validTracks = tracksData.items.filter((track: any) => track);
                  allTracks.push(...validTracks);
                  console.log(`Added ${validTracks.length} tracks from album: ${album.name}`);
                } else {
                  console.warn(`Failed to get tracks for album ${album.name}:`, tracksResponse.status);
                }
              } catch (trackError) {
                console.error(`Error fetching tracks for album ${album.name}:`, trackError);
              }
            }
          } else {
            console.warn(`Failed to get albums for artist ${artist.name}:`, albumsResponse.status);
          }
        } catch (artistError) {
          console.error(`Error fetching albums for artist ${artist.name}:`, artistError);
          continue;
        }
      }

      console.log(`Total tracks collected: ${allTracks.length}`);

      // If we still don't have enough tracks, get popular new releases
      if (allTracks.length < 5) {
        console.log('Not enough tracks from followed artists, adding popular new releases...');
        const popularTracks = await this.getPopularNewReleases(limit - allTracks.length);
        allTracks.push(...popularTracks);
        console.log(`Added ${popularTracks.length} popular tracks`);
      }

      const result = allTracks.slice(0, limit);
      console.log(`Returning ${result.length} tracks from followed artists`);
      return result;
    } catch (error) {
      console.error('Error fetching new releases from followed artists:', error);
      // Fallback to popular new releases
      return this.getPopularNewReleases(limit);
    }
  }

  // Alternative method to get tracks from user's top artists
  async getTracksFromTopArtists(limit: number = 20): Promise<SpotifyTrack[]> {
    if (!this.isAuthenticated()) return [];

    try {
      console.log('Getting tracks from user\'s top artists...');
      
      // Get user's top artists
      const topArtistsResponse = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10`, {
        headers: {
          'Authorization': `Bearer ${this.getAccessToken()}`
        }
      });

      if (!topArtistsResponse.ok) {
        throw new Error('Failed to fetch top artists');
      }

      const topArtistsData = await topArtistsResponse.json();
      const artists = topArtistsData.items;
      
      if (artists.length === 0) {
        console.log('No top artists found');
        return [];
      }

      console.log(`Found ${artists.length} top artists`);
      const allTracks: SpotifyTrack[] = [];

      // Get recent tracks from each artist
      for (const artist of artists.slice(0, 5)) {
        try {
          console.log(`Getting recent tracks for artist: ${artist.name}`);
          const artistTracksResponse = await fetch(`https://api.spotify.com/v1/artists/${artist.id}/top-tracks?market=US`, {
            headers: {
              'Authorization': `Bearer ${this.getAccessToken()}`
            }
          });

          if (artistTracksResponse.ok) {
            const tracksData = await artistTracksResponse.json();
            const validTracks = tracksData.tracks.filter((track: any) => track);
            allTracks.push(...validTracks.slice(0, 3)); // Limit to 3 tracks per artist
            console.log(`Added ${validTracks.slice(0, 3).length} tracks from ${artist.name}`);
          }
        } catch (artistError) {
          console.error(`Error fetching tracks for artist ${artist.name}:`, artistError);
        }
      }

      console.log(`Total tracks from top artists: ${allTracks.length}`);
      return allTracks.slice(0, limit);
    } catch (error) {
      console.error('Error getting tracks from top artists:', error);
      return [];
    }
  }




  // Helper method to get popular new releases
  private async getPopularNewReleases(limit: number): Promise<SpotifyTrack[]> {
    try {
      const response = await fetch(`https://api.spotify.com/v1/browse/new-releases?limit=20&market=US`, {
        headers: {
          'Authorization': `Bearer ${this.getAccessToken()}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch new releases');
      }

      const data = await response.json();
      const allTracks: SpotifyTrack[] = [];

      // Get tracks from each album
      for (const album of data.albums.items.slice(0, 5)) {
        const tracksResponse = await fetch(`https://api.spotify.com/v1/albums/${album.id}/tracks?market=US`, {
          headers: {
            'Authorization': `Bearer ${this.getAccessToken()}`
          }
        });

        if (tracksResponse.ok) {
          const tracksData = await tracksResponse.json();
          allTracks.push(...tracksData.items.filter((track: any) => track));
        }
      }

      return allTracks.slice(0, limit);
    } catch (error) {
      console.error('Error fetching popular new releases:', error);
      return [];
    }
  }

  // Get recommendations based on user's top tracks
  async getRecommendations(limit: number = 20): Promise<SpotifyTrack[]> {
    if (!this.isAuthenticated()) return [];

    try {
      // Get user's top tracks and artists for better recommendations
      const [topTracks, topArtists] = await Promise.all([
        this.getTopTracks('medium_term', 3),
        this.getFollowedArtists(2)
      ]);

      // Build seed parameters
      const seedTracks = topTracks.slice(0, 3).map(track => track.id).join(',');
      const seedArtists = topArtists.slice(0, 2).map(artist => artist.id).join(',');
      
      // If we don't have enough seeds, use some popular tracks as fallback
      let seedParams = '';
      if (seedTracks && seedArtists) {
        seedParams = `seed_tracks=${seedTracks}&seed_artists=${seedArtists}`;
      } else if (seedTracks) {
        seedParams = `seed_tracks=${seedTracks}`;
      } else if (seedArtists) {
        seedParams = `seed_artists=${seedArtists}`;
      } else {
        // Fallback to popular tracks
        seedParams = 'seed_tracks=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M,3n3Ppam7vgaVa1iaRUc9L';
      }

      const response = await fetch(`https://api.spotify.com/v1/recommendations?${seedParams}&limit=${limit}&market=US&min_popularity=30`, {
        headers: {
          'Authorization': `Bearer ${this.getAccessToken()}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Recommendations API error:', errorData);
        throw new Error(`Failed to fetch recommendations: ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      return data.tracks || [];
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      return [];
    }
  }


  // Logout
  logout(): void {
    this.accessToken = null;
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
    localStorage.removeItem('spotify_token_expires');
  }
}

export const spotifyService = new SpotifyService();

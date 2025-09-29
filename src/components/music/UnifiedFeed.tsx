import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { spotifyService } from '@/services/spotify';
import { useAuth } from '@/contexts/AuthContext';
import { SongCard } from './SongCard';
import { Button } from '../ui/button';
import { Music } from 'lucide-react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

interface FeedItem {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  duration: string;
  uri: string;
  sharedBy: {
    username: string;
    avatar: string;
  };
  source: "friend" | "artist" | "recommended" | "recent" | "top" | "followed" | "country";
  likes: number;
  comments: number;
  isLiked: boolean;
  timestamp: string;
}

export function UnifiedFeed() {
  const { isAuthenticated, user } = useAuth();
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);

  // Fetch data from various sources
  const { data: recentTracks, isLoading: recentLoading } = useQuery({
    queryKey: ['recent-tracks'],
    queryFn: () => spotifyService.getRecentlyPlayed(),
    enabled: isAuthenticated,
    staleTime: 15 * 60 * 1000,
  });

  const { data: topTracks, isLoading: topLoading } = useQuery({
    queryKey: ['top-tracks'],
    queryFn: () => spotifyService.getTopTracks('medium_term'),
    enabled: isAuthenticated,
    staleTime: 15 * 60 * 1000,
  });

  const { data: recommendations, isLoading: recommendationsLoading } = useQuery({
    queryKey: ['recommendations'],
    queryFn: () => spotifyService.getRecommendations(20),
    enabled: isAuthenticated,
    staleTime: 15 * 60 * 1000,
  });

  const { data: followedArtistsTracks, isLoading: followedLoading } = useQuery({
    queryKey: ['followed-artists-tracks'],
    queryFn: async () => {
      console.log('🔍 UNIFIED FEED: Starting followed artists tracks query...');
      try {
        console.log('🔍 UNIFIED FEED: Calling getNewReleasesFromFollowedArtists...');
        const tracks = await spotifyService.getNewReleasesFromFollowedArtists(20);
        console.log('🔍 UNIFIED FEED: getNewReleasesFromFollowedArtists returned:', tracks.length, 'tracks');
        return tracks;
      } catch (error) {
        console.error('❌ UNIFIED FEED: Error in followed artists tracks query:', error);
        return [];
      }
    },
    enabled: isAuthenticated,
    staleTime: 15 * 60 * 1000,
  });

  const { data: countryTracks, isLoading: countryLoading } = useQuery({
    queryKey: ['country-tracks'],
    queryFn: async () => {
      try {
        const tracks = await spotifyService.getTopTracks('medium_term');
        return tracks;
      } catch (error) {
        console.error('Error fetching country tracks:', error);
        return [];
      }
    },
    enabled: isAuthenticated,
    staleTime: 15 * 60 * 1000,
  });

  // Mock friends data
  const mockFriendsTracks = useMemo(() => [
    {
      id: "friend_1",
      name: "Blinding Lights",
      artists: [{ name: "The Weeknd" }],
      album: { name: "After Hours", images: [{ url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop" }] },
      duration_ms: 200000,
      external_urls: { spotify: "https://open.spotify.com/track/0VjIjW4WU0zT9jWhXqgZi2" },
      preview_url: null,
      popularity: 85,
      uri: "spotify:track:0VjIjW4WU0zT9jWhXqgZi2"
    },
    {
      id: "friend_2", 
      name: "Good 4 U",
      artists: [{ name: "Olivia Rodrigo" }],
      album: { name: "SOUR", images: [{ url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop" }] },
      duration_ms: 178000,
      external_urls: { spotify: "https://open.spotify.com/track/4ZtFanR9U6ndgddUvNcjcG" },
      preview_url: null,
      popularity: 90,
      uri: "spotify:track:4ZtFanR9U6ndgddUvNcjcG"
    }
  ], []);

  // Convert Spotify tracks to FeedItem format
  const convertToFeedItem = (track: any, source: FeedItem['source'], sharedBy: FeedItem['sharedBy']): FeedItem => {
    const duration = track.duration_ms ? Math.floor(track.duration_ms / 1000 / 60) + ':' + 
      String(Math.floor((track.duration_ms / 1000) % 60)).padStart(2, '0') : '0:00';
    
    return {
      id: track.id,
      title: track.name,
      artist: track.artists?.[0]?.name || 'Unknown Artist',
      album: track.album?.name || 'Unknown Album',
      coverUrl: track.album?.images?.[0]?.url || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
      duration,
      uri: track.uri || `spotify:track:${track.id}`,
      sharedBy,
      source,
      likes: Math.floor(Math.random() * 100),
      comments: Math.floor(Math.random() * 20),
      isLiked: Math.random() > 0.7,
      timestamp: Math.random() > 0.5 ? '2h' : Math.random() > 0.5 ? '4h' : '1d'
    };
  };

  // Combine all tracks into feed items
  useEffect(() => {
    if (!isAuthenticated) return;

    const allItems: FeedItem[] = [];

    // Add recent tracks
    if (recentTracks?.length) {
      recentTracks.forEach(track => {
        allItems.push(convertToFeedItem(track, 'recent', {
          username: 'You',
          avatar: user?.images?.[0]?.url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        }));
      });
    }

    // Add top tracks
    if (topTracks?.length) {
      topTracks.forEach(track => {
        allItems.push(convertToFeedItem(track, 'top', {
          username: 'You',
          avatar: user?.images?.[0]?.url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        }));
      });
    }

    // Add recommendations
    if (recommendations?.length) {
      recommendations.forEach(track => {
        allItems.push(convertToFeedItem(track, 'recommended', {
          username: 'Spotify',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face'
        }));
      });
    }

    // Add followed artists tracks
    if (followedArtistsTracks?.length) {
      followedArtistsTracks.forEach(track => {
        allItems.push(convertToFeedItem(track, 'followed', {
          username: track.artists?.[0]?.name || 'Artist',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
        }));
      });
    }

    // Add country tracks
    if (countryTracks?.length) {
      countryTracks.forEach(track => {
        allItems.push(convertToFeedItem(track, 'country', {
          username: 'Trending',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face'
        }));
      });
    }

    // Add mock friends tracks
    mockFriendsTracks.forEach(track => {
      allItems.push(convertToFeedItem(track, 'friend', {
        username: 'friend_' + Math.floor(Math.random() * 10),
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      }));
    });

    // Shuffle the items
    const shuffled = allItems.sort(() => 0.5 - Math.random());
    setFeedItems(shuffled);
  }, [isAuthenticated, recentTracks, topTracks, recommendations, followedArtistsTracks, countryTracks, mockFriendsTracks, user]);


  const isLoading = recentLoading || topLoading || recommendationsLoading || followedLoading || countryLoading;

  const handleLike = (id: string) => {
    setFeedItems(prev => prev.map(item => 
      item.id === id 
        ? { ...item, isLiked: !item.isLiked, likes: item.isLiked ? item.likes - 1 : item.likes + 1 }
        : item
    ));
  };

  const handleComment = (id: string) => {
    console.log("Comment on song:", id);
  };

  const handleShare = (id: string) => {
    console.log("Share song:", id);
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
          <Music className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">Please log in to view your feed</h3>
        <p className="text-muted-foreground">Connect your Spotify account to discover music</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="w-8 h-8 mx-auto mb-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground">Loading your music feed...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Feed Content */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-8">
        {/* Welcome Message */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold mb-2">Welcome back, {user?.display_name || 'Music Lover'}!</h2>
          <p className="text-muted-foreground">
            Discover new music from your friends and favorite artists
          </p>
        </div>

        {/* Masonry Grid */}
        {feedItems.length > 0 ? (
          <div className="animate-in fade-in-50 duration-700">
            <ResponsiveMasonry
              columnsCountBreakPoints={{
                350: 1,
                700: 2,
                1000: 3,
                1400: 4,
                1800: 5
              }}
            >
              <Masonry gutter="20px" className="masonry-grid">
                {feedItems.map((song, index) => (
                  <div 
                    key={song.id}
                    className="animate-in slide-in-from-bottom-8 fade-in-0 duration-500"
                    style={{ 
                      animationDelay: `${(index % 6) * 100}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    <SongCard
                      song={song}
                      onLike={handleLike}
                      onComment={handleComment}
                      onShare={handleShare}
                    />
                  </div>
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </div>
        ) : (
          <div className="text-center py-16">
            <Music className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No songs found</h3>
            <p className="text-muted-foreground">
              Check back later for new music
            </p>
          </div>
        )}

        {/* Load More Button */}
        {feedItems.length > 0 && (
          <div className="flex justify-center pt-12">
            <Button variant="outline" className="rounded-full px-8 py-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white">
              Load More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
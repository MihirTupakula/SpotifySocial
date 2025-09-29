import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Play, 
  Pause, 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal,
  Music,
  Star,
  Crown,
  Flame,
  TrendingUp,
  Users,
  UserPlus
} from 'lucide-react';
import { usePlayer } from '@/contexts/PlayerContext';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { spotifyService } from '@/services/spotify';

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
  source: "trending" | "regulars" | "friends" | "followed";
  likes: number;
  comments: number;
  isLiked: boolean;
  timestamp: string;
  genre: string;
}

export default function EnhancedFeed() {
  const { playTrack, isPlaying, currentTrack } = usePlayer();
  const { isAuthenticated, user } = useAuth();
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [mascotVisible, setMascotVisible] = useState(false);
  const [mascotMessage, setMascotMessage] = useState('');

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
      try {
        const tracks = await spotifyService.getNewReleasesFromFollowedArtists(20);
        return tracks;
      } catch (error) {
        console.error('Error fetching followed artists tracks:', error);
        return [];
      }
    },
    enabled: isAuthenticated,
    staleTime: 15 * 60 * 1000,
  });

  // Mock friends data
  const mockFriendsTracks = [
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
  ];

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
      timestamp: Math.random() > 0.5 ? '2h' : Math.random() > 0.5 ? '4h' : '1d',
      genre: track.album?.genres?.[0] || 'Pop'
    };
  };

  // Combine all tracks into feed items
  useEffect(() => {
    if (!isAuthenticated) return;

    const allItems: FeedItem[] = [];

    // Add recent tracks (regulars)
    if (recentTracks?.length) {
      recentTracks.forEach(track => {
        allItems.push(convertToFeedItem(track, 'regulars', {
          username: 'You',
          avatar: user?.images?.[0]?.url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        }));
      });
    }

    // Add top tracks (trending)
    if (topTracks?.length) {
      topTracks.forEach(track => {
        allItems.push(convertToFeedItem(track, 'trending', {
          username: 'Trending',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face'
        }));
      });
    }

    // Add recommendations (trending)
    if (recommendations?.length) {
      recommendations.forEach(track => {
        allItems.push(convertToFeedItem(track, 'trending', {
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

    // Add mock friends tracks
    mockFriendsTracks.forEach(track => {
      allItems.push(convertToFeedItem(track, 'friends', {
        username: 'friend_' + Math.floor(Math.random() * 10),
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      }));
    });

    // Shuffle the items
    const shuffled = allItems.sort(() => 0.5 - Math.random());
    setFeedItems(shuffled);
  }, [isAuthenticated, recentTracks, topTracks, recommendations, followedArtistsTracks, user]);

  const handlePlayPause = (item: FeedItem) => {
    if (isPlaying && currentTrack?.id === item.id) {
      // Already playing this track, pause
      return;
    } else {
      // Play this track
      playTrack({
        id: item.id,
        name: item.title,
        artists: [{ id: item.id, name: item.artist }],
        album: { id: item.id, name: item.album, images: [{ url: item.coverUrl, height: 300, width: 300 }] },
        duration_ms: 0,
        external_urls: { spotify: '' },
        preview_url: null,
        popularity: 0
      });
    }
  };

  const handleLike = (itemId: string) => {
    setFeedItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, isLiked: !item.isLiked, likes: item.isLiked ? item.likes - 1 : item.likes + 1 }
        : item
    ));
  };

  const getSourceBadge = (source: string) => {
    switch (source) {
      case "trending":
        return <Badge className="bg-brand-orange text-white border-2 border-black shadow-[2px_2px_0px_0px_#000]"><TrendingUp className="w-3 h-3 mr-1" />Trending</Badge>;
      case "regulars":
        return <Badge className="bg-brand-amber text-white border-2 border-black shadow-[2px_2px_0px_0px_#000]"><Star className="w-3 h-3 mr-1" />Your Regulars</Badge>;
      case "friends":
        return <Badge className="bg-brand-yellow text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]"><Users className="w-3 h-3 mr-1" />Friends</Badge>;
      case "followed":
        return <Badge className="bg-brand-cream text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]"><UserPlus className="w-3 h-3 mr-1" />Artists</Badge>;
      default:
        return null;
    }
  };

  const getGenreColor = (genre: string) => {
    const colors: { [key: string]: string } = {
      'Pop': 'from-pink-500 to-rose-500',
      'Rock': 'from-red-500 to-orange-500',
      'Hip-Hop': 'from-purple-500 to-pink-500',
      'Electronic': 'from-blue-500 to-cyan-500',
      'Jazz': 'from-yellow-500 to-orange-500',
      'Classical': 'from-gray-500 to-slate-500',
      'Country': 'from-green-500 to-emerald-500',
      'R&B': 'from-indigo-500 to-purple-500',
      'Indie Rock': 'from-orange-500 to-red-500',
      'Alternative': 'from-teal-500 to-blue-500'
    };
    return colors[genre] || 'from-brand-orange to-brand-amber';
  };

  const isLoading = recentLoading || topLoading || recommendationsLoading || followedLoading;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white">
          <Music className="w-16 h-16 mx-auto mb-4 text-brand-orange" />
          <h2 className="text-2xl font-bold mb-2">Connect to Spotify</h2>
          <p className="text-white/70">Please log in to see your personalized music feed</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">

      {/* Feed Container */}
      <div className="pt-20 pb-20 overflow-y-auto h-screen">
        <div className="max-w-7xl mx-auto p-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center text-white">
                <Music className="w-12 h-12 mx-auto mb-4 text-brand-orange animate-spin" />
                <p className="text-lg">Loading your music feed...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {feedItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="group"
                  >
                    <Card className="w-full bg-white/90 backdrop-blur-lg border-4 border-black shadow-[8px_8px_0px_0px_#000] overflow-hidden hover:shadow-[12px_12px_0px_0px_#000] transition-all duration-300">
                      {/* Animated Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${getGenreColor(item.genre)} opacity-20`}>
                        <div className="absolute inset-0 bg-white/30" />
                      </div>

                      <div className="relative p-4">
                        {/* Source Badge */}
                        <div className="flex justify-between items-start mb-3">
                          {getSourceBadge(item.source)}
                          <span className="text-xs text-black/50">{item.timestamp}</span>
                        </div>

                        {/* Album Art */}
                        <div className="relative mb-4">
                          <div className="relative w-full aspect-square rounded-xl overflow-hidden border-4 border-black shadow-[4px_4px_0px_0px_#000]">
                            <img
                              src={item.coverUrl}
                              alt={item.album}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            
                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handlePlayPause(item)}
                                className="w-16 h-16 bg-brand-orange rounded-full flex items-center justify-center shadow-lg border-4 border-black"
                              >
                                {isPlaying && currentTrack?.id === item.id ? (
                                  <Pause className="w-8 h-8 text-white" />
                                ) : (
                                  <Play className="w-8 h-8 text-white ml-1" />
                                )}
                              </motion.button>
                            </div>

                            {/* Playing Indicator */}
                            {isPlaying && currentTrack?.id === item.id && (
                              <div className="absolute top-2 right-2 w-8 h-8 bg-brand-yellow rounded-full flex items-center justify-center shadow-lg animate-pulse border-2 border-black">
                                <Music className="w-4 h-4 text-brand-orange" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Song Info */}
                        <div className="mb-4">
                          <h3 className="text-lg font-bold text-black mb-1 truncate">{item.title}</h3>
                          <p className="text-black/80 mb-1 truncate">{item.artist}</p>
                          <p className="text-sm text-black/60 truncate">{item.album}</p>
                        </div>

                        {/* Shared By */}
                        <div className="flex items-center gap-2 mb-4">
                          <Avatar className="w-6 h-6 border-2 border-black">
                            <AvatarImage src={item.sharedBy.avatar} />
                            <AvatarFallback className="bg-brand-orange text-white text-xs">
                              {item.sharedBy.username[0]}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-black/70">Shared by {item.sharedBy.username}</span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleLike(item.id)}
                              className={`flex items-center gap-1 text-sm ${
                                item.isLiked 
                                  ? 'text-brand-orange' 
                                  : 'text-black/70 hover:text-black'
                              }`}
                            >
                              <Heart className={`w-4 h-4 ${item.isLiked ? 'fill-current' : ''}`} />
                              {item.likes}
                            </motion.button>
                            
                            <button className="flex items-center gap-1 text-sm text-black/70 hover:text-black">
                              <MessageCircle className="w-4 h-4" />
                              {item.comments}
                            </button>
                            
                            <button className="flex items-center gap-1 text-sm text-black/70 hover:text-black">
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <span className="text-xs text-black/50">{item.duration}</span>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Mascot */}
      <AnimatePresence>
        {mascotVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className="bg-brand-orange text-white p-4 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_#000] max-w-xs">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-brand-amber rounded-full flex items-center justify-center">
                  <Music className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold">SoundSocial Mascot</span>
              </div>
              <p className="text-sm">{mascotMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
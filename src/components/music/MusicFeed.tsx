import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { MusicCard } from './MusicCard';
import { spotifyService, SpotifyTrack } from '@/services/spotify';
import { useAuth } from '@/contexts/AuthContext';
import { Play, Clock, TrendingUp, Users, Heart } from 'lucide-react';

type FeedType = 'recent' | 'top' | 'recommendations' | 'followed';

interface FeedSection {
  id: FeedType;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const feedSections: FeedSection[] = [
  {
    id: 'recent',
    title: 'Recently Played',
    description: 'Your recent listening history',
    icon: <Clock className="w-4 h-4" />,
    color: 'text-blue-500'
  },
  {
    id: 'top',
    title: 'Your Top Tracks',
    description: 'Your most played songs',
    icon: <TrendingUp className="w-4 h-4" />,
    color: 'text-green-500'
  },
  {
    id: 'recommendations',
    title: 'Recommended',
    description: 'Songs we think you\'ll love',
    icon: <Heart className="w-4 h-4" />,
    color: 'text-purple-500'
  },
  {
    id: 'followed',
    title: 'From Artists You Follow',
    description: 'New releases from your favorite artists',
    icon: <Users className="w-4 h-4" />,
    color: 'text-orange-500'
  }
];

export function MusicFeed() {
  const { isAuthenticated, user } = useAuth();
  const [activeTab, setActiveTab] = useState<FeedType>('recent');

  // Queries for different feed types
  const { data: recentTracks, isLoading: recentLoading } = useQuery({
    queryKey: ['recent-tracks'],
    queryFn: () => spotifyService.getRecentlyPlayed(20),
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const { data: topTracks, isLoading: topLoading } = useQuery({
    queryKey: ['top-tracks'],
    queryFn: () => spotifyService.getTopTracks('medium_term', 20),
    enabled: isAuthenticated,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  const { data: recommendations, isLoading: recommendationsLoading } = useQuery({
    queryKey: ['recommendations'],
    queryFn: () => spotifyService.getRecommendations(20),
    enabled: isAuthenticated,
    staleTime: 15 * 60 * 1000, // 15 minutes
  });

  const { data: followedArtistsTracks, isLoading: followedLoading } = useQuery({
    queryKey: ['followed-artists-tracks'],
    queryFn: () => spotifyService.getNewReleasesFromFollowedArtists(20),
    enabled: isAuthenticated,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });

  const getCurrentTracks = (): SpotifyTrack[] => {
    switch (activeTab) {
      case 'recent':
        return recentTracks || [];
      case 'top':
        return topTracks || [];
      case 'recommendations':
        return recommendations || [];
      case 'followed':
        return followedArtistsTracks || [];
      default:
        return [];
    }
  };

  const getCurrentLoading = (): boolean => {
    switch (activeTab) {
      case 'recent':
        return recentLoading;
      case 'top':
        return topLoading;
      case 'recommendations':
        return recommendationsLoading;
      case 'followed':
        return followedLoading;
      default:
        return false;
    }
  };

  const currentSection = feedSections.find(section => section.id === activeTab);

  if (!isAuthenticated) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
          <Play className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Connect to Spotify</h3>
        <p className="text-muted-foreground">
          Sign in with Spotify to see your personalized music feed
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Your Music Feed</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.display_name || 'Music Lover'}!
          </p>
        </div>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Play className="w-3 h-3" />
          {getCurrentTracks().length} tracks
        </Badge>
      </div>

      {/* Feed Tabs */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as FeedType)}>
        <TabsList className="grid w-full grid-cols-4">
          {feedSections.map((section) => (
            <TabsTrigger key={section.id} value={section.id} className="flex items-center gap-2">
              <span className={section.color}>{section.icon}</span>
              <span className="hidden sm:inline">{section.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {feedSections.map((section) => (
          <TabsContent key={section.id} value={section.id} className="space-y-4">
            {/* Section Header */}
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-muted ${section.color}`}>
                {section.icon}
              </div>
              <div>
                <h2 className="text-lg font-semibold">{section.title}</h2>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </div>
            </div>

            {/* Tracks Grid */}
            {getCurrentLoading() ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Card key={i} className="p-4">
                    <Skeleton className="w-full h-32 mb-3" />
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-1/2" />
                  </Card>
                ))}
              </div>
            ) : getCurrentTracks().length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {getCurrentTracks().map((track) => (
                  <MusicCard key={track.id} track={track} />
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  {section.icon}
                </div>
                <h3 className="font-semibold mb-2">No tracks found</h3>
                <p className="text-muted-foreground text-sm">
                  {section.id === 'recent' && "You haven't played any songs recently"}
                  {section.id === 'top' && "We need more data to show your top tracks"}
                  {section.id === 'recommendations' && "We need more listening data to make recommendations"}
                  {section.id === 'followed' && "You're not following any artists yet"}
                </p>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Music, 
  Calendar, 
  Heart, 
  Trophy, 
  Users, 
  Settings, 
  Camera,
  Play,
  Share2,
  Download,
  Lock,
  Globe,
  Star,
  TrendingUp,
  Clock,
  MapPin
} from 'lucide-react';
import { MusicDNA } from '@/components/profile/MusicDNA';
import { ConcertLog } from '@/components/profile/ConcertLog';
import { FavoritesSection } from '@/components/profile/FavoritesSection';
import { AchievementsSection } from '@/components/profile/AchievementsSection';
import { CommunitySection } from '@/components/profile/CommunitySection';
import { SocialGallery } from '@/components/profile/SocialGallery';
import { PrivacySettings } from '@/components/profile/PrivacySettings';

export default function Profile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Music className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-medium mb-2">Please log in</h3>
          <p className="text-muted-foreground">Connect your Spotify account to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Profile Header */}
      <div className="relative">
        {/* Cover Image */}
        <div className="h-64 bg-gradient-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-end gap-4">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                <AvatarImage src={user.images?.[0]?.url} />
                <AvatarFallback className="text-2xl bg-brand-orange text-white">
                  {user.display_name?.[0]?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-white">
                <h1 className="text-3xl font-bold mb-2">{user.display_name || 'Music Lover'}</h1>
                <p className="text-lg opacity-90 mb-2">@{user.id}</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Music className="w-4 h-4" />
                    <span>1,247 tracks</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>89 friends</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy className="w-4 h-4" />
                    <span>23 badges</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Profile
                </Button>
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-muted/30 mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Music className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="dna" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Music DNA
            </TabsTrigger>
            <TabsTrigger value="concerts" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Concerts
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Favorites
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Badges
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Community
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Stats */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-brand-orange" />
                  This Month
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Tracks Played</span>
                    <span className="font-semibold">1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">New Discoveries</span>
                    <span className="font-semibold text-brand-orange">89</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Listening Time</span>
                    <span className="font-semibold">47h 23m</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Top Genre</span>
                    <Badge className="bg-brand-orange/10 text-brand-orange border-brand-orange/30">
                      Indie Rock
                    </Badge>
                  </div>
                </div>
              </Card>

              {/* Recent Activity */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-brand-amber" />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-brand-orange rounded-full" />
                    <span className="text-sm">Discovered "Blinding Lights" by The Weeknd</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-brand-yellow rounded-full" />
                    <span className="text-sm">Earned "Genre Explorer" badge</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-brand-amber rounded-full" />
                    <span className="text-sm">Added 5 songs to "Summer Vibes" playlist</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-brand-cream rounded-full" />
                    <span className="text-sm">Attended Taylor Swift concert</span>
                  </div>
                </div>
              </Card>

              {/* Profile Song */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Play className="w-5 h-5 text-brand-yellow" />
                  Profile Song
                </h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Bohemian Rhapsody</p>
                    <p className="text-sm text-muted-foreground">Queen</p>
                  </div>
                  <Button size="sm" className="bg-brand-orange hover:bg-brand-amber">
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </div>

            {/* Social Gallery Preview */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Camera className="w-5 h-5 text-brand-orange" />
                  Recent Moments
                </h3>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Camera className="w-8 h-8 text-white opacity-50" />
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Music DNA Tab */}
          <TabsContent value="dna">
            <MusicDNA />
          </TabsContent>

          {/* Concerts Tab */}
          <TabsContent value="concerts">
            <ConcertLog />
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites">
            <FavoritesSection />
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <AchievementsSection />
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community">
            <CommunitySection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
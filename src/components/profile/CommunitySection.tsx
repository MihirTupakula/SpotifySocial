import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Heart, 
  MessageCircle, 
  Share2, 
  UserPlus,
  TrendingUp,
  Target,
  Crown,
  Star,
  Music,
  Calendar,
  MapPin,
  Clock,
  Zap
} from 'lucide-react';

interface Friend {
  id: string;
  name: string;
  username: string;
  avatar: string;
  tasteMatch: number;
  sharedGenres: string[];
  sharedArtists: string[];
  lastActive: string;
  isOnline: boolean;
  mutualFriends: number;
}

interface Tribe {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  tasteMatch: number;
  coverImage: string;
  isJoined: boolean;
  tags: string[];
}

interface TasteComparison {
  category: string;
  userPercentage: number;
  friendPercentage: number;
  difference: number;
}

export function CommunitySection() {
  const [activeTab, setActiveTab] = useState('friends');

  // Mock data
  const friends: Friend[] = [
    {
      id: '1',
      name: 'Alex Johnson',
      username: 'alex_music',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      tasteMatch: 87,
      sharedGenres: ['Indie Rock', 'Pop', 'Electronic'],
      sharedArtists: ['The Weeknd', 'Arctic Monkeys', 'Daft Punk'],
      lastActive: '2 hours ago',
      isOnline: true,
      mutualFriends: 12
    },
    {
      id: '2',
      name: 'Sarah Chen',
      username: 'sarah_beats',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face',
      tasteMatch: 72,
      sharedGenres: ['Pop', 'R&B'],
      sharedArtists: ['The Weeknd', 'Taylor Swift'],
      lastActive: '1 day ago',
      isOnline: false,
      mutualFriends: 8
    },
    {
      id: '3',
      name: 'Mike Rodriguez',
      username: 'mike_vibes',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      tasteMatch: 65,
      sharedGenres: ['Electronic', 'Hip Hop'],
      sharedArtists: ['Daft Punk', 'Kendrick Lamar'],
      lastActive: '3 hours ago',
      isOnline: true,
      mutualFriends: 5
    }
  ];

  const tribes: Tribe[] = [
    {
      id: '1',
      name: 'Indie Rock Enthusiasts',
      description: 'For lovers of alternative and indie rock music',
      memberCount: 1247,
      tasteMatch: 89,
      coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=200&fit=crop',
      isJoined: true,
      tags: ['Indie Rock', 'Alternative', 'Guitar']
    },
    {
      id: '2',
      name: 'Electronic Music Collective',
      description: 'Exploring the world of electronic and ambient sounds',
      memberCount: 892,
      tasteMatch: 76,
      coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=200&fit=crop',
      isJoined: false,
      tags: ['Electronic', 'Ambient', 'Synthesizer']
    },
    {
      id: '3',
      name: 'Concert Goers United',
      description: 'Sharing live music experiences and concert memories',
      memberCount: 2156,
      tasteMatch: 68,
      coverImage: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=200&fit=crop',
      isJoined: true,
      tags: ['Live Music', 'Concerts', 'Events']
    }
  ];

  const tasteComparisons: TasteComparison[] = [
    { category: 'Indie Rock', userPercentage: 35, friendPercentage: 28, difference: 7 },
    { category: 'Pop', userPercentage: 25, friendPercentage: 32, difference: -7 },
    { category: 'Electronic', userPercentage: 20, friendPercentage: 18, difference: 2 },
    { category: 'Hip Hop', userPercentage: 15, friendPercentage: 12, difference: 3 },
    { category: 'Jazz', userPercentage: 5, friendPercentage: 10, difference: -5 }
  ];

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return 'text-brand-orange';
    if (percentage >= 60) return 'text-brand-amber';
    if (percentage >= 40) return 'text-brand-yellow';
    return 'text-muted-foreground';
  };

  const getMatchBadgeColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-brand-orange/10 text-brand-orange border-brand-orange/30';
    if (percentage >= 60) return 'bg-brand-amber/10 text-brand-amber border-brand-amber/30';
    if (percentage >= 40) return 'bg-brand-yellow/10 text-brand-yellow border-brand-yellow/30';
    return 'bg-muted text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Community</h2>
          <p className="text-muted-foreground">Connect with music lovers like you</p>
        </div>
        <Button className="bg-brand-orange hover:bg-brand-amber">
          <UserPlus className="w-4 h-4 mr-2" />
          Find Friends
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <Users className="w-8 h-8 mx-auto mb-2 text-brand-orange" />
          <div className="text-2xl font-bold">{friends.length}</div>
          <div className="text-sm text-muted-foreground">Friends</div>
        </Card>
        <Card className="p-4 text-center">
          <Heart className="w-8 h-8 mx-auto mb-2 text-brand-amber" />
          <div className="text-2xl font-bold">
            {Math.round(friends.reduce((acc, friend) => acc + friend.tasteMatch, 0) / friends.length)}
          </div>
          <div className="text-sm text-muted-foreground">Avg Match</div>
        </Card>
        <Card className="p-4 text-center">
          <Crown className="w-8 h-8 mx-auto mb-2 text-brand-yellow" />
          <div className="text-2xl font-bold">
            {tribes.filter(t => t.isJoined).length}
          </div>
          <div className="text-sm text-muted-foreground">Tribes</div>
        </Card>
        <Card className="p-4 text-center">
          <Zap className="w-8 h-8 mx-auto mb-2 text-brand-cream" />
          <div className="text-2xl font-bold">23</div>
          <div className="text-sm text-muted-foreground">Connections</div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="friends">Friends</TabsTrigger>
          <TabsTrigger value="tribes">Tribes</TabsTrigger>
          <TabsTrigger value="compare">Compare</TabsTrigger>
        </TabsList>

        {/* Friends Tab */}
        <TabsContent value="friends" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {friends.map((friend) => (
              <Card key={friend.id} className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={friend.avatar} />
                      <AvatarFallback>{friend.name[0]}</AvatarFallback>
                    </Avatar>
                    {friend.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{friend.name}</h3>
                    <p className="text-sm text-muted-foreground">@{friend.username}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getMatchBadgeColor(friend.tasteMatch)}>
                        {friend.tasteMatch}% match
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {friend.mutualFriends} mutual
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Taste Match</span>
                    <span className={getMatchColor(friend.tasteMatch)}>
                      {friend.tasteMatch}%
                    </span>
                  </div>
                  <Progress value={friend.tasteMatch} className="h-2" />
                </div>

                <div className="space-y-2 mb-3">
                  <p className="text-sm font-medium">Shared Genres</p>
                  <div className="flex flex-wrap gap-1">
                    {friend.sharedGenres.map((genre) => (
                      <Badge key={genre} variant="outline" className="text-xs">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-sm font-medium">Shared Artists</p>
                  <div className="flex flex-wrap gap-1">
                    {friend.sharedArtists.map((artist) => (
                      <Badge key={artist} variant="outline" className="text-xs">
                        {artist}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <span>Last active: {friend.lastActive}</span>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-brand-orange hover:bg-brand-amber">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Message
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tribes Tab */}
        <TabsContent value="tribes" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tribes.map((tribe) => (
              <Card key={tribe.id} className="overflow-hidden">
                <div className="h-32 bg-gradient-primary relative">
                  <img
                    src={tribe.coverImage}
                    alt={tribe.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-3 right-3">
                    <Badge className={getMatchBadgeColor(tribe.tasteMatch)}>
                      {tribe.tasteMatch}% match
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{tribe.name}</h3>
                      <p className="text-sm text-muted-foreground">{tribe.description}</p>
                    </div>
                    {tribe.isJoined && (
                      <Badge className="bg-green-500/10 text-green-600 border-green-500/30">
                        Joined
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Members</span>
                      <span className="font-medium">{tribe.memberCount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Taste Match</span>
                      <span className={getMatchColor(tribe.tasteMatch)}>
                        {tribe.tasteMatch}%
                      </span>
                    </div>
                    <Progress value={tribe.tasteMatch} className="h-2" />
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {tribe.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button 
                    className={`w-full ${
                      tribe.isJoined 
                        ? 'bg-muted text-muted-foreground hover:bg-muted/80' 
                        : 'bg-brand-orange hover:bg-brand-amber'
                    }`}
                  >
                    {tribe.isJoined ? 'Leave Tribe' : 'Join Tribe'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Compare Tab */}
        <TabsContent value="compare" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-brand-orange" />
              Taste Comparison
            </h3>
            <div className="space-y-4">
              {tasteComparisons.map((comparison, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{comparison.category}</span>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">You: {comparison.userPercentage}%</span>
                      <span className="text-muted-foreground">Friends: {comparison.friendPercentage}%</span>
                      <span className={`font-medium ${
                        comparison.difference > 0 ? 'text-brand-orange' : 'text-brand-amber'
                      }`}>
                        {comparison.difference > 0 ? '+' : ''}{comparison.difference}%
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <div className="h-2 bg-muted rounded-full">
                        <div
                          className="h-2 bg-brand-orange rounded-full"
                          style={{ width: `${comparison.userPercentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="h-2 bg-muted rounded-full">
                        <div
                          className="h-2 bg-brand-amber rounded-full"
                          style={{ width: `${comparison.friendPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand-amber" />
              Discovery Insights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Most Unique Taste</p>
                <p className="text-2xl font-bold text-brand-orange">Jazz</p>
                <p className="text-xs text-muted-foreground">95% rarer than friends</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Most Common Taste</p>
                <p className="text-2xl font-bold text-brand-amber">Indie Rock</p>
                <p className="text-xs text-muted-foreground">7% above friends average</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

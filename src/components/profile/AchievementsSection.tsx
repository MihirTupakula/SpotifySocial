import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Star, 
  Zap, 
  Music, 
  Calendar, 
  Users, 
  Target,
  Award,
  Crown,
  Flame,
  Heart,
  Share2,
  Clock,
  TrendingUp,
  Globe,
  Lock
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
  isEarned: boolean;
  earnedDate?: string;
  progress?: number;
  maxProgress?: number;
  category: string;
}

interface Streak {
  type: string;
  current: number;
  longest: number;
  lastActivity: string;
}

export function AchievementsSection() {
  const [activeTab, setActiveTab] = useState('all');

  // Mock achievements data
  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Play your first song',
      icon: <Music className="w-6 h-6" />,
      rarity: 'common',
      points: 10,
      isEarned: true,
      earnedDate: '2024-01-15',
      category: 'discovery'
    },
    {
      id: '2',
      title: 'Genre Explorer',
      description: 'Listen to 10 different genres',
      icon: <Globe className="w-6 h-6" />,
      rarity: 'rare',
      points: 50,
      isEarned: true,
      earnedDate: '2024-02-20',
      category: 'discovery'
    },
    {
      id: '3',
      title: 'Social Butterfly',
      description: 'Share 25 songs with friends',
      icon: <Share2 className="w-6 h-6" />,
      rarity: 'epic',
      points: 100,
      isEarned: true,
      earnedDate: '2024-03-10',
      category: 'social'
    },
    {
      id: '4',
      title: 'Concert Goer',
      description: 'Log 5 concerts',
      icon: <Calendar className="w-6 h-6" />,
      rarity: 'rare',
      points: 75,
      isEarned: false,
      progress: 3,
      maxProgress: 5,
      category: 'live'
    },
    {
      id: '5',
      title: 'Playlist Master',
      description: 'Create 10 playlists',
      icon: <Heart className="w-6 h-6" />,
      rarity: 'epic',
      points: 150,
      isEarned: false,
      progress: 7,
      maxProgress: 10,
      category: 'creation'
    },
    {
      id: '6',
      title: 'Music Legend',
      description: 'Earn 1000 total points',
      icon: <Crown className="w-6 h-6" />,
      rarity: 'legendary',
      points: 500,
      isEarned: false,
      progress: 235,
      maxProgress: 1000,
      category: 'milestone'
    },
    {
      id: '7',
      title: 'Streak Master',
      description: 'Listen for 30 consecutive days',
      icon: <Flame className="w-6 h-6" />,
      rarity: 'epic',
      points: 200,
      isEarned: false,
      progress: 15,
      maxProgress: 30,
      category: 'streak'
    },
    {
      id: '8',
      title: 'Taste Twin',
      description: 'Match music taste with 5 friends',
      icon: <Users className="w-6 h-6" />,
      rarity: 'rare',
      points: 100,
      isEarned: false,
      progress: 2,
      maxProgress: 5,
      category: 'social'
    }
  ];

  const streaks: Streak[] = [
    {
      type: 'Daily Listening',
      current: 15,
      longest: 23,
      lastActivity: '2024-03-15'
    },
    {
      type: 'New Discoveries',
      current: 7,
      longest: 12,
      lastActivity: '2024-03-14'
    },
    {
      type: 'Concert Attendance',
      current: 2,
      longest: 4,
      lastActivity: '2024-03-10'
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-500 border-gray-500';
      case 'rare': return 'text-blue-500 border-blue-500';
      case 'epic': return 'text-purple-500 border-purple-500';
      case 'legendary': return 'text-brand-orange border-brand-orange';
      default: return 'text-gray-500 border-gray-500';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'common': return <Star className="w-4 h-4" />;
      case 'rare': return <Award className="w-4 h-4" />;
      case 'epic': return <Trophy className="w-4 h-4" />;
      case 'legendary': return <Crown className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const totalPoints = achievements
    .filter(a => a.isEarned)
    .reduce((sum, a) => sum + a.points, 0);

  const earnedAchievements = achievements.filter(a => a.isEarned).length;
  const totalAchievements = achievements.length;

  const categories = ['all', 'discovery', 'social', 'live', 'creation', 'milestone', 'streak'];
  const filteredAchievements = activeTab === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === activeTab);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Achievements & Badges</h2>
          <p className="text-muted-foreground">Your musical journey milestones</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-brand-orange">{totalPoints}</div>
          <div className="text-sm text-muted-foreground">Total Points</div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <Trophy className="w-8 h-8 mx-auto mb-2 text-brand-orange" />
          <div className="text-2xl font-bold">{earnedAchievements}</div>
          <div className="text-sm text-muted-foreground">Badges Earned</div>
        </Card>
        <Card className="p-4 text-center">
          <Target className="w-8 h-8 mx-auto mb-2 text-brand-amber" />
          <div className="text-2xl font-bold">{totalAchievements - earnedAchievements}</div>
          <div className="text-sm text-muted-foreground">In Progress</div>
        </Card>
        <Card className="p-4 text-center">
          <Crown className="w-8 h-8 mx-auto mb-2 text-brand-yellow" />
          <div className="text-2xl font-bold">3</div>
          <div className="text-sm text-muted-foreground">Legendary</div>
        </Card>
        <Card className="p-4 text-center">
          <TrendingUp className="w-8 h-8 mx-auto mb-2 text-brand-cream" />
          <div className="text-2xl font-bold">85%</div>
          <div className="text-sm text-muted-foreground">Completion</div>
        </Card>
      </div>

      {/* Streaks */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Flame className="w-5 h-5 text-brand-orange" />
          Current Streaks
        </h3>
        <div className="space-y-4">
          {streaks.map((streak, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{streak.type}</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    Longest: {streak.longest} days
                  </span>
                  <span className="font-semibold text-brand-orange">
                    {streak.current} days
                  </span>
                </div>
              </div>
              <Progress 
                value={(streak.current / streak.longest) * 100} 
                className="h-2"
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Achievements */}
      <div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="discovery">Discovery</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="live">Live</TabsTrigger>
            <TabsTrigger value="creation">Creation</TabsTrigger>
            <TabsTrigger value="milestone">Milestone</TabsTrigger>
            <TabsTrigger value="streak">Streak</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAchievements.map((achievement) => (
                <Card 
                  key={achievement.id} 
                  className={`p-4 transition-all duration-300 ${
                    achievement.isEarned 
                      ? 'bg-gradient-to-br from-brand-orange/5 to-brand-amber/5 border-brand-orange/20' 
                      : 'opacity-75'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      achievement.isEarned 
                        ? 'bg-brand-orange/10 text-brand-orange' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold truncate">{achievement.title}</h3>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getRarityColor(achievement.rarity)}`}
                        >
                          {getRarityIcon(achievement.rarity)}
                          <span className="ml-1 capitalize">{achievement.rarity}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {achievement.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-brand-orange">
                          {achievement.points} pts
                        </span>
                        {achievement.isEarned ? (
                          <div className="flex items-center gap-1 text-green-600">
                            <Trophy className="w-4 h-4" />
                            <span className="text-xs">Earned</span>
                          </div>
                        ) : achievement.progress ? (
                          <div className="flex items-center gap-2">
                            <Progress 
                              value={(achievement.progress / achievement.maxProgress!) * 100} 
                              className="w-16 h-2"
                            />
                            <span className="text-xs text-muted-foreground">
                              {achievement.progress}/{achievement.maxProgress}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Lock className="w-4 h-4" />
                            <span className="text-xs">Locked</span>
                          </div>
                        )}
                      </div>
                      {achievement.earnedDate && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Earned {new Date(achievement.earnedDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Recent Achievements */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-brand-yellow" />
          Recent Achievements
        </h3>
        <div className="space-y-3">
          {achievements
            .filter(a => a.isEarned)
            .sort((a, b) => new Date(b.earnedDate!).getTime() - new Date(a.earnedDate!).getTime())
            .slice(0, 3)
            .map((achievement) => (
              <div key={achievement.id} className="flex items-center gap-3 p-3 rounded-lg bg-brand-orange/5">
                <div className="p-2 rounded-lg bg-brand-orange/10 text-brand-orange">
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-brand-orange">
                    +{achievement.points} pts
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(achievement.earnedDate!).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Star, 
  Crown, 
  Zap, 
  Music, 
  Play, 
  Pause,
  Heart,
  Share2,
  Users,
  Clock,
  Target,
  Sparkles,
  Flame,
  Award,
  Gift,
  Timer,
  CheckCircle,
  XCircle,
  Volume2,
  VolumeX
} from 'lucide-react';

interface GameSubmission {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  songs: Array<{
    id: string;
    title: string;
    artist: string;
    coverUrl: string;
    duration: string;
  }>;
  votes: number;
  isVoted: boolean;
}

interface ThemeGame {
  id: string;
  title: string;
  description: string;
  theme: string;
  endDate: string;
  submissions: GameSubmission[];
  isActive: boolean;
  mascotMessage: string;
}

interface HiddenGemGame {
  id: string;
  title: string;
  description: string;
  currentRound: number;
  totalRounds: number;
  submissions: Array<{
    id: string;
    title: string;
    artist: string;
    coverUrl: string;
    duration: string;
    votes: number;
    isRevealed: boolean;
  }>;
  isActive: boolean;
  timeLeft: number;
}

export default function EnhancedGames() {
  const [activeGame, setActiveGame] = useState<'theme' | 'hidden'>('theme');
  const [mascotVisible, setMascotVisible] = useState(false);
  const [mascotMessage, setMascotMessage] = useState('');
  const [mascotOutfit, setMascotOutfit] = useState('default');

  // Mock data
  const themeGame: ThemeGame = {
    id: '1',
    title: 'Weekly Theme Challenge',
    description: 'Submit 3 songs that match this week\'s theme!',
    theme: 'Songs That Make You Feel Like a Main Character',
    endDate: '2024-03-22',
    isActive: true,
    mascotMessage: 'Welcome to this week\'s theme challenge! Ready to show off your main character energy? 🎬✨',
    submissions: [
      {
        id: '1',
        user: {
          id: '1',
          name: 'Alex Johnson',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        },
        songs: [
          {
            id: '1',
            title: 'Blinding Lights',
            artist: 'The Weeknd',
            coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
            duration: '3:20'
          },
          {
            id: '2',
            title: 'Levitating',
            artist: 'Dua Lipa',
            coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop',
            duration: '3:23'
          },
          {
            id: '3',
            title: 'Good 4 U',
            artist: 'Olivia Rodrigo',
            coverUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop',
            duration: '2:58'
          }
        ],
        votes: 45,
        isVoted: false
      },
      {
        id: '2',
        user: {
          id: '2',
          name: 'Sarah Chen',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face'
        },
        songs: [
          {
            id: '4',
            title: 'As It Was',
            artist: 'Harry Styles',
            coverUrl: 'https://images.unsplash.com/photo-1629923759854-156b88c433aa?w=400&h=400&fit=crop',
            duration: '2:47'
          },
          {
            id: '5',
            title: 'Anti-Hero',
            artist: 'Taylor Swift',
            coverUrl: 'https://images.unsplash.com/photo-1758273239616-e0f4605c402e?w=400&h=400&fit=crop',
            duration: '3:20'
          },
          {
            id: '6',
            title: 'Flowers',
            artist: 'Miley Cyrus',
            coverUrl: 'https://images.unsplash.com/photo-1573460532456-55c00b654160?w=400&h=400&fit=crop',
            duration: '3:20'
          }
        ],
        votes: 38,
        isVoted: true
      }
    ]
  };

  const hiddenGemGame: HiddenGemGame = {
    id: '2',
    title: 'Hidden Gem Showdown',
    description: 'Discover and vote on the most underrated tracks!',
    currentRound: 3,
    totalRounds: 5,
    isActive: true,
    timeLeft: 120, // 2 minutes
    submissions: [
      {
        id: '1',
        title: 'Midnight City',
        artist: 'M83',
        coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
        duration: '4:03',
        votes: 12,
        isRevealed: true
      },
      {
        id: '2',
        title: 'Breezeblocks',
        artist: 'Alt-J',
        coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop',
        duration: '3:47',
        votes: 8,
        isRevealed: true
      },
      {
        id: '3',
        title: 'Unknown Artist',
        artist: '???',
        coverUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop',
        duration: '3:15',
        votes: 0,
        isRevealed: false
      }
    ]
  };

  const [themeGameData, setThemeGameData] = useState(themeGame);
  const [hiddenGemData, setHiddenGemData] = useState(hiddenGemGame);

  useEffect(() => {
    // Timer for hidden gem game
    const timer = setInterval(() => {
      setHiddenGemData(prev => ({
        ...prev,
        timeLeft: Math.max(0, prev.timeLeft - 1)
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleVote = (submissionId: string, gameType: 'theme' | 'hidden') => {
    if (gameType === 'theme') {
      setThemeGameData(prev => ({
        ...prev,
        submissions: prev.submissions.map(sub => 
          sub.id === submissionId 
            ? { ...sub, isVoted: !sub.isVoted, votes: sub.isVoted ? sub.votes - 1 : sub.votes + 1 }
            : sub
        )
      }));
    } else {
      setHiddenGemData(prev => ({
        ...prev,
        submissions: prev.submissions.map(sub => 
          sub.id === submissionId 
            ? { ...sub, votes: sub.votes + 1 }
            : sub
        )
      }));
    }
    
    showMascot('Great choice! Your vote has been counted! 🎵✨');
  };

  const showMascot = (message: string) => {
    setMascotMessage(message);
    setMascotVisible(true);
    setTimeout(() => setMascotVisible(false), 3000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">

      {/* Game Tabs */}
      <div className="px-6 mb-6 pt-20">
        <Tabs value={activeGame} onValueChange={(value) => setActiveGame(value as any)}>
          <TabsList className="grid w-full grid-cols-2 bg-white border-4 border-black shadow-[4px_4px_0px_0px_#000]">
            <TabsTrigger value="theme" className="flex items-center gap-2 text-black data-[state=active]:bg-black data-[state=active]:text-white">
              <Star className="w-4 h-4" />
              Weekly Theme
            </TabsTrigger>
            <TabsTrigger value="hidden" className="flex items-center gap-2 text-black data-[state=active]:bg-black data-[state=active]:text-white">
              <Zap className="w-4 h-4" />
              Hidden Gems
            </TabsTrigger>
          </TabsList>

          {/* Weekly Theme Game */}
          <TabsContent value="theme" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Theme Header */}
              <Card className="p-6 mb-6 bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000]">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2 text-black">{themeGameData.title}</h2>
                  <p className="text-black/80 mb-4">{themeGameData.description}</p>
                  <Badge className="bg-brand-orange text-white text-lg px-4 py-2 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                    {themeGameData.theme}
                  </Badge>
                  <div className="mt-4 flex items-center justify-center gap-4 text-sm text-black/70">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Ends: {themeGameData.endDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {themeGameData.submissions.length} submissions
                    </div>
                  </div>
                </div>
              </Card>

              {/* Submissions */}
              <div className="space-y-4">
                {themeGameData.submissions.map((submission, index) => (
                  <motion.div
                    key={submission.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Card className="p-4 bg-white border-4 border-black shadow-[4px_4px_0px_0px_#000]">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-brand-orange to-brand-amber rounded-full flex items-center justify-center text-white font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-black">{submission.user.name}</h3>
                          <p className="text-sm text-black/70">@{submission.user.username}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-brand-orange text-white border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                            {submission.votes} votes
                          </Badge>
                          <Button
                            size="sm"
                            onClick={() => handleVote(submission.id, 'theme')}
                            className={`${
                              submission.isVoted 
                                ? 'bg-brand-orange text-white border-2 border-black shadow-[2px_2px_0px_0px_#000]' 
                                : 'bg-white text-black border-2 border-black hover:bg-black/10 shadow-[2px_2px_0px_0px_#000]'
                            }`}
                          >
                            <Heart className={`w-4 h-4 mr-1 ${submission.isVoted ? 'fill-current' : ''}`} />
                            Vote
                          </Button>
                        </div>
                      </div>

                      {/* Songs Grid */}
                      <div className="grid grid-cols-3 gap-3">
                        {submission.songs.map((song) => (
                          <div key={song.id} className="relative group">
                            <div className="aspect-square rounded-lg overflow-hidden border-4 border-black shadow-[2px_2px_0px_0px_#000]">
                              <img
                                src={song.coverUrl}
                                alt={song.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button size="sm" className="w-8 h-8 rounded-full bg-brand-orange text-white border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                                  <Play className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="mt-2 text-center">
                              <p className="text-sm font-medium truncate text-black">{song.title}</p>
                              <p className="text-xs text-black/70 truncate">{song.artist}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Hidden Gem Game */}
          <TabsContent value="hidden" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Game Header */}
              <Card className="p-6 mb-6 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/30">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">{hiddenGemData.title}</h2>
                  <p className="text-white/80 mb-4">{hiddenGemData.description}</p>
                  <div className="flex items-center justify-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Round {hiddenGemData.currentRound}/{hiddenGemData.totalRounds}
                    </div>
                    <div className="flex items-center gap-2">
                      <Timer className="w-4 h-4" />
                      {formatTime(hiddenGemData.timeLeft)}
                    </div>
                  </div>
                  <Progress 
                    value={(hiddenGemData.currentRound / hiddenGemData.totalRounds) * 100} 
                    className="mt-4"
                  />
                </div>
              </Card>

              {/* Submissions */}
              <div className="space-y-4">
                {hiddenGemData.submissions.map((submission, index) => (
                  <motion.div
                    key={submission.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Card className="p-4 bg-white/10 border-white/20">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-white/20">
                          <img
                            src={submission.coverUrl}
                            alt={submission.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{submission.title}</h3>
                          <p className="text-white/70">{submission.artist}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className="bg-brand-orange/20 text-brand-orange border-brand-orange/30">
                              {submission.votes} votes
                            </Badge>
                            {submission.isRevealed && (
                              <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                                Revealed
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleVote(submission.id, 'hidden')}
                            className="bg-brand-orange hover:bg-brand-amber"
                          >
                            <Heart className="w-4 h-4 mr-1" />
                            Vote
                          </Button>
                          <Button variant="outline" size="sm" className="text-white border-white/30">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Mascot Popup */}
      <AnimatePresence>
        {mascotVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="fixed bottom-20 left-4 right-4 z-50"
          >
            <Card className="bg-gradient-to-r from-brand-orange to-brand-amber p-4 border-0">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Music className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold">Otter Mascot</p>
                  <p className="text-white/90 text-sm">{mascotMessage}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMascotVisible(false)}
                  className="text-white hover:bg-white/20"
                >
                  ×
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

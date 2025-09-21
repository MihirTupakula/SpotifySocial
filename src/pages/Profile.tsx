import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Settings, Share, Music, Trophy, Users, Play } from 'lucide-react';

const userProfile = {
  name: 'You',
  username: '@yourmusic',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  bio: 'Music lover • Playlist curator • Always discovering new sounds',
  profileSong: {
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
  },
  stats: {
    challengesWon: 3,
    playlistsCreated: 12,
    totalListens: 1247,
    friends: 89,
  },
  topGenres: ['Pop', 'Rock', 'Electronic', 'Hip Hop', 'Indie'],
  achievements: [
    { id: '1', name: 'First Win', description: 'Won your first daily challenge', earned: true },
    { id: '2', name: 'Playlist Master', description: 'Created 10 playlists', earned: true },
    { id: '3', name: 'Social Butterfly', description: 'Added 50 friends', earned: false },
  ],
};

export default function Profile() {
  return (
    <div className="pb-20 min-h-screen bg-background">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background/80 backdrop-blur-lg p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Profile
            </h1>
            <Button variant="ghost" size="sm">
              <Settings size={20} />
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Profile Header */}
          <Card className="p-6 glass-card text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarImage src={userProfile.avatar} />
              <AvatarFallback className="text-2xl bg-gradient-primary text-white">
                {userProfile.name[0]}
              </AvatarFallback>
            </Avatar>
            
            <h2 className="text-xl font-bold mb-1">{userProfile.name}</h2>
            <p className="text-muted-foreground mb-3">{userProfile.username}</p>
            <p className="text-sm mb-4">{userProfile.bio}</p>
            
            {/* Profile Song */}
            <div className="bg-muted/30 rounded-lg p-3 mb-4">
              <div className="flex items-center justify-center gap-2 text-sm">
                <Music size={16} className="text-accent" />
                <span className="font-medium">{userProfile.profileSong.title}</span>
                <span className="text-muted-foreground">by {userProfile.profileSong.artist}</span>
                <Button size="sm" variant="ghost" className="p-1">
                  <Play size={12} />
                </Button>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              <Share size={16} className="mr-2" />
              Share Profile
            </Button>
          </Card>

          {/* Stats */}
          <Card className="p-4 glass-card">
            <h3 className="font-semibold mb-3">Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Trophy size={16} className="text-accent" />
                  <span className="text-2xl font-bold">{userProfile.stats.challengesWon}</span>
                </div>
                <p className="text-xs text-muted-foreground">Challenges Won</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Music size={16} className="text-primary" />
                  <span className="text-2xl font-bold">{userProfile.stats.playlistsCreated}</span>
                </div>
                <p className="text-xs text-muted-foreground">Playlists Created</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Play size={16} className="text-secondary" />
                  <span className="text-2xl font-bold">{userProfile.stats.totalListens}</span>
                </div>
                <p className="text-xs text-muted-foreground">Total Listens</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Users size={16} className="text-accent" />
                  <span className="text-2xl font-bold">{userProfile.stats.friends}</span>
                </div>
                <p className="text-xs text-muted-foreground">Friends</p>
              </div>
            </div>
          </Card>

          {/* Music DNA */}
          <Card className="p-4 glass-card">
            <h3 className="font-semibold mb-3">Music DNA</h3>
            <div className="flex flex-wrap gap-2">
              {userProfile.topGenres.map((genre, index) => (
                <Badge 
                  key={genre} 
                  variant="secondary" 
                  className={`${index === 0 ? 'bg-accent text-background' : ''}`}
                >
                  {genre}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Achievements */}
          <Card className="p-4 glass-card">
            <h3 className="font-semibold mb-3">Achievements</h3>
            <div className="space-y-3">
              {userProfile.achievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    achievement.earned ? 'bg-accent' : 'bg-muted'
                  }`}>
                    <Trophy size={16} className={achievement.earned ? 'text-background' : 'text-muted-foreground'} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{achievement.name}</p>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
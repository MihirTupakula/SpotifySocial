import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Clock, Users } from 'lucide-react';

const dailyChallenge = {
  theme: "Songs for a rainy day",
  participants: 47,
  timeLeft: "6h 23m",
  isActive: true,
};

const pastChallenges = [
  {
    id: '1',
    theme: 'Autumn vibes',
    winner: 'Sarah Wilson',
    participants: 34,
    completed: true,
  },
  {
    id: '2',
    theme: 'Workout motivation',
    winner: 'Mike Johnson',
    participants: 28,
    completed: true,
  },
];

export default function Games() {
  return (
    <div className="pb-20 min-h-screen bg-background">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background/80 backdrop-blur-lg p-4 border-b border-border">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Games
          </h1>
        </div>

        <div className="p-4 space-y-6">
          {/* Daily Challenge */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="text-accent" size={20} />
              <h2 className="text-lg font-semibold">Daily Challenge</h2>
            </div>
            
            <Card className="p-6 glass-card hover:scale-[1.02] transition-all duration-300">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold mb-2">{dailyChallenge.theme}</h3>
                <p className="text-muted-foreground">
                  Create a 5-song playlist that captures the perfect rainy day mood
                </p>
              </div>
              
              <div className="flex items-center justify-center gap-6 mb-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>{dailyChallenge.participants} joined</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>{dailyChallenge.timeLeft} left</span>
                </div>
              </div>
              
              <Button className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">
                Join Challenge
              </Button>
            </Card>
          </div>

          {/* Challenge History */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Challenge History</h2>
            <div className="space-y-3">
              {pastChallenges.map((challenge) => (
                <Card key={challenge.id} className="p-4 glass-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{challenge.theme}</h3>
                      <p className="text-sm text-muted-foreground">
                        Winner: {challenge.winner}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="mb-1">
                        {challenge.participants} participants
                      </Badge>
                      <p className="text-xs text-muted-foreground">Completed</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Your Stats */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Your Stats</h2>
            <Card className="p-4 glass-card">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-accent">3</p>
                  <p className="text-xs text-muted-foreground">Challenges Won</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">12</p>
                  <p className="text-xs text-muted-foreground">Challenges Joined</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-secondary">89</p>
                  <p className="text-xs text-muted-foreground">Total Votes</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
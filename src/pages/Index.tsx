import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SpotifyLoginButton } from '@/components/landing/SpotifyLoginButton';
import { useAuth } from '@/contexts/AuthContext';
import { Music, Users, Trophy, MessageCircle, Sparkles } from 'lucide-react';

const Index = () => {
  console.log('Index component rendering...');
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  
  console.log('Index - isAuthenticated:', isAuthenticated, 'isLoading:', isLoading);

  useEffect(() => {
    console.log('Index useEffect - isAuthenticated changed:', isAuthenticated);
    if (isAuthenticated) {
      console.log('Index: User is authenticated, navigating to /app');
      navigate('/app');
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 mx-auto mb-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8 text-center">
          {/* Logo/Brand */}
          <div className="space-y-4">
            <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-2xl flex items-center justify-center float-animation">
              <Music size={40} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              SoundSpace
            </h1>
            <p className="text-lg text-muted-foreground">
              The social network for music lovers
            </p>
          </div>

          {/* Features Preview */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 glass-card text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-accent" />
              <h3 className="font-semibold text-sm">Share Music</h3>
              <p className="text-xs text-muted-foreground">Connect with friends through music</p>
            </Card>
            <Card className="p-4 glass-card text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold text-sm">Daily Challenges</h3>
              <p className="text-xs text-muted-foreground">Compete in playlist contests</p>
            </Card>
            <Card className="p-4 glass-card text-center">
              <MessageCircle className="w-8 h-8 mx-auto mb-2 text-secondary" />
              <h3 className="font-semibold text-sm">Music Chat</h3>
              <p className="text-xs text-muted-foreground">Send songs in messages</p>
            </Card>
            <Card className="p-4 glass-card text-center">
              <Sparkles className="w-8 h-8 mx-auto mb-2 text-accent" />
              <h3 className="font-semibold text-sm">Discover</h3>
              <p className="text-xs text-muted-foreground">Find new music through friends</p>
            </Card>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <SpotifyLoginButton />
            <p className="text-xs text-muted-foreground">
              Connect your Spotify account to get started
            </p>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="h-32 bg-gradient-to-t from-accent/10 to-transparent" />
    </div>
  );
};

export default Index;

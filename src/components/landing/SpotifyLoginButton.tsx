import { Button } from '@/components/ui/button';
import { Music } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface SpotifyLoginButtonProps {
  onLogin?: () => void;
}

export function SpotifyLoginButton({ onLogin }: SpotifyLoginButtonProps) {
  const { login } = useAuth();

  const handleSpotifyLogin = () => {
    login();
    // Call the optional callback if provided
    if (onLogin) {
      onLogin();
    }
  };

  return (
    <Button 
      onClick={handleSpotifyLogin}
      className="w-full bg-gradient-primary hover:opacity-90 transition-all duration-300 text-white font-semibold py-3 px-6 text-lg shadow-lg hover:shadow-xl"
      size="lg"
    >
      <Music className="mr-3" size={24} />
      Connect with Spotify
    </Button>
  );
}
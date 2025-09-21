import { Button } from '@/components/ui/button';
import { Music } from 'lucide-react';

interface SpotifyLoginButtonProps {
  onLogin: () => void;
}

export function SpotifyLoginButton({ onLogin }: SpotifyLoginButtonProps) {
  const handleSpotifyLogin = () => {
    // TODO: Implement actual Spotify OAuth once Supabase is connected
    // For now, just simulate login
    onLogin();
  };

  return (
    <Button 
      onClick={handleSpotifyLogin}
      className="w-full bg-gradient-secondary hover:opacity-90 transition-all duration-300 text-white font-semibold py-3 px-6 text-lg"
      size="lg"
    >
      <Music className="mr-3" size={24} />
      Connect with Spotify
    </Button>
  );
}
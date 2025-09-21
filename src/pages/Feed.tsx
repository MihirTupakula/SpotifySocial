import { MusicCard } from '@/components/music/MusicCard';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

// Mock data - will be replaced with real Spotify data
const mockSongs = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    user: {
      name: 'Alex Chen',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    },
    likes: 24,
    comments: 5,
    isLiked: false,
  },
  {
    id: '2',
    title: 'Good 4 U',
    artist: 'Olivia Rodrigo',
    albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop',
    user: {
      name: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612c0c1?w=100&h=100&fit=crop',
    },
    likes: 18,
    comments: 3,
    isLiked: true,
  },
  {
    id: '3',
    title: 'Levitating',
    artist: 'Dua Lipa',
    albumArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
    user: {
      name: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
    likes: 32,
    comments: 8,
    isLiked: false,
  },
];

export default function Feed() {
  return (
    <div className="pb-20 min-h-screen bg-background">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background/80 backdrop-blur-lg p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Feed
            </h1>
            <Button variant="ghost" size="sm">
              <Filter size={20} />
            </Button>
          </div>
        </div>

        {/* Feed content */}
        <div className="p-4 space-y-4">
          {mockSongs.map((song) => (
            <MusicCard key={song.id} song={song} />
          ))}
        </div>
      </div>
    </div>
  );
}
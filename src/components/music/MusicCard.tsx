import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share, Play, Pause } from 'lucide-react';
import { useState } from 'react';

interface MusicCardProps {
  song: {
    id: string;
    title: string;
    artist: string;
    albumArt: string;
    user: {
      name: string;
      avatar: string;
    };
    likes: number;
    comments: number;
    isLiked?: boolean;
  };
}

export function MusicCard({ song }: MusicCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(song.isLiked || false);
  const [likes, setLikes] = useState(song.likes);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <Card className="p-4 glass-card hover:scale-[1.02] transition-all duration-300">
      {/* User header */}
      <div className="flex items-center gap-3 mb-3">
        <Avatar className="w-8 h-8">
          <AvatarImage src={song.user.avatar} />
          <AvatarFallback>{song.user.name[0]}</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium text-foreground">{song.user.name}</span>
      </div>

      {/* Album art and song info */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative group">
          <img 
            src={song.albumArt} 
            alt={`${song.title} album art`}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <Button
            size="sm"
            variant="secondary"
            className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            onClick={handlePlayPause}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </Button>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{song.title}</h3>
          <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
        </div>
      </div>

      {/* Audio wave visualization (mock) */}
      {isPlaying && (
        <div className="flex items-center gap-1 mb-4 px-2">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="w-1 bg-accent wave-animation rounded-full"
              style={{ 
                animationDelay: `${i * 0.1}s`,
                height: Math.random() * 20 + 8 + 'px' 
              }}
            />
          ))}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`${isLiked ? 'text-red-500' : 'text-muted-foreground'} hover:text-red-500`}
          >
            <Heart size={16} className={isLiked ? 'fill-current' : ''} />
            <span className="ml-1 text-sm">{likes}</span>
          </Button>
          
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <MessageCircle size={16} />
            <span className="ml-1 text-sm">{song.comments}</span>
          </Button>
        </div>
        
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <Share size={16} />
        </Button>
      </div>
    </Card>
  );
}
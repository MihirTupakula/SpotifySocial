import { useState, useMemo } from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Heart, MessageCircle, Play, Pause, Share, MoreHorizontal, Headphones } from "lucide-react";
import { ImageWithFallback } from "../ui/image-with-fallback";
import { usePlayer } from "@/contexts/PlayerContext";

interface SongCardProps {
  song: {
    id: string;
    title: string;
    artist: string;
    album: string;
    coverUrl: string;
    duration: string;
    uri: string;
    sharedBy: {
      username: string;
      avatar: string;
    };
    source: "friend" | "artist" | "recommended" | "recent" | "top" | "followed" | "country";
    likes: number;
    comments: number;
    isLiked: boolean;
    timestamp: string;
  };
  onLike: (id: string) => void;
  onComment: (id: string) => void;
  onShare: (id: string) => void;
}

export function SongCard({ song, onLike, onComment, onShare }: SongCardProps) {
  const { playTrack, isPlaying, currentTrack, isReady } = usePlayer();
  const [isLocalPlaying, setIsLocalPlaying] = useState(false);

  // Generate random variations for each card based on song ID
  const cardVariations = useMemo(() => {
    const hash = song.id.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const random = (seed: number) => Math.abs(Math.sin(seed)) * 10000 % 1;
    
    return {
      rotation: (random(hash) - 0.5) * 4, // -2 to +2 degrees
      scale: 0.95 + random(hash + 1) * 0.1, // 0.95 to 1.05
      aspectRatio: random(hash + 2) > 0.7 ? 'aspect-[4/5]' : 'aspect-square', // Some taller cards
      size: random(hash + 3) > 0.8 ? 'large' : 'normal', // Some larger cards
      animationDelay: random(hash + 4) * 500, // 0-500ms delay
    };
  }, [song.id]);

  const handlePlayPause = () => {
    console.log('SongCard handlePlayPause called for:', song.title);
    console.log('Song URI:', song.uri);
    
    // Convert song data to SpotifyTrack format
    const spotifyTrack = {
      id: song.id,
      name: song.title,
      artists: [{ name: song.artist }],
      album: {
        name: song.album,
        images: [{ url: song.coverUrl }]
      },
      duration_ms: parseDurationToMs(song.duration),
      uri: song.uri,
      preview_url: null // We'll use the full track playback
    };
    
    console.log('Converted to SpotifyTrack:', spotifyTrack);
    
    // Call playTrack from PlayerContext
    playTrack(spotifyTrack);
  };

  // Helper function to convert duration string to milliseconds
  const parseDurationToMs = (duration: string): number => {
    const parts = duration.split(':');
    if (parts.length === 2) {
      const minutes = parseInt(parts[0], 10);
      const seconds = parseInt(parts[1], 10);
      return (minutes * 60 + seconds) * 1000;
    }
    return 0;
  };

  const getSourceBadge = (source: string) => {
    switch (source) {
      case "friend":
        return <Badge variant="secondary" className="text-xs bg-brand-cream/20 text-brand-orange border-brand-orange/30">Friend</Badge>;
      case "artist":
      case "followed":
        return <Badge variant="secondary" className="text-xs bg-brand-yellow/20 text-brand-amber border-brand-amber/30">Artist</Badge>;
      case "recommended":
        return <Badge variant="secondary" className="text-xs bg-brand-orange/20 text-brand-yellow border-brand-yellow/30">For You</Badge>;
      case "recent":
        return <Badge variant="secondary" className="text-xs bg-brand-amber/20 text-brand-orange border-brand-orange/30">Recent</Badge>;
      case "top":
        return <Badge variant="secondary" className="text-xs bg-brand-yellow/20 text-brand-orange border-brand-orange/30">Top</Badge>;
      case "country":
        return <Badge variant="secondary" className="text-xs bg-brand-orange/20 text-brand-amber border-brand-amber/30">Trending</Badge>;
      default:
        return null;
    }
  };

  const cardSize = cardVariations.size === 'large' ? 'col-span-1 row-span-2' : '';

  return (
    <div 
      className={`group bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-border transition-all duration-300 hover:shadow-xl break-inside-avoid ${cardSize}`}
      style={{
        transform: `rotate(${cardVariations.rotation}deg) scale(${cardVariations.scale})`,
        animationDelay: `${cardVariations.animationDelay}ms`,
        transformOrigin: 'center',
      }}
    >
      {/* Large Album Art */}
      <div className={`relative ${cardVariations.aspectRatio}`}>
        <ImageWithFallback
          src={song.coverUrl}
          alt={`${song.album} cover`}
          className="w-full h-full object-cover"
        />
        
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Button
                size="lg"
                onClick={handlePlayPause}
                disabled={!isReady}
                className="w-16 h-16 rounded-full bg-brand-orange hover:bg-brand-amber text-white border-0 shadow-lg transform hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                title={!isReady ? "Player not ready" : isPlaying && currentTrack?.id === song.id ? "Pause" : "Play"}
              >
                {isPlaying && currentTrack?.id === song.id ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Play className="w-8 h-8 ml-1" />
                )}
              </Button>
            </div>

        {/* Playing indicator */}
        {isPlaying && currentTrack?.id === song.id && (
          <div className="absolute top-3 right-3 w-8 h-8 bg-brand-yellow rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <Headphones className="w-4 h-4 text-brand-orange" />
          </div>
        )}

        {/* Source Badge */}
        <div className="absolute top-3 left-3">
          {getSourceBadge(song.source)}
        </div>
      </div>

      {/* Card Content */}
      <div className={`p-4 space-y-3 ${cardVariations.size === 'large' ? 'p-5 space-y-4' : ''}`}>
        {/* Song Info */}
        <div className="space-y-1">
          <h3 className={`font-semibold text-foreground leading-tight ${cardVariations.size === 'large' ? 'text-lg' : ''}`}>
            {song.title}
          </h3>
          <p className={`text-muted-foreground ${cardVariations.size === 'large' ? 'text-base' : 'text-sm'}`}>
            {song.artist}
          </p>
          <p className={`text-muted-foreground ${cardVariations.size === 'large' ? 'text-sm' : 'text-xs'}`}>
            {song.album} • {song.duration}
          </p>
        </div>

        {/* User Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className={cardVariations.size === 'large' ? 'w-8 h-8' : 'w-6 h-6'}>
              <AvatarImage src={song.sharedBy.avatar} />
              <AvatarFallback className="text-xs">{song.sharedBy.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className={`text-muted-foreground ${cardVariations.size === 'large' ? 'text-base' : 'text-sm'}`}>
              {song.sharedBy.username}
            </span>
          </div>
          <span className={`text-muted-foreground ${cardVariations.size === 'large' ? 'text-sm' : 'text-xs'}`}>
            {song.timestamp}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onLike(song.id)}
                  className={`${cardVariations.size === 'large' ? 'h-9 px-4' : 'h-8 px-3'} gap-1.5 rounded-full ${
                    song.isLiked 
                      ? "text-brand-orange bg-brand-orange/10 hover:bg-brand-orange/20" 
                      : "text-muted-foreground hover:text-brand-orange hover:bg-brand-orange/10"
                  }`}
                >
              <Heart className={`${cardVariations.size === 'large' ? 'w-5 h-5' : 'w-4 h-4'} ${song.isLiked ? "fill-current" : ""}`} />
              <span className="text-xs">{song.likes}</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onComment(song.id)}
              className={`${cardVariations.size === 'large' ? 'h-9 px-4' : 'h-8 px-3'} gap-1.5 rounded-full text-muted-foreground hover:text-brand-amber hover:bg-brand-amber/10`}
            >
              <MessageCircle className={cardVariations.size === 'large' ? 'w-5 h-5' : 'w-4 h-4'} />
              <span className="text-xs">{song.comments}</span>
            </Button>
          </div>
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onShare(song.id)}
              className={`${cardVariations.size === 'large' ? 'h-9 w-9' : 'h-8 w-8'} p-0 rounded-full text-muted-foreground hover:text-brand-yellow hover:bg-brand-yellow/10`}
            >
              <Share className={cardVariations.size === 'large' ? 'w-5 h-5' : 'w-4 h-4'} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`${cardVariations.size === 'large' ? 'h-9 w-9' : 'h-8 w-8'} p-0 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted opacity-0 group-hover:opacity-100 transition-opacity`}
            >
              <MoreHorizontal className={cardVariations.size === 'large' ? 'w-5 h-5' : 'w-4 h-4'} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

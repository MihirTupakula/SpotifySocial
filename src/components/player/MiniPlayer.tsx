import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react';
import { usePlayer } from '@/contexts/PlayerContext';

export function MiniPlayer() {
  const {
    isReady,
    isPlaying,
    currentTrack,
    position,
    duration,
    volume,
    togglePlay,
    seek,
    setVolume,
    nextTrack,
    previousTrack
  } = usePlayer();

  if (!isReady || !currentTrack) {
    return null;
  }

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (value: number[]) => {
    const newPosition = value[0] * duration;
    seek(newPosition);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  return (
    <Card className="w-full bg-white/90 backdrop-blur-sm border-4 border-black shadow-[4px_4px_0px_0px_#000]">
      <div className="flex items-center gap-4 p-4">
        {/* Album Art */}
        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
          <img
            src={currentTrack.album?.images?.[0]?.url || '/placeholder-album.png'}
            alt={currentTrack.album?.name || 'Unknown Album'}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Track Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm truncate text-black">{currentTrack.name}</h4>
          <p className="text-xs text-black/70 truncate">
            {currentTrack.artists?.map(artist => artist.name).join(', ') || 'Unknown Artist'}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex-1 max-w-xs">
          <div className="flex items-center gap-2 text-xs text-black/70">
            <span>{formatTime(position)}</span>
            <Slider
              value={[duration > 0 ? position / duration : 0]}
              onValueChange={handleSeek}
              max={1}
              step={0.01}
              className="flex-1"
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={previousTrack}
            className="h-8 w-8 p-0 text-black hover:bg-black/10 border-2 border-black shadow-[2px_2px_0px_0px_#000]"
          >
            <SkipBack size={16} />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={togglePlay}
            className="h-8 w-8 p-0 bg-brand-orange hover:bg-brand-amber text-white border-2 border-black shadow-[2px_2px_0px_0px_#000]"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={nextTrack}
            className="h-8 w-8 p-0 text-black hover:bg-black/10 border-2 border-black shadow-[2px_2px_0px_0px_#000]"
          >
            <SkipForward size={16} />
          </Button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2 w-24">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setVolume(volume > 0 ? 0 : 50)}
            className="h-6 w-6 p-0 text-black hover:bg-black/10 border-2 border-black shadow-[2px_2px_0px_0px_#000]"
          >
            {volume > 0 ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </Button>
          <Slider
            value={[volume]}
            onValueChange={handleVolumeChange}
            max={100}
            step={1}
            className="flex-1"
          />
        </div>
      </div>
    </Card>
  );
}

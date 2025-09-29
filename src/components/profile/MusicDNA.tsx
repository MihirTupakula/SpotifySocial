import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Users, 
  Star, 
  Zap,
  Music,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

interface GenreData {
  name: string;
  percentage: number;
  color: string;
  rarity: number;
}

interface ArtistData {
  name: string;
  plays: number;
  percentage: number;
  color: string;
}

export function MusicDNA() {
  const [timeRange, setTimeRange] = useState<'month' | '6months' | 'alltime'>('month');
  const [viewMode, setViewMode] = useState<'strand' | 'chart' | 'heatmap'>('strand');

  // Mock data - in real app, this would come from Spotify API
  const genreData: GenreData[] = useMemo(() => [
    { name: 'Indie Rock', percentage: 35, color: '#FF7900', rarity: 85 },
    { name: 'Pop', percentage: 25, color: '#FFBF00', rarity: 45 },
    { name: 'Electronic', percentage: 20, color: '#FFE642', rarity: 70 },
    { name: 'Hip Hop', percentage: 15, color: '#F2CF7E', rarity: 60 },
    { name: 'Jazz', percentage: 5, color: '#FF9500', rarity: 95 }
  ], []);

  const artistData: ArtistData[] = useMemo(() => [
    { name: 'The Weeknd', plays: 89, percentage: 12, color: '#FF7900' },
    { name: 'Arctic Monkeys', plays: 76, percentage: 10, color: '#FFBF00' },
    { name: 'Daft Punk', plays: 65, percentage: 9, color: '#FFE642' },
    { name: 'Kendrick Lamar', plays: 54, percentage: 7, color: '#F2CF7E' },
    { name: 'Tame Impala', plays: 43, percentage: 6, color: '#FF9500' }
  ], []);

  const rarityScore = useMemo(() => {
    return Math.round(genreData.reduce((acc, genre) => acc + genre.rarity, 0) / genreData.length);
  }, [genreData]);

  const renderDNAStrand = () => (
    <div className="relative h-64 overflow-hidden">
      <svg viewBox="0 0 400 200" className="w-full h-full">
        {/* DNA Helix */}
        <defs>
          <linearGradient id="dnaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            {genreData.map((genre, index) => (
              <stop 
                key={genre.name}
                offset={`${index * (100 / genreData.length)}%`} 
                stopColor={genre.color} 
              />
            ))}
          </linearGradient>
        </defs>
        
        {/* Helix curves */}
        <path
          d="M 50 50 Q 100 30 150 50 Q 200 70 250 50 Q 300 30 350 50"
          stroke="url(#dnaGradient)"
          strokeWidth="8"
          fill="none"
          className="animate-pulse"
        />
        <path
          d="M 50 150 Q 100 130 150 150 Q 200 170 250 150 Q 300 130 350 150"
          stroke="url(#dnaGradient)"
          strokeWidth="8"
          fill="none"
          className="animate-pulse"
          style={{ animationDelay: '0.5s' }}
        />
        
        {/* Connecting lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={i}
            x1={50 + (i * 40)}
            y1={50 + Math.sin(i * 0.5) * 20}
            x2={50 + (i * 40)}
            y2={150 + Math.sin(i * 0.5) * 20}
            stroke="url(#dnaGradient)"
            strokeWidth="2"
            opacity="0.6"
          />
        ))}
        
        {/* Genre markers */}
        {genreData.map((genre, index) => (
          <circle
            key={genre.name}
            cx={50 + (index * 40)}
            cy={50 + Math.sin(index * 0.5) * 20}
            r="6"
            fill={genre.color}
            className="animate-bounce"
            style={{ animationDelay: `${index * 0.2}s` }}
          />
        ))}
      </svg>
    </div>
  );

  const renderChart = () => (
    <div className="space-y-4">
      {genreData.map((genre, index) => (
        <div key={genre.name} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium">{genre.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{genre.percentage}%</span>
              <Badge 
                variant="outline" 
                className={`text-xs ${
                  genre.rarity > 80 ? 'border-brand-orange text-brand-orange' :
                  genre.rarity > 60 ? 'border-brand-amber text-brand-amber' :
                  'border-brand-yellow text-brand-yellow'
                }`}
              >
                {genre.rarity}% rare
              </Badge>
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div
              className="h-3 rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${genre.percentage}%`,
                backgroundColor: genre.color,
                animationDelay: `${index * 0.1}s`
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderHeatmap = () => (
    <div className="grid grid-cols-7 gap-1">
      {Array.from({ length: 84 }).map((_, i) => {
        const intensity = Math.random();
        const genre = genreData[Math.floor(Math.random() * genreData.length)];
        return (
          <div
            key={i}
            className="aspect-square rounded-sm transition-all duration-300 hover:scale-110"
            style={{
              backgroundColor: genre.color,
              opacity: intensity * 0.8 + 0.2
            }}
          />
        );
      })}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Music DNA</h2>
          <p className="text-muted-foreground">Your unique musical fingerprint</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-brand-orange/10 text-brand-orange border-brand-orange/30">
            <Star className="w-3 h-3 mr-1" />
            {rarityScore}% Unique
          </Badge>
        </div>
      </div>

      {/* Time Range Selector */}
      <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="month">Last Month</TabsTrigger>
          <TabsTrigger value="6months">6 Months</TabsTrigger>
          <TabsTrigger value="alltime">All Time</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* View Mode Selector */}
      <div className="flex gap-2">
        <Button
          variant={viewMode === 'strand' ? 'default' : 'outline'}
          onClick={() => setViewMode('strand')}
          className="flex items-center gap-2"
        >
          <Activity className="w-4 h-4" />
          DNA Strand
        </Button>
        <Button
          variant={viewMode === 'chart' ? 'default' : 'outline'}
          onClick={() => setViewMode('chart')}
          className="flex items-center gap-2"
        >
          <BarChart3 className="w-4 h-4" />
          Chart
        </Button>
        <Button
          variant={viewMode === 'heatmap' ? 'default' : 'outline'}
          onClick={() => setViewMode('heatmap')}
          className="flex items-center gap-2"
        >
          <PieChart className="w-4 h-4" />
          Heatmap
        </Button>
      </div>

      {/* DNA Visualization */}
      <Card className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Genre Breakdown</h3>
          <p className="text-sm text-muted-foreground">
            Your musical taste over the {timeRange === 'month' ? 'last month' : timeRange === '6months' ? 'last 6 months' : 'all time'}
          </p>
        </div>
        
        {viewMode === 'strand' && renderDNAStrand()}
        {viewMode === 'chart' && renderChart()}
        {viewMode === 'heatmap' && renderHeatmap()}
      </Card>

      {/* Top Artists */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Top Artists</h3>
        <div className="space-y-3">
          {artistData.map((artist, index) => (
            <div key={artist.name} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-sm">
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="font-medium">{artist.name}</p>
                <p className="text-sm text-muted-foreground">{artist.plays} plays</p>
              </div>
              <div className="w-16 bg-muted rounded-full h-2">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${artist.percentage}%`,
                    backgroundColor: artist.color
                  }}
                />
              </div>
              <span className="text-sm font-medium w-12 text-right">{artist.percentage}%</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Comparison Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-brand-amber" />
            Friend Matches
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">@alex_music</span>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-muted rounded-full h-2">
                  <div className="h-2 rounded-full bg-brand-orange" style={{ width: '87%' }} />
                </div>
                <span className="text-sm font-medium">87%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">@summer_vibes</span>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-muted rounded-full h-2">
                  <div className="h-2 rounded-full bg-brand-amber" style={{ width: '72%' }} />
                </div>
                <span className="text-sm font-medium">72%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">@music_bot</span>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-muted rounded-full h-2">
                  <div className="h-2 rounded-full bg-brand-yellow" style={{ width: '65%' }} />
                </div>
                <span className="text-sm font-medium">65%</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-brand-yellow" />
            Global Comparison
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Indie Rock</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Global: 15%</span>
                <span className="text-sm font-medium text-brand-orange">You: 35%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Jazz</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Global: 3%</span>
                <span className="text-sm font-medium text-brand-orange">You: 5%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Electronic</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Global: 12%</span>
                <span className="text-sm font-medium text-brand-orange">You: 20%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

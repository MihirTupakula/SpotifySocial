import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  Music, 
  Play, 
  Pause, 
  Share2, 
  Download, 
  MoreHorizontal,
  Star,
  Clock,
  Users,
  Plus,
  Pin,
  PinOff
} from 'lucide-react';
import { usePlayer } from '@/contexts/PlayerContext';

interface FavoriteSong {
  id: string;
  name: string;
  artist: string;
  album: string;
  duration: string;
  coverUrl: string;
  addedDate: string;
  isPinned: boolean;
  playCount: number;
}

interface FavoriteArtist {
  id: string;
  name: string;
  imageUrl: string;
  followers: number;
  genres: string[];
  topTracks: number;
  isPinned: boolean;
}

interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  trackCount: number;
  duration: string;
  isPublic: boolean;
  isPinned: boolean;
  createdDate: string;
  followers: number;
}

export function FavoritesSection() {
  const { playTrack, isPlaying, currentTrack } = usePlayer();
  const [activeTab, setActiveTab] = useState('songs');

  // Mock data
  const favoriteSongs: FavoriteSong[] = [
    {
      id: '1',
      name: 'Bohemian Rhapsody',
      artist: 'Queen',
      album: 'A Night at the Opera',
      duration: '5:55',
      coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
      addedDate: '2024-03-15',
      isPinned: true,
      playCount: 127
    },
    {
      id: '2',
      name: 'Blinding Lights',
      artist: 'The Weeknd',
      album: 'After Hours',
      duration: '3:20',
      coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop',
      addedDate: '2024-03-10',
      isPinned: true,
      playCount: 89
    },
    {
      id: '3',
      name: 'Do I Wanna Know?',
      artist: 'Arctic Monkeys',
      album: 'AM',
      duration: '4:32',
      coverUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop',
      addedDate: '2024-03-05',
      isPinned: false,
      playCount: 76
    }
  ];

  const favoriteArtists: FavoriteArtist[] = [
    {
      id: '1',
      name: 'The Weeknd',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      followers: 50000000,
      genres: ['R&B', 'Pop', 'Alternative'],
      topTracks: 12,
      isPinned: true
    },
    {
      id: '2',
      name: 'Arctic Monkeys',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      followers: 15000000,
      genres: ['Indie Rock', 'Alternative'],
      topTracks: 8,
      isPinned: true
    },
    {
      id: '3',
      name: 'Daft Punk',
      imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=400&h=400&fit=crop&crop=face',
      followers: 8000000,
      genres: ['Electronic', 'House'],
      topTracks: 15,
      isPinned: false
    }
  ];

  const playlists: Playlist[] = [
    {
      id: '1',
      name: 'Summer Vibes',
      description: 'Perfect songs for sunny days and warm nights',
      coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
      trackCount: 45,
      duration: '2h 34m',
      isPublic: true,
      isPinned: true,
      createdDate: '2024-03-01',
      followers: 23
    },
    {
      id: '2',
      name: 'Workout Energy',
      description: 'High-energy tracks to fuel your workouts',
      coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop',
      trackCount: 32,
      duration: '1h 45m',
      isPublic: true,
      isPinned: false,
      createdDate: '2024-02-15',
      followers: 67
    },
    {
      id: '3',
      name: 'Chill Evening',
      description: 'Relaxing songs for quiet moments',
      coverUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop',
      trackCount: 28,
      duration: '1h 32m',
      isPublic: false,
      isPinned: false,
      createdDate: '2024-02-01',
      followers: 5
    }
  ];

  const handlePlaySong = (song: FavoriteSong) => {
    const spotifyTrack = {
      id: song.id,
      name: song.name,
      artists: [{ name: song.artist }],
      album: {
        name: song.album,
        images: [{ url: song.coverUrl }]
      },
      duration_ms: parseDurationToMs(song.duration),
      uri: `spotify:track:${song.id}`,
      preview_url: null
    };
    playTrack(spotifyTrack);
  };

  const parseDurationToMs = (duration: string): number => {
    const parts = duration.split(':');
    if (parts.length === 2) {
      const minutes = parseInt(parts[0], 10);
      const seconds = parseInt(parts[1], 10);
      return (minutes * 60 + seconds) * 1000;
    }
    return 0;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatFollowers = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Favorites</h2>
          <p className="text-muted-foreground">Your most loved music</p>
        </div>
        <Button className="bg-brand-orange hover:bg-brand-amber">
          <Plus className="w-4 h-4 mr-2" />
          Add Favorites
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="songs" className="flex items-center gap-2">
            <Music className="w-4 h-4" />
            Songs
          </TabsTrigger>
          <TabsTrigger value="artists" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Artists
          </TabsTrigger>
          <TabsTrigger value="playlists" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Playlists
          </TabsTrigger>
        </TabsList>

        {/* Songs Tab */}
        <TabsContent value="songs" className="space-y-4">
          {favoriteSongs.map((song) => (
            <Card key={song.id} className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={song.coverUrl}
                    alt={song.album}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold truncate">{song.name}</h3>
                    {song.isPinned && (
                      <Pin className="w-4 h-4 text-brand-orange" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{song.artist} • {song.album}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                    <span>{song.duration}</span>
                    <span>{song.playCount} plays</span>
                    <span>Added {formatDate(song.addedDate)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => handlePlaySong(song)}
                    className="bg-brand-orange hover:bg-brand-amber"
                  >
                    {isPlaying && currentTrack?.id === song.id ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        {/* Artists Tab */}
        <TabsContent value="artists" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteArtists.map((artist) => (
              <Card key={artist.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={artist.imageUrl}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold truncate">{artist.name}</h3>
                      {artist.isPinned && (
                        <Pin className="w-4 h-4 text-brand-orange" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {formatFollowers(artist.followers)} followers
                    </p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {artist.genres.map((genre) => (
                        <Badge key={genre} variant="outline" className="text-xs">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {artist.topTracks} top tracks
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Playlists Tab */}
        <TabsContent value="playlists" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {playlists.map((playlist) => (
              <Card key={playlist.id} className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={playlist.coverUrl}
                      alt={playlist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold truncate">{playlist.name}</h3>
                      {playlist.isPinned && (
                        <Pin className="w-4 h-4 text-brand-orange" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {playlist.description}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{playlist.trackCount} tracks</span>
                    <span className="text-muted-foreground">{playlist.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span className="text-muted-foreground">{playlist.followers} followers</span>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={playlist.isPublic ? 'text-green-600 border-green-600' : 'text-muted-foreground'}
                    >
                      {playlist.isPublic ? 'Public' : 'Private'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <Button size="sm" className="flex-1 bg-brand-orange hover:bg-brand-amber">
                      <Play className="w-4 h-4 mr-1" />
                      Play
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

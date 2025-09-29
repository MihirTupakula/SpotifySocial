import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Camera, 
  Video, 
  Music, 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal,
  Play,
  Pause,
  Lock,
  Globe,
  Users,
  Plus,
  Calendar,
  MapPin,
  Star
} from 'lucide-react';

interface GalleryItem {
  id: string;
  type: 'photo' | 'video' | 'audio' | 'reaction';
  title: string;
  description: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  duration?: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isPublic: boolean;
  createdAt: string;
  tags: string[];
  location?: string;
  event?: string;
}

export function SocialGallery() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Mock gallery data
  const galleryItems: GalleryItem[] = [
    {
      id: '1',
      type: 'photo',
      title: 'Taylor Swift Concert',
      description: 'Amazing night at Madison Square Garden! The energy was incredible.',
      mediaUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
      likes: 24,
      comments: 8,
      shares: 3,
      isLiked: true,
      isPublic: true,
      createdAt: '2024-03-15',
      tags: ['concert', 'taylor-swift', 'live-music'],
      location: 'Madison Square Garden',
      event: 'Taylor Swift - The Eras Tour'
    },
    {
      id: '2',
      type: 'video',
      title: 'Cover: Blinding Lights',
      description: 'Tried my hand at The Weeknd\'s hit song!',
      mediaUrl: 'https://example.com/video1.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop',
      duration: '3:24',
      likes: 67,
      comments: 12,
      shares: 15,
      isLiked: false,
      isPublic: true,
      createdAt: '2024-03-10',
      tags: ['cover', 'the-weeknd', 'singing']
    },
    {
      id: '3',
      type: 'audio',
      title: 'My Music Reaction',
      description: 'First time hearing this song - absolutely blown away!',
      mediaUrl: 'https://example.com/audio1.mp3',
      thumbnailUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=600&fit=crop',
      duration: '2:15',
      likes: 34,
      comments: 6,
      shares: 8,
      isLiked: true,
      isPublic: false,
      createdAt: '2024-03-08',
      tags: ['reaction', 'discovery', 'new-music']
    },
    {
      id: '4',
      type: 'photo',
      title: 'Vinyl Collection',
      description: 'Just added these gems to my collection!',
      mediaUrl: 'https://images.unsplash.com/photo-1573460532456-55c00b654160?w=800&h=600&fit=crop',
      likes: 89,
      comments: 23,
      shares: 12,
      isLiked: false,
      isPublic: true,
      createdAt: '2024-03-05',
      tags: ['vinyl', 'collection', 'records']
    },
    {
      id: '5',
      type: 'reaction',
      title: 'Concert Selfie',
      description: 'Best night ever at the Arctic Monkeys show!',
      mediaUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
      likes: 156,
      comments: 34,
      shares: 28,
      isLiked: true,
      isPublic: true,
      createdAt: '2024-03-01',
      tags: ['selfie', 'concert', 'arctic-monkeys'],
      location: 'Hollywood Bowl',
      event: 'Arctic Monkeys - The Car Tour'
    }
  ];

  const filteredItems = activeTab === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.type === activeTab);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'photo': return <Camera className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'audio': return <Music className="w-4 h-4" />;
      case 'reaction': return <Heart className="w-4 h-4" />;
      default: return <Camera className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'photo': return 'text-brand-orange';
      case 'video': return 'text-brand-amber';
      case 'audio': return 'text-brand-yellow';
      case 'reaction': return 'text-brand-cream';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Social Gallery</h2>
          <p className="text-muted-foreground">Share your music moments</p>
        </div>
        <Button className="bg-brand-orange hover:bg-brand-amber">
          <Plus className="w-4 h-4 mr-2" />
          Add Content
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <Camera className="w-8 h-8 mx-auto mb-2 text-brand-orange" />
          <div className="text-2xl font-bold">
            {galleryItems.filter(item => item.type === 'photo').length}
          </div>
          <div className="text-sm text-muted-foreground">Photos</div>
        </Card>
        <Card className="p-4 text-center">
          <Video className="w-8 h-8 mx-auto mb-2 text-brand-amber" />
          <div className="text-2xl font-bold">
            {galleryItems.filter(item => item.type === 'video').length}
          </div>
          <div className="text-sm text-muted-foreground">Videos</div>
        </Card>
        <Card className="p-4 text-center">
          <Music className="w-8 h-8 mx-auto mb-2 text-brand-yellow" />
          <div className="text-2xl font-bold">
            {galleryItems.filter(item => item.type === 'audio').length}
          </div>
          <div className="text-sm text-muted-foreground">Audio</div>
        </Card>
        <Card className="p-4 text-center">
          <Heart className="w-8 h-8 mx-auto mb-2 text-brand-cream" />
          <div className="text-2xl font-bold">
            {galleryItems.reduce((acc, item) => acc + item.likes, 0)}
          </div>
          <div className="text-sm text-muted-foreground">Total Likes</div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="photo">Photos</TabsTrigger>
          <TabsTrigger value="video">Videos</TabsTrigger>
          <TabsTrigger value="audio">Audio</TabsTrigger>
          <TabsTrigger value="reaction">Reactions</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden group cursor-pointer" onClick={() => setSelectedItem(item)}>
                <div className="relative aspect-square">
                  <img
                    src={item.thumbnailUrl || item.mediaUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  
                  {/* Type Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge className={`${getTypeColor(item.type)} bg-background/80`}>
                      {getTypeIcon(item.type)}
                      <span className="ml-1 capitalize">{item.type}</span>
                    </Badge>
                  </div>

                  {/* Privacy Badge */}
                  <div className="absolute top-3 right-3">
                    {item.isPublic ? (
                      <Globe className="w-4 h-4 text-white bg-black/50 rounded-full p-1" />
                    ) : (
                      <Lock className="w-4 h-4 text-white bg-black/50 rounded-full p-1" />
                    )}
                  </div>

                  {/* Duration for video/audio */}
                  {(item.type === 'video' || item.type === 'audio') && item.duration && (
                    <div className="absolute bottom-3 right-3">
                      <Badge className="bg-black/70 text-white">
                        {item.duration}
                      </Badge>
                    </div>
                  )}

                  {/* Play button overlay */}
                  {(item.type === 'video' || item.type === 'audio') && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button size="lg" className="w-16 h-16 rounded-full bg-white/90 hover:bg-white text-black">
                        <Play className="w-8 h-8 ml-1" />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold line-clamp-1">{item.title}</h3>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {item.description}
                  </p>

                  {/* Location/Event */}
                  {(item.location || item.event) && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                      {item.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{item.location}</span>
                        </div>
                      )}
                      {item.event && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{item.event}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                    {item.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{item.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className={`h-8 px-2 ${item.isLiked ? 'text-brand-orange' : 'text-muted-foreground'}`}>
                        <Heart className={`w-4 h-4 mr-1 ${item.isLiked ? 'fill-current' : ''}`} />
                        {item.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {item.comments}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
                        <Share2 className="w-4 h-4 mr-1" />
                        {item.shares}
                      </Button>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(item.createdAt)}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal for viewing content */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="relative">
              <img
                src={selectedItem.thumbnailUrl || selectedItem.mediaUrl}
                alt={selectedItem.title}
                className="w-full h-96 object-cover"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70"
                onClick={() => setSelectedItem(null)}
              >
                ×
              </Button>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedItem.title}</h2>
                  <p className="text-muted-foreground">{selectedItem.description}</p>
                </div>
                <Badge className={getTypeColor(selectedItem.type)}>
                  {getTypeIcon(selectedItem.type)}
                  <span className="ml-1 capitalize">{selectedItem.type}</span>
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <Button className="bg-brand-orange hover:bg-brand-amber">
                  <Heart className="w-4 h-4 mr-2" />
                  Like ({selectedItem.likes})
                </Button>
                <Button variant="outline">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Comment ({selectedItem.comments})
                </Button>
                <Button variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share ({selectedItem.shares})
                </Button>
              </div>

              <div className="text-sm text-muted-foreground">
                Posted on {formatDate(selectedItem.createdAt)}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

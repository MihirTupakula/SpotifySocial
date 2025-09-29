import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Camera, 
  Plus,
  Play,
  Share2,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Star,
  Clock,
  Music
} from 'lucide-react';

interface Concert {
  id: string;
  artist: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  images: string[];
  videos: string[];
  setlist: string[];
  friends: Array<{
    id: string;
    name: string;
    avatar: string;
  }>;
  rating: number;
  notes: string;
  isPublic: boolean;
}

export function ConcertLog() {
  const [showAddForm, setShowAddForm] = useState(false);

  // Mock concert data
  const concerts: Concert[] = [
    {
      id: '1',
      artist: 'Taylor Swift',
      venue: 'Madison Square Garden',
      location: 'New York, NY',
      date: '2024-03-15',
      time: '8:00 PM',
      images: [
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop'
      ],
      videos: [],
      setlist: ['Anti-Hero', 'Love Story', 'Shake It Off', 'Blank Space', 'All Too Well'],
      friends: [
        { id: '1', name: 'Alex', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
        { id: '2', name: 'Sarah', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face' }
      ],
      rating: 5,
      notes: 'Amazing show! The energy was incredible and Taylor sounded perfect live.',
      isPublic: true
    },
    {
      id: '2',
      artist: 'Arctic Monkeys',
      venue: 'Hollywood Bowl',
      location: 'Los Angeles, CA',
      date: '2024-02-28',
      time: '7:30 PM',
      images: [
        'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop'
      ],
      videos: [],
      setlist: ['Do I Wanna Know?', 'R U Mine?', '505', 'Fluorescent Adolescent', 'I Bet You Look Good on the Dancefloor'],
      friends: [
        { id: '3', name: 'Mike', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' }
      ],
      rating: 4,
      notes: 'Great performance, Alex Turner was in top form.',
      isPublic: true
    },
    {
      id: '3',
      artist: 'Daft Punk',
      venue: 'Coachella',
      location: 'Indio, CA',
      date: '2024-01-20',
      time: '9:00 PM',
      images: [],
      videos: [],
      setlist: ['One More Time', 'Harder Better Faster Stronger', 'Get Lucky', 'Digital Love', 'Around the World'],
      friends: [],
      rating: 5,
      notes: 'Legendary performance! The light show was mind-blowing.',
      isPublic: false
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-brand-yellow fill-current' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Concert Log</h2>
          <p className="text-muted-foreground">Your live music experiences</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-brand-orange hover:bg-brand-amber"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Concert
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-brand-orange">{concerts.length}</div>
          <div className="text-sm text-muted-foreground">Concerts</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-brand-amber">
            {concerts.reduce((acc, concert) => acc + concert.friends.length, 0)}
          </div>
          <div className="text-sm text-muted-foreground">Friends Tagged</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-brand-yellow">
            {Math.round(concerts.reduce((acc, concert) => acc + concert.rating, 0) / concerts.length * 10) / 10}
          </div>
          <div className="text-sm text-muted-foreground">Avg Rating</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-brand-cream">
            {concerts.reduce((acc, concert) => acc + concert.images.length, 0)}
          </div>
          <div className="text-sm text-muted-foreground">Photos</div>
        </Card>
      </div>

      {/* Concert List */}
      <div className="space-y-6">
        {concerts.map((concert) => (
          <Card key={concert.id} className="overflow-hidden">
            <div className="p-6">
              {/* Concert Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold">{concert.artist}</h3>
                    <Badge variant="outline" className="bg-brand-orange/10 text-brand-orange border-brand-orange/30">
                      {concert.rating}/5
                    </Badge>
                    {!concert.isPublic && (
                      <Badge variant="outline" className="bg-muted text-muted-foreground">
                        Private
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {concert.venue}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(concert.date)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {concert.time}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{concert.location}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>

              {/* Images */}
              {concert.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                  {concert.images.map((image, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden">
                      <img
                        src={image}
                        alt={`${concert.artist} concert photo ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Setlist */}
              <div className="mb-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Music className="w-4 h-4 text-brand-orange" />
                  Setlist
                </h4>
                <div className="flex flex-wrap gap-2">
                  {concert.setlist.map((song, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {song}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Friends */}
              {concert.friends.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4 text-brand-amber" />
                    Friends
                  </h4>
                  <div className="flex items-center gap-2">
                    {concert.friends.map((friend) => (
                      <Avatar key={friend.id} className="w-8 h-8">
                        <AvatarImage src={friend.avatar} />
                        <AvatarFallback className="text-xs">{friend.name[0]}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {concert.notes && (
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Notes</h4>
                  <p className="text-sm text-muted-foreground">{concert.notes}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="text-brand-orange hover:text-brand-orange">
                    <Heart className="w-4 h-4 mr-1" />
                    Like
                  </Button>
                  <Button variant="ghost" size="sm" className="text-brand-amber hover:text-brand-amber">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Comment
                  </Button>
                  <Button variant="ghost" size="sm" className="text-brand-yellow hover:text-brand-yellow">
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  {renderStars(concert.rating)}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Concert Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Add Concert</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Artist</label>
                  <input 
                    type="text" 
                    className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background"
                    placeholder="Enter artist name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Venue</label>
                  <input 
                    type="text" 
                    className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background"
                    placeholder="Enter venue name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Date</label>
                    <input 
                      type="date" 
                      className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Time</label>
                    <input 
                      type="time" 
                      className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <input 
                    type="text" 
                    className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background"
                    placeholder="City, State"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Notes</label>
                  <textarea 
                    className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background"
                    rows={3}
                    placeholder="Share your experience..."
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
                <Button className="bg-brand-orange hover:bg-brand-amber">
                  Add Concert
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

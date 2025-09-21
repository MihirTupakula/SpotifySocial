import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Music, Plus } from 'lucide-react';

const conversations = [
  {
    id: '1',
    name: 'Alex Chen',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    lastMessage: 'Just shared a song!',
    time: '2m ago',
    unread: 2,
    hasMusic: true,
  },
  {
    id: '2',
    name: 'Weekend Warriors',
    avatar: '', // Group chat
    lastMessage: 'Sarah added 3 songs to our playlist',
    time: '15m ago',
    unread: 0,
    hasMusic: true,
    isGroup: true,
  },
  {
    id: '3',
    name: 'Sarah Wilson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612c0c1?w=100&h=100&fit=crop',
    lastMessage: 'What do you think of this track?',
    time: '1h ago',
    unread: 0,
    hasMusic: false,
  },
];

export default function DMs() {
  return (
    <div className="pb-20 min-h-screen bg-background">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background/80 backdrop-blur-lg p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Messages
            </h1>
            <Button variant="ghost" size="sm">
              <Plus size={20} />
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {conversations.map((conversation) => (
            <Card key={conversation.id} className="p-4 glass-card hover:scale-[1.02] transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={conversation.avatar} />
                    <AvatarFallback className="bg-gradient-primary text-white">
                      {conversation.isGroup ? '👥' : conversation.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.hasMusic && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                      <Music size={12} className="text-background" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium truncate">{conversation.name}</h3>
                    <span className="text-xs text-muted-foreground">{conversation.time}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                    {conversation.unread > 0 && (
                      <Badge variant="default" className="bg-accent text-background">
                        {conversation.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {/* Collaborative Playlists Section */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-3">Collaborative Playlists</h2>
            <Card className="p-4 glass-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center">
                  <Music className="text-white" size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Weekend Warriors Mix</h3>
                  <p className="text-sm text-muted-foreground">12 songs • 3 contributors</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Export to Spotify
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
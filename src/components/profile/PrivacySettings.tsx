import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Lock, 
  Globe, 
  Users, 
  Eye, 
  EyeOff, 
  Shield, 
  Settings,
  Music,
  Calendar,
  Heart,
  Camera,
  Trophy,
  BarChart3
} from 'lucide-react';

interface PrivacySetting {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  isEnabled: boolean;
  level: 'public' | 'friends' | 'private';
}

export function PrivacySettings() {
  const [settings, setSettings] = useState<PrivacySetting[]>([
    {
      id: 'profile-visibility',
      title: 'Profile Visibility',
      description: 'Who can see your profile',
      icon: <Globe className="w-5 h-5" />,
      category: 'general',
      isEnabled: true,
      level: 'public'
    },
    {
      id: 'music-dna',
      title: 'Music DNA',
      description: 'Share your musical taste analysis',
      icon: <BarChart3 className="w-5 h-5" />,
      category: 'music',
      isEnabled: true,
      level: 'friends'
    },
    {
      id: 'listening-activity',
      title: 'Listening Activity',
      description: 'Show what you\'re currently playing',
      icon: <Music className="w-5 h-5" />,
      category: 'music',
      isEnabled: true,
      level: 'friends'
    },
    {
      id: 'top-tracks',
      title: 'Top Tracks',
      description: 'Display your most played songs',
      icon: <Heart className="w-5 h-5" />,
      category: 'music',
      isEnabled: true,
      level: 'public'
    },
    {
      id: 'concert-log',
      title: 'Concert Log',
      description: 'Share your live music experiences',
      icon: <Calendar className="w-5 h-5" />,
      category: 'social',
      isEnabled: true,
      level: 'friends'
    },
    {
      id: 'social-gallery',
      title: 'Social Gallery',
      description: 'Show your music photos and videos',
      icon: <Camera className="w-5 h-5" />,
      category: 'social',
      isEnabled: true,
      level: 'friends'
    },
    {
      id: 'achievements',
      title: 'Achievements',
      description: 'Display your badges and milestones',
      icon: <Trophy className="w-5 h-5" />,
      category: 'social',
      isEnabled: true,
      level: 'public'
    },
    {
      id: 'friend-connections',
      title: 'Friend Connections',
      description: 'Show your friend list and connections',
      icon: <Users className="w-5 h-5" />,
      category: 'social',
      isEnabled: true,
      level: 'friends'
    },
    {
      id: 'data-analytics',
      title: 'Data Analytics',
      description: 'Allow app to use your data for recommendations',
      icon: <Shield className="w-5 h-5" />,
      category: 'data',
      isEnabled: true,
      level: 'private'
    },
    {
      id: 'location-sharing',
      title: 'Location Sharing',
      description: 'Share your location for concert recommendations',
      icon: <Globe className="w-5 h-5" />,
      category: 'data',
      isEnabled: false,
      level: 'private'
    }
  ]);

  const categories = [
    { id: 'general', name: 'General', icon: <Settings className="w-4 h-4" /> },
    { id: 'music', name: 'Music', icon: <Music className="w-4 h-4" /> },
    { id: 'social', name: 'Social', icon: <Users className="w-4 h-4" /> },
    { id: 'data', name: 'Data', icon: <Shield className="w-4 h-4" /> }
  ];

  const [activeCategory, setActiveCategory] = useState('general');

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'public': return 'text-green-600 bg-green-50 border-green-200';
      case 'friends': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'private': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'public': return <Globe className="w-3 h-3" />;
      case 'friends': return <Users className="w-3 h-3" />;
      case 'private': return <Lock className="w-3 h-3" />;
      default: return <Lock className="w-3 h-3" />;
    }
  };

  const handleToggle = (id: string) => {
    setSettings(prev => prev.map(setting => 
      setting.id === id 
        ? { ...setting, isEnabled: !setting.isEnabled }
        : setting
    ));
  };

  const handleLevelChange = (id: string, level: 'public' | 'friends' | 'private') => {
    setSettings(prev => prev.map(setting => 
      setting.id === id 
        ? { ...setting, level }
        : setting
    ));
  };

  const filteredSettings = settings.filter(setting => setting.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Privacy Settings</h2>
          <p className="text-muted-foreground">Control who can see your information</p>
        </div>
        <Button variant="outline">
          <Shield className="w-4 h-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Privacy Overview */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-brand-orange" />
          Privacy Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {settings.filter(s => s.level === 'public').length}
            </div>
            <div className="text-sm text-muted-foreground">Public</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {settings.filter(s => s.level === 'friends').length}
            </div>
            <div className="text-sm text-muted-foreground">Friends Only</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">
              {settings.filter(s => s.level === 'private').length}
            </div>
            <div className="text-sm text-muted-foreground">Private</div>
          </div>
        </div>
      </Card>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? 'default' : 'outline'}
            onClick={() => setActiveCategory(category.id)}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            {category.icon}
            {category.name}
          </Button>
        ))}
      </div>

      {/* Settings List */}
      <div className="space-y-4">
        {filteredSettings.map((setting) => (
          <Card key={setting.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="p-2 rounded-lg bg-brand-orange/10 text-brand-orange">
                  {setting.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-1">{setting.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {setting.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge className={getLevelColor(setting.level)}>
                      {getLevelIcon(setting.level)}
                      <span className="ml-1 capitalize">{setting.level}</span>
                    </Badge>
                    {setting.isEnabled ? (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        <Eye className="w-3 h-3 mr-1" />
                        Visible
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-gray-600 border-gray-600">
                        <EyeOff className="w-3 h-3 mr-1" />
                        Hidden
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant={setting.level === 'public' ? 'default' : 'outline'}
                    onClick={() => handleLevelChange(setting.id, 'public')}
                    className="h-8 px-2"
                  >
                    <Globe className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant={setting.level === 'friends' ? 'default' : 'outline'}
                    onClick={() => handleLevelChange(setting.id, 'friends')}
                    className="h-8 px-2"
                  >
                    <Users className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant={setting.level === 'private' ? 'default' : 'outline'}
                    onClick={() => handleLevelChange(setting.id, 'private')}
                    className="h-8 px-2"
                  >
                    <Lock className="w-3 h-3" />
                  </Button>
                </div>
                <Switch
                  checked={setting.isEnabled}
                  onCheckedChange={() => handleToggle(setting.id)}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Data Protection Notice */}
      <Card className="p-6 bg-muted/50">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Shield className="w-5 h-5 text-brand-orange" />
          Data Protection
        </h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            • Your data is encrypted and stored securely
          </p>
          <p>
            • We never sell your personal information to third parties
          </p>
          <p>
            • You can export or delete your data at any time
          </p>
          <p>
            • Privacy settings are applied immediately across all devices
          </p>
        </div>
        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm">
            View Privacy Policy
          </Button>
          <Button variant="outline" size="sm">
            Contact Support
          </Button>
        </div>
      </Card>
    </div>
  );
}

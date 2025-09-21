import { useState } from 'react';
import { BottomNavigation } from '@/components/ui/bottom-navigation';
import Feed from './Feed';
import Games from './Games';
import DMs from './DMs';
import Profile from './Profile';

export default function MainApp() {
  const [activeTab, setActiveTab] = useState('feed');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'feed':
        return <Feed />;
      case 'games':
        return <Games />;
      case 'dms':
        return <DMs />;
      case 'profile':
        return <Profile />;
      default:
        return <Feed />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderActiveTab()}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
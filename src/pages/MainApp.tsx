import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Gamepad2, User, Music } from 'lucide-react';
import { BottomNavigation } from '@/components/ui/bottom-navigation';
import { UnifiedFeed } from '@/components/music/UnifiedFeed';
import { MiniPlayer } from '@/components/player/MiniPlayer';
import Games from './Games';
import DMs from './DMs';
import Profile from './Profile';
import EnhancedFeed from './EnhancedFeed';
import EnhancedGames from './EnhancedGames';
import EnhancedProfile from './EnhancedProfile';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { useAuth } from '@/contexts/AuthContext';

type Page = 'feed' | 'games' | 'dms' | 'profile';

export default function MainApp() {
  console.log('MainApp component rendering...');
  const [currentPage, setCurrentPage] = useState<Page>('feed');
  const { user } = useAuth();

  const pages = {
    feed: EnhancedFeed,
    games: EnhancedGames,
    dms: DMs,
    profile: EnhancedProfile
  };

  const PageComponent = pages[currentPage];

  const navItems = [
    { id: 'feed', icon: Home, label: 'Feed' },
    { id: 'games', icon: Gamepad2, label: 'Games' },
    { id: 'dms', icon: User, label: 'DMs' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="h-screen bg-background text-foreground overflow-hidden">

      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b-4 border-black">
        <div className="flex items-center justify-between p-4 max-w-6xl mx-auto">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-brand-orange to-brand-amber rounded-full border-4 border-black flex items-center justify-center shadow-lg">
              <Music className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-black">SoundSocial</h1>
          </motion.div>

          {/* Navigation */}
          <nav className="flex items-center gap-2 bg-white rounded-full p-2 border-4 border-black shadow-[4px_4px_0px_0px_#000]">
            {navItems.map(({ id, icon: Icon, label }) => (
              <motion.button
                key={id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(id as Page)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  currentPage === id
                    ? 'bg-black text-white shadow-inner'
                    : 'text-black hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden sm:inline font-medium">{label}</span>
              </motion.button>
            ))}
          </nav>

          {/* User indicator */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-orange to-brand-amber rounded-full border-2 border-black"></div>
            <span className="hidden sm:inline font-medium text-black">{user?.display_name || 'Music Lover'}</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="pt-20 h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="h-full"
          >
            <PageComponent />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Comic-style decorative elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Random comic bubbles */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute top-20 left-10 w-20 h-20 bg-brand-orange/30 rounded-full border-4 border-black opacity-20"
        />
        <motion.div
          animate={{
            scale: [1, 0.9, 1],
            rotate: [0, -5, 5, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1
          }}
          className="absolute bottom-20 right-10 w-16 h-16 bg-brand-amber/30 rounded-full border-4 border-black opacity-20"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2
          }}
          className="absolute top-1/2 left-20 w-12 h-12 bg-brand-yellow/30 rounded-full border-4 border-black opacity-20"
        />
      </div>

      {/* Footer with Mini Player */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-sm border-t-4 border-black">
        <MiniPlayer />
      </footer>

      {/* Toast notifications */}
      <Toaster />
      <Sonner />
    </div>
  );
}
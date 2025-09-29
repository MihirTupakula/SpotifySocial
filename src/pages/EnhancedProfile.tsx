import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Music, 
  Play, 
  Pause, 
  Sun,
  Moon,
  Laptop,
  Headphones,
  MessageCircle,
  Users,
  Heart,
  Share2
} from 'lucide-react';

export default function EnhancedProfile() {
  const [isDay, setIsDay] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mascotVisible, setMascotVisible] = useState(true);
  const [mascotMessage, setMascotMessage] = useState('Welcome to your Music Room! 🎵✨');

  // Mock data for top albums
  const topAlbums = [
    { id: '1', name: 'After Hours', artist: 'The Weeknd', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop' },
    { id: '2', name: 'SOUR', artist: 'Olivia Rodrigo', cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop' },
    { id: '3', name: 'Future Nostalgia', artist: 'Dua Lipa', cover: 'https://images.unsplash.com/photo-1511379938547-c1f694105059?w=200&h=200&fit=crop' },
    { id: '4', name: 'folklore', artist: 'Taylor Swift', cover: 'https://images.unsplash.com/photo-1485827404703-cfb0b4778d72?w=200&h=200&fit=crop' },
  ];

  useEffect(() => {
    // Simulate day/night cycle
    const hour = new Date().getHours();
    setIsDay(hour >= 6 && hour < 18);
  }, []);

  const handleAlbumClick = (album: any) => {
    setMascotMessage(`${album.name} by ${album.artist}! Click to see album details! 🎤`);
    setMascotVisible(true);
    setTimeout(() => setMascotVisible(false), 2000);
  };

  const handleLaptopClick = () => {
    setMascotMessage('Opening DMs and Friends! 💬👥');
    setMascotVisible(true);
    setTimeout(() => setMascotVisible(false), 2000);
  };

  const handleRecordPlayerClick = () => {
    setIsPlaying(!isPlaying);
    setMascotMessage(isPlaying ? 'Music stopped! 🎵' : 'Music is playing! 🎶');
    setMascotVisible(true);
    setTimeout(() => setMascotVisible(false), 2000);
  };

  const handleBeanbagClick = () => {
    setMascotMessage('Comfy spot for listening to music! 🛋️');
    setMascotVisible(true);
    setTimeout(() => setMascotVisible(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-100 to-yellow-100 text-black overflow-hidden">

      {/* Main Content */}
      <div className="flex h-screen pt-20">
        {/* Room Canvas */}
        <div className="flex-1 relative overflow-hidden">
          {/* Room Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-200 via-pink-200 to-yellow-200">
            
            {/* Wall with Album Posters */}
            <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-orange-300 to-orange-200 border-b-4 border-black">
              {/* Album Posters Grid */}
              <div className="grid grid-cols-4 gap-4 p-6 h-full">
                {topAlbums.map((album) => (
                  <motion.div
                    key={album.id}
                    className="bg-white rounded-lg border-4 border-black shadow-[4px_4px_0px_0px_#000] cursor-pointer hover:shadow-[8px_8px_0px_0px_#000] transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAlbumClick(album)}
                  >
                    <img 
                      src={album.cover} 
                      alt={album.name} 
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                    <div className="p-2">
                      <h3 className="font-bold text-sm">{album.name}</h3>
                      <p className="text-xs text-gray-600">{album.artist}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Fairy Lights */}
            <div className="absolute top-4 left-4 right-4 h-2 flex justify-between">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-yellow-300 rounded-full border border-yellow-400"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            {/* Window with Sunlight */}
            <div className="absolute top-8 right-8 w-32 h-32 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-lg border-4 border-black shadow-[4px_4px_0px_0px_#000]">
              <div className="absolute inset-2 bg-gradient-to-br from-yellow-100 to-orange-100 rounded">
                <Sun className="w-12 h-12 text-yellow-500 absolute top-2 left-2" />
              </div>
            </div>

            {/* Bed with Otter */}
            <div className="absolute bottom-0 left-0 w-96 h-48">
              {/* Bed */}
              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-r from-pink-300 to-pink-400 border-4 border-black shadow-[4px_4px_0px_0px_#000] rounded-t-lg">
                {/* Pillow */}
                <div className="absolute top-4 left-4 w-20 h-16 bg-white rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_#000]"></div>
                {/* Bed frame */}
                <div className="absolute -bottom-2 left-0 w-full h-6 bg-amber-800 border-2 border-black rounded-b-lg"></div>
              </div>

              {/* Otter Mascot on Bed */}
              <motion.div
                className="absolute bottom-16 left-16 w-24 h-24 cursor-pointer"
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 3, -3, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                onClick={() => {
                  setMascotMessage('Hi there! I\'m your music room otter! 🦦🎵');
                  setMascotVisible(true);
                  setTimeout(() => setMascotVisible(false), 2000);
                }}
              >
                {/* Otter body */}
                <div className="relative w-full h-full">
                  {/* Otter head */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full border-4 border-black shadow-[3px_3px_0px_0px_#000]">
                    {/* Otter ears */}
                    <div className="absolute -top-2 -left-2 w-4 h-4 bg-amber-300 rounded-full border-2 border-black"></div>
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-amber-300 rounded-full border-2 border-black"></div>
                    {/* Otter eyes */}
                    <div className="absolute top-4 left-3 w-3 h-3 bg-black rounded-full"></div>
                    <div className="absolute top-4 right-3 w-3 h-3 bg-black rounded-full"></div>
                    {/* Otter nose */}
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black rounded-full"></div>
                    {/* Otter mouth */}
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-black rounded-full"></div>
                  </div>
                  {/* Otter body */}
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-20 h-16 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full border-4 border-black shadow-[3px_3px_0px_0px_#000]">
                    {/* Otter arms */}
                    <div className="absolute top-2 -left-3 w-6 h-8 bg-amber-300 rounded-full border-2 border-black"></div>
                    <div className="absolute top-2 -right-3 w-6 h-8 bg-amber-300 rounded-full border-2 border-black"></div>
                  </div>
                  {/* Otter tail */}
                  <div className="absolute top-8 -right-3 w-8 h-12 bg-amber-300 rounded-full border-2 border-black transform rotate-12"></div>
                </div>
              </motion.div>
            </div>

            {/* Desk with Laptop and Record Player */}
            <div className="absolute bottom-48 left-8 w-80 h-32">
              {/* Desk */}
              <div className="absolute bottom-0 left-0 w-full h-24 bg-amber-600 border-4 border-black shadow-[4px_4px_0px_0px_#000] rounded-lg">
                {/* Laptop */}
                <motion.div
                  className="absolute top-2 left-4 w-20 h-16 bg-gray-800 border-2 border-black shadow-[2px_2px_0px_0px_#000] rounded cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLaptopClick}
                >
                  <div className="absolute inset-1 bg-gray-900 rounded"></div>
                  <div className="absolute top-1 left-1 right-1 h-1 bg-green-400 rounded"></div>
                </motion.div>

                {/* Record Player */}
                <motion.div
                  className="absolute top-2 left-32 w-16 h-16 bg-gray-700 border-2 border-black shadow-[2px_2px_0px_0px_#000] rounded-full cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRecordPlayerClick}
                >
                  <div className="absolute inset-2 bg-gray-800 rounded-full border border-gray-600"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-gray-400 rounded-full"></div>
                  {isPlaying && (
                    <motion.div
                      className="absolute inset-1 border-2 border-green-400 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                </motion.div>

                {/* Plant */}
                <div className="absolute top-2 right-4 w-8 h-16 bg-green-500 border-2 border-black shadow-[2px_2px_0px_0px_#000] rounded-t-full"></div>
              </div>
            </div>

            {/* Beanbag Chair */}
            <motion.div
              className="absolute bottom-32 right-8 w-24 h-20 bg-gradient-to-br from-purple-400 to-pink-400 border-4 border-black shadow-[4px_4px_0px_0px_#000] rounded-full cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBeanbagClick}
            >
            </motion.div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-white/90 backdrop-blur-lg border-l-4 border-black p-4 overflow-y-auto">
          <div className="space-y-6">
            {/* Room Controls */}
            <Card className="p-4 bg-white border-4 border-black shadow-[4px_4px_0px_0px_#000]">
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-black">
                <Music className="w-4 h-4 text-brand-orange" />
                Room Controls
              </h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsDay(!isDay)}
                  className="w-full text-black border-2 border-black hover:bg-black/10 shadow-[2px_2px_0px_0px_#000]"
                >
                  {isDay ? <Moon className="w-4 h-4 mr-2" /> : <Sun className="w-4 h-4 mr-2" />}
                  {isDay ? 'Switch to Night' : 'Switch to Day'}
                </Button>
              </div>
            </Card>

            {/* Music Stats */}
            <Card className="p-4 bg-white border-4 border-black shadow-[4px_4px_0px_0px_#000]">
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-black">
                <Headphones className="w-4 h-4 text-brand-orange" />
                Music Stats
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Playtime:</span>
                  <span className="font-semibold">1,247 hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Favorite Genre:</span>
                  <span className="font-semibold">Pop</span>
                </div>
                <div className="flex justify-between">
                  <span>Top Artist:</span>
                  <span className="font-semibold">The Weeknd</span>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-4 bg-white border-4 border-black shadow-[4px_4px_0px_0px_#000]">
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-black">
                <Share2 className="w-4 h-4 text-brand-orange" />
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLaptopClick}
                  className="w-full text-black border-2 border-black hover:bg-black/10 shadow-[2px_2px_0px_0px_#000]"
                >
                  <Laptop className="w-4 h-4 mr-2" />
                  Open DMs
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRecordPlayerClick}
                  className="w-full text-black border-2 border-black hover:bg-black/10 shadow-[2px_2px_0px_0px_#000]"
                >
                  <Music className="w-4 h-4 mr-2" />
                  {isPlaying ? 'Pause Music' : 'Play Music'}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Mascot Popup */}
      <AnimatePresence>
        {mascotVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="fixed bottom-20 left-4 right-4 z-50"
          >
            <Card className="bg-gradient-to-r from-brand-orange to-brand-amber p-4 border-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-lg">🦦</span>
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold">Otter Mascot</p>
                  <p className="text-white/90 text-sm">{mascotMessage}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMascotVisible(false)}
                  className="text-white hover:bg-white/20"
                >
                  ×
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
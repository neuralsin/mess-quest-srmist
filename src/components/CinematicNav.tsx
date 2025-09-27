import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Calendar, Star, Trophy, Zap, Bell, User, Menu as MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CinematicNavProps {
  scrollY: number;
}

const CinematicNav: React.FC<CinematicNavProps> = ({ scrollY }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navOpacity = Math.min(1, scrollY / 100);
  const navBlur = Math.min(24, scrollY / 5);

  const navItems = [
    { name: 'Weekly Menu', icon: <Calendar className="w-4 h-4" />, href: '#menu' },
    { name: 'Feedback', icon: <Star className="w-4 h-4" />, href: '#feedback' },
    { name: 'Leaderboard', icon: <Trophy className="w-4 h-4" />, href: '#leaderboard' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: `rgba(11, 11, 11, ${navOpacity * 0.8})`,
        backdropFilter: `blur(${navBlur}px) saturate(180%)`,
        borderBottom: `1px solid rgba(255, 255, 255, ${navOpacity * 0.1})`,
      }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <motion.div 
              className="w-12 h-12 rounded-full bg-gradient-warm flex items-center justify-center shadow-warm"
              animate={{ rotate: scrollY * 0.1 }}
            >
              <ChefHat className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-display font-bold text-primary">SRM IST</h1>
              <p className="text-xs text-muted font-medium">Hostel Mess</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:bg-glass/20 transition-all duration-300 text-sm font-medium text-foreground"
              >
                {item.icon}
                {item.name}
              </motion.a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* XP Display */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-xp text-white text-sm font-semibold"
            >
              <Zap className="w-4 h-4" />
              <span>Level 5</span>
            </motion.div>

            {/* Notifications */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="glass" size="icon" className="relative">
                <Bell className="w-4 h-4" />
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </Button>
            </motion.div>

            {/* Profile */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="glass" size="icon">
                <User className="w-4 h-4" />
              </Button>
            </motion.div>

            {/* Mobile Menu Toggle */}
            <motion.div
              className="md:hidden"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="glass" 
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <MenuIcon className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 pt-4 border-t border-glass-border"
            >
              <nav className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg glass-card hover:bg-glass/20 transition-all duration-300 text-foreground"
                  >
                    {item.icon}
                    {item.name}
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default CinematicNav;
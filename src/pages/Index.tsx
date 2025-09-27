import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Calendar, Star, Trophy, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdvancedGameHeader from '@/components/AdvancedGameHeader';
import MenuCard from '@/components/MenuCard';
import CinematicHero3D from '@/components/CinematicHero3D';
import CinematicNav from '@/components/CinematicNav';
import FeedbackModal from '@/components/FeedbackModal';
import { SmoothScrollProvider } from '@/hooks/useSmoothScroll';
import { weeklyMenu, DayMenu, getTodaysMenu } from '@/data/menuData';

const Index = () => {
  const [selectedMenu, setSelectedMenu] = useState<DayMenu | null>(null);
  const [feedbackModal, setFeedbackModal] = useState<{ isOpen: boolean; mealName: string }>({
    isOpen: false,
    mealName: ''
  });
  const [scrollY, setScrollY] = useState(0);

  const todaysMenu = getTodaysMenu();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleViewDetails = (menu: DayMenu) => {
    setSelectedMenu(menu);
  };

  const handleFeedback = (mealName: string) => {
    setFeedbackModal({ isOpen: true, mealName });
  };

  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-gradient-hero overflow-x-hidden">
        {/* Cinematic Navigation */}
        <CinematicNav scrollY={scrollY} />

        {/* Hero Section */}
        <section className="relative h-screen">
          <CinematicHero3D scrollY={scrollY} />
        </section>

        {/* Game Header */}
        <section className="relative z-10 container mx-auto px-4 py-12">
          <AdvancedGameHeader />
        </section>

        {/* Weekly Menu */}
        <section className="relative z-10 container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold text-primary mb-6">
              Weekly Menu
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Explore our carefully crafted weekly menu featuring authentic South Indian cuisine, 
              North Indian specialties, and continental favorites.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {weeklyMenu.slice(0, 3).map((menu, index) => (
              <motion.div
                key={menu.day}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.8 }}
              >
                <MenuCard
                  menu={menu}
                  isToday={menu.day === todaysMenu.day}
                  onViewDetails={handleViewDetails}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Feedback Modal */}
        <FeedbackModal
          isOpen={feedbackModal.isOpen}
          onClose={() => setFeedbackModal({ isOpen: false, mealName: '' })}
          mealName={feedbackModal.mealName}
        />
      </div>
    </SmoothScrollProvider>
  );
};

export default Index;
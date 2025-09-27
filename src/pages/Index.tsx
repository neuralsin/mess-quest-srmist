import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Calendar, Star, Trophy, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GameHeader from '@/components/GameHeader';
import MenuCard from '@/components/MenuCard';
import Hero3D from '@/components/Hero3D';
import FeedbackModal from '@/components/FeedbackModal';
import { weeklyMenu, DayMenu, getTodaysMenu } from '@/data/menuData';
import heroMeal from '@/assets/hero-meal.jpg';

const Index = () => {
  const [selectedMenu, setSelectedMenu] = useState<DayMenu | null>(null);
  const [feedbackModal, setFeedbackModal] = useState<{ isOpen: boolean; mealName: string }>({
    isOpen: false,
    mealName: ''
  });

  const todaysMenu = getTodaysMenu();

  const handleViewDetails = (menu: DayMenu) => {
    setSelectedMenu(menu);
  };

  const handleFeedback = (mealName: string) => {
    setFeedbackModal({ isOpen: true, mealName });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card sticky top-0 z-40 backdrop-blur-xl border-b border-glass-border"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-warm flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">SRM IST Hostel Mess</h1>
                <p className="text-sm text-muted-foreground">Delicious meals every day</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="glass" size="sm">
                <Calendar className="w-4 h-4" />
                Weekly Menu
              </Button>
              <Button variant="xp" size="sm">
                <Trophy className="w-4 h-4" />
                Leaderboard
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative">
        {/* 3D Hero Background */}
        <div className="absolute inset-0 z-0">
          <Hero3D />
        </div>
        
        {/* Hero Content Overlay */}
        <div className="relative z-10 bg-gradient-to-b from-transparent via-background/20 to-background">
          <div className="container mx-auto px-4 py-20">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-center space-y-6 max-w-4xl mx-auto"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium"
              >
                <Zap className="w-4 h-4" />
                Gamified Food Experience
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Experience SRM IST's
                <span className="bg-gradient-warm bg-clip-text text-transparent"> Finest Dining</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Rate meals, earn XP, unlock badges, and help improve our dining experience through gamified feedback.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button variant="hero" size="xl" onClick={() => handleViewDetails(todaysMenu)}>
                  <ChefHat className="w-5 h-5" />
                  View Today's Menu
                </Button>
                <Button variant="glass" size="xl">
                  <Star className="w-5 h-5" />
                  Rate Last Meal
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Game Header */}
      <section className="container mx-auto px-4 py-8">
        <GameHeader />
      </section>

      {/* Weekly Menu Section */}
      <section className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Weekly Menu
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our carefully crafted weekly menu featuring authentic South Indian cuisine, 
            North Indian specialties, and continental favorites.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {weeklyMenu.slice(0, 3).map((menu, index) => (
            <motion.div
              key={menu.day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <MenuCard
                menu={menu}
                isToday={menu.day === todaysMenu.day}
                onViewDetails={handleViewDetails}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <Button variant="outline" size="lg">
            View Full Week Menu
          </Button>
        </motion.div>
      </section>

      {/* Quick Actions */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            className="glass-card p-6 text-center space-y-4 hover:shadow-warm transition-all duration-300"
          >
            <div className="w-12 h-12 bg-gradient-warm rounded-full flex items-center justify-center mx-auto">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Rate & Review</h3>
            <p className="text-muted-foreground">Share feedback and earn XP for every meal rating</p>
            <Button variant="food" onClick={() => handleFeedback("Today's Special")}>
              Give Feedback
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="glass-card p-6 text-center space-y-4 hover:shadow-warm transition-all duration-300"
          >
            <div className="w-12 h-12 bg-gradient-xp rounded-full flex items-center justify-center mx-auto">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Earn Badges</h3>
            <p className="text-muted-foreground">Complete challenges and unlock achievement badges</p>
            <Button variant="xp">
              View Achievements
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            className="glass-card p-6 text-center space-y-4 hover:shadow-warm transition-all duration-300"
          >
            <div className="w-12 h-12 bg-streak rounded-full flex items-center justify-center mx-auto">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Streak Rewards</h3>
            <p className="text-muted-foreground">Maintain daily feedback streaks for bonus XP</p>
            <Button variant="streak">
              Build Streak
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={feedbackModal.isOpen}
        onClose={() => setFeedbackModal({ isOpen: false, mealName: '' })}
        mealName={feedbackModal.mealName}
      />
    </div>
  );
};

export default Index;

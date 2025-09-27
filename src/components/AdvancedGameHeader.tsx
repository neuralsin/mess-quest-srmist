import React, { useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Trophy, Zap, Crown, Star, Flame, Award, Gift, Target } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';

interface Badge {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const badges: Badge[] = [
  {
    id: 'week-warrior',
    name: 'Week Warrior',
    icon: <Flame className="w-4 h-4" />,
    description: '7-day feedback streak',
    color: 'from-orange-500 to-red-500',
    rarity: 'common'
  },
  {
    id: 'monthly-master',
    name: 'Monthly Master',
    icon: <Crown className="w-4 h-4" />,
    description: '30-day feedback streak',
    color: 'from-purple-500 to-pink-500',
    rarity: 'epic'
  },
  {
    id: 'foodie-scout',
    name: 'Foodie Scout',
    icon: <Star className="w-4 h-4" />,
    description: '10 meal reviews',
    color: 'from-blue-500 to-cyan-500',
    rarity: 'common'
  },
  {
    id: 'master-critic',
    name: 'Master Critic',
    icon: <Award className="w-4 h-4" />,
    description: '50 detailed reviews',
    color: 'from-yellow-500 to-orange-500',
    rarity: 'rare'
  },
  {
    id: 'spice-police',
    name: 'Spice Police',
    icon: <Target className="w-4 h-4" />,
    description: 'Rate 10 spicy dishes',
    color: 'from-red-500 to-pink-500',
    rarity: 'rare'
  },
  {
    id: 'early-bird',
    name: 'Early Bird',
    icon: <Gift className="w-4 h-4" />,
    description: 'First feedback of the day',
    color: 'from-green-500 to-teal-500',
    rarity: 'common'
  }
];

const AdvancedGameHeader = () => {
  const { xp, level, streak, badges: earnedBadges, totalFeedbacks } = useGameStore();
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const controls = useAnimation();

  const xpForCurrentLevel = (level - 1) * 100;
  const xpForNextLevel = level * 100;
  const currentLevelProgress = xp - xpForCurrentLevel;
  const progressPercentage = (currentLevelProgress / 100) * 100;

  const streakMultiplier = Math.min(1 + (streak * 0.1), 3);
  const dailyXP = 10 * streakMultiplier;

  // Level up animation trigger
  useEffect(() => {
    const checkLevelUp = () => {
      const newLevel = Math.floor(xp / 100) + 1;
      if (newLevel > level) {
        setShowLevelUp(true);
        setShowConfetti(true);
        setTimeout(() => setShowLevelUp(false), 3000);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    };

    checkLevelUp();
  }, [xp, level]);

  const getStreakEmoji = (streak: number) => {
    if (streak >= 30) return '🔥';
    if (streak >= 14) return '🌟';
    if (streak >= 7) return '⚡';
    if (streak >= 3) return '💫';
    return '✨';
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass-card p-6 mb-8 shadow-glass relative overflow-hidden"
      >
        {/* Confetti Animation */}
        <AnimatePresence>
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 20 }, (_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    x: Math.random() * 100 + '%',
                    y: '100%',
                    rotate: 0,
                    scale: 0
                  }}
                  animate={{
                    y: '-100%',
                    rotate: 720,
                    scale: [0, 1, 0]
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 3,
                    delay: Math.random() * 0.5,
                    ease: "easeOut"
                  }}
                  className="absolute w-3 h-3 bg-gradient-to-r from-badge to-accent rounded-full"
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Level Up Notification */}
        <AnimatePresence>
          {showLevelUp && (
            <motion.div
              initial={{ scale: 0, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0, y: -50 }}
              className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-md rounded-lg z-10"
            >
              <div className="text-center space-y-4">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-20 h-20 bg-gradient-xp rounded-full flex items-center justify-center mx-auto"
                >
                  <Crown className="w-10 h-10 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-primary">Level Up!</h3>
                  <p className="text-lg text-muted-foreground">You reached Level {level}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header Content */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-6">
            {/* Level & XP Display */}
            <motion.div 
              className="flex items-center gap-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <motion.div
                  className="w-16 h-16 rounded-full bg-gradient-xp flex items-center justify-center text-white font-bold text-xl shadow-glow"
                  animate={{ boxShadow: ["0 0 20px hsl(var(--xp-glow) / 0.5)", "0 0 40px hsl(var(--xp-glow) / 0.8)", "0 0 20px hsl(var(--xp-glow) / 0.5)"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {level}
                </motion.div>
                <motion.div 
                  className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Zap className="w-3 h-3 text-white" />
                </motion.div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Level {level} Foodie</h3>
                <p className="text-sm text-muted-foreground">{xp.toLocaleString()} XP Total</p>
                <p className="text-xs text-accent">+{dailyXP} XP per feedback</p>
              </div>
            </motion.div>

            {/* Streak Display */}
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ 
                  scale: streak > 0 ? [1, 1.1, 1] : 1,
                  rotate: streak > 0 ? [0, 5, -5, 0] : 0
                }}
                transition={{ duration: 0.6, repeat: streak > 0 ? Infinity : 0, repeatDelay: 3 }}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg ${
                  streak >= 7 ? 'bg-gradient-to-br from-red-500 to-orange-500' : 'bg-streak'
                }`}
              >
                {getStreakEmoji(streak)}
              </motion.div>
              <div>
                <p className="text-lg font-bold text-foreground">{streak} Day Streak</p>
                <p className="text-xs text-muted-foreground">
                  {streak > 0 ? `+${Math.round(streakMultiplier * 10)}% XP Bonus` : 'Start your streak!'}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Badges Display */}
          <div className="flex items-center gap-2">
            {badges.slice(0, 4).map((badge, index) => {
              const isEarned = earnedBadges.includes(badge.id);
              return (
                <motion.div
                  key={badge.id}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white relative ${
                    isEarned 
                      ? `bg-gradient-to-br ${badge.color} shadow-lg` 
                      : 'bg-muted/20 border border-muted'
                  }`}
                  title={`${badge.name}: ${badge.description}`}
                >
                  {badge.icon}
                  {isEarned && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Star className="w-2 h-2 text-white" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
            {earnedBadges.length > 4 && (
              <div className="w-10 h-10 rounded-full bg-muted/20 border border-muted flex items-center justify-center text-xs font-semibold text-muted-foreground">
                +{earnedBadges.length - 4}
              </div>
            )}
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Progress to Level {level + 1}</span>
            <span className="text-muted-foreground font-medium">{currentLevelProgress}/100 XP</span>
          </div>
          
          <div className="relative w-full bg-muted/20 rounded-full h-4 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-xp rounded-full relative"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              
              {/* XP Text */}
              {progressPercentage > 20 && (
                <div className="absolute inset-0 flex items-center justify-end pr-3">
                  <Zap className="w-3 h-3 text-white" />
                </div>
              )}
            </motion.div>
          </div>
          
          {/* Stats Row */}
          <div className="flex justify-between text-xs text-muted-foreground pt-2">
            <span>{totalFeedbacks} Total Reviews</span>
            <span>{earnedBadges.length} Badges Earned</span>
            <span>Next: {100 - currentLevelProgress} XP</span>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AdvancedGameHeader;
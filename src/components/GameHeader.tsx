import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Trophy, Star, Zap } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';

const GameHeader = () => {
  const { xp, level, streak, badges } = useGameStore();
  
  const xpForCurrentLevel = (level - 1) * 100;
  const xpForNextLevel = level * 100;
  const currentLevelProgress = xp - xpForCurrentLevel;
  const progressPercentage = (currentLevelProgress / 100) * 100;

  return (
    <div className="glass-card p-4 mb-6 shadow-glass">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          {/* Level & XP */}
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-gradient-xp flex items-center justify-center text-white font-bold text-lg">
              {level}
            </div>
            <div>
              <p className="font-semibold text-foreground">Level {level}</p>
              <p className="text-sm text-muted-foreground">{xp} XP</p>
            </div>
          </div>

          {/* Streak */}
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ 
                scale: streak > 0 ? [1, 1.1, 1] : 1,
                rotate: streak > 0 ? [0, 5, -5, 0] : 0
              }}
              transition={{ duration: 0.5, repeat: streak > 0 ? Infinity : 0, repeatDelay: 2 }}
              className="w-10 h-10 rounded-full bg-streak flex items-center justify-center text-white"
            >
              <Flame className="w-5 h-5" />
            </motion.div>
            <div>
              <p className="font-semibold text-foreground">{streak} Day Streak</p>
              <p className="text-xs text-muted-foreground">Keep it going!</p>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2">
          {badges.slice(0, 3).map((badge, index) => (
            <motion.div
              key={badge}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.1 }}
              className="w-8 h-8 rounded-full bg-badge flex items-center justify-center text-white text-xs"
              title={badge}
            >
              <Trophy className="w-4 h-4" />
            </motion.div>
          ))}
          {badges.length > 3 && (
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">
              +{badges.length - 3}
            </div>
          )}
        </div>
      </div>

      {/* XP Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progress to Level {level + 1}</span>
          <span className="text-muted-foreground">{currentLevelProgress}/100 XP</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-xp rounded-full flex items-center justify-end pr-2"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {progressPercentage > 20 && (
              <Zap className="w-3 h-3 text-white" />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;
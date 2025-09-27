import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameState {
  xp: number;
  level: number;
  streak: number;
  lastFeedbackDate: string | null;
  badges: string[];
  totalFeedbacks: number;
  
  // Actions
  addXP: (amount: number) => void;
  addBadge: (badge: string) => void;
  submitFeedback: () => void;
  resetStreak: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      xp: 0,
      level: 1,
      streak: 0,
      lastFeedbackDate: null,
      badges: [],
      totalFeedbacks: 0,

      addXP: (amount: number) => {
        const state = get();
        const newXP = state.xp + amount;
        const newLevel = Math.floor(newXP / 100) + 1;
        
        set({ 
          xp: newXP, 
          level: newLevel
        });
      },

      addBadge: (badge: string) => {
        const state = get();
        if (!state.badges.includes(badge)) {
          set({ badges: [...state.badges, badge] });
        }
      },

      submitFeedback: () => {
        const state = get();
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        
        let newStreak = state.streak;
        
        if (state.lastFeedbackDate === yesterday) {
          newStreak = state.streak + 1;
        } else if (state.lastFeedbackDate !== today) {
          newStreak = 1;
        }
        
        // Calculate XP with streak bonus
        const baseXP = 10;
        const streakBonus = Math.min(newStreak * 2, 50);
        const totalXP = baseXP + streakBonus;
        
        set({ 
          streak: newStreak,
          lastFeedbackDate: today,
          totalFeedbacks: state.totalFeedbacks + 1
        });
        
        // Add XP
        get().addXP(totalXP);
        
        // Check for badges
        if (newStreak >= 7) get().addBadge('Week Warrior');
        if (newStreak >= 30) get().addBadge('Monthly Master');
        if (state.totalFeedbacks + 1 >= 10) get().addBadge('Foodie Scout');
        if (state.totalFeedbacks + 1 >= 50) get().addBadge('Master Critic');
      },

      resetStreak: () => set({ streak: 0 }),
    }),
    {
      name: 'srm-mess-game-storage',
    }
  )
);
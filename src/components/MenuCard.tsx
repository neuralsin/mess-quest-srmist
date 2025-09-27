import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Star, ChefHat, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DayMenu } from '@/data/menuData';

interface MenuCardProps {
  menu: DayMenu;
  isToday?: boolean;
  onViewDetails: (menu: DayMenu) => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ menu, isToday = false, onViewDetails }) => {
  const mealCounts = {
    breakfast: menu.meals.breakfast.length,
    lunch: menu.meals.lunch.length,
    snacks: menu.meals.snacks.length,
    dinner: menu.meals.dinner.length,
  };

  const specialItems = Object.values(menu.meals).flat().filter(item => item.isSpecial);
  const vegItems = Object.values(menu.meals).flat().filter(item => item.isVeg);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`glass-card p-6 shadow-glass hover:shadow-warm transition-all duration-300 ${
        isToday ? 'ring-2 ring-primary ring-opacity-50 bg-gradient-to-br from-primary/5 to-transparent' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
            {menu.day}
            {isToday && (
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full font-medium"
              >
                Today
              </motion.span>
            )}
          </h3>
          <p className="text-sm text-muted-foreground">{menu.date}</p>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-badge fill-current" />
          <Star className="w-4 h-4 text-badge fill-current" />
          <Star className="w-4 h-4 text-badge fill-current" />
          <Star className="w-4 h-4 text-badge fill-current" />
          <Star className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      {/* Meal Overview */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
            <Clock className="w-3 h-3 text-primary" />
          </div>
          <span className="text-muted-foreground">Breakfast</span>
          <span className="font-medium">{mealCounts.breakfast} items</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
            <ChefHat className="w-3 h-3 text-primary" />
          </div>
          <span className="text-muted-foreground">Lunch</span>
          <span className="font-medium">{mealCounts.lunch} items</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
            <Clock className="w-3 h-3 text-primary" />
          </div>
          <span className="text-muted-foreground">Snacks</span>
          <span className="font-medium">{mealCounts.snacks} items</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
            <ChefHat className="w-3 h-3 text-primary" />
          </div>
          <span className="text-muted-foreground">Dinner</span>
          <span className="font-medium">{mealCounts.dinner} items</span>
        </div>
      </div>

      {/* Special Items */}
      {specialItems.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-medium text-primary mb-2 flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            Special Items
          </p>
          <div className="flex flex-wrap gap-1">
            {specialItems.slice(0, 3).map((item, index) => (
              <span
                key={index}
                className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
              >
                {item.name}
              </span>
            ))}
            {specialItems.length > 3 && (
              <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                +{specialItems.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Leaf className="w-3 h-3 text-success" />
          <span>{vegItems.length} Veg items</span>
        </div>
        <div className="flex items-center gap-1">
          <ChefHat className="w-3 h-3" />
          <span>SRM Special</span>
        </div>
      </div>

      {/* Action Button */}
      <Button
        variant={isToday ? "hero" : "food"}
        size="lg"
        className="w-full"
        onClick={() => onViewDetails(menu)}
      >
        {isToday ? "View Today's Menu" : "View Menu"}
      </Button>
    </motion.div>
  );
};

export default MenuCard;
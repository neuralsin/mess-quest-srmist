export interface MenuItem {
  name: string;
  description?: string;
  category: 'breakfast' | 'lunch' | 'snacks' | 'dinner';
  isSpecial?: boolean;
  allergens?: string[];
  isVeg: boolean;
}

export interface DayMenu {
  day: string;
  date: string;
  meals: {
    breakfast: MenuItem[];
    lunch: MenuItem[];
    snacks: MenuItem[];
    dinner: MenuItem[];
  };
}

export const weeklyMenu: DayMenu[] = [
  {
    day: 'Monday',
    date: '2024-01-01',
    meals: {
      breakfast: [
        { name: 'Sweet Bread', category: 'breakfast', isVeg: true },
        { name: 'Butter & Jam', category: 'breakfast', isVeg: true },
        { name: 'Vadai with Sambar', category: 'breakfast', isVeg: true },
        { name: 'Special Chutney', category: 'breakfast', isVeg: true },
        { name: 'Potato Aloo Dal Masala', category: 'breakfast', isVeg: true },
        { name: 'Tea / Coffee / Milk', category: 'breakfast', isVeg: true },
        { name: 'Boiled Egg', category: 'breakfast', isVeg: false, isSpecial: true },
        { name: 'Banana', category: 'breakfast', isVeg: true }
      ],
      lunch: [
        { name: 'Chappathi', category: 'lunch', isVeg: true },
        { name: 'Chapp Kasa', category: 'lunch', isVeg: true },
        { name: 'Jeera Rice', category: 'lunch', isVeg: true },
        { name: 'Steamed Rice', category: 'lunch', isVeg: true },
        { name: 'Masala Sambar', category: 'lunch', isVeg: true },
        { name: 'Bagara Dal', category: 'lunch', isVeg: true },
        { name: 'Rasam', category: 'lunch', isVeg: true },
        { name: 'Lemon Rasam', category: 'lunch', isVeg: true },
        { name: 'Potato Fry', category: 'lunch', isVeg: true },
        { name: 'Butter Milk', category: 'lunch', isVeg: true },
        { name: 'Fryums', category: 'lunch', isVeg: true }
      ],
      snacks: [
        { name: 'Pav Baji', category: 'snacks', isVeg: true },
        { name: 'Tea / Coffee', category: 'snacks', isVeg: true }
      ],
      dinner: [
        { name: 'Punjabi Paratha', category: 'dinner', isVeg: true },
        { name: 'Rajma Makkan Wala', category: 'dinner', isVeg: true },
        { name: 'Dosa with Idly Podi', category: 'dinner', isVeg: true },
        { name: 'Special Chutney', category: 'dinner', isVeg: true },
        { name: 'Steamed Rice', category: 'dinner', isVeg: true },
        { name: 'Vegetable Dal', category: 'dinner', isVeg: true },
        { name: 'Rasam', category: 'dinner', isVeg: true },
        { name: 'Pickle', category: 'dinner', isVeg: true },
        { name: 'Fryums', category: 'dinner', isVeg: true },
        { name: 'Veg Salad', category: 'dinner', isVeg: true }
      ]
    }
  },
  {
    day: 'Tuesday',
    date: '2024-01-02',
    meals: {
      breakfast: [
        { name: 'Bread with Butter & Jam', category: 'breakfast', isVeg: true },
        { name: 'Ghee Pongal', category: 'breakfast', isVeg: true },
        { name: 'Vadai', category: 'breakfast', isVeg: true },
        { name: 'Veg Kosthu', category: 'breakfast', isVeg: true },
        { name: 'Coconut Chutney', category: 'breakfast', isVeg: true },
        { name: 'Poha with Mint Chutney', category: 'breakfast', isVeg: true },
        { name: 'Tea / Coffee / Milk', category: 'breakfast', isVeg: true }
      ],
      lunch: [
        { name: 'Sweet Poori', category: 'lunch', isVeg: true },
        { name: 'Matar Ghunghi', category: 'lunch', isVeg: true },
        { name: 'Veg Rice', category: 'lunch', isVeg: true },
        { name: 'Steamed Rice', category: 'lunch', isVeg: true },
        { name: 'Sambar Dal', category: 'lunch', isVeg: true },
        { name: 'Lemon Rasam', category: 'lunch', isVeg: true },
        { name: 'Tomato Rasam', category: 'lunch', isVeg: true },
        { name: 'Gobi-65 / Bhindi Fry', category: 'lunch', isVeg: true },
        { name: 'Fryums', category: 'lunch', isVeg: true },
        { name: 'Butter Milk', category: 'lunch', isVeg: true },
        { name: 'Pickle', category: 'lunch', isVeg: true }
      ],
      snacks: [
        { name: 'Boiled Peanut', category: 'snacks', isVeg: true },
        { name: 'Black Channa', category: 'snacks', isVeg: true },
        { name: 'Tea / Coffee', category: 'snacks', isVeg: true }
      ],
      dinner: [
        { name: 'Chappathi', category: 'dinner', isVeg: true },
        { name: 'Mix Veg Khurma', category: 'dinner', isVeg: true },
        { name: 'Fried Rice / Noodles', category: 'dinner', isVeg: true },
        { name: 'Manchurian Dry', category: 'dinner', isVeg: true },
        { name: 'Crispy Vegetable', category: 'dinner', isVeg: true },
        { name: 'Steamed Rice', category: 'dinner', isVeg: true },
        { name: 'Rasam', category: 'dinner', isVeg: true },
        { name: 'Dal Fry', category: 'dinner', isVeg: true },
        { name: 'Pickle', category: 'dinner', isVeg: true },
        { name: 'Fryums', category: 'dinner', isVeg: true },
        { name: 'Veg Salad', category: 'dinner', isVeg: true },
        { name: 'Chicken Gravy', category: 'dinner', isVeg: false, isSpecial: true }
      ]
    }
  },
  {
    day: 'Wednesday',
    date: '2024-01-03',
    meals: {
      breakfast: [
        { name: 'Bread with Butter & Jam', category: 'breakfast', isVeg: true },
        { name: 'Dosa with Idly Podi', category: 'breakfast', isVeg: true },
        { name: 'Aravathiya Sambar', category: 'breakfast', isVeg: true },
        { name: 'Chutney', category: 'breakfast', isVeg: true },
        { name: 'Chappathi', category: 'breakfast', isVeg: true },
        { name: 'Aloo Rajma Masala', category: 'breakfast', isVeg: true },
        { name: 'Tea / Coffee / Milk', category: 'breakfast', isVeg: true },
        { name: 'Banana', category: 'breakfast', isVeg: true }
      ],
      lunch: [
        { name: 'Butter Roti', category: 'lunch', isVeg: true },
        { name: 'Aloo Palak', category: 'lunch', isVeg: true },
        { name: 'Steamed Rice', category: 'lunch', isVeg: true },
        { name: 'Sambar', category: 'lunch', isVeg: true },
        { name: 'Garlic Rasam', category: 'lunch', isVeg: true },
        { name: 'Pickle', category: 'lunch', isVeg: true },
        { name: 'Fryums', category: 'lunch', isVeg: true },
        { name: 'Butter Milk', category: 'lunch', isVeg: true }
      ],
      snacks: [
        { name: 'Juice (one)', category: 'snacks', isVeg: true, isSpecial: true },
        { name: 'Tea / Coffee', category: 'snacks', isVeg: true }
      ],
      dinner: [
        { name: 'Chappathi', category: 'dinner', isVeg: true },
        { name: 'Steamed Rice', category: 'dinner', isVeg: true },
        { name: 'Bud Tadka', category: 'dinner', isVeg: true },
        { name: 'Chicken Masala / Paneer Butter Masala', category: 'dinner', isVeg: true, isSpecial: true },
        { name: 'Rasam', category: 'dinner', isVeg: true },
        { name: 'Pickle', category: 'dinner', isVeg: true },
        { name: 'Fryums', category: 'dinner', isVeg: true },
        { name: 'Veg Salad', category: 'dinner', isVeg: true },
        { name: 'Milk', category: 'dinner', isVeg: true }
      ]
    }
  },
  // Add remaining days...
];

export const getMenuForDay = (dayName: string): DayMenu | undefined => {
  return weeklyMenu.find(menu => menu.day.toLowerCase() === dayName.toLowerCase());
};

export const getTodaysMenu = (): DayMenu => {
  const today = new Date().getDay();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return getMenuForDay(days[today]) || weeklyMenu[0];
};
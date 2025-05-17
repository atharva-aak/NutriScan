import { FoodItem, FoodScan, NutritionTip, DashboardStat } from '../types';

export const mockFoods: FoodItem[] = [
  {
    id: 'f1',
    name: 'Apple',
    calories: 95,
    protein: 0.5,
    carbs: 25,
    fat: 0.3,
    category: 'fruits',
    imageUrl: 'https://images.pexels.com/photos/1630588/pexels-photo-1630588.jpeg'
  },
  {
    id: 'f2',
    name: 'Banana',
    calories: 105,
    protein: 1.3,
    carbs: 27,
    fat: 0.4,
    category: 'fruits',
    imageUrl: 'https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg'
  },
  {
    id: 'f3',
    name: 'Grilled Chicken Breast',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    category: 'protein',
    imageUrl: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg'
  },
  {
    id: 'f4',
    name: 'Salmon Fillet',
    calories: 206,
    protein: 22,
    carbs: 0,
    fat: 13,
    category: 'protein',
    imageUrl: 'https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg'
  },
  {
    id: 'f5',
    name: 'Quinoa',
    calories: 222,
    protein: 8,
    carbs: 39,
    fat: 3.6,
    category: 'grains',
    imageUrl: 'https://images.pexels.com/photos/543730/pexels-photo-543730.jpeg'
  },
  {
    id: 'f6',
    name: 'Avocado',
    calories: 240,
    protein: 3,
    carbs: 12,
    fat: 22,
    category: 'fruits',
    imageUrl: 'https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg'
  },
  {
    id: 'f7',
    name: 'Sweet Potato',
    calories: 112,
    protein: 2,
    carbs: 26,
    fat: 0.1,
    category: 'vegetables',
    imageUrl: 'https://images.pexels.com/photos/89247/pexels-photo-89247.jpeg'
  },
  {
    id: 'f8',
    name: 'Greek Yogurt',
    calories: 130,
    protein: 17,
    carbs: 6,
    fat: 4,
    category: 'dairy',
    imageUrl: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg'
  }
];

export const mockScans: FoodScan[] = [
  {
    id: 's1',
    timestamp: '2023-06-10T12:30:00Z',
    imageUrl: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg',
    foods: [mockFoods[0], mockFoods[1]],
    totalCalories: mockFoods[0].calories + mockFoods[1].calories,
  },
  {
    id: 's2',
    timestamp: '2023-06-09T18:45:00Z',
    imageUrl: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg',
    foods: [mockFoods[2], mockFoods[4], mockFoods[6]],
    totalCalories: mockFoods[2].calories + mockFoods[4].calories + mockFoods[6].calories,
  },
  {
    id: 's3',
    timestamp: '2023-06-09T08:15:00Z',
    imageUrl: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg',
    foods: [mockFoods[7], mockFoods[5]],
    totalCalories: mockFoods[7].calories + mockFoods[5].calories,
  }
];

export const nutritionTips: NutritionTip[] = [
  {
    id: 'tip1',
    title: 'Balance Your Macros',
    description: 'Aim for a balanced intake of proteins, carbs, and fats for optimal energy and health.',
    type: 'general'
  },
  {
    id: 'tip2',
    title: 'Hydration Matters',
    description: 'Drink at least 8 glasses of water daily to maintain proper hydration and metabolism.',
    type: 'general'
  },
  {
    id: 'tip3',
    title: 'Fruit Nutrition',
    description: 'Fruits are packed with essential vitamins and antioxidants, but be mindful of their natural sugar content.',
    type: 'specific',
    relatedCategory: 'fruits'
  },
  {
    id: 'tip4',
    title: 'Protein Benefits',
    description: 'Lean proteins help build muscle, support immune function, and keep you feeling full longer.',
    type: 'specific',
    relatedCategory: 'protein'
  },
  {
    id: 'tip5',
    title: 'Whole Grain Goodness',
    description: 'Whole grains provide fiber, vitamins, and sustained energy compared to refined alternatives.',
    type: 'specific',
    relatedCategory: 'grains'
  },
  {
    id: 'tip6',
    title: 'Vegetable Variety',
    description: 'Eat a rainbow of vegetables daily to get a wide spectrum of nutrients and antioxidants.',
    type: 'specific',
    relatedCategory: 'vegetables'
  }
];

export const dashboardStats: DashboardStat[] = [
  {
    id: 'stat1',
    label: 'Average Daily Calories',
    value: 1850,
    unit: 'kcal',
    change: -5.2,
    icon: 'Flame'
  },
  {
    id: 'stat2',
    label: 'Protein Intake',
    value: 95,
    unit: 'g',
    change: 12.4,
    icon: 'Beef'
  },
  {
    id: 'stat3',
    label: 'Daily Water',
    value: 1.8,
    unit: 'L',
    change: 8.3,
    icon: 'Droplets'
  },
  {
    id: 'stat4',
    label: 'Food Scans This Week',
    value: 14,
    unit: '',
    change: 27.3,
    icon: 'Camera'
  }
];
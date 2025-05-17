export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  category: string;
  imageUrl: string;
}

export interface FoodScan {
  id: string;
  timestamp: string;
  imageUrl: string;
  foods: FoodItem[];
  totalCalories: number;
}

export interface NutritionTip {
  id: string;
  title: string;
  description: string;
  type: 'general' | 'specific';
  // If specific, related to this food category
  relatedCategory?: string;
}

export interface DashboardStat {
  id: string;
  label: string;
  value: number;
  unit: string;
  change: number;
  icon: string;
}
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Share2, Heart, Bookmark, Download, ChevronLeft, Info, LineChart } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { nutritionTips } from '../data/mockData';
import { FoodScan, NutritionTip } from '../types';

const Results = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, toggleFavorite } = useUser();
  const [scan, setScan] = useState<FoodScan | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [relevantTips, setRelevantTips] = useState<NutritionTip[]>([]);
  const [activeTab, setActiveTab] = useState<'nutrition' | 'tips'>('nutrition');

  useEffect(() => {
    if (!user || !id) {
      navigate('/scan');
      return;
    }

    const foundScan = user.scans.find(s => s.id === id);
    if (!foundScan) {
      navigate('/scan');
      return;
    }

    setScan(foundScan);
    setIsFavorite(user.favorites.includes(foundScan.id));

    // Get relevant tips based on food categories
    const foodCategories = foundScan.foods.map(food => food.category);
    const uniqueCategories = [...new Set(foodCategories)];
    
    const tips = nutritionTips.filter(tip => 
      tip.type === 'general' || 
      (tip.type === 'specific' && tip.relatedCategory && uniqueCategories.includes(tip.relatedCategory))
    );
    
    setRelevantTips(tips);
  }, [id, user, navigate]);

  const handleToggleFavorite = () => {
    if (!scan) return;
    toggleFavorite(scan.id);
    setIsFavorite(!isFavorite);
  };

  if (!scan) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading scan results...</p>
        </div>
      </div>
    );
  }

  // Format the date for display
  const scanDate = new Date(scan.timestamp);
  const formattedDate = scanDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container-custom py-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link to="/scan" className="inline-flex items-center text-gray-600 hover:text-primary-600 transition-colors">
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back to Scan
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Scan Results</h1>
                <p className="text-gray-500">{formattedDate}</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={handleToggleFavorite}
                  className={`p-2 rounded-full ${isFavorite ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                  aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} />
                </button>
                <button 
                  className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
                  aria-label="Share"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button 
                  className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
                  aria-label="Save"
                >
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="h-56 overflow-hidden">
                <img 
                  src={scan.imageUrl} 
                  alt="Scanned food" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {scan.foods.length > 1 
                        ? `${scan.foods[0].name} & ${scan.foods.length - 1} more` 
                        : scan.foods[0].name}
                    </h2>
                    <p className="text-gray-500">
                      {scan.foods.length} item{scan.foods.length !== 1 ? 's' : ''} identified
                    </p>
                  </div>
                  <div className="bg-primary-100 text-primary-800 px-4 py-1.5 rounded-full text-lg font-semibold">
                    {scan.totalCalories} kcal
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex space-x-4 border-b">
                    <button
                      onClick={() => setActiveTab('nutrition')}
                      className={`py-3 px-1 font-medium text-sm relative ${
                        activeTab === 'nutrition' 
                          ? 'text-primary-600' 
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      Nutrition Facts
                      {activeTab === 'nutrition' && (
                        <motion.div
                          layoutId="activeTabIndicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
                        />
                      )}
                    </button>
                    <button
                      onClick={() => setActiveTab('tips')}
                      className={`py-3 px-1 font-medium text-sm relative ${
                        activeTab === 'tips' 
                          ? 'text-primary-600' 
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      Health Tips
                      {activeTab === 'tips' && (
                        <motion.div
                          layoutId="activeTabIndicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
                        />
                      )}
                    </button>
                  </div>
                </div>

                {activeTab === 'nutrition' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-4">Macronutrients</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <div className="w-8 h-8 bg-primary-100 rounded-full mx-auto flex items-center justify-center mb-2">
                            <span className="text-primary-600 font-semibold">P</span>
                          </div>
                          <p className="text-xs text-gray-500 mb-1">Protein</p>
                          <p className="text-xl font-bold">
                            {scan.foods.reduce((sum, food) => sum + food.protein, 0).toFixed(1)}g
                          </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <div className="w-8 h-8 bg-secondary-100 rounded-full mx-auto flex items-center justify-center mb-2">
                            <span className="text-secondary-600 font-semibold">C</span>
                          </div>
                          <p className="text-xs text-gray-500 mb-1">Carbs</p>
                          <p className="text-xl font-bold">
                            {scan.foods.reduce((sum, food) => sum + food.carbs, 0).toFixed(1)}g
                          </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <div className="w-8 h-8 bg-accent-100 rounded-full mx-auto flex items-center justify-center mb-2">
                            <span className="text-accent-600 font-semibold">F</span>
                          </div>
                          <p className="text-xs text-gray-500 mb-1">Fat</p>
                          <p className="text-xl font-bold">
                            {scan.foods.reduce((sum, food) => sum + food.fat, 0).toFixed(1)}g
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Identified Foods</h3>
                      <div className="space-y-4">
                        {scan.foods.map((food) => (
                          <div 
                            key={food.id}
                            className="flex items-center justify-between border-b border-gray-100 pb-3"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-lg overflow-hidden">
                                <img 
                                  src={food.imageUrl} 
                                  alt={food.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="font-medium">{food.name}</h4>
                                <p className="text-xs text-gray-500 capitalize">{food.category}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">{food.calories} kcal</p>
                              <p className="text-xs text-gray-500">
                                P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'tips' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="mb-4 bg-gray-50 p-4 rounded-lg flex gap-2 text-sm">
                      <Info className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                      <p>
                        These health tips are tailored to your meal's nutritional profile. 
                        For personalized nutrition advice, please consult with a healthcare professional.
                      </p>
                    </div>

                    <div className="space-y-5">
                      {relevantTips.map((tip) => (
                        <div 
                          key={tip.id}
                          className="p-4 border border-gray-100 rounded-lg"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-full ${
                              tip.type === 'specific' 
                                ? 'bg-primary-100 text-primary-600' 
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              <Info className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1">{tip.title}</h4>
                              <p className="text-gray-600 text-sm">{tip.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex justify-center">
                      <Link 
                        to="/dashboard" 
                        className="flex items-center gap-2 text-primary-600 font-medium"
                      >
                        <LineChart className="w-5 h-5" />
                        View your nutrition dashboard
                      </Link>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          <div className="flex justify-between">
            <Link to="/scan" className="btn btn-secondary">
              Scan Another
            </Link>
            <button className="btn btn-primary">
              <Download className="mr-2 w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
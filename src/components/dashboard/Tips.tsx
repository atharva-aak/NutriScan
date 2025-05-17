import { motion } from 'framer-motion';
import { Lightbulb, ExternalLink, BookOpen, Coffee, Apple, Wheat as Meat, Wheat, Battery, Clock, Award } from 'lucide-react';
import { nutritionTips } from '../../data/mockData';

const Tips = () => {
  // Organize tips by category
  const generalTips = nutritionTips.filter(tip => tip.type === 'general');
  const specificTips = nutritionTips.filter(tip => tip.type === 'specific');

  const categoryIcons: Record<string, JSX.Element> = {
    fruits: <Apple className="w-5 h-5" />,
    protein: <Meat className="w-5 h-5" />,
    grains: <Wheat className="w-5 h-5" />,
    vegetables: <Coffee className="w-5 h-5" />
  };

  return (
    <div>
      {/* Featured Tip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-lg text-white p-8 mb-8"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/20 rounded-full">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Nutrition Tip of the Day</h2>
            <p className="opacity-90 mb-4">
              Aim for a colorful plate at each meal. Different colored fruits and vegetables contain 
              different nutrients, so eating a variety helps ensure you're getting a wide range of vitamins and minerals.
            </p>
            <a 
              href="#" 
              className="inline-flex items-center text-white/90 hover:text-white font-medium"
            >
              Learn more <ExternalLink className="ml-1 w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Tips Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* General Tips */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-full">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold">General Nutrition Tips</h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {generalTips.map((tip, index) => (
                  <motion.div
                    key={tip.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary-100 text-primary-600 rounded-lg">
                        <Lightbulb className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{tip.title}</h3>
                        <p className="text-sm text-gray-600">{tip.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick References */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-full">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold">Quick References</h2>
            </div>
            <div className="p-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-secondary-100 text-secondary-600 rounded-lg">
                      <Battery className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Daily Calorie Needs</h3>
                      <p className="text-sm text-gray-600">
                        Average adult needs 1,800-2,400 calories per day, varying by activity level, age, and gender.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-secondary-100 text-secondary-600 rounded-lg">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Meal Timing</h3>
                      <p className="text-sm text-gray-600">
                        Eating smaller meals every 3-4 hours can help maintain energy levels and prevent overeating.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-secondary-100 text-secondary-600 rounded-lg">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Nutrition Resources</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Expand your knowledge with these trusted sources:
                      </p>
                      <ul className="text-xs space-y-1 text-primary-600">
                        <li><a href="#" className="hover:underline">USDA Dietary Guidelines</a></li>
                        <li><a href="#" className="hover:underline">Harvard Nutrition Source</a></li>
                        <li><a href="#" className="hover:underline">WHO Nutrition Guides</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Food-Specific Tips */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold">Food Category Tips</h2>
          <p className="text-sm text-gray-500">Specific nutrition advice for different food groups</p>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {specificTips.map((tip, index) => {
              const category = tip.relatedCategory || 'general';
              const Icon = category in categoryIcons ? 
                () => categoryIcons[category] : 
                () => <Lightbulb className="w-5 h-5" />;

              return (
                <motion.div
                  key={tip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-5 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${
                      category === 'fruits' ? 'bg-red-100 text-red-600' :
                      category === 'vegetables' ? 'bg-green-100 text-green-600' :
                      category === 'protein' ? 'bg-blue-100 text-blue-600' :
                      category === 'grains' ? 'bg-amber-100 text-amber-600' :
                      'bg-primary-100 text-primary-600'
                    }`}>
                      <Icon />
                    </div>
                    <div>
                      <div className="flex items-center mb-1">
                        <h3 className="font-semibold">{tip.title}</h3>
                        <span className="ml-2 text-xs px-2 py-0.5 bg-gray-100 rounded-full capitalize">
                          {tip.relatedCategory}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{tip.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tips;
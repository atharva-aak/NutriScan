import { ArrowRight, BarChart3, LineChart, TrendingUp, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { dashboardStats } from '../../data/mockData';
import { useUser } from '../../context/UserContext';

const Overview = () => {
  const { user } = useUser();
  
  // Get the 5 most recent scans
  const recentScans = [...user.scans].slice(0, 4);
  
  // Calculate total calories this week
  const totalCalories = user.scans.reduce((sum, scan) => sum + scan.totalCalories, 0);
  
  // Calculate average calories per scan
  const avgCalories = user.scans.length > 0 ? Math.round(totalCalories / user.scans.length) : 0;

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {dashboardStats.map((stat, index) => {
          const StatIcon = () => {
            switch (stat.icon) {
              case 'Flame': return <TrendingUp className="w-5 h-5" />;
              case 'Beef': return <BarChart3 className="w-5 h-5" />;
              case 'Droplets': return <LineChart className="w-5 h-5" />;
              case 'Camera': return <TrendingUp className="w-5 h-5" />;
              default: return <TrendingUp className="w-5 h-5" />;
            }
          };
          
          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-4"
            >
              <div className="flex justify-between mb-2">
                <div className={`p-2 rounded-lg ${index % 2 === 0 ? 'bg-primary-100' : 'bg-secondary-100'}`}>
                  <StatIcon />
                </div>
                <div className={`flex items-center ${
                  stat.change > 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.change > 0 ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  <span className="text-xs font-medium">{Math.abs(stat.change)}%</span>
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold mr-1">{stat.value}</span>
                {stat.unit && <span className="text-gray-500 text-sm">{stat.unit}</span>}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Scans */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Recent Scans</h2>
          <Link to="/dashboard/history" className="text-primary-600 text-sm font-medium flex items-center">
            View All <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
        <div className="p-4">
          {recentScans.length > 0 ? (
            <div className="space-y-4">
              {recentScans.map((scan, index) => (
                <motion.div
                  key={scan.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={scan.imageUrl} 
                      alt="Food scan" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">
                          {scan.foods.length > 1 
                            ? `${scan.foods[0].name} & ${scan.foods.length - 1} more` 
                            : scan.foods[0].name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {new Date(scan.timestamp).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <div className="bg-primary-100 text-primary-800 px-2 py-0.5 rounded-full text-sm">
                        {scan.totalCalories} kcal
                      </div>
                    </div>
                    <div className="flex gap-2 mt-1">
                      {scan.foods.map(food => (
                        <span key={food.id} className="text-xs bg-gray-100 px-2 py-0.5 rounded-full capitalize">
                          {food.category}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link 
                    to={`/results/${scan.id}`}
                    className="text-primary-600 flex-shrink-0"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No scans available yet.</p>
              <Link to="/scan" className="mt-2 btn btn-primary inline-flex">
                Scan a meal
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Nutrition Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold">Nutrition Summary</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-4">Macronutrient Distribution</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Protein</span>
                    <span className="text-sm text-gray-500">35%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Carbs</span>
                    <span className="text-sm text-gray-500">45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-secondary-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Fat</span>
                    <span className="text-sm text-gray-500">20%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-accent-500 h-2.5 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-4">Food Categories</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-xs text-gray-500">Fruits & Vegetables</span>
                  <p className="text-lg font-semibold">38%</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-xs text-gray-500">Protein</span>
                  <p className="text-lg font-semibold">25%</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-xs text-gray-500">Grains</span>
                  <p className="text-lg font-semibold">22%</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-xs text-gray-500">Other</span>
                  <p className="text-lg font-semibold">15%</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <div className="bg-primary-50 border border-primary-100 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary-100 text-primary-700 rounded-full mt-0.5">
                  <LineChart className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Your Nutrition Insights</h4>
                  <p className="text-sm text-gray-600">
                    Based on your recent scans, you're maintaining a balanced diet with good protein intake. 
                    Consider increasing your fruit and vegetable consumption for more fiber and essential vitamins.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
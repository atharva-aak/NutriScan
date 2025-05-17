import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Search, ChevronDown, Filter, ArrowRight, Heart } from 'lucide-react';
import { useUser } from '../../context/UserContext';

const History = () => {
  const { user, toggleFavorite } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  
  const categories = ['all', 'fruits', 'vegetables', 'protein', 'grains', 'dairy'];
  
  // Filter scans based on search and category
  const filteredScans = user.scans.filter(scan => {
    // Search term filter
    const searchMatch = searchTerm === '' || 
      scan.foods.some(food => 
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    // Category filter
    const categoryMatch = filterCategory === 'all' || 
      scan.foods.some(food => food.category === filterCategory);
    
    return searchMatch && categoryMatch;
  });
  
  // Sort scans
  const sortedScans = [...filteredScans].sort((a, b) => {
    const dateA = new Date(a.timestamp).getTime();
    const dateB = new Date(b.timestamp).getTime();
    
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold">Scan History</h2>
      </div>
      
      <div className="p-4 border-b border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search food items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
            
            <div className="relative">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        {sortedScans.length > 0 ? (
          <div className="space-y-4">
            {sortedScans.map((scan, index) => {
              const scanDate = new Date(scan.timestamp);
              const formattedDate = scanDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });
              
              const formattedTime = scanDate.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              });
              
              const isFavorite = user.favorites.includes(scan.id);
              
              return (
                <motion.div
                  key={scan.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center gap-4 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={scan.imageUrl} 
                      alt="Food scan" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">
                          {scan.foods.length > 1 
                            ? `${scan.foods[0].name} & ${scan.foods.length - 1} more` 
                            : scan.foods[0].name}
                        </h3>
                        <div className="flex items-center text-xs text-gray-500 gap-2 mt-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formattedDate}, {formattedTime}</span>
                        </div>
                      </div>
                      <div className="bg-primary-100 text-primary-800 px-2 py-0.5 rounded-full text-sm">
                        {scan.totalCalories} kcal
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {scan.foods.map(food => (
                        <span key={food.id} className="text-xs bg-gray-100 px-2 py-0.5 rounded-full capitalize">
                          {food.category}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => toggleFavorite(scan.id)}
                      className={`p-2 rounded-full ${
                        isFavorite ? 'text-red-500 bg-red-50' : 'text-gray-400 bg-gray-50 hover:bg-gray-100'
                      }`}
                      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Heart className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} />
                    </button>
                    <Link
                      to={`/results/${scan.id}`}
                      className="p-2 rounded-full bg-primary-50 text-primary-600 hover:bg-primary-100"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No matching scans found.</p>
            {searchTerm || filterCategory !== 'all' ? (
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setFilterCategory('all');
                }}
                className="btn btn-secondary"
              >
                Clear Filters
              </button>
            ) : (
              <Link to="/scan" className="btn btn-primary">
                Scan a meal
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
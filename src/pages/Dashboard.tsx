import { useState } from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, LayoutDashboard, History as HistoryIcon, Lightbulb, ArrowRight, ChevronDown, 
  LineChart, BarChart3, Heart, TrendingUp, Clock, Settings } from 'lucide-react';
import { dashboardStats } from '../data/mockData';
import { useUser } from '../context/UserContext';
import Overview from '../components/dashboard/Overview';
import History from '../components/dashboard/History';
import Tips from '../components/dashboard/Tips';

const Dashboard = () => {
  const location = useLocation();
  const { user } = useUser();
  const [showMobileNav, setShowMobileNav] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'History', path: '/dashboard/history', icon: <HistoryIcon className="w-5 h-5" /> },
    { name: 'Health Tips', path: '/dashboard/tips', icon: <Lightbulb className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="container-custom">
        <div className="py-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
              <p className="text-gray-600">Monitor your nutrition and progress</p>
            </div>
            
            {/* Mobile Navigation Toggle */}
            <button 
              onClick={() => setShowMobileNav(!showMobileNav)}
              className="md:hidden btn btn-secondary flex items-center gap-2"
            >
              Navigate <ChevronDown className={`w-4 h-4 transition-transform ${showMobileNav ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Mobile Navigation Dropdown */}
          {showMobileNav && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 bg-white rounded-lg shadow-sm border border-gray-100 md:hidden"
            >
              <div className="p-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    end={item.path === '/dashboard'}
                    onClick={() => setShowMobileNav(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-primary-50 text-primary-600' 
                          : 'text-gray-600 hover:bg-gray-50'
                      }`
                    }
                  >
                    {item.icon}
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Desktop Sidebar */}
            <div className="hidden md:block">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="font-semibold text-primary-700">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-gray-500 text-sm">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500">Total scans</p>
                      <p className="font-semibold">{user.scans.length}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Favorites</p>
                      <p className="font-semibold">{user.favorites.length}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Streak</p>
                      <p className="font-semibold">3 days</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-2">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      end={item.path === '/dashboard'}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          isActive 
                            ? 'bg-primary-50 text-primary-600' 
                            : 'text-gray-600 hover:bg-gray-50'
                        }`
                      }
                    >
                      {item.icon}
                      {item.name}
                    </NavLink>
                  ))}
                </div>
                
                <div className="p-4 mt-2 mb-2">
                  <button className="flex items-center gap-2 w-full py-3 px-4 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    <Settings className="w-5 h-5" />
                    Settings
                  </button>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="md:col-span-3">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Routes>
                  <Route index element={<Overview />} />
                  <Route path="history" element={<History />} />
                  <Route path="tips" element={<Tips />} />
                </Routes>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
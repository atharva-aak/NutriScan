import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ScanLine, Home, LayoutDashboard, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';

interface NavbarProps {
  isScrolled: boolean;
}

const Navbar = ({ isScrolled }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navItems = [
    { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'Scan Food', path: '/scan', icon: <ScanLine className="w-5 h-5" /> },
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 z-50" onClick={closeMenu}>
          <div className="bg-primary-500 text-white p-2 rounded-lg">
            <ScanLine className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl">NutriScan</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-primary-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
          
          <button 
            onClick={() => navigate('/scan')}
            className="btn btn-primary ml-4"
          >
            Scan Now
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden z-50 p-2"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-40 md:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `flex items-center gap-3 text-lg font-medium transition-colors ${
                      isActive 
                        ? 'text-primary-600' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`
                  }
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              ))}
              
              <button 
                onClick={() => {
                  closeMenu();
                  navigate('/scan');
                }}
                className="btn btn-primary mt-4"
              >
                Scan Now
              </button>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
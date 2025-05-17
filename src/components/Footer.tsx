import { Link } from 'react-router-dom';
import { ScanLine, Instagram, Twitter, Facebook, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-12 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-primary-500 text-white p-2 rounded-lg">
                <ScanLine className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl">NutriScan</span>
            </Link>
            <p className="text-gray-600 text-sm mb-4">
              Scan, track, and improve your nutrition with our AI-powered food analysis tool.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm uppercase text-gray-900 mb-4">Features</h4>
            <ul className="space-y-3">
              <li><Link to="/scan" className="text-gray-600 hover:text-primary-600 text-sm">Food Scanning</Link></li>
              <li><Link to="/dashboard" className="text-gray-600 hover:text-primary-600 text-sm">Nutrition Dashboard</Link></li>
              <li><Link to="/dashboard/history" className="text-gray-600 hover:text-primary-600 text-sm">Meal History</Link></li>
              <li><Link to="/dashboard/tips" className="text-gray-600 hover:text-primary-600 text-sm">Health Tips</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm uppercase text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-primary-600 text-sm">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600 text-sm">Nutrition Guide</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600 text-sm">API Documentation</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600 text-sm">Community</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm uppercase text-gray-900 mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-primary-600 text-sm">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600 text-sm">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600 text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600 text-sm">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">© {currentYear} NutriScan. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-500 hover:text-primary-600">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-primary-600">Terms of Service</a>
            <a href="#" className="text-sm text-gray-500 hover:text-primary-600">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Scan from './pages/Scan';
import Results from './pages/Results';
import Dashboard from './pages/Dashboard';
import { UserProvider } from './context/UserContext';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-primary-600 font-medium">Loading NutriScan...</p>
        </div>
      </div>
    );
  }

  return (
    <UserProvider>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="scan" element={<Scan />} />
            <Route path="results/:id" element={<Results />} />
            <Route path="dashboard/*" element={<Dashboard />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </UserProvider>
  );
}

export default App;
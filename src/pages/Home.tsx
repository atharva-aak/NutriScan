import { motion } from 'framer-motion';
import { ArrowRight, ScanLine, LayoutDashboard, LineChart, Salad, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="container-custom py-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col justify-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600"
            >
              Understand Your Food at a Glance
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-gray-700 mb-8 max-w-lg"
            >
              Simply scan your food with our advanced AI, instantly get nutrition facts, calorie information, and personalized health tips.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <Link 
                to="/scan" 
                className="btn btn-primary py-3 px-6 rounded-xl text-base"
              >
                Start Scanning <ScanLine className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                to="/dashboard" 
                className="btn btn-secondary py-3 px-6 rounded-xl text-base"
              >
                View Dashboard <LayoutDashboard className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </div>
          <div className="flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-primary-500 rounded-3xl rotate-3 opacity-20"></div>
              <div className="relative z-10 glass-card overflow-hidden rounded-3xl shadow-xl">
                <img 
                  src="https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg"
                  alt="Food scanning demonstration" 
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg">Breakfast Bowl</h3>
                      <p className="text-gray-600">Scanned Today</p>
                    </div>
                    <div className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      420 kcal
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Protein</p>
                      <p className="font-semibold">18g</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Carbs</p>
                      <p className="font-semibold">65g</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Fat</p>
                      <p className="font-semibold">12g</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-primary-600">Health Tip</p>
                    <p className="text-sm">This meal is rich in antioxidants and fiber, which supports healthy digestion.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,202.7C384,192,480,160,576,165.3C672,171,768,213,864,218.7C960,224,1056,192,1152,170.7C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How NutriScan Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our powerful AI technology makes understanding your food simple, accurate, and personalized to your health goals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card p-6"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <ScanLine className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Scan Your Food</h3>
              <p className="text-gray-600 mb-4">Take a photo of your meal or food item and our AI will identify it instantly.</p>
              <Link to="/scan" className="text-primary-600 font-medium inline-flex items-center">
                Try Scanning <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card p-6"
            >
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
                <Utensils className="w-6 h-6 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Nutrition Facts</h3>
              <p className="text-gray-600 mb-4">Receive detailed nutritional information including calories, macros, vitamins, and more.</p>
              <Link to="/results/s1" className="text-secondary-600 font-medium inline-flex items-center">
                View Example <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card p-6"
            >
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                <LineChart className="w-6 h-6 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Track Your Progress</h3>
              <p className="text-gray-600 mb-4">Monitor your nutrition patterns, set goals, and see your improvement over time.</p>
              <Link to="/dashboard" className="text-accent-600 font-medium inline-flex items-center">
                See Dashboard <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Empowering Your Health Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">NutriScan uses advanced AI to help you make informed decisions about your diet and nutrition.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="https://images.pexels.com/photos/4813368/pexels-photo-4813368.jpeg" 
                alt="Healthy lifestyle" 
                className="rounded-xl shadow-lg object-cover"
              />
            </motion.div>
            
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Salad className="w-5 h-5 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Smart Food Recognition</h3>
                </div>
                <p className="text-gray-600 pl-14">Our AI can identify multiple food items in a single image with up to 95% accuracy.</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-8"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <LineChart className="w-5 h-5 text-secondary-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Personalized Insights</h3>
                </div>
                <p className="text-gray-600 pl-14">Get custom health tips based on your scan history and nutritional patterns.</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <LayoutDashboard className="w-5 h-5 text-accent-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Comprehensive Dashboard</h3>
                </div>
                <p className="text-gray-600 pl-14">Track trends, set goals, and monitor your progress with our intuitive dashboard.</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8"
              >
                <Link to="/scan" className="btn btn-primary">
                  Start Your Journey
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Nutrition?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Join thousands of health-conscious individuals using NutriScan to make informed food choices.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/scan" className="btn bg-white text-primary-600 hover:bg-gray-100 py-3 px-8 text-base font-medium">
              Start Scanning Now
            </Link>
            <Link to="/dashboard" className="btn border border-white text-white hover:bg-white/10 py-3 px-8 text-base font-medium">
              Explore Features
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, Image, ScanLine, Info, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { mockFoods } from '../data/mockData';
import { useUser } from '../context/UserContext';
import { FoodScan } from '../types';

const Scan = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();
  const { addScan } = useUser();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
    
    // Create a preview URL
    const fileUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(fileUrl);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1
  });

  const resetImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setFile(null);
    setPreviewUrl(null);
  };

  const scanImage = () => {
    if (!file) return;
    
    setIsScanning(true);
    
    // Simulate scanning processing
    setTimeout(() => {
      // Create a mock scan result
      const randomFoods = [...mockFoods]
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.floor(Math.random() * 3) + 1);
      
      const totalCals = randomFoods.reduce((sum, food) => sum + food.calories, 0);
      
      const newScan: FoodScan = {
        id: `s${Date.now()}`,
        timestamp: new Date().toISOString(),
        imageUrl: previewUrl || 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg',
        foods: randomFoods,
        totalCalories: totalCals
      };
      
      // Add to user's scans
      addScan(newScan);
      
      // Navigate to results
      navigate(`/results/${newScan.id}`);
      
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container-custom py-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-center">Scan Your Food</h1>
            <p className="text-gray-600 text-center mb-8">
              Take a photo or upload an image of your food to get nutritional information
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="inline-flex items-center ml-2 text-gray-500 hover:text-primary-600"
                aria-label="More information"
              >
                <Info className="w-4 h-4" />
              </button>
            </p>
            
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-gray-50 p-4 rounded-lg mb-6 text-sm text-gray-700"
              >
                <h4 className="font-medium mb-2">For best results:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Ensure good lighting on your food</li>
                  <li>Try to capture the entire dish</li>
                  <li>For packaged foods, you can also scan the nutrition label</li>
                  <li>Images must be .jpg, .png, or .webp format</li>
                </ul>
              </motion.div>
            )}
          </motion.div>

          <div className="mb-8">
            {!previewUrl ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`border-2 border-dashed rounded-xl p-8 text-center ${
                  isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400'
                }`}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center py-6">
                  <div className="mb-4 p-4 bg-gray-100 rounded-full">
                    <Image className="w-8 h-8 text-gray-500" />
                  </div>
                  <p className="mb-2 font-medium">
                    {isDragActive ? 'Drop the image here' : 'Drag & drop a food image here'}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">or click to select a file</p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      document.querySelector('input[type="file"]')?.click();
                    }}
                  >
                    Select Image
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative rounded-xl overflow-hidden"
              >
                <img 
                  src={previewUrl} 
                  alt="Food preview" 
                  className="w-full h-[400px] object-cover"
                />
                <button
                  onClick={resetImage}
                  className="absolute top-4 right-4 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </div>

          {previewUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center"
            >
              <button
                disabled={isScanning}
                onClick={scanImage}
                className={`btn btn-primary py-3 px-8 text-base flex items-center ${
                  isScanning ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isScanning ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Analyzing Image...
                  </>
                ) : (
                  <>
                    <ScanLine className="mr-2 w-5 h-5" />
                    Analyze Nutrition
                  </>
                )}
              </button>
            </motion.div>
          )}

          <div className="mt-16">
            <h3 className="text-xl font-semibold mb-4">Recent Scans</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {mockFoods.slice(0, 3).map((food) => (
                <motion.div
                  key={food.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="card overflow-hidden"
                >
                  <img 
                    src={food.imageUrl} 
                    alt={food.name} 
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{food.name}</h4>
                      <span className="text-sm bg-primary-100 text-primary-800 px-2 py-0.5 rounded-full">
                        {food.calories} kcal
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scan;
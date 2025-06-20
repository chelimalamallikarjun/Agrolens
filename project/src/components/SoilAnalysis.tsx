import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, TestTube, Beaker, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface SoilResult {
  ph: number;
  nitrogen: 'low' | 'medium' | 'high';
  phosphorus: 'low' | 'medium' | 'high';
  potassium: 'low' | 'medium' | 'high';
  organicMatter: number;
  soilType: string;
  recommendations: string[];
  suitableCrops: string[];
  fertilizers: { name: string; quantity: string }[];
}

const sampleResults: { [key: string]: SoilResult } = {
  fertile: {
    ph: 6.8,
    nitrogen: 'high',
    phosphorus: 'medium',
    potassium: 'high',
    organicMatter: 3.2,
    soilType: 'Loamy',
    recommendations: [
      'Soil is in excellent condition for most crops',
      'Maintain organic matter through compost',
      'Continue current fertilization practices',
      'Monitor pH levels regularly'
    ],
    suitableCrops: ['Rice', 'Cotton', 'Maize', 'Vegetables', 'Pulses'],
    fertilizers: [
      { name: 'Urea', quantity: '50 kg/acre' },
      { name: 'DAP', quantity: '25 kg/acre' },
      { name: 'Potash', quantity: '15 kg/acre' }
    ]
  },
  deficient: {
    ph: 5.2,
    nitrogen: 'low',
    phosphorus: 'low',
    potassium: 'medium',
    organicMatter: 1.8,
    soilType: 'Sandy',
    recommendations: [
      'Soil is acidic - apply lime to increase pH',
      'Add organic matter through compost or FYM',
      'Increase nitrogen and phosphorus fertilizers',
      'Consider green manuring'
    ],
    suitableCrops: ['Groundnut', 'Millets', 'Pulses'],
    fertilizers: [
      { name: 'Lime', quantity: '200 kg/acre' },
      { name: 'Urea', quantity: '80 kg/acre' },
      { name: 'DAP', quantity: '50 kg/acre' },
      { name: 'Compost', quantity: '2 tons/acre' }
    ]
  },
  alkaline: {
    ph: 8.5,
    nitrogen: 'medium',
    phosphorus: 'high',
    potassium: 'low',
    organicMatter: 2.1,
    soilType: 'Clay',
    recommendations: [
      'Soil is alkaline - add organic matter to reduce pH',
      'Apply gypsum to improve soil structure',
      'Increase potassium fertilizers',
      'Improve drainage to prevent waterlogging'
    ],
    suitableCrops: ['Cotton', 'Sugarcane', 'Wheat', 'Barley'],
    fertilizers: [
      { name: 'Gypsum', quantity: '250 kg/acre' },
      { name: 'Potash', quantity: '40 kg/acre' },
      { name: 'Organic Compost', quantity: '3 tons/acre' },
      { name: 'Sulfur', quantity: '20 kg/acre' }
    ]
  }
};

export default function SoilAnalysis() {
  const { translate } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [soilResult, setSoilResult] = useState<SoilResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showCamera, setShowCamera] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        simulateAnalysis();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    setSoilResult(null);
    
    setTimeout(() => {
      const results = Object.values(sampleResults);
      const randomResult = results[Math.floor(Math.random() * results.length)];
      setSoilResult(randomResult);
      setIsAnalyzing(false);
    }, 4000);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setShowCamera(true);
      }
    } catch (error) {
      alert('Camera access denied or not available');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');
        setSelectedImage(imageData);
        setShowCamera(false);
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        simulateAnalysis();
      }
    }
  };

  const getNutrientColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPHColor = (ph: number) => {
    if (ph < 6.0) return 'text-red-600';
    if (ph > 8.0) return 'text-orange-600';
    return 'text-green-600';
  };

  const getPHStatus = (ph: number) => {
    if (ph < 6.0) return 'Acidic';
    if (ph > 8.0) return 'Alkaline';
    return 'Neutral';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-amber-800 mb-2">
            Soil Analysis & Testing
          </h1>
          <p className="text-gray-600 flex items-center">
            <TestTube className="w-5 h-5 mr-2" />
            AI-powered soil analysis with crop recommendations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {!showCamera ? (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Soil Sample</h2>
                
                <div className="space-y-4">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-amber-300 rounded-xl p-8 text-center cursor-pointer hover:border-amber-400 hover:bg-amber-50 transition-all duration-300"
                  >
                    <Upload className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-700 mb-2">
                      Click to upload soil image
                    </p>
                    <p className="text-sm text-gray-500">
                      Clear image of soil sample required
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startCamera}
                    className="w-full flex items-center justify-center space-x-2 bg-amber-600 text-white py-3 rounded-xl hover:bg-amber-700 transition-colors"
                  >
                    <Camera className="w-5 h-5" />
                    <span>Use Camera</span>
                  </motion.button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                {selectedImage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Soil Sample</h3>
                    <div className="relative">
                      <img
                        src={selectedImage}
                        alt="Soil sample"
                        className="w-full h-64 object-cover rounded-xl"
                      />
                      {isAnalyzing && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-xl">
                          <div className="text-center text-white">
                            <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-2"></div>
                            <p>Analyzing soil composition...</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Camera Capture</h2>
                <div className="relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-64 object-cover rounded-xl bg-gray-100"
                  />
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={capturePhoto}
                      className="bg-amber-600 text-white p-3 rounded-full hover:bg-amber-700 transition-colors"
                    >
                      <Camera className="w-6 h-6" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowCamera(false)}
                      className="bg-gray-600 text-white p-3 rounded-full hover:bg-gray-700 transition-colors"
                    >
                      ✕
                    </motion.button>
                  </div>
                </div>
              </div>
            )}

            {/* Testing Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                <Beaker className="w-5 h-5 mr-2" />
                Soil Testing Tips
              </h3>
              <ul className="space-y-2 text-blue-700">
                <li>• Collect soil from 6-8 inches depth</li>
                <li>• Remove stones, roots, and debris</li>
                <li>• Take samples from multiple spots</li>
                <li>• Ensure soil is slightly moist, not wet</li>
                <li>• Capture clear, well-lit images</li>
              </ul>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {soilResult ? (
              <>
                {/* Soil Analysis Results */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Soil Analysis Results</h2>
                  
                  {/* pH and Soil Type */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h3 className="text-sm font-medium text-gray-600 mb-1">pH Level</h3>
                      <div className="flex items-center space-x-2">
                        <span className={`text-2xl font-bold ${getPHColor(soilResult.ph)}`}>
                          {soilResult.ph}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPHColor(soilResult.ph)} bg-opacity-20`}>
                          {getPHStatus(soilResult.ph)}
                        </span>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h3 className="text-sm font-medium text-gray-600 mb-1">Soil Type</h3>
                      <p className="text-2xl font-bold text-gray-800">{soilResult.soilType}</p>
                    </div>
                  </div>

                  {/* Nutrient Levels */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Nutrient Levels</h3>
                    <div className="space-y-3">
                      {[
                        { name: 'Nitrogen (N)', level: soilResult.nitrogen },
                        { name: 'Phosphorus (P)', level: soilResult.phosphorus },
                        { name: 'Potassium (K)', level: soilResult.potassium }
                      ].map((nutrient, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-700">{nutrient.name}</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getNutrientColor(nutrient.level)}`}>
                            {nutrient.level.toUpperCase()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Organic Matter */}
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-green-800">Organic Matter</span>
                      <span className="text-xl font-bold text-green-600">{soilResult.organicMatter}%</span>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Recommendations</h3>
                  <div className="space-y-3">
                    {soilResult.recommendations.map((recommendation, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg"
                      >
                        <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-700">{recommendation}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Suitable Crops */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Suitable Crops</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {soilResult.suitableCrops.map((crop, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-center font-medium"
                      >
                        {crop}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Fertilizer Recommendations */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Fertilizer Recommendations</h3>
                  <div className="space-y-3">
                    {soilResult.fertilizers.map((fertilizer, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <span className="font-medium text-blue-800">{fertilizer.name}</span>
                        <span className="text-blue-600 font-semibold">{fertilizer.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-amber-600 text-white py-3 px-4 rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    Download Report
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Test Another Sample
                  </motion.button>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="text-center py-12">
                  <TestTube className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Ready to Analyze
                  </h3>
                  <p className="text-gray-500">
                    Upload a soil sample image to get detailed analysis and recommendations
                  </p>
                </div>
              </div>
            )}

            {/* Sample Analysis */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Try Sample Analysis</h3>
              <div className="grid grid-cols-3 gap-3">
                {['fertile', 'deficient', 'alkaline'].map((type, index) => (
                  <motion.div
                    key={type}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => {
                      setSelectedImage(`/soil-${type}.jpg`);
                      setSoilResult(sampleResults[type]);
                    }}
                    className="cursor-pointer bg-gray-100 rounded-lg p-3 text-center hover:bg-gray-200 transition-colors"
                  >
                    <div className="w-full h-16 bg-gradient-to-br from-amber-200 to-orange-300 rounded-lg mb-2 flex items-center justify-center">
                      <span className="text-2xl">
                        {type === 'fertile' ? '🌱' : type === 'deficient' ? '⚠️' : '🧪'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 capitalize">{type} Soil</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
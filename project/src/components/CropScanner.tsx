import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, Search, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ScanResult {
  cropHealth: 'healthy' | 'diseased' | 'pest_damage' | 'nutrient_deficiency';
  confidence: number;
  diagnosis: string;
  recommendations: string[];
  severity: 'low' | 'medium' | 'high';
}

const sampleResults: { [key: string]: ScanResult } = {
  healthy: {
    cropHealth: 'healthy',
    confidence: 95,
    diagnosis: 'Crop appears healthy with good growth patterns',
    recommendations: [
      'Continue current care routine',
      'Monitor for early signs of stress',
      'Maintain adequate water supply',
      'Consider nutrient supplementation during flowering stage'
    ],
    severity: 'low'
  },
  diseased: {
    cropHealth: 'diseased',
    confidence: 88,
    diagnosis: 'Early signs of fungal infection detected on leaves',
    recommendations: [
      'Apply fungicide spray immediately',
      'Improve field drainage to reduce moisture',
      'Remove affected plant parts',
      'Monitor neighboring plants for spread',
      'Consider copper-based treatments'
    ],
    severity: 'medium'
  },
  pest_damage: {
    cropHealth: 'pest_damage',
    confidence: 92,
    diagnosis: 'Pest damage visible - likely bollworm infestation',
    recommendations: [
      'Apply targeted pesticide treatment',
      'Use pheromone traps for monitoring',
      'Inspect plants daily for larvae',
      'Consider biological pest control methods',
      'Harvest early if damage is severe'
    ],
    severity: 'high'
  }
};

export default function CropScanner() {
  const { translate } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showCamera, setShowCamera] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        simulateScan();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateScan = () => {
    setIsScanning(true);
    setScanResult(null);
    
    setTimeout(() => {
      const results = Object.values(sampleResults);
      const randomResult = results[Math.floor(Math.random() * results.length)];
      setScanResult(randomResult);
      setIsScanning(false);
    }, 3000);
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
        // Stop camera stream
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        simulateScan();
      }
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'diseased': return 'text-red-600 bg-red-100';
      case 'pest_damage': return 'text-orange-600 bg-orange-100';
      case 'nutrient_deficiency': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-teal-800 mb-2">
            Crop Quality Scanner
          </h1>
          <p className="text-gray-600 flex items-center">
            <Search className="w-5 h-5 mr-2" />
            AI-powered crop health analysis and disease detection
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
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Crop Image</h2>
                
                <div className="space-y-4">
                  {/* Upload Button */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-teal-300 rounded-xl p-8 text-center cursor-pointer hover:border-teal-400 hover:bg-teal-50 transition-all duration-300"
                  >
                    <Upload className="w-12 h-12 text-teal-500 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-700 mb-2">
                      Click to upload image
                    </p>
                    <p className="text-sm text-gray-500">
                      Supports JPG, PNG files up to 10MB
                    </p>
                  </div>

                  {/* Camera Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startCamera}
                    className="w-full flex items-center justify-center space-x-2 bg-teal-600 text-white py-3 rounded-xl hover:bg-teal-700 transition-colors"
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

                {/* Selected Image Preview */}
                {selectedImage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Selected Image</h3>
                    <div className="relative">
                      <img
                        src={selectedImage}
                        alt="Selected crop"
                        className="w-full h-64 object-cover rounded-xl"
                      />
                      {isScanning && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-xl">
                          <div className="text-center text-white">
                            <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-2"></div>
                            <p>Analyzing crop...</p>
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
                      className="bg-teal-600 text-white p-3 rounded-full hover:bg-teal-700 transition-colors"
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

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2" />
                Scanning Tips
              </h3>
              <ul className="space-y-2 text-blue-700">
                <li>• Capture clear, well-lit images of leaves or crops</li>
                <li>• Focus on areas showing symptoms or damage</li>
                <li>• Avoid blurry or dark images</li>
                <li>• Include multiple angles if possible</li>
                <li>• Ensure the crop fills most of the frame</li>
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
            {scanResult ? (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Analysis Results</h2>
                
                {/* Health Status */}
                <div className="mb-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getHealthColor(scanResult.cropHealth)}`}>
                      {scanResult.cropHealth.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className="text-gray-600">
                      Confidence: {scanResult.confidence}%
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    {scanResult.cropHealth === 'healthy' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertTriangle className={`w-5 h-5 ${getSeverityColor(scanResult.severity)}`} />
                    )}
                    <span className={`font-medium ${getSeverityColor(scanResult.severity)}`}>
                      {scanResult.severity.toUpperCase()} PRIORITY
                    </span>
                  </div>

                  <p className="text-gray-700 leading-relaxed">{scanResult.diagnosis}</p>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommendations</h3>
                  <div className="space-y-3">
                    {scanResult.recommendations.map((recommendation, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="flex-shrink-0 w-6 h-6 bg-teal-600 text-white text-sm rounded-full flex items-center justify-center font-medium">
                          {index + 1}
                        </span>
                        <p className="text-gray-700">{recommendation}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-gray-200">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Save Report
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Scan Another
                  </motion.button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="text-center py-12">
                  <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Ready to Analyze
                  </h3>
                  <p className="text-gray-500">
                    Upload an image or use your camera to start crop analysis
                  </p>
                </div>
              </div>
            )}

            {/* Sample Images */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Try Sample Images</h3>
              <div className="grid grid-cols-3 gap-3">
                {['healthy', 'diseased', 'pest_damage'].map((type, index) => (
                  <motion.div
                    key={type}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => {
                      setSelectedImage(`/sample-${type}.jpg`);
                      setScanResult(sampleResults[type]);
                    }}
                    className="cursor-pointer bg-gray-100 rounded-lg p-3 text-center hover:bg-gray-200 transition-colors"
                  >
                    <div className="w-full h-16 bg-gradient-to-br from-green-200 to-green-300 rounded-lg mb-2 flex items-center justify-center">
                      <span className="text-2xl">
                        {type === 'healthy' ? '🌱' : type === 'diseased' ? '🦠' : '🐛'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 capitalize">{type.replace('_', ' ')}</p>
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
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Thermometer, Droplets, Sun, Cloud, Snowflake } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Crop {
  id: string;
  name: string;
  season: 'kharif' | 'rabi' | 'summer';
  sowingPeriod: string;
  harvestPeriod: string;
  duration: string;
  waterRequirement: 'low' | 'medium' | 'high';
  soilType: string[];
  expectedYield: string;
  marketPrice: string;
  tips: string[];
  icon: string;
}

const seasonalCrops: Crop[] = [
  // Kharif Crops (Monsoon/Rainy Season)
  {
    id: '1',
    name: 'Rice (Paddy)',
    season: 'kharif',
    sowingPeriod: 'June - July',
    harvestPeriod: 'November - December',
    duration: '120-150 days',
    waterRequirement: 'high',
    soilType: ['Clay', 'Loamy'],
    expectedYield: '25-30 quintals/acre',
    marketPrice: '₹2,200-2,400/quintal',
    tips: [
      'Ensure proper water management',
      'Use certified seeds',
      'Apply fertilizers in split doses',
      'Monitor for pest attacks'
    ],
    icon: '🌾'
  },
  {
    id: '2',
    name: 'Cotton',
    season: 'kharif',
    sowingPeriod: 'May - June',
    harvestPeriod: 'October - January',
    duration: '180-200 days',
    waterRequirement: 'medium',
    soilType: ['Black Cotton Soil', 'Red Soil'],
    expectedYield: '8-12 quintals/acre',
    marketPrice: '₹6,800-7,200/quintal',
    tips: [
      'Use Bt cotton varieties',
      'Regular monitoring for bollworm',
      'Proper spacing between plants',
      'Timely application of growth regulators'
    ],
    icon: '🌸'
  },
  {
    id: '3',
    name: 'Maize',
    season: 'kharif',
    sowingPeriod: 'June - July',
    harvestPeriod: 'September - October',
    duration: '90-110 days',
    waterRequirement: 'medium',
    soilType: ['Loamy', 'Sandy Loam'],
    expectedYield: '20-25 quintals/acre',
    marketPrice: '₹2,000-2,300/quintal',
    tips: [
      'Ensure good drainage',
      'Apply nitrogen in split doses',
      'Control weeds early',
      'Harvest at proper moisture content'
    ],
    icon: '🌽'
  },
  // Rabi Crops (Winter Season)
  {
    id: '4',
    name: 'Wheat',
    season: 'rabi',
    sowingPeriod: 'November - December',
    harvestPeriod: 'March - April',
    duration: '120-140 days',
    waterRequirement: 'medium',
    soilType: ['Loamy', 'Clay Loam'],
    expectedYield: '18-22 quintals/acre',
    marketPrice: '₹2,100-2,300/quintal',
    tips: [
      'Sow at optimal temperature',
      'Use recommended seed rate',
      'Apply irrigation at critical stages',
      'Control yellow rust disease'
    ],
    icon: '🌾'
  },
  {
    id: '5',
    name: 'Chickpea (Chana)',
    season: 'rabi',
    sowingPeriod: 'October - November',
    harvestPeriod: 'February - March',
    duration: '90-120 days',
    waterRequirement: 'low',
    soilType: ['Black Soil', 'Red Soil'],
    expectedYield: '8-12 quintals/acre',
    marketPrice: '₹5,500-6,000/quintal',
    tips: [
      'Avoid waterlogging',
      'Use rhizobium culture',
      'Control pod borer',
      'Harvest when pods are dry'
    ],
    icon: '🫘'
  },
  {
    id: '6',
    name: 'Mustard',
    season: 'rabi',
    sowingPeriod: 'October - November',
    harvestPeriod: 'February - March',
    duration: '90-110 days',
    waterRequirement: 'low',
    soilType: ['Loamy', 'Sandy Loam'],
    expectedYield: '6-8 quintals/acre',
    marketPrice: '₹5,200-5,800/quintal',
    tips: [
      'Sow in well-prepared field',
      'Apply sulfur fertilizer',
      'Control aphids',
      'Harvest when pods turn brown'
    ],
    icon: '🌻'
  },
  // Summer Crops
  {
    id: '7',
    name: 'Watermelon',
    season: 'summer',
    sowingPeriod: 'February - March',
    harvestPeriod: 'May - June',
    duration: '90-100 days',
    waterRequirement: 'high',
    soilType: ['Sandy Loam', 'Well-drained'],
    expectedYield: '150-200 quintals/acre',
    marketPrice: '₹8-15/kg',
    tips: [
      'Ensure adequate water supply',
      'Use mulching to conserve moisture',
      'Control fruit fly',
      'Harvest when fruit sounds hollow'
    ],
    icon: '🍉'
  },
  {
    id: '8',
    name: 'Fodder Maize',
    season: 'summer',
    sowingPeriod: 'February - March',
    harvestPeriod: 'May - June',
    duration: '65-75 days',
    waterRequirement: 'high',
    soilType: ['Loamy', 'Sandy Loam'],
    expectedYield: '300-400 quintals/acre',
    marketPrice: '₹2-3/kg',
    tips: [
      'Frequent irrigation required',
      'High nitrogen application',
      'Cut at milk stage for best quality',
      'Can be grown multiple times'
    ],
    icon: '🌱'
  }
];

export default function SeasonalCrops() {
  const { translate } = useLanguage();
  const [selectedSeason, setSelectedSeason] = useState<'all' | 'kharif' | 'rabi' | 'summer'>('all');
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);

  const filteredCrops = selectedSeason === 'all' 
    ? seasonalCrops 
    : seasonalCrops.filter(crop => crop.season === selectedSeason);

  const getSeasonIcon = (season: string) => {
    switch (season) {
      case 'kharif': return <Cloud className="w-6 h-6 text-blue-600" />;
      case 'rabi': return <Snowflake className="w-6 h-6 text-cyan-600" />;
      case 'summer': return <Sun className="w-6 h-6 text-yellow-600" />;
      default: return <Calendar className="w-6 h-6 text-gray-600" />;
    }
  };

  const getSeasonColor = (season: string) => {
    switch (season) {
      case 'kharif': return 'bg-blue-100 text-blue-800';
      case 'rabi': return 'bg-cyan-100 text-cyan-800';
      case 'summer': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getWaterRequirementColor = (requirement: string) => {
    switch (requirement) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-emerald-800 mb-2">
            Seasonal Crops Guide
          </h1>
          <p className="text-gray-600 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Crop recommendations by season for Telangana
          </p>
        </motion.div>

        {/* Season Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 sm:mb-0">Select Season</h2>
            <div className="flex space-x-2 bg-gray-100 rounded-lg p-1">
              {[
                { key: 'all', label: 'All Seasons', icon: <Calendar className="w-4 h-4" /> },
                { key: 'kharif', label: 'Kharif (Monsoon)', icon: <Cloud className="w-4 h-4" /> },
                { key: 'rabi', label: 'Rabi (Winter)', icon: <Snowflake className="w-4 h-4" /> },
                { key: 'summer', label: 'Summer', icon: <Sun className="w-4 h-4" /> }
              ].map((season) => (
                <button
                  key={season.key}
                  onClick={() => setSelectedSeason(season.key as any)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                    selectedSeason === season.key
                      ? 'bg-white text-emerald-600 shadow-sm'
                      : 'text-gray-600 hover:text-emerald-600'
                  }`}
                >
                  {season.icon}
                  <span className="hidden sm:inline">{season.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Season Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Cloud className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-blue-800">Kharif Season</h3>
              </div>
              <p className="text-blue-700 text-sm">June - November (Monsoon crops)</p>
            </div>
            <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Snowflake className="w-5 h-5 text-cyan-600" />
                <h3 className="font-semibold text-cyan-800">Rabi Season</h3>
              </div>
              <p className="text-cyan-700 text-sm">November - April (Winter crops)</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Sun className="w-5 h-5 text-yellow-600" />
                <h3 className="font-semibold text-yellow-800">Summer Season</h3>
              </div>
              <p className="text-yellow-700 text-sm">March - June (Summer crops)</p>
            </div>
          </div>
        </motion.div>

        {/* Crops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map((crop, index) => (
            <motion.div
              key={crop.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedCrop(crop)}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{crop.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{crop.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeasonColor(crop.season)}`}>
                        {crop.season.charAt(0).toUpperCase() + crop.season.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Sowing:</span>
                    <span className="font-medium text-gray-800">{crop.sowingPeriod}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Harvest:</span>
                    <span className="font-medium text-gray-800">{crop.harvestPeriod}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium text-gray-800">{crop.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center">
                      <Droplets className="w-4 h-4 mr-1" />
                      Water:
                    </span>
                    <span className={`font-medium ${getWaterRequirementColor(crop.waterRequirement)}`}>
                      {crop.waterRequirement.charAt(0).toUpperCase() + crop.waterRequirement.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Expected Yield</p>
                      <p className="font-semibold text-emerald-600">{crop.expectedYield}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Market Price</p>
                      <p className="font-semibold text-emerald-600">{crop.marketPrice}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCrops.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No crops found for selected season</p>
          </div>
        )}

        {/* Crop Detail Modal */}
        {selectedCrop && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <span className="text-4xl">{selectedCrop.icon}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">{selectedCrop.name}</h2>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeasonColor(selectedCrop.season)}`}>
                        {selectedCrop.season.charAt(0).toUpperCase() + selectedCrop.season.slice(1)} Season
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCrop(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Timing Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <h3 className="font-semibold text-green-800 mb-2">Sowing Period</h3>
                      <p className="text-green-700">{selectedCrop.sowingPeriod}</p>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                      <h3 className="font-semibold text-orange-800 mb-2">Harvest Period</h3>
                      <p className="text-orange-700">{selectedCrop.harvestPeriod}</p>
                    </div>
                  </div>

                  {/* Crop Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Crop Details</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium">{selectedCrop.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 flex items-center">
                            <Droplets className="w-4 h-4 mr-1" />
                            Water Need:
                          </span>
                          <span className={`font-medium ${getWaterRequirementColor(selectedCrop.waterRequirement)}`}>
                            {selectedCrop.waterRequirement.charAt(0).toUpperCase() + selectedCrop.waterRequirement.slice(1)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Expected Yield:</span>
                          <span className="font-medium text-emerald-600">{selectedCrop.expectedYield}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Market Price:</span>
                          <span className="font-medium text-emerald-600">{selectedCrop.marketPrice}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Soil Requirements</h3>
                      <div className="space-y-2">
                        {selectedCrop.soilType.map((soil, index) => (
                          <span
                            key={index}
                            className="inline-block bg-brown-100 text-brown-800 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                          >
                            {soil}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Farming Tips */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Farming Tips</h3>
                    <div className="space-y-2">
                      {selectedCrop.tips.map((tip, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                          <span className="flex-shrink-0 w-6 h-6 bg-emerald-600 text-white text-sm rounded-full flex items-center justify-center font-medium">
                            {index + 1}
                          </span>
                          <p className="text-gray-700">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-end pt-6 border-t border-gray-200">
                    <button
                      onClick={() => setSelectedCrop(null)}
                      className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
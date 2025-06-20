import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, MapPin, RefreshCw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface CropPrice {
  id: string;
  crop: string;
  district: string;
  market: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  date: string;
  trend: 'up' | 'down' | 'stable';
}

const sampleCropData: CropPrice[] = [
  { id: '1', crop: 'Rice (Paddy)', district: 'Warangal', market: 'Warangal Market', minPrice: 2100, maxPrice: 2400, modalPrice: 2250, date: '2024-01-15', trend: 'up' },
  { id: '2', crop: 'Cotton', district: 'Adilabad', market: 'Adilabad Cotton Market', minPrice: 6700, maxPrice: 7100, modalPrice: 6900, date: '2024-01-15', trend: 'down' },
  { id: '3', crop: 'Maize', district: 'Khammam', market: 'Khammam APMC', minPrice: 2000, maxPrice: 2300, modalPrice: 2150, date: '2024-01-15', trend: 'stable' },
  { id: '4', crop: 'Soybean', district: 'Karimnagar', market: 'Karimnagar Market', minPrice: 3500, maxPrice: 3900, modalPrice: 3700, date: '2024-01-15', trend: 'up' },
  { id: '5', crop: 'Red Gram (Tur)', district: 'Nizamabad', market: 'Nizamabad Market', minPrice: 6300, maxPrice: 6700, modalPrice: 6500, date: '2024-01-15', trend: 'stable' },
  { id: '6', crop: 'Groundnut', district: 'Nalgonda', market: 'Nalgonda APMC', minPrice: 5100, maxPrice: 5700, modalPrice: 5400, date: '2024-01-15', trend: 'down' },
  { id: '7', crop: 'Turmeric', district: 'Mahabubnagar', market: 'Mahabubnagar Market', minPrice: 12000, maxPrice: 14000, modalPrice: 13200, date: '2024-01-15', trend: 'up' },
  { id: '8', crop: 'Jowar', district: 'Suryapet', market: 'Suryapet APMC', minPrice: 1800, maxPrice: 2100, modalPrice: 1950, date: '2024-01-15', trend: 'stable' },
  { id: '9', crop: 'Sunflower', district: 'Siddipet', market: 'Siddipet Market', minPrice: 4200, maxPrice: 4600, modalPrice: 4400, date: '2024-01-15', trend: 'up' },
  { id: '10', crop: 'Pigeon Pea', district: 'Medak', market: 'Medak APMC', minPrice: 6200, maxPrice: 6600, modalPrice: 6400, date: '2024-01-15', trend: 'down' }
];

export default function MandiPrices() {
  const { translate } = useLanguage();
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [cropPrices, setCropPrices] = useState<CropPrice[]>(sampleCropData);
  const [loading, setLoading] = useState(false);

  const uniqueDistricts = Array.from(new Set(sampleCropData.map(item => item.district)));

  const filteredPrices = selectedDistrict === 'All Districts'
    ? cropPrices
    : cropPrices.filter(price => price.district === selectedDistrict);

  const refreshPrices = () => {
    setLoading(true);
    setTimeout(() => {
      const updatedPrices = cropPrices.map(price => ({
        ...price,
        modalPrice: Math.round(price.modalPrice + (Math.random() - 0.5) * 200),
        trend: Math.random() > 0.6 ? 'up' : Math.random() > 0.3 ? 'down' : 'stable'
      }));
      setCropPrices(updatedPrices);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-2">
            {translate('mandiPrices')}
          </h1>
          <p className="text-gray-600 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Live crop prices across Telangana districts
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <label className="text-sm font-medium text-gray-700">Select District:</label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="All Districts">All Districts</option>
                {uniqueDistricts.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={refreshPrices}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Prices</span>
            </motion.button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrices.map((price, index) => (
            <motion.div
              key={price.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{price.crop}</h3>
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {price.district}
                    </p>
                    <p className="text-xs text-gray-500">{price.market}</p>
                  </div>
                  <div className="flex items-center">
                    {price.trend === 'up' && <TrendingUp className="w-5 h-5 text-green-500" />}
                    {price.trend === 'down' && <TrendingDown className="w-5 h-5 text-red-500" />}
                    {price.trend === 'stable' && <div className="w-5 h-1 bg-gray-400 rounded" />}
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Modal Price:</span>
                    <span className="text-2xl font-bold text-green-600">
                      ₹{Math.round(price.modalPrice).toLocaleString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Min Price:</span>
                      <p className="font-semibold text-red-600">₹{price.minPrice.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Max Price:</span>
                      <p className="font-semibold text-green-600">₹{price.maxPrice.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 pt-3 border-t border-gray-100">
                    Last updated: {new Date(price.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPrices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No prices available for selected district</p>
          </div>
        )}
      </div>
    </div>
  );
}
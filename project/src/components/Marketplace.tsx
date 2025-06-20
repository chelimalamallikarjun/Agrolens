import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, MapPin, Calendar, Phone, Star, Filter, Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface MarketplaceItem {
  id: string;
  title: string;
  category: 'land_sale' | 'land_rent' | 'equipment_rent' | 'equipment_sale';
  price: number;
  location: string;
  description: string;
  contact: string;
  rating: number;
  posted: string;
  images: string[];
  specifications?: { [key: string]: string };
}

const marketplaceItems: MarketplaceItem[] = [
  {
    id: '1',
    title: '10 Acres Agricultural Land for Sale',
    category: 'land_sale',
    price: 2500000,
    location: 'Warangal District',
    description: 'Prime agricultural land with bore well, electricity connection, and road access. Suitable for cotton, rice, and maize cultivation.',
    contact: '+91 9876543210',
    rating: 4.8,
    posted: '2024-01-10',
    images: ['/land1.jpg'],
    specifications: {
      'Soil Type': 'Black Cotton Soil',
      'Water Source': 'Bore Well + Canal',
      'Electricity': 'Available',
      'Road Access': 'Yes'
    }
  },
  {
    id: '2',
    title: 'Tractor for Rent - Mahindra 575',
    category: 'equipment_rent',
    price: 800,
    location: 'Karimnagar',
    description: '75 HP tractor available for daily/monthly rent. Includes operator if needed. Well maintained and fuel efficient.',
    contact: '+91 9123456789',
    rating: 4.6,
    posted: '2024-01-12',
    images: ['/tractor1.jpg'],
    specifications: {
      'Power': '75 HP',
      'Fuel Type': 'Diesel',
      'Condition': 'Excellent',
      'Operator': 'Available'
    }
  },
  {
    id: '3',
    title: '5 Acres Land for Lease - 3 Years',
    category: 'land_rent',
    price: 50000,
    location: 'Nizamabad',
    description: 'Fertile land available for lease. Perfect for turmeric and cotton cultivation. All facilities available.',
    contact: '+91 9988776655',
    rating: 4.7,
    posted: '2024-01-08',
    images: ['/land2.jpg'],
    specifications: {
      'Lease Period': '3 Years',
      'Crops Allowed': 'All',
      'Water': 'Guaranteed',
      'Support': 'Technical advice included'
    }
  },
  {
    id: '4',
    title: 'Combine Harvester for Sale',
    category: 'equipment_sale',
    price: 1200000,
    location: 'Adilabad',
    description: 'Used combine harvester in good condition. Recently serviced. Suitable for rice and wheat harvesting.',
    contact: '+91 9876543211',
    rating: 4.4,
    posted: '2024-01-05',
    images: ['/harvester1.jpg'],
    specifications: {
      'Brand': 'New Holland',
      'Year': '2019',
      'Hours Used': '800 hours',
      'Condition': 'Good'
    }
  }
];

const telanganaDistricts = [
  'All Districts', 'Hyderabad', 'Warangal', 'Khammam', 'Nizamabad', 'Karimnagar', 
  'Rangareddy', 'Medak', 'Nalgonda', 'Mahabubnagar', 'Adilabad'
];

export default function Marketplace() {
  const { translate } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All Districts');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null);

  const filteredItems = marketplaceItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesDistrict = selectedDistrict === 'All Districts' || item.location.includes(selectedDistrict);
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesDistrict && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'land_sale': return '🏞️';
      case 'land_rent': return '🌾';
      case 'equipment_rent': return '🚜';
      case 'equipment_sale': return '⚙️';
      default: return '📦';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'land_sale': return 'Land for Sale';
      case 'land_rent': return 'Land for Rent';
      case 'equipment_rent': return 'Equipment Rent';
      case 'equipment_sale': return 'Equipment Sale';
      default: return 'All Items';
    }
  };

  const formatPrice = (price: number, category: string) => {
    if (category.includes('rent')) {
      return `₹${price.toLocaleString()}/month`;
    }
    return `₹${price.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-indigo-800 mb-2">
            Marketplace
          </h1>
          <p className="text-gray-600 flex items-center">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Buy, sell, and rent farming equipment & land
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Categories</option>
              <option value="land_sale">Land for Sale</option>
              <option value="land_rent">Land for Rent</option>
              <option value="equipment_rent">Equipment Rent</option>
              <option value="equipment_sale">Equipment Sale</option>
            </select>

            {/* District Filter */}
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              {telanganaDistricts.map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>

            {/* Post Ad Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Post Ad
            </motion.button>
          </div>
        </motion.div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedItem(item)}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-4xl">{getCategoryIcon(item.category)}</span>
              </div>

              <div className="p-6">
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
                    {getCategoryName(item.category)}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">{item.rating}</span>
                  </div>
                </div>

                {/* Title & Price */}
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-2xl font-bold text-indigo-600 mb-3">
                  {formatPrice(item.price, item.category)}
                </p>

                {/* Location & Date */}
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="mr-4">{item.location}</span>
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{new Date(item.posted).toLocaleDateString()}</span>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{item.description}</p>

                {/* Contact Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Contact Seller</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No items found matching your criteria</p>
          </div>
        )}

        {/* Item Detail Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">{selectedItem.title}</h2>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                {/* Image */}
                <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-6xl">{getCategoryIcon(selectedItem.category)}</span>
                </div>

                {/* Details */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="px-4 py-2 bg-indigo-100 text-indigo-800 font-medium rounded-full">
                      {getCategoryName(selectedItem.category)}
                    </span>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-indigo-600">
                        {formatPrice(selectedItem.price, selectedItem.category)}
                      </p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">{selectedItem.rating} rating</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                    <p className="text-gray-700">{selectedItem.description}</p>
                  </div>

                  {selectedItem.specifications && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Specifications</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(selectedItem.specifications).map(([key, value]) => (
                          <div key={key} className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-600">{key}</p>
                            <p className="font-medium text-gray-800">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{selectedItem.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Posted {new Date(selectedItem.posted).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="px-6 py-2 text-gray-600 hover:text-gray-700"
                    >
                      Close
                    </button>
                    <a
                      href={`tel:${selectedItem.contact}`}
                      className="flex items-center space-x-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call {selectedItem.contact}</span>
                    </a>
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
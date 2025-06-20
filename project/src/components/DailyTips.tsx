import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Star, TrendingUp, Lightbulb, Newspaper } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Tip {
  id: string;
  title: string;
  content: string;
  category: 'farming' | 'fertilizer' | 'weather' | 'market' | 'technology' | 'organic' | 'lowwater' | 'drip';
  date: string;
  priority: 'high' | 'medium' | 'low';
}

interface NewsItem {
  id: string;
  headline: string;
  summary: string;
  date: string;
  source: string;
}

const dailyTips: Tip[] = [
  {
    id: '1',
    title: 'Cotton Bollworm Management',
    content: 'Monitor cotton fields regularly for pink bollworm. Use pheromone traps and apply Bt cotton varieties. Spray neem oil during early morning or evening hours.',
    category: 'farming',
    date: '2024-01-15',
    priority: 'high'
  },
  {
    id: '2',
    title: 'Rice Fertilizer Schedule',
    content: 'Apply second dose of nitrogen fertilizer 21 days after transplanting. Use 25% at transplanting, 50% at tillering, and 25% at panicle initiation stage.',
    category: 'fertilizer',
    date: '2024-01-15',
    priority: 'high'
  },
  {
    id: '3',
    title: 'Weather Alert - Rain Expected',
    content: 'Light to moderate rainfall expected in next 3 days. Cover harvested crops and postpone spray operations. Ensure proper drainage in fields.',
    category: 'weather',
    date: '2024-01-15',
    priority: 'medium'
  },
  {
    id: '4',
    title: 'Turmeric Market Trends',
    content: 'Turmeric prices showing upward trend due to export demand. Good time to sell stored turmeric. Current rate: ₹13,200 per quintal in Nizamabad.',
    category: 'market',
    date: '2024-01-15',
    priority: 'medium'
  },
  {
    id: '5',
    title: 'Benefits of Organic Farming',
    content: 'Switching to organic farming improves soil health, reduces chemical usage, and fetches premium prices for produce.',
    category: 'organic',
    date: '2024-01-15',
    priority: 'medium'
  },
  {
    id: '6',
    title: 'Low-Water Crops for Drought Areas',
    content: 'Consider crops like millets, pulses, and oilseeds which require less water and are suitable for dry regions.',
    category: 'lowwater',
    date: '2024-01-15',
    priority: 'high'
  },
  {
    id: '7',
    title: 'Drip Irrigation Tips',
    content: 'Install drip irrigation to save water and fertilizer. Regularly check emitters for blockages and schedule irrigation during early morning or late evening.',
    category: 'drip',
    date: '2024-01-15',
    priority: 'medium'
  }
];

const newsItems: NewsItem[] = [
  {
    id: '1',
    headline: 'Government Announces New Crop Insurance Scheme',
    summary: 'Enhanced coverage for farmers with reduced premium rates and faster claim settlement process.',
    date: '2024-01-14',
    source: 'Ministry of Agriculture'
  },
  {
    id: '2',
    headline: 'Organic Farming Subsidies Increased',
    summary: 'Telangana government increases subsidies for organic farming practices to promote sustainable agriculture.',
    date: '2024-01-13',
    source: 'Telangana Agriculture Department'
  },
  {
    id: '3',
    headline: 'New Mobile App for Soil Testing',
    summary: 'AI-powered mobile application launched for instant soil analysis and fertilizer recommendations.',
    date: '2024-01-12',
    source: 'Agricultural Technology Center'
  }
];

export default function DailyTips() {
  const { translate } = useLanguage();
  const [activeTab, setActiveTab] = useState<'tips' | 'news'>('tips');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'farming' | 'fertilizer' | 'weather' | 'market' | 'technology'>('all');

  const filteredTips = selectedCategory === 'all' 
    ? dailyTips 
    : dailyTips.filter(tip => tip.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'farming': return <span className="text-green-600">🌾</span>;
      case 'fertilizer': return <span className="text-blue-600">🧪</span>;
      case 'weather': return <span className="text-yellow-600">🌤️</span>;
      case 'market': return <span className="text-purple-600">📈</span>;
      case 'technology': return <span className="text-indigo-600">💻</span>;
      case 'organic': return <span className="text-green-800">🥬</span>;
      case 'lowwater': return <span className="text-blue-800">💧</span>;
      case 'drip': return <span className="text-cyan-600">🚿</span>;
      default: return <Lightbulb className="w-5 h-5 text-orange-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-orange-800 mb-2">
            Daily Tips & News
          </h1>
          <p className="text-gray-600 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Stay updated with latest farming insights and agricultural news
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('tips')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'tips' 
                    ? 'bg-white text-orange-600 shadow-sm' 
                    : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Lightbulb className="w-4 h-4" />
                  <span>Tips</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('news')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'news' 
                    ? 'bg-white text-orange-600 shadow-sm' 
                    : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Newspaper className="w-4 h-4" />
                  <span>News</span>
                </div>
              </button>
            </div>

            {activeTab === 'tips' && (
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Categories</option>
                <option value="farming">Farming</option>
                <option value="fertilizer">Fertilizer</option>
                <option value="weather">Weather</option>
                <option value="market">Market</option>
                <option value="technology">Technology</option>
                <option value="organic">Organic Farming</option>
                <option value="lowwater">Low-water Crops</option>
                <option value="drip">Drip Irrigation</option>
              </select>
            )}
          </div>

          {/* Tips Content */}
          {activeTab === 'tips' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTips.map((tip, index) => (
                <motion.div
                  key={tip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getCategoryIcon(tip.category)}
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{tip.title}</h3>
                        <p className="text-sm text-gray-500 capitalize">{tip.category}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(tip.priority)}`}>
                      {tip.priority}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed mb-4">{tip.content}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{new Date(tip.date).toLocaleDateString()}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>Recommended</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* News Content */}
          {activeTab === 'news' && (
            <div className="space-y-6">
              {newsItems.map((news, index) => (
                <motion.div
                  key={news.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <Newspaper className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{news.headline}</h3>
                      <p className="text-gray-700 mb-4">{news.summary}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(news.date).toLocaleDateString()}</span>
                        </span>
                        <span className="font-medium text-blue-600">{news.source}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Today's Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-xl text-white p-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Today's Market Highlight</h2>
          </div>
          <p className="text-green-100 text-lg mb-4">
            Cotton prices are showing strong upward momentum across Telangana markets. Adilabad and Warangal districts reporting highest prices.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-green-200 text-sm">Average Price</p>
              <p className="text-2xl font-bold">₹7,200/quintal</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-green-200 text-sm">Price Change</p>
              <p className="text-2xl font-bold text-green-200">+₹150</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-green-200 text-sm">Best Market</p>
              <p className="text-lg font-bold">Adilabad</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
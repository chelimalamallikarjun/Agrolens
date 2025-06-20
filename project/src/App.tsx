import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import MandiPrices from './components/MandiPrices';
import WeatherForecast from './components/WeatherForecast';
import DailyTips from './components/DailyTips';
import Schemes from './components/Schemes';
import CropScanner from './components/CropScanner';
import Marketplace from './components/Marketplace';
import SeasonalCrops from './components/SeasonalCrops';
import SoilAnalysis from './components/SoilAnalysis';
import ChatBot from './components/ChatBot';
import LanguageProvider from './contexts/LanguageContext';
import './index.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-4 bg-green-600 rounded-full flex items-center justify-center"
          >
            <span className="text-white text-2xl">🌱</span>
          </motion.div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">AgroLens</h2>
          <p className="text-green-600">Loading your smart farming assistant...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
          <Header />
          <main className="relative">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/mandi-prices" element={<MandiPrices />} />
              <Route path="/weather" element={<WeatherForecast />} />
              <Route path="/tips" element={<DailyTips />} />
              <Route path="/schemes" element={<Schemes />} />
              <Route path="/crop-scanner" element={<CropScanner />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/seasonal-crops" element={<SeasonalCrops />} />
              <Route path="/soil-analysis" element={<SoilAnalysis />} />
            </Routes>
          </main>
          <ChatBot />
        </div>
      </Router>
    </LanguageProvider>
  );
}

function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Hero />
      <div className="container mx-auto px-4 py-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon="📊"
            title="Mandi Prices"
            description="Real-time crop prices across Telangana districts"
            href="/mandi-prices"
          />
          <FeatureCard
            icon="🌤️"
            title="Weather Forecast"
            description="Accurate weather predictions with farming tips"
            href="/weather"
          />
          <FeatureCard
            icon="📱"
            title="Crop Scanner"
            description="AI-powered crop quality analysis"
            href="/crop-scanner"
          />
          <FeatureCard
            icon="🏪"
            title="Marketplace"
            description="Buy, sell, and rent farming equipment & land"
            href="/marketplace"
          />
          <FeatureCard
            icon="🌾"
            title="Seasonal Crops"
            description="Crop recommendations by season"
            href="/seasonal-crops"
          />
          <FeatureCard
            icon="🧪"
            title="Soil Analysis"
            description="Smart soil testing & crop suggestions"
            href="/soil-analysis"
          />
        </div>
      </div>
    </motion.div>
  );
}

function FeatureCard({ icon, title, description, href }: {
  icon: string;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className="block bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-green-100"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.a>
  );
}

export default App;
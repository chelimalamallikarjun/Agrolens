import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, MapPin } from 'lucide-react';
import { useLanguage, languages, defaultLanguage } from '../contexts/LanguageContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const { currentLanguage, setLanguage, translate } = useLanguage();

  const navigation = [
    { name: translate('home'), href: '/' },
    { name: translate('mandiPrices'), href: '/mandi-prices' },
    { name: translate('weather'), href: '/weather' },
    { name: translate('tips'), href: '/tips' },
    { name: translate('schemes'), href: '/schemes' },
    { name: translate('cropScanner'), href: '/crop-scanner' },
    { name: translate('marketplace'), href: '/marketplace' },
    { name: translate('seasonalCrops'), href: '/seasonal-crops' },
    { name: translate('soilAnalysis'), href: '/soil-analysis' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg font-bold">🌱</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-green-800">{translate('appName')}</h1>
              <p className="text-xs text-green-600 flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                {translate('tagline')}
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Language Selector & Mobile Menu */}
          <div className="flex items-center space-x-2">
            {/* Language Selector */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 bg-green-100 hover:bg-green-200 rounded-lg transition-all duration-200"
              >
                <Globe className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  {currentLanguage.flag} {currentLanguage.name}
                </span>
              </motion.button>

              <AnimatePresence>
                {isLanguageMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                  >
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => {
                          setLanguage(language);
                          setIsLanguageMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-green-50 flex items-center space-x-3 transition-colors duration-200"
                      >
                        <span className="text-lg">{language.flag}</span>
                        <span className="text-sm font-medium text-gray-700">
                          {language.name}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden py-4 border-t border-gray-100"
            >
              <div className="space-y-2">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
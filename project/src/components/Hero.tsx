import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, TrendingUp, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Hero() {
  const { translate } = useLanguage();

  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{
        backgroundImage: "url('https://thumbs.dreamstime.com/z/farmer-plowing-bulls-wooden-plough-farmer-plowing-bulls-wooden-plough-maharashtra-india-109520589.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 opacity-40">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2334d399%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-40"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-green-600">{translate('welcome')}</span>
              <br />
              <span className="text-3xl md:text-4xl text-gray-700 font-normal">
                {translate('subtitle')}
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Get real-time mandi prices, weather forecasts, crop analysis, and government scheme information - all tailored for Telangana farmers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-green-600 text-white font-semibold rounded-2xl hover:bg-green-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <span>Explore Features</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-green-600 font-semibold rounded-2xl hover:bg-green-50 transition-all duration-300 border-2 border-green-600 shadow-lg hover:shadow-xl"
            >
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <FeatureHighlight
              icon={<TrendingUp className="w-8 h-8 text-green-600" />}
              title="Real-time Prices"
              description="Live mandi prices across all Telangana districts"
            />
            <FeatureHighlight
              icon={<Leaf className="w-8 h-8 text-green-600" />}
              title="AI-Powered Analysis"
              description="Smart crop and soil analysis using computer vision"
            />
            <FeatureHighlight
              icon={<Shield className="w-8 h-8 text-green-600" />}
              title="Government Schemes"
              description="Easy access to farming schemes and subsidies"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeatureHighlight({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}
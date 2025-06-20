import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, Eye, Gauge } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  forecast: DayForecast[];
  farmingTip: string;
}

interface DayForecast {
  day: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
  precipitation: number;
}

const sampleWeatherData: WeatherData = {
  location: 'Hyderabad, Telangana',
  temperature: 28,
  condition: 'Partly Cloudy',
  humidity: 65,
  windSpeed: 12,
  pressure: 1013,
  visibility: 10,
  uvIndex: 6,
  forecast: [
    { day: 'Today', high: 32, low: 22, condition: 'Sunny', icon: '☀️', precipitation: 0 },
    { day: 'Tomorrow', high: 30, low: 20, condition: 'Partly Cloudy', icon: '⛅', precipitation: 20 },
    { day: 'Wednesday', high: 28, low: 18, condition: 'Rainy', icon: '🌧️', precipitation: 80 },
    { day: 'Thursday', high: 29, low: 19, condition: 'Cloudy', icon: '☁️', precipitation: 40 },
    { day: 'Friday', high: 31, low: 21, condition: 'Sunny', icon: '☀️', precipitation: 10 },
  ],
  farmingTip: 'Good weather for cotton harvesting. Light rain expected on Wednesday - consider postponing field operations.'
};

const sampleWeatherByDistrict: Record<string, WeatherData> = {
  Hyderabad: sampleWeatherData,
  Warangal: { ...sampleWeatherData, location: 'Warangal, Telangana', temperature: 30, condition: 'Sunny' },
  Khammam: { ...sampleWeatherData, location: 'Khammam, Telangana', temperature: 27, condition: 'Rainy' },
  Nizamabad: { ...sampleWeatherData, location: 'Nizamabad, Telangana', temperature: 29, condition: 'Cloudy' },
  Karimnagar: { ...sampleWeatherData, location: 'Karimnagar, Telangana', temperature: 31, condition: 'Sunny' },
  Rangareddy: { ...sampleWeatherData, location: 'Rangareddy, Telangana', temperature: 28, condition: 'Partly Cloudy' },
  Medak: { ...sampleWeatherData, location: 'Medak, Telangana', temperature: 26, condition: 'Rainy' },
  Nalgonda: { ...sampleWeatherData, location: 'Nalgonda, Telangana', temperature: 32, condition: 'Sunny' },
  Mahabubnagar: { ...sampleWeatherData, location: 'Mahabubnagar, Telangana', temperature: 29, condition: 'Cloudy' },
  Adilabad: { ...sampleWeatherData, location: 'Adilabad, Telangana', temperature: 25, condition: 'Rainy' },
  Suryapet: { ...sampleWeatherData, location: 'Suryapet, Telangana', temperature: 30, condition: 'Sunny' },
  Siddipet: { ...sampleWeatherData, location: 'Siddipet, Telangana', temperature: 28, condition: 'Partly Cloudy' },
};

export default function WeatherForecast() {
  const { translate } = useLanguage();
  const [weatherData, setWeatherData] = useState<WeatherData>(sampleWeatherData);
  const [selectedDistrict, setSelectedDistrict] = useState('Hyderabad');

  const telanganaDistricts = [
    'Hyderabad', 'Warangal', 'Khammam', 'Nizamabad', 'Karimnagar', 'Rangareddy',
    'Medak', 'Nalgonda', 'Mahabubnagar', 'Adilabad', 'Suryapet', 'Siddipet'
  ];

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'partly cloudy': return <Cloud className="w-8 h-8 text-gray-500" />;
      case 'rainy': return <CloudRain className="w-8 h-8 text-blue-500" />;
      default: return <Cloud className="w-8 h-8 text-gray-500" />;
    }
  };

  useEffect(() => {
    setWeatherData(prev => ({
      ...prev,
      location: `${selectedDistrict}, Telangana`
    }));
  }, [selectedDistrict]);

  useEffect(() => {
    setWeatherData(sampleWeatherByDistrict[selectedDistrict] || sampleWeatherData);
  }, [selectedDistrict]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-blue-800 mb-2">
            {translate('weather')} Forecast
          </h1>
          <p className="text-gray-600">
            Accurate weather predictions with farming recommendations
          </p>
        </motion.div>

        {/* District Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Select District:</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {telanganaDistricts.map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Current Weather */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl text-white p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">{weatherData.location}</h2>
              <p className="text-blue-100">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            {getWeatherIcon(weatherData.condition)}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="text-6xl font-bold mb-2">{weatherData.temperature}°C</div>
              <p className="text-xl text-blue-100">{weatherData.condition}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <WeatherStat icon={<Droplets className="w-5 h-5" />} label="Humidity" value={`${weatherData.humidity}%`} />
              <WeatherStat icon={<Wind className="w-5 h-5" />} label="Wind" value={`${weatherData.windSpeed} km/h`} />
              <WeatherStat icon={<Gauge className="w-5 h-5" />} label="Pressure" value={`${weatherData.pressure} mb`} />
              <WeatherStat icon={<Eye className="w-5 h-5" />} label="Visibility" value={`${weatherData.visibility} km`} />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 5-Day Forecast */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">5-Day Forecast</h3>
            <div className="space-y-4">
              {weatherData.forecast.map((day, index) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{day.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-800">{day.day}</p>
                      <p className="text-sm text-gray-600">{day.condition}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="font-bold text-gray-800">{day.high}°</p>
                      <p className="text-sm text-gray-500">{day.low}°</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-blue-600">{day.precipitation}%</p>
                      <p className="text-xs text-gray-500">Rain</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Farming Tips */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                <span className="mr-2">🌾</span>
                Farming Tip
              </h3>
              <p className="text-green-700 leading-relaxed">{weatherData.farmingTip}</p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                <span className="mr-2">⚠️</span>
                Weather Alert
              </h3>
              <p className="text-yellow-700 leading-relaxed">
                Heavy rain expected on Wednesday. Secure harvested crops and avoid field operations.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                <span className="mr-2">💧</span>
                Irrigation Advice
              </h3>
              <p className="text-blue-700 leading-relaxed">
                Soil moisture levels are adequate. Reduce irrigation for the next 3 days.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function WeatherStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-1">{icon}</div>
      <p className="text-xs text-blue-100">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}
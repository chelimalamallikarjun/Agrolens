import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  translate: (key: string) => string;
}

const languages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'ur', name: 'اردو', flag: '🇵🇰' },
  { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
];

const translations: { [key: string]: { [key: string]: string } } = {
  en: {
    appName: 'AgroLens',
    tagline: 'Smart Farming Assistant for Telangana',
    home: 'Home',
    mandiPrices: 'Mandi Prices',
    weather: 'Weather',
    tips: 'Tips & News',
    schemes: 'Schemes',
    cropScanner: 'Crop Scanner',
    marketplace: 'Marketplace',
    seasonalCrops: 'Seasonal Crops',
    soilAnalysis: 'Soil Analysis',
    welcome: 'Welcome to AgroLens',
    subtitle: 'Your smart farming companion for better yields and profits',
  },
  te: {
    appName: 'అగ్రోలెన్స్',
    tagline: 'తెలంగాణకు స్మార్ట్ వ్యవసాయ సహాయకుడు',
    home: 'హోమ్',
    mandiPrices: 'మార్కెట్ ధరలు',
    weather: 'వాతావరణం',
    tips: 'చిట్కాలు & వార్తలు',
    schemes: 'పథకాలు',
    cropScanner: 'పంట స్కానర్',
    marketplace: 'మార్కెట్‌ప్లేస్',
    seasonalCrops: 'కాలానుగుణ పంటలు',
    soilAnalysis: 'నేల విశ్లేషణ',
    welcome: 'అగ్రోలెన్స్‌కు స్వాగతం',
    subtitle: 'మెరుగైన దిగుబడి మరియు లాభాల కోసం మీ స్మార్ట్ వ్యవసాయ సహచరుడు',
  },
  hi: {
    appName: 'एग्रोलेंस',
    tagline: 'तेलंगाना के लिए स्मार्ट कृषि सहायक',
    home: 'होम',
    mandiPrices: 'मंडी भाव',
    weather: 'मौसम',
    tips: 'टिप्स और न्यूज़',
    schemes: 'योजनाएं',
    cropScanner: 'फसल स्कैनर',
    marketplace: 'मार्केटप्लेस',
    seasonalCrops: 'मौसमी फसलें',
    soilAnalysis: 'मिट्टी विश्लेषण',
    welcome: 'एग्रोलेंस में आपका स्वागत है',
    subtitle: 'बेहतर उत्पादन और मुनाफे के लिए आपका स्मार्ट कृषि साथी',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

interface LanguageProviderProps {
  children: ReactNode;
}

export default function LanguageProvider({ children }: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
  };

  const translate = (key: string): string => {
    return translations[currentLanguage.code]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
}

export { languages };
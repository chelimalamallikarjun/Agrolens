import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, Clock, AlertCircle, ExternalLink, Calculator } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Scheme {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  eligibility: string[];
  documents: string[];
  applicationLink: string;
  deadline?: string;
  status: 'active' | 'upcoming' | 'expired';
}

const schemes: Scheme[] = [
  {
    id: '1',
    name: 'PM-KISAN Samman Nidhi',
    description: 'Direct income support of ₹6,000 per year to all farmer families having cultivable land',
    benefits: [
      '₹2,000 every 4 months (3 installments per year)',
      'Direct bank transfer',
      'No loan conditions'
    ],
    eligibility: [
      'All landholding farmer families',
      'Valid Aadhaar card',
      'Bank account linked with Aadhaar'
    ],
    documents: [
      'Aadhaar Card',
      'Bank Account Details',
      'Land Ownership Documents',
      'Mobile Number'
    ],
    applicationLink: 'https://pmkisan.gov.in',
    status: 'active'
  },
  {
    id: '2',
    name: 'Pradhan Mantri Fasal Bima Yojana',
    description: 'Comprehensive crop insurance scheme providing financial support to farmers in case of crop loss',
    benefits: [
      'Premium subsidy up to 95%',
      'Coverage for all stages of crop cycle',
      'Quick claim settlement',
      'Use of technology for damage assessment'
    ],
    eligibility: [
      'All farmers growing notified crops',
      'Tenant farmers with valid agreements',
      'Sharecroppers with proper documentation'
    ],
    documents: [
      'Aadhaar Card',
      'Bank Account Details',
      'Land Records',
      'Sowing Certificate',
      'Loan Sanction Letter (if applicable)'
    ],
    applicationLink: 'https://pmfby.gov.in',
    status: 'active'
  },
  {
    id: '3',
    name: 'Soil Health Card Scheme',
    description: 'Provides soil test-based recommendations to farmers for improving soil health and fertility',
    benefits: [
      'Free soil testing',
      'Personalized fertilizer recommendations',
      'Improved crop yields',
      'Reduced input costs'
    ],
    eligibility: [
      'All farmers with cultivable land',
      'Land ownership or tenancy proof required'
    ],
    documents: [
      'Aadhaar Card',
      'Land Records',
      'Mobile Number for SMS updates'
    ],
    applicationLink: 'https://soilhealth.dac.gov.in',
    status: 'active'
  },
  {
    id: '4',
    name: 'Kisan Credit Card (KCC)',
    description: 'Credit facility for farmers to meet their crop production and post-harvest expenses',
    benefits: [
      'Flexible credit limit based on cropping pattern',
      'Low interest rates (7% per annum)',
      'Interest subvention of 3%',
      'No processing fee for loans up to ₹3 lakh'
    ],
    eligibility: [
      'All farmers with cultivable land',
      'Tenant farmers with valid lease agreements',
      'Self Help Group members'
    ],
    documents: [
      'Aadhaar Card',
      'PAN Card',
      'Land Documents',
      'Bank Account Statements',
      'Passport Size Photos'
    ],
    applicationLink: 'https://www.nabard.org/kcc',
    status: 'active'
  }
];

export default function Schemes() {
  const { translate } = useLanguage();
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [showEligibilityChecker, setShowEligibilityChecker] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-purple-800 mb-2">
            Government Schemes
          </h1>
          <p className="text-gray-600 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Explore and apply for farming schemes and subsidies
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowEligibilityChecker(true)}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200"
            >
              <Calculator className="w-5 h-5" />
              <span>Check Eligibility</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200"
            >
              <FileText className="w-5 h-5" />
              <span>Application Status</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {schemes.map((scheme, index) => (
            <motion.div
              key={scheme.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{scheme.name}</h3>
                    <div className="flex items-center space-x-2">
                      {scheme.status === 'active' && (
                        <span className="flex items-center text-green-600 text-sm">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Active
                        </span>
                      )}
                      {scheme.status === 'upcoming' && (
                        <span className="flex items-center text-yellow-600 text-sm">
                          <Clock className="w-4 h-4 mr-1" />
                          Upcoming
                        </span>
                      )}
                      {scheme.status === 'expired' && (
                        <span className="flex items-center text-red-600 text-sm">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          Expired
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed">{scheme.description}</p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Key Benefits:</h4>
                    <ul className="space-y-1">
                      {scheme.benefits.slice(0, 2).map((benefit, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <button
                      onClick={() => setSelectedScheme(scheme)}
                      className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                    >
                      View Details
                    </button>
                    <a
                      href={scheme.applicationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                    >
                      <span>Apply Now</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scheme Detail Modal */}
        {selectedScheme && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">{selectedScheme.name}</h2>
                  <button
                    onClick={() => setSelectedScheme(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <AlertCircle className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
                    <p className="text-gray-700">{selectedScheme.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Benefits</h3>
                    <ul className="space-y-2">
                      {selectedScheme.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-gray-700 flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Eligibility Criteria</h3>
                    <ul className="space-y-2">
                      {selectedScheme.eligibility.map((criterion, idx) => (
                        <li key={idx} className="text-gray-700 flex items-start">
                          <CheckCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                          {criterion}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Required Documents</h3>
                    <ul className="space-y-2">
                      {selectedScheme.documents.map((document, idx) => (
                        <li key={idx} className="text-gray-700 flex items-start">
                          <FileText className="w-5 h-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                          {document}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => setSelectedScheme(null)}
                      className="px-6 py-2 text-gray-600 hover:text-gray-700"
                    >
                      Close
                    </button>
                    <a
                      href={selectedScheme.applicationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <span>Apply Now</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Eligibility Checker Modal */}
        {showEligibilityChecker && (
          <EligibilityChecker onClose={() => setShowEligibilityChecker(false)} />
        )}
      </div>
    </div>
  );
}

function EligibilityChecker({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    landOwnership: '',
    landSize: '',
    cropType: '',
    annualIncome: '',
    aadhaar: false,
    bankAccount: false
  });
  const [results, setResults] = useState<string[]>([]);

  const checkEligibility = () => {
    const eligibleSchemes: string[] = [];

    if (formData.landOwnership && formData.aadhaar && formData.bankAccount) {
      eligibleSchemes.push('PM-KISAN Samman Nidhi');
      eligibleSchemes.push('Soil Health Card Scheme');
    }

    if (formData.cropType) {
      eligibleSchemes.push('Pradhan Mantri Fasal Bima Yojana');
    }

    if (formData.landOwnership && parseInt(formData.annualIncome) < 200000) {
      eligibleSchemes.push('Kisan Credit Card (KCC)');
    }

    setResults(eligibleSchemes);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Eligibility Checker</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Land Ownership
              </label>
              <select
                value={formData.landOwnership}
                onChange={(e) => setFormData({...formData, landOwnership: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select...</option>
                <option value="owned">Own Land</option>
                <option value="tenant">Tenant Farmer</option>
                <option value="sharecropper">Sharecropper</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Land Size (in acres)
              </label>
              <input
                type="number"
                value={formData.landSize}
                onChange={(e) => setFormData({...formData, landSize: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Enter land size"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Crop
              </label>
              <select
                value={formData.cropType}
                onChange={(e) => setFormData({...formData, cropType: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select...</option>
                <option value="rice">Rice</option>
                <option value="cotton">Cotton</option>
                <option value="maize">Maize</option>
                <option value="turmeric">Turmeric</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Income (₹)
              </label>
              <input
                type="number"
                value={formData.annualIncome}
                onChange={(e) => setFormData({...formData, annualIncome: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Enter annual income"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.aadhaar}
                  onChange={(e) => setFormData({...formData, aadhaar: e.target.checked})}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">I have Aadhaar Card</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.bankAccount}
                  onChange={(e) => setFormData({...formData, bankAccount: e.target.checked})}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">I have Bank Account</span>
              </label>
            </div>

            <button
              onClick={checkEligibility}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Check Eligibility
            </button>

            {results.length > 0 && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">You are eligible for:</h3>
                <ul className="space-y-1">
                  {results.map((scheme, idx) => (
                    <li key={idx} className="text-green-700 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {scheme}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
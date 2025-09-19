import React from 'react';
import { Fish, Upload, Database, Zap } from 'lucide-react';

// ADDED: Define the props interface to accept setCurrentPage
interface HomePageProps {
  setCurrentPage: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {
  return (
    <div className="p-6 lg:p-8">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 rounded-2xl overflow-hidden shadow-2xl mb-12">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 px-8 py-16 lg:px-16 lg:py-24">
          <div className="max-w-4xl">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Discover the Ocean's
              <span className="block text-cyan-200">Hidden Species</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl leading-relaxed">
              Harness the power of AI to identify and learn about fish species with precision and ease. 
              Our advanced classification model recognizes dozens of species in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* MODIFIED: Added onClick to call setCurrentPage */}
              <button 
                onClick={() => setCurrentPage('classify')}
                className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Classifying
              </button>
              {/* MODIFIED: Added onClick to call setCurrentPage */}
              <button 
                onClick={() => setCurrentPage('species')}
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-700 transition-all duration-300"
              >
                Browse Species
              </button>
            </div>
          </div>
        </div>
        
        {/* Decorative waves */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-900 to-transparent opacity-50"></div>
      </div>

      {/* Features Grid (Your original code is preserved) */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {[
          { icon: Zap, title: 'Instant Recognition', description: 'Upload any fish photo and get species identification in seconds', color: 'from-yellow-400 to-orange-500' },
          { icon: Database, title: 'Comprehensive Database', description: 'Extensive collection of fish species with detailed information', color: 'from-green-400 to-blue-500' },
          { icon: Upload, title: 'Easy Upload', description: 'Simple drag-and-drop interface for seamless photo uploads', color: 'from-purple-400 to-pink-500' },
          { icon: Fish, title: 'Species Insights', description: 'Learn fascinating details about each identified species', color: 'from-cyan-400 to-blue-500' }
        ].map((feature, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <feature.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Statistics (Your original code is preserved) */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Powered by Advanced AI</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { number: '484', label: 'Fish Species Recognized', color: 'text-blue-600' },
            { number: '95%', label: 'Classification Accuracy', color: 'text-green-600' },
            { number: '< 2s', label: 'Average Response Time', color: 'text-purple-600' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-4xl lg:text-5xl font-bold ${stat.color} mb-2`}>{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
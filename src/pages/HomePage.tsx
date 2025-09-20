import React from 'react';
// MODIFIED: Changed icon import for the button
import { Upload, Database, Zap, Fish } from 'lucide-react';

// ADDED: Define the props interface to accept setCurrentPage
interface HomePageProps {
  setCurrentPage: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {
  return (
    <div className="p-6 lg:p-8 bg-slate-900 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-2xl overflow-hidden shadow-2xl mb-12 border border-slate-600">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 px-8 py-16 lg:px-16 lg:py-24">
          <div className="max-w-4xl">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500 bg-clip-text text-transparent">Data Manthan</span>
            </h1>
            <h2 className="text-2xl lg:text-3xl font-semibold text-slate-300 mb-6">
              Advanced Marine Research Platform
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
              Dive deep into oceanic data with cutting-edge AI-powered analysis, real-time monitoring, and 
              comprehensive marine research tools
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* MODIFIED: Changed button text and icon */}
              <button
                onClick={() => setCurrentPage('classify')}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <Upload className="inline-block w-5 h-5 mr-2" />
                Start Classifying
              </button>
              <button
                onClick={() => setCurrentPage('species')}
                className="px-8 py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 font-semibold rounded-xl hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300">
                Browse Species
              </button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-900 to-transparent opacity-50"></div>
      </div>

       {/* Features Grid */}
       <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {[
          { icon: Zap, title: 'Instant Recognition', description: 'Upload any fish photo and get species identification in seconds', color: 'from-cyan-400 to-blue-500' },
          { icon: Database, title: 'Comprehensive Database', description: 'Extensive collection of fish species with detailed information', color: 'from-blue-400 to-cyan-500' },
          { icon: Upload, title: 'Easy Upload', description: 'Simple drag-and-drop interface for seamless photo uploads', color: 'from-cyan-500 to-blue-400' },
          { icon: Fish, title: 'Species Insights', description: 'Learn fascinating details about each identified species', color: 'from-blue-500 to-cyan-400' }
        ].map((feature, index) => (
          <div key={index} className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <feature.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
            <p className="text-slate-300 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
      
      {/* Statistics */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Powered by Advanced AI</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { number: '484', label: 'Fish Species Recognized', color: 'text-cyan-400' },
            { number: '95%', label: 'Classification Accuracy', color: 'text-blue-400' },
            { number: '< 2s', label: 'Average Response Time', color: 'text-cyan-500' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-4xl lg:text-5xl font-bold ${stat.color} mb-2`}>
                {stat.number}
              </div>
              <div className="text-slate-300 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
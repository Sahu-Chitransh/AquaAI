import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import SpeciesListPage from './pages/SpeciesListPage';
import ClassifyPage from './pages/ClassifyPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        // MODIFIED: Pass setCurrentPage to HomePage
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'species':
        return <SpeciesListPage />;
      case 'classify':
        return <ClassifyPage />;
      default:
        // MODIFIED: Pass setCurrentPage to HomePage here as well
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      
      <div className="lg:ml-64 transition-all duration-300">
        {renderCurrentPage()}
      </div>
    </div>
  );
}

export default App;
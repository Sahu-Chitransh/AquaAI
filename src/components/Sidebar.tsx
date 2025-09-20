import React from 'react';
import { Home, Fish, Camera, Menu, X } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'species', label: 'Fish Species', icon: Fish },
    { id: 'classify', label: 'Classify Fish', icon: Camera },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-700 text-white rounded-lg shadow-lg hover:bg-slate-600 transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-60 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-slate-800 border-r border-slate-700 shadow-xl z-40 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg">
              <Fish className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Data Manthan</h1>
              <p className="text-sm text-slate-400">Marine Research Platform</p>
            </div>
          </div>
        </div>

        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setCurrentPage(item.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                        : 'text-slate-300 hover:bg-slate-700 hover:text-cyan-400'
                    }`}
                  >
                    <IconComponent size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="absolute bottom-6 left-4 right-4">
          <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 rounded-lg p-4 border border-cyan-500/30">
            <p className="text-sm text-white font-medium">Ready to classify?</p>
            <p className="text-xs text-slate-300 mt-1">Upload your fish photos and get instant species identification!</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
import React, { useState } from 'react';
import { fishSpeciesData, FishSpecies } from '../data/fishSpecies';
import SpeciesModal from '../components/SpeciesModal';
import { Search, Filter } from 'lucide-react';

const SpeciesListPage: React.FC = () => {
  const [selectedSpecies, setSelectedSpecies] = useState<FishSpecies | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterHabitat, setFilterHabitat] = useState('');

  const filteredSpecies = fishSpeciesData.filter(species => {
    const matchesSearch = species.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         species.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesHabitat = !filterHabitat || species.habitat.toLowerCase().includes(filterHabitat.toLowerCase());
    return matchesSearch && matchesHabitat;
  });

  const getConservationColor = (status: string) => {
    switch (status) {
      case 'Least Concern': return 'bg-green-100 text-green-800';
      case 'Near Threatened': return 'bg-yellow-100 text-yellow-800';
      case 'Vulnerable': return 'bg-orange-100 text-orange-800';
      case 'Endangered': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Fish Species Database</h1>
          <p className="text-lg text-gray-600">Explore our comprehensive collection of fish species</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search species..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="lg:w-64 relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={filterHabitat}
                onChange={(e) => setFilterHabitat(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="">All Habitats</option>
                <option value="coral">Coral Reefs</option>
                <option value="freshwater">Freshwater</option>
                <option value="ocean">Ocean</option>
                <option value="coastal">Coastal Waters</option>
                <option value="rocky">Rocky Shores</option>
                <option value="sandy">Sandy Bottoms</option>
                <option value="tropical">Tropical Waters</option>
              </select>
            </div>
          </div>
        </div>

        {/* Species Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSpecies.map((species) => (
            <div
              key={species.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              onClick={() => setSelectedSpecies(species)}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={species.imageUrl}
                  alt={species.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{species.name}</h3>
                <p className="text-sm italic text-gray-600 mb-2">{species.scientificName}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {species.habitat}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getConservationColor(species.conservation)}`}>
                    {species.conservation}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{species.description}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredSpecies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No species found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Species Modal */}
      {selectedSpecies && (
        <SpeciesModal
          species={selectedSpecies}
          onClose={() => setSelectedSpecies(null)}
        />
      )}
    </div>
  );
};

export default SpeciesListPage;
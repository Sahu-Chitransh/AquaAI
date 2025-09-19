import React from 'react';
import { X, MapPin, Ruler, Utensils, Heart } from 'lucide-react';
import { FishSpecies } from '../data/fishSpecies';

interface SpeciesModalProps {
  species: FishSpecies;
  onClose: () => void;
}

const SpeciesModal: React.FC<SpeciesModalProps> = ({ species, onClose }) => {
  const getConservationColor = (status: string) => {
    switch (status) {
      case 'Least Concern': return 'bg-green-100 text-green-800 border-green-200';
      case 'Near Threatened': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Vulnerable': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Endangered': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative">
          <img
            src={species.imageUrl}
            alt={species.name}
            className="w-full h-64 lg:h-80 object-cover rounded-t-2xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
          >
            <X className="h-6 w-6 text-gray-700" />
          </button>
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2 drop-shadow-lg">
              {species.name}
            </h2>
            <p className="text-lg italic text-white drop-shadow-lg">
              {species.scientificName}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8">
          {/* Conservation Status */}
          <div className="mb-6">
            <span className={`inline-flex items-center px-3 py-2 rounded-lg border ${getConservationColor(species.conservation)}`}>
              <Heart className="h-4 w-4 mr-2" />
              Conservation Status: {species.conservation}
            </span>
          </div>

          {/* Quick Facts */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                <h4 className="font-semibold text-gray-800">Habitat</h4>
              </div>
              <p className="text-gray-700">{species.habitat}</p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Ruler className="h-5 w-5 text-green-600 mr-2" />
                <h4 className="font-semibold text-gray-800">Size</h4>
              </div>
              <p className="text-gray-700">{species.size}</p>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Utensils className="h-5 w-5 text-orange-600 mr-2" />
                <h4 className="font-semibold text-gray-800">Diet</h4>
              </div>
              <p className="text-gray-700">{species.diet}</p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Heart className="h-5 w-5 text-purple-600 mr-2" />
                <h4 className="font-semibold text-gray-800">Family</h4>
              </div>
              <p className="text-gray-700">{species.family}</p>
            </div>

            <div className="bg-cyan-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <MapPin className="h-5 w-5 text-cyan-600 mr-2" />
                <h4 className="font-semibold text-gray-800">Depth Range</h4>
              </div>
              <p className="text-gray-700">{species.depth}</p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Heart className="h-5 w-5 text-yellow-600 mr-2" />
                <h4 className="font-semibold text-gray-800">Temperament</h4>
              </div>
              <p className="text-gray-700">{species.temperament}</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">About this species</h3>
            <p className="text-gray-700 leading-relaxed text-lg">{species.description}</p>
          </div>

          {/* Region */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Geographic Distribution</h3>
            <div className="flex flex-wrap gap-2">
              {species.region.map((region, index) => (
                <span
                  key={index}
                  className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm"
                >
                  {region}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeciesModal;
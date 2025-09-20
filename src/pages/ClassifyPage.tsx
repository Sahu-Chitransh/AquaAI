import React, { useState, useRef } from 'react';
import { Upload, Camera, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { FishSpecies, getSpeciesById } from '../data/fishSpecies';
import SpeciesModal from '../components/SpeciesModal';

const findSpeciesById = (id: string): FishSpecies | undefined => {
  return getSpeciesById(id);
};

const ClassifyPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isClassifying, setIsClassifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [classificationResult, setClassificationResult] = useState<{
    species: FishSpecies;
    confidence: number;
  } | null>(null);
  const [selectedSpecies, setSelectedSpecies] = useState<FishSpecies | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setClassificationResult(null);
    setError(null);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        handleFileSelect(file);
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const classifyImage = async () => {
    if (!selectedFile) return;

    setIsClassifying(true);
    setError(null);
    setClassificationResult(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      if (!apiUrl) {
        throw new Error("API URL is not configured. Please check your .env file.");
      }

      const response = await fetch(`${apiUrl}/predict`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(`Classification failed: ${errData.detail || response.statusText}`);
      }
      
      const data = await response.json();

      const foundSpecies = findSpeciesById(data.predicted_id);

      if (!foundSpecies) {
        throw new Error(`The model predicted "${data.predicted_id}", but this species ID was not found in your local database.`);
      }
      
      setClassificationResult({
        species: foundSpecies,
        confidence: data.confidence
      });

    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
    } finally {
      setIsClassifying(false);
    }
  };

  const reset = () => {
    setSelectedFile(null);
    setPreview(null);
    setClassificationResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    // THIS IS THE CORRECTED LINE
    <div className="p-6 lg:p-8 bg-slate-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Fish Classification</h1>
          <p className="text-lg text-slate-300">Upload a photo and let our AI identify the fish species</p>
        </div>

        {/* Upload Area */}
        {!preview && (
          <div
            className="border-2 border-dashed border-cyan-500 rounded-2xl p-12 text-center bg-gradient-to-br from-slate-800/50 to-slate-700/50 hover:from-slate-800/70 hover:to-slate-700/70 transition-all duration-300"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
          >
            <div className="mb-6">
              <Upload className="h-16 w-16 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Drop your fish photo here</h3>
              <p className="text-slate-400">or click to browse files</p>
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Camera className="h-5 w-5 inline-block mr-2" />
              Choose Photo
            </button>
            <input
              ref={fileInputRef} type="file" accept="image/*"
              onChange={handleFileInput} className="hidden"
            />
          </div>
        )}

        {/* Preview and Classification */}
        {preview && (
          <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">Selected Image</h3>
                <button
                  onClick={reset}
                  className="px-4 py-2 text-slate-400 hover:text-white font-medium transition-colors"
                >
                  Choose Different Photo
                </button>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Image Preview */}
                <div>
                  <img
                    src={preview}
                    alt="Selected fish"
                    className="w-full h-64 lg:h-80 object-cover rounded-lg shadow-md"
                  />
                  
                  {!classificationResult && !isClassifying && !error && (
                    <button
                      onClick={classifyImage}
                      className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Classify Fish
                    </button>
                  )}
                </div>

                {/* Classification Results */}
                <div className="flex flex-col justify-center">
                  {isClassifying && (
                    <div className="text-center">
                      <Loader className="h-12 w-12 text-cyan-400 animate-spin mx-auto mb-4" />
                      <h4 className="text-lg font-semibold text-white mb-2">Analyzing image...</h4>
                      <p className="text-slate-400">Our AI is identifying the fish species</p>
                    </div>
                  )}
                  
                  {error && (
                    <div className="text-center bg-red-900/50 rounded-lg p-6">
                      <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
                      <h4 className="text-lg font-semibold text-red-300 mb-2">Classification Failed</h4>
                      <p className="text-red-400">{error}</p>
                    </div>
                  )}

                  {classificationResult && (
                    <div className="text-center">
                      <div className="mb-6">
                        <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold text-white mb-2">Classification Complete!</h4>
                      </div>
                      
                      <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 border border-cyan-500/30 rounded-lg p-6 mb-4">
                        <h5 className="text-2xl font-bold text-white mb-2">
                          {classificationResult.species.name}
                        </h5>
                        <p className="text-slate-300 italic mb-3">
                          {classificationResult.species.scientificName}
                        </p>
                        <div className="flex items-center justify-center mb-4">
                          <div className="bg-slate-700 rounded-full px-4 py-2">
                            <span className="text-sm text-slate-300">Confidence: </span>
                            <span className="font-bold text-green-400">
                              {(classificationResult.confidence * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => setSelectedSpecies(classificationResult.species)}
                        className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        Learn More About This Species
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {selectedSpecies && (
        <SpeciesModal
          species={selectedSpecies}
          onClose={() => setSelectedSpecies(null)}
        />
      )}
    </div>
  );
};

export default ClassifyPage;
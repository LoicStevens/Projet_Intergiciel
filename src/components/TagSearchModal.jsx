// src/components/TagSearchModal.js
import React, { useState } from 'react';

const TagSearchModal = ({ isOpen, onClose, onSearch }) => {
  const initialTags = ['Remote', 'Part-Time', 'Freelance', 'Full-Time', 'Contract'];
  const [tags, setTags] = useState(initialTags);
  const [inputValue, setInputValue] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  // Gérer le clic sur un tag
  const handleTagClick = (tag) => {
    if (!selectedTags.includes(tag)) {
      const updatedTags = [...selectedTags, tag];
      setSelectedTags(updatedTags);
      onSearch(updatedTags);
    }
  };

  // Retirer un tag
  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = selectedTags.filter((tag) => tag !== tagToRemove);
    setSelectedTags(updatedTags);
    onSearch(updatedTags);
  };

  // Gérer l'entrée dans l'input
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Ajouter un tag avec la touche Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '' && !tags.includes(inputValue.trim())) {
      const newTags = [...tags, inputValue.trim()];
      setTags(newTags);
      setSelectedTags([...selectedTags, inputValue.trim()]);
      onSearch([...selectedTags, inputValue.trim()]);
      setInputValue('');
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        {/* Titre du modal */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Filter Jobs by Tags</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 font-semibold"
          >
            &times;
          </button>
        </div>

        {/* Barre de recherche */}
        <div className="mb-4">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Search by tags or type..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Afficher les tags sélectionnés */}
        <div className="flex flex-wrap items-center mb-4">
          {selectedTags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center bg-blue-500 text-white text-sm font-medium px-2 py-1 rounded-full mr-2 mb-2"
            >
              {tag}
              <button
                className="ml-2 text-white hover:text-gray-300"
                onClick={() => handleRemoveTag(tag)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        {/* Liste des tags disponibles */}
        <div className="flex flex-wrap items-center">
          {tags.map((tag, index) => (
            <button
              key={index}
              onClick={() => handleTagClick(tag)}
              className={`text-sm px-3 py-1 mr-2 mb-2 rounded-md border border-blue-500 ${
                selectedTags.includes(tag) ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
              } hover:bg-blue-500 hover:text-white transition`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Bouton de fermeture */}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default TagSearchModal;

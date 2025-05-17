import React, { useState } from 'react';

interface IngredientWeightPopupProps {
  ingredient: {
    id: string;
    name: string;
    image: string;
  };
  onConfirm: (weight: number) => void;
  onCancel: () => void;
}

const IngredientWeightPopup = ({ ingredient, onConfirm, onCancel }: IngredientWeightPopupProps) => {
  const [weight, setWeight] = useState<string>('80'); // Changed to string type
  const [unit, setUnit] = useState<string>('gm');

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty string or valid numbers including zero
    if (value === '' || /^\d+$/.test(value)) {
      setWeight(value);
    }
  };

  const handleConfirm = () => {
    // Convert to number when confirming
    const numWeight = parseInt(weight) || 0;
    onConfirm(numWeight);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
        <div className="flex items-center space-x-4 mb-6">
          <img 
            src={ingredient.image} 
            alt={ingredient.name} 
            className="w-24 h-24 object-contain"
          />
          <div className="flex-1">
            <input
              type="text"
              value={ingredient.name}
              className="w-full p-2 border rounded-md"
              placeholder="Ingredient Name"
              readOnly
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mb-6">
          <input
            type="text" // Changed from number to text
            value={weight}
            onChange={handleWeightChange}
            className="flex-1 p-2 border rounded-md"
            pattern="\d*" // Allow only digits
            inputMode="numeric" // Show numeric keyboard on mobile
          />
          <select 
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="gm">gm</option>
            <option value="kg">kg</option>
            <option value="ml">ml</option>
            <option value="L">L</option>
          </select>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default IngredientWeightPopup;
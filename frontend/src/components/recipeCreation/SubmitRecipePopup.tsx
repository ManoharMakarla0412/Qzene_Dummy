import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from 'lucide-react';

interface SubmitRecipePopupProps {
  onSubmit: (data: { name: string; cuisine: string; author: string; recipeImage: string }) => void;
  onCancel: () => void;
  isOpen: boolean;
}

const SubmitRecipePopup = ({ onSubmit, onCancel, isOpen }: SubmitRecipePopupProps) => {
  const [formData, setFormData] = useState({
    name: '',
    cuisine: '',
    author: '',
    recipeImage: ''
  });
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData(prev => ({ ...prev, recipeImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[480px]">
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold">Submit Recipe</h3>
            <p className="text-sm text-gray-500">Please review and confirm recipe details</p>
          </div>

          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors"
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Recipe preview" className="max-h-48 mx-auto" />
            ) : (
              <div className="flex flex-col items-center">
                <Upload className="h-8 w-8 text-gray-400" />
                <p className="text-sm text-gray-500 mt-2">Click to upload recipe image</p>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-600">Recipe Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter recipe name"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Cuisine</label>
              <Input
                value={formData.cuisine}
                onChange={(e) => setFormData(prev => ({ ...prev, cuisine: e.target.value }))}
                placeholder="Enter cuisine type"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Author</label>
              <Input
                value={formData.author}
                onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                placeholder="Enter author name"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              variant="outline"
              onClick={onCancel}
              className="rounded-full"
            >
              Cancel
            </Button>
            <Button
              onClick={() => onSubmit(formData)}
              className="rounded-full bg-blue-600 text-white"
              disabled={!formData.recipeImage}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitRecipePopup;
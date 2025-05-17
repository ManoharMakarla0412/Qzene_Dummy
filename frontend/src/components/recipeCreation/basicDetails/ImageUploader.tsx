
import React, { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { X, Image as ImageIcon } from "lucide-react";

interface ImageUploaderProps {
  initialImage: string | null;
  onImageChange: (imageUrl: string | null, file: File | null) => void;
}

const ImageUploader = ({ initialImage, onImageChange }: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [recipeImage, setRecipeImage] = useState<string | null>(initialImage);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setRecipeImage(imageUrl);
      
      // Read file as base64 to send to server
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onImageChange(base64String, file);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setRecipeImage(null);
    onImageChange(null, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <Label htmlFor="image" className="mb-2 block">Recipe Image</Label>
      <input
        type="file"
        id="image"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
      
      {recipeImage ? (
        <div className="relative border border-border rounded-md overflow-hidden aspect-video">
          <img 
            src={recipeImage} 
            alt="Recipe preview" 
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1 hover:bg-black"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div 
          onClick={handleImageClick}
          className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary"
        >
          <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-muted-foreground text-sm">Click to upload a recipe image</p>
          <p className="text-xs text-muted-foreground mt-1">(PNG, JPG, WEBP)</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;

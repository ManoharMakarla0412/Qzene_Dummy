import React, { useState } from "react";
import { RecipeData } from "@/types/recipeCreation";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface BasicDetailsStepProps {
  recipeData: RecipeData;
  updateRecipeData: (data: Partial<RecipeData>) => void;
  onNext: () => void;
}

const BasicDetailsStep = ({
  recipeData,
  updateRecipeData,
  onNext,
}: BasicDetailsStepProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: recipeData.name || "",
    author: recipeData.author || "",
    cuisine: recipeData.cuisine || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = [];
    if (!formData.name?.trim()) errors.push("Recipe name is required");
    if (!formData.author?.trim()) errors.push("Author name is required");
    if (!formData.cuisine?.trim()) errors.push("Cuisine type is required");
    return errors;
  };

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    const errors = validateForm();

    if (errors.length > 0) {
      toast({
        title: "Required Fields Missing",
        description: errors.join(", "),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    updateRecipeData({
      name: formData.name.trim(),
      author: formData.author.trim(),
      cuisine: formData.cuisine.trim(),
    });
    setIsSubmitting(false);
    toast({
      title: "Success",
      description: "Recipe details saved",
    });
  };

  const handleContinue = (e: React.MouseEvent) => {
    e.preventDefault();
    const errors = validateForm();

    if (errors.length > 0) {
      toast({
        title: "Required Fields Missing",
        description: errors.join(", "),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    updateRecipeData({
      name: formData.name.trim(),
      author: formData.author.trim(),
      cuisine: formData.cuisine.trim(),
    });
    onNext();
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-no-repeat p-4 relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/images/assortment-vegetable-autumn-cream-soups.jpg')",
          filter: "brightness(0.5)",
        }}
      />

      <div className="relative bg-white/10 backdrop-blur-lg rounded-xl p-8 w-full max-w-4xl mx-auto shadow-lg border border-white/30">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          Create New Recipe
        </h2>

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-white">
                  Recipe Name*
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter recipe name"
                    className="mt-1 w-full p-3 bg-white/80 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all text-gray-900"
                    disabled={isSubmitting}
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-white">
                  Author Name*
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    placeholder="Enter author name"
                    className="mt-1 w-full p-3 bg-white/80 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all text-gray-900"
                    disabled={isSubmitting}
                  />
                </label>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-white">
                  Cuisine Type*
                  <input
                    type="text"
                    name="cuisine"
                    value={formData.cuisine}
                    onChange={handleInputChange}
                    placeholder="e.g., Italian, Indian, etc."
                    className="mt-1 w-full p-3 bg-white/80 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all text-gray-900"
                    disabled={isSubmitting}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="bg-white/10 p-4 rounded-lg">
            <p className="font-medium text-white mb-2">Important Notes:</p>
            <ul className="list-disc list-inside space-y-1 text-white/90 text-sm">
              <li>
                All recipes are initially set for 4 servings with medium spice
                levels
              </li>
              <li>Additional serving sizes will be auto-calculated</li>
              <li>You can adjust spice levels in the next steps</li>
            </ul>
          </div>

          <div className="flex justify-center pt-4 space-x-4">
            <button
              onClick={handleSave}
              disabled={isSubmitting}
              className="w-full md:w-1/4 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>Save Details</span>
              )}
            </button>
            <button
              onClick={handleContinue}
              disabled={isSubmitting}
              className="w-full md:w-1/4 bg-primary hover:bg-primary/90 text-white py-3 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  <span>Continuing...</span>
                </>
              ) : (
                <>
                  <span>Continue to Ingredients</span>
                  <span className="ml-2">→</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicDetailsStep;
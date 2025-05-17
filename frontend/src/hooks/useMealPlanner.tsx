
import { useState } from "react";
import { Container, Ingredient, SeasoningItem } from "@/types/mealPlanner";

export const useMealPlanner = () => {
  const [showCookingInstructions, setShowCookingInstructions] = useState(false);
  const [dragging, setDragging] = useState<Ingredient | null>(null);
  
  // Sample recipe data
  const recipeName = "Penne Alfredo";
  const servingSize = 4;
  
  // Sample ingredients
  const [ingredients] = useState<Ingredient[]>([
    { id: "capsicum", name: "Capsicum", image: "/lovable-uploads/dd9bf0df-61e9-4df5-958f-179c836006ce.png" },
    { id: "carrot", name: "Carrot", image: "/lovable-uploads/dd9bf0df-61e9-4df5-958f-179c836006ce.png" },
    { id: "lemon", name: "Lemon", image: "/lovable-uploads/dd9bf0df-61e9-4df5-958f-179c836006ce.png" },
    { id: "zucchini", name: "Zucchini", image: "/lovable-uploads/dd9bf0df-61e9-4df5-958f-179c836006ce.png" },
    { id: "chiles", name: "Chiles", image: "/lovable-uploads/dd9bf0df-61e9-4df5-958f-179c836006ce.png" },
    { id: "drumstick", name: "Drumstick", image: "/lovable-uploads/dd9bf0df-61e9-4df5-958f-179c836006ce.png" },
    { id: "garlic", name: "Garlic", image: "/lovable-uploads/dd9bf0df-61e9-4df5-958f-179c836006ce.png" },
    { id: "ginger", name: "Ginger", image: "/lovable-uploads/dd9bf0df-61e9-4df5-958f-179c836006ce.png" },
    { id: "broccoli", name: "Broccoli", image: "/lovable-uploads/dd9bf0df-61e9-4df5-958f-179c836006ce.png" },
    { id: "radish", name: "Radish", image: "/lovable-uploads/dd9bf0df-61e9-4df5-958f-179c836006ce.png" },
    { id: "tomato", name: "Tomato's", image: "/lovable-uploads/dd9bf0df-61e9-4df5-958f-179c836006ce.png" },
    { id: "peas", name: "Peas", image: "/lovable-uploads/dd9bf0df-61e9-4df5-958f-179c836006ce.png" },
    { id: "onion", name: "Onion", image: "/lovable-uploads/dd9bf0df-61e9-4df5-958f-179c836006ce.png" },
    { id: "bellpepper", name: "Bell Pepper", image: "/lovable-uploads/dd9bf0df-61e9-4df5-958f-179c836006ce.png" },
    { id: "spinach", name: "Spinach", image: "/lovable-uploads/dd9bf0df-61e9-4df5-958f-179c836006ce.png" },
    { id: "butter", name: "Butter", image: "/lovable-uploads/dd9bf0df-61e9-4df5-958f-179c836006ce.png" },
    { id: "oliveoil", name: "Extra Virgin Olive Oil", image: "/lovable-uploads/dd9bf0df-61e9-4df5-958f-179c836006ce.png" },
    { id: "cream", name: "Cream", image: "/lovable-uploads/dd9bf0df-61e9-4df5-958f-179c836006ce.png" },
    { id: "creamcheese", name: "Cream Cheese", image: "/lovable-uploads/dd9bf0df-61e9-4df5-958f-179c836006ce.png" },
    { id: "penne", name: "Boiled Penne", image: "/lovable-uploads/dd9bf0df-61e9-4df5-958f-179c836006ce.png" },
  ]);
  
  // Sample containers
  const [containers, setContainers] = useState<Container[]>([
    { id: 1, name: "Container 1", ingredients: [] },
    { id: 2, name: "Container 2", ingredients: [] },
    { id: 3, name: "Container 3", ingredients: [] },
    { id: 4, name: "Container 4", ingredients: [] },
  ]);
  
  // Sample seasonings
  const [seasonings] = useState<SeasoningItem[]>([
    { id: "salt", name: "Salt", image: "/lovable-uploads/dd9bf0df-61e9-4df5-958f-179c836006ce.png", count: 1 },
    { id: "oregano", name: "Oregano", image: "/lovable-uploads/dd9bf0df-61e9-4df5-958f-179c836006ce.png", count: 2 },
    { id: "blackpepper", name: "Black Pepper", image: "/lovable-uploads/dd9bf0df-61e9-4df5-958f-179c836006ce.png", count: 3 },
    { id: "bouillonpowder", name: "Bouillon Powder", image: "/lovable-uploads/dd9bf0df-61e9-4df5-958f-179c836006ce.png", count: 4 },
  ]);

  const handleDragStart = (
    e: React.DragEvent, 
    ingredient: Ingredient, 
    source: "ingredient-list" | "container",
    containerId?: number
  ) => {
    setDragging(ingredient);
    
    // Store the source and container ID if applicable
    e.dataTransfer.setData("source", source);
    
    if (source === "container" && containerId) {
      e.dataTransfer.setData("containerId", containerId.toString());
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetContainerId: number) => {
    e.preventDefault();
    
    if (!dragging) return;
    
    const source = e.dataTransfer.getData("source");
    const sourceContainerId = e.dataTransfer.getData("containerId");
    
    // Create a copy of the containers
    const updatedContainers = [...containers];
    
    if (source === "container" && sourceContainerId) {
      // Moving from one container to another
      const sourceContainer = updatedContainers.find(c => c.id === parseInt(sourceContainerId));
      const targetContainer = updatedContainers.find(c => c.id === targetContainerId);
      
      if (sourceContainer && targetContainer) {
        // Remove from source container
        sourceContainer.ingredients = sourceContainer.ingredients.filter(ing => ing.id !== dragging.id);
        
        // Add to target container if not already there
        if (!targetContainer.ingredients.some(ing => ing.id === dragging.id)) {
          targetContainer.ingredients.push({
            ...dragging,
            weight: Math.floor(Math.random() * 90) + 10 // random weight for demo
          });
        }
      }
    } else {
      // Adding from the ingredient list
      const targetContainer = updatedContainers.find(c => c.id === targetContainerId);
      
      if (targetContainer && !targetContainer.ingredients.some(ing => ing.id === dragging.id)) {
        targetContainer.ingredients.push({
          ...dragging,
          weight: Math.floor(Math.random() * 90) + 10 // random weight for demo
        });
      }
    }
    
    setContainers(updatedContainers);
    setDragging(null);
  };

  const removeIngredient = (containerId: number, ingredientId: string) => {
    const updatedContainers = containers.map(container => {
      if (container.id === containerId) {
        return {
          ...container,
          ingredients: container.ingredients.filter(ing => ing.id !== ingredientId)
        };
      }
      return container;
    });
    
    setContainers(updatedContainers);
  };

  const handleStartCooking = () => {
    setShowCookingInstructions(true);
  };

  const handleBackToPlanner = () => {
    setShowCookingInstructions(false);
  };

  return {
    recipeName,
    servingSize,
    showCookingInstructions,
    ingredients,
    seasonings,
    containers,
    dragging,
    handleDragStart,
    handleDrop,
    handleDragOver,
    removeIngredient,
    handleStartCooking,
    handleBackToPlanner
  };
};

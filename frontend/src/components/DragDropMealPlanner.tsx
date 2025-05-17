
import { useMealPlanner } from "@/hooks/useMealPlanner";
import MealPlannerLayout from "./mealPlanner/MealPlannerLayout";
import PlannerGrid from "./mealPlanner/PlannerGrid";
import CookingInstructions from "./mealPlanner/CookingInstructions";

const DragDropMealPlanner = () => {
  const {
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
  } = useMealPlanner();

  return (
    <MealPlannerLayout 
      recipeName={recipeName}
      servingSize={servingSize}
      footerText={
        showCookingInstructions 
          ? "Follow the instructions step by step to cook your meal"
          : "Drag ingredients and seasonings to create your perfect meal combination"
      }
    >
      {showCookingInstructions ? (
        <CookingInstructions 
          recipeName={recipeName}
          containers={containers}
          seasonings={seasonings}
          onBack={handleBackToPlanner}
        />
      ) : (
        <PlannerGrid 
          ingredients={ingredients}
          containers={containers}
          seasonings={seasonings}
          dragging={dragging}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onRemoveIngredient={removeIngredient}
          onStartCooking={handleStartCooking}
        />
      )}
    </MealPlannerLayout>
  );
};

export default DragDropMealPlanner;

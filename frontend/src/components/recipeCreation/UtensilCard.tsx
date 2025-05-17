
import { Utensil } from "@/types/recipeCreation";

interface UtensilCardProps {
  utensil: Utensil;
  onDragStart: (utensil: Utensil) => void;
}

const UtensilCard = ({ utensil, onDragStart }: UtensilCardProps) => {
  return (
    <div 
      className="bg-white p-3 rounded-lg shadow-sm flex items-center cursor-grab"
      draggable
      onDragStart={() => onDragStart(utensil)}
    >
      <div className="w-10 h-10 mr-3">
        <img 
          src={`https://source.unsplash.com/100x100/?${encodeURIComponent(utensil.name.toLowerCase())},kitchen,utensil`} 
          alt={utensil.name}
          className="w-full h-full object-cover rounded-md"
          onError={(e) => {
            e.currentTarget.src = "/lovable-uploads/dd9bf0df-61e9-4df5-958f-179c836006ce.png";
          }}
        />
      </div>
      <span>{utensil.name}</span>
    </div>
  );
};

export default UtensilCard;

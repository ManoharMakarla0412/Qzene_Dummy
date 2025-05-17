
import { ReactNode } from "react";

interface ActionCardProps {
  id: string;
  name: string;
  icon: string;
  isSelected: boolean;
  onClick: () => void;
  renderIcon: (iconName: string) => ReactNode;
}

const ActionCard = ({ id, name, icon, isSelected, onClick, renderIcon }: ActionCardProps) => {
  return (
    <div 
      className={`flex items-center p-3 rounded-lg cursor-pointer ${isSelected ? 'bg-blue-100 border border-blue-300' : 'bg-white'}`}
      onClick={onClick}
    >
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
        {renderIcon(icon)}
      </div>
      <span>{name}</span>
    </div>
  );
};

export default ActionCard;

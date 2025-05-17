
import { useState } from "react";
import SearchInput from "./SearchInput";
import ActionCard from "./ActionCard";
import { ReactNode } from "react";

interface CookingAction {
  id: string;
  name: string;
  icon: string;
}

interface ActionsListProps {
  cookingActions: CookingAction[];
  selectedAction: string | null;
  onActionSelect: (action: CookingAction) => void;
  renderActionIcon: (iconName: string) => ReactNode;
}

const ActionsList = ({ cookingActions, selectedAction, onActionSelect, renderActionIcon }: ActionsListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredActions = cookingActions.filter(action => 
    action.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="md:col-span-3 bg-gray-50 p-4 rounded-lg">
      <SearchInput 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="Search actions..."
      />
      
      <div className="space-y-2">
        {filteredActions.map(action => (
          <ActionCard 
            key={action.id}
            id={action.id}
            name={action.name}
            icon={action.icon}
            isSelected={selectedAction === action.id}
            onClick={() => onActionSelect(action)}
            renderIcon={renderActionIcon}
          />
        ))}
      </div>
    </div>
  );
};

export default ActionsList;

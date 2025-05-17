
import { Instruction } from "@/types/recipeCreation";
import { ReactNode } from "react";
import InstructionCard from "./InstructionCard";
import AddInstructionCard from "./AddInstructionCard";

interface InstructionsPanelProps {
  instructions: Instruction[];
  onInstructionsChange: (instructions: Instruction[]) => void;
  renderActionIcon?: (iconName: string) => ReactNode;
}

const InstructionsPanel = ({ 
  instructions, 
  onInstructionsChange,
  renderActionIcon = () => null
}: InstructionsPanelProps) => {
  
  const handleRemoveInstruction = (id: string) => {
    onInstructionsChange(instructions.filter(inst => inst.id !== id));
  };

  const handleAddInstruction = () => {
    const newInstruction: Instruction = {
      id: crypto.randomUUID(),
      step: instructions.length + 1,
      action: "New step",
      icon: "activity"
    };
    onInstructionsChange([...instructions, newInstruction]);
  };
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {instructions.map((instruction) => (
          <InstructionCard 
            key={instruction.id}
            instruction={instruction}
            renderActionIcon={renderActionIcon}
            onRemove={handleRemoveInstruction}
          />
        ))}

        <AddInstructionCard onClick={handleAddInstruction} />
      </div>
    </div>
  );
};

export default InstructionsPanel;

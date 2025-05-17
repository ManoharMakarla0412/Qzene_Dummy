
import { Instruction } from "@/types/recipeCreation";
import { ReactNode } from "react";

interface PreviewStepProps {
  instruction: Instruction;
  index: number;
  renderIcon: (iconName: string) => ReactNode;
}

const PreviewStep = ({ instruction, index, renderIcon }: PreviewStepProps) => {
  return (
    <div className="flex items-start">
      <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
        {instruction.step}
      </div>
      <div>
        <div className="font-medium mb-1">{instruction.action}</div>
        <div className="text-sm text-gray-600">
          {index === 0 ? "Start by turning on the induction" : ""}
          {instruction.icon === "clock" ? "Allow time for ingredients to cook properly" : ""}
          {instruction.icon === "package" ? "Add the ingredients from the container" : ""}
          {instruction.icon === "refresh-cw" ? "Ensure ingredients are well mixed" : ""}
        </div>
      </div>
    </div>
  );
};

export default PreviewStep;

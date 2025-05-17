
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { Info } from "lucide-react";
import { difficultyOptions, deviceSupportOptions } from "./formOptions";

interface RecipeDetailsSectionProps {
  difficulty: string;
  deviceSupport: string;
  cookingTime: number | string;
  servingSize: number | string;
  price: number | string;
  preparationRequired: string;
  onSelectChange: (name: string, value: string) => void;
  onNumberChange: (e: React.ChangeEvent<HTMLInputElement>, min: number, max: number) => void;
}

const RecipeDetailsSection = ({
  difficulty,
  deviceSupport,
  cookingTime,
  servingSize,
  price,
  preparationRequired,
  onSelectChange,
  onNumberChange,
}: RecipeDetailsSectionProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="difficulty">Difficulty Level</Label>
        <Select
          value={difficulty}
          onValueChange={(value) => onSelectChange("difficulty", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select difficulty" />
          </SelectTrigger>
          <SelectContent>
            {difficultyOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="deviceSupport">Device Support</Label>
        <Select
          value={deviceSupport}
          onValueChange={(value) =>
            onSelectChange("deviceSupport", value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select compatible devices" />
          </SelectTrigger>
          <SelectContent>
            {deviceSupportOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="cookingTime" className="flex items-center">
            Cook Time (min)
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <TooltipArrow />
                  Total cooking time in minutes
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <Input
            id="cookingTime"
            name="cookingTime"
            type="number"
            value={cookingTime}
            onChange={(e) => onNumberChange(e, 1, 300)}
            min={1}
            max={300}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="servingSize">Servings</Label>
          <Input
            id="servingSize"
            name="servingSize"
            type="number"
            value={servingSize}
            onChange={(e) => onNumberChange(e, 1, 20)}
            min={1}
            max={20}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={price}
            onChange={(e) => onNumberChange(e, 0, 1000)}
            min={0}
            step={0.01}
            required
          />
        </div>
      </div>
      
      <div>
        <Label>Preparation Required</Label>
        <div className="flex space-x-4 mt-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="preparationRequired"
              value="yes"
              checked={preparationRequired === "yes"}
              onChange={() =>
                onSelectChange("preparationRequired", "yes")
              }
              className="h-4 w-4 border-gray-300 focus:ring-primary"
            />
            <span>Yes</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="preparationRequired"
              value="no"
              checked={preparationRequired === "no"}
              onChange={() =>
                onSelectChange("preparationRequired", "no")
              }
              className="h-4 w-4 border-gray-300 focus:ring-primary"
            />
            <span>No</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailsSection;


import { Container, SeasoningItem } from "@/types/mealPlanner";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RotateCw } from "lucide-react";

interface CookingInstructionsProps {
  recipeName: string;
  containers: Container[];
  seasonings: SeasoningItem[];
  onBack: () => void;
}

interface Instruction {
  id: string;
  step: number;
  action: string;
  icon: string;
}

const CookingInstructions = ({
  recipeName,
  containers,
  seasonings,
  onBack
}: CookingInstructionsProps) => {
  // Sample instructions
  const instructions: Instruction[] = [
    { id: "1", step: 1, action: "Induction On", icon: "power-circle" },
    { id: "2", step: 2, action: "Wait for 2 minutes", icon: "clock" },
    { id: "3", step: 3, action: "Drop Tray 2", icon: "package" },
    { id: "4", step: 4, action: "Stir", icon: "refresh-cw" },
    { id: "5", step: 5, action: "Wait for 1 minute", icon: "clock" },
    { id: "6", step: 6, action: "Stir", icon: "refresh-cw" },
    { id: "7", step: 7, action: "Drop Tray 1", icon: "package" },
    { id: "8", step: 8, action: "Stir", icon: "refresh-cw" },
  ];

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "power-circle":
        return (
          <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18.36 6.64A9 9 0 1 1 5.63 6.64"></path>
              <line x1="12" y1="2" x2="12" y2="12"></line>
            </svg>
          </div>
        );
      case "clock":
        return (
          <div className="h-8 w-8 bg-gray-500 rounded-full flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
        );
      case "package":
        return (
          <div className="h-8 w-8 bg-orange-500 rounded-full flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
          </div>
        );
      case "refresh-cw":
        return (
          <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
            <RotateCw size={16} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      <div className="md:col-span-3 bg-gray-50 p-4 rounded-lg">
        <div className="space-y-3">
          <div className="flex items-center p-3 rounded-lg cursor-pointer bg-green-100 text-green-800">
            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18.36 6.64A9 9 0 1 1 5.63 6.64"></path>
                <line x1="12" y1="2" x2="12" y2="12"></line>
              </svg>
            </div>
            <span>Induction On</span>
          </div>
          
          <div className="flex items-center p-3 rounded-lg cursor-pointer bg-white">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 9H3V3h18v6z"></path>
                <path d="M21 15H3V9h18v6z"></path>
                <path d="M3 15v6h18v-6"></path>
                <path d="M3.5 3v18"></path>
                <path d="M10.5 3v18"></path>
                <path d="M17.5 3v18"></path>
              </svg>
            </div>
            <span>Lid Open</span>
          </div>
          
          <div className="flex items-center p-3 rounded-lg cursor-pointer bg-white">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3 text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path>
              </svg>
            </div>
            <span>Temperature</span>
          </div>
          
          <div className="flex items-center p-3 rounded-lg cursor-pointer bg-white">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3 text-yellow-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v6"></path>
                <path d="M5 12H2"></path>
                <path d="M19 12h3"></path>
                <path d="M12 22v-6"></path>
                <path d="M5 5l3 3"></path>
                <path d="M16 16l3 3"></path>
                <path d="M16 5l-3 3"></path>
                <path d="M5 19l3-3"></path>
                <circle cx="12" cy="12" r="4"></circle>
              </svg>
            </div>
            <span>Pump Oil</span>
          </div>
          
          <div className="flex items-center p-3 rounded-lg cursor-pointer bg-white">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <span>Wait</span>
          </div>
          
          <div className="flex items-center p-3 rounded-lg cursor-pointer bg-white">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </div>
            <span>Add Seasoning</span>
          </div>
        </div>
      </div>
      
      <div className="md:col-span-6 bg-white p-4 rounded-lg">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-4">Instructions</h2>
          
          <div className="grid grid-cols-2 gap-4">
            {instructions.map((instruction, index) => (
              <div key={instruction.id} className="relative">
                <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded absolute top-0 left-0">
                  Step {instruction.step}
                </div>
                <div className="border rounded-lg p-4 pt-6 flex items-center">
                  {renderIcon(instruction.icon)}
                  <span className="ml-3">{instruction.action}</span>
                </div>
              </div>
            ))}
            
            <div className="border border-dashed rounded-lg flex items-center justify-center p-8 cursor-pointer">
              <div className="flex flex-col items-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
                <span>Drop your instruction here</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={onBack}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center gap-4">
            <Button variant="outline">
              Reset
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600">
              Continue
            </Button>
          </div>
        </div>
      </div>
      
      <div className="md:col-span-3 bg-gray-50 p-4 rounded-lg">
        <h3 className="text-xl font-medium mb-4">Ingredients</h3>
        
        <div className="space-y-6">
          {containers.filter(container => container.ingredients.length > 0).map((container, index) => (
            <div key={container.id} className="mb-4">
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-2">
                  {index + 1}
                </div>
                <span className="text-blue-600 font-medium">Container {container.id}</span>
              </div>
              
              <div className="pl-8 space-y-2">
                {container.ingredients.map((ing) => (
                  <div key={ing.id} className="flex items-center">
                    <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                      <img 
                        src={`https://source.unsplash.com/100x100/?${encodeURIComponent(ing.name.toLowerCase())},food`} 
                        alt={ing.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/lovable-uploads/dd9bf0df-61e9-4df5-958f-179c836006ce.png";
                        }}
                      />
                    </div>
                    <span>{ing.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <h3 className="text-xl font-medium mt-6 mb-4">Seasonings</h3>
        
        <div className="space-y-2">
          {seasonings.map((seasoning) => (
            <div key={seasoning.id} className="flex items-center">
              <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                <img 
                  src={`https://source.unsplash.com/100x100/?${encodeURIComponent(seasoning.name.toLowerCase())},spice`} 
                  alt={seasoning.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/lovable-uploads/dd9bf0df-61e9-4df5-958f-179c836006ce.png";
                  }}
                />
              </div>
              <span>{seasoning.name}</span>
            </div>
          ))}
        </div>
        
        <h3 className="text-xl font-medium mt-6 mb-4">Water & Oil</h3>
        
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-blue-100 rounded-full mr-2 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v6"></path>
                <path d="M12 22v-6"></path>
                <path d="M4.93 4.93l4.24 4.24"></path>
                <path d="M14.83 14.83l4.24 4.24"></path>
                <path d="M19.07 4.93l-4.24 4.24"></path>
                <path d="M14.83 9.17l-4.24-4.24"></path>
                <path d="M2 12h6"></path>
                <path d="M22 12h-6"></path>
                <path d="M9.17 14.83L4.93 19.07"></path>
              </svg>
            </div>
            <span>Drinking Water</span>
          </div>
          
          <div className="flex items-center">
            <div className="w-6 h-6 bg-yellow-100 rounded-full mr-2 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v6"></path>
                <path d="M12 22v-6"></path>
                <path d="M4.93 4.93l4.24 4.24"></path>
                <path d="M14.83 14.83l4.24 4.24"></path>
                <path d="M19.07 4.93l-4.24 4.24"></path>
                <path d="M14.83 9.17l-4.24-4.24"></path>
                <path d="M2 12h6"></path>
                <path d="M22 12h-6"></path>
                <path d="M9.17 14.83L4.93 19.07"></path>
              </svg>
            </div>
            <span>Olive Oil</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookingInstructions;

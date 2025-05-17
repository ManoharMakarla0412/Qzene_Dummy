
import { PowerCircle, Timer, Thermometer, Droplet, Clock, RefreshCw, Utensils, RotateCw } from "lucide-react";
import { ReactNode } from "react";

export const renderActionIcon = (iconName: string): ReactNode => {
  switch (iconName) {
    case "power-circle":
      return <PowerCircle className="h-6 w-6" />;
    case "package-open":
      return <div className="h-6 w-6 flex items-center justify-center">🍲</div>;
    case "thermometer":
      return <Thermometer className="h-6 w-6" />;
    case "droplet":
      return <Droplet className="h-6 w-6" />;
    case "clock":
      return <Clock className="h-6 w-6" />;
    case "utensils":
      return <Utensils className="h-6 w-6" />;
    case "refresh-cw":
      return <RotateCw className="h-6 w-6" />;
    case "package":
      return <div className="h-6 w-6 flex items-center justify-center">📦</div>;
    default:
      return <div className="h-6 w-6"></div>;
  }
};

// Define cooking actions with icons
export const cookingActions = [
  { id: "induction-on", name: "Induction On", icon: "power-circle" },
  { id: "lid-open", name: "Lid Open", icon: "package-open" },
  { id: "temperature", name: "Temperature", icon: "thermometer" },
  { id: "pump-oil", name: "Pump Oil", icon: "droplet" },
  { id: "wait", name: "Wait", icon: "clock" },
  { id: "add-seasoning", name: "Add Seasoning", icon: "utensils" },
  { id: "pump-water", name: "Pump Water", icon: "droplet" },
  { id: "stir", name: "Stir", icon: "refresh-cw" },
  { id: "drop-tray", name: "Drop Tray", icon: "package" }
];

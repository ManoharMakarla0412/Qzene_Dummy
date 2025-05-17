
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ChefManagementHeaderProps {
  title?: string;
}

const ChefManagementHeader = ({ title = "Chef Management" }: ChefManagementHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-3xl font-bold">{title}</h2>
      <Button onClick={() => navigate("/admin/chefs/create")}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Add New Chef
      </Button>
    </div>
  );
};

export default ChefManagementHeader;

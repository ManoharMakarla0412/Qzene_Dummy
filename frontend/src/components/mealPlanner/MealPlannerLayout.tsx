
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface MealPlannerLayoutProps {
  children: React.ReactNode;
  recipeName: string;
  servingSize: number;
  footerText: string;
}

const MealPlannerLayout = ({
  children,
  recipeName,
  servingSize,
  footerText
}: MealPlannerLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-6 bg-white border-b">
        <div className="container mx-auto">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-semibold">{recipeName}</h1>
            <div className="ml-auto">Serve: {servingSize}</div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 py-6 px-4">
        <div className="container mx-auto">
          {children}
        </div>
      </main>
      
      <footer className="py-3 px-6 bg-white border-t">
        <div className="container mx-auto">
          <p className="text-center text-gray-500 text-sm">{footerText}</p>
        </div>
      </footer>
    </div>
  );
};

export default MealPlannerLayout;

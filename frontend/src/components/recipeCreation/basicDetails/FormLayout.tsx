
import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Loader2 } from "lucide-react";

interface FormLayoutProps {
  title: string;
  leftColumn: ReactNode;
  rightColumn: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  submitButtonText?: string;
  isSubmitting?: boolean;
}

const FormLayout = ({ 
  title, 
  leftColumn, 
  rightColumn, 
  onSubmit,
  submitButtonText = "Continue to Ingredients",
  isSubmitting = false
}: FormLayoutProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {leftColumn}
          </div>
          
          <div className="space-y-4">
            {rightColumn}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          type="submit" 
          className="bg-qzene-dark text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              {submitButtonText} <ChevronRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default FormLayout;

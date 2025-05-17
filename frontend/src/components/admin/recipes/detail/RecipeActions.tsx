
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseMutationResult } from "@tanstack/react-query";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit, Trash2, Loader2 } from "lucide-react";

interface RecipeActionsProps {
  recipeId: string;
  isApproved: boolean | null;
  approveMutation: UseMutationResult<any, Error, void>;
  rejectMutation: UseMutationResult<any, Error, void>;
  deleteMutation: UseMutationResult<any, Error, void>;
}

const RecipeActions = ({ 
  recipeId, 
  isApproved,
  approveMutation,
  rejectMutation,
  deleteMutation
}: RecipeActionsProps) => {
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <CardFooter className="flex justify-between">
      <div className="flex space-x-2">
        <Button
          variant="outline"
          onClick={() => navigate(`/admin/recipes/edit/${recipeId}`)}
        >
          <Edit className="h-4 w-4 mr-2" /> Edit
        </Button>
        
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
              <Trash2 className="h-4 w-4 mr-2" /> Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Recipe</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this recipe? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => deleteMutation.mutate()}
                className="bg-red-500 hover:bg-red-600"
              >
                {deleteMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Trash2 className="h-4 w-4 mr-2" />
                )}
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      
      <div className="flex space-x-2">
        {!isApproved && (
          <Button
            variant="default"
            className="bg-green-600 hover:bg-green-700"
            onClick={() => approveMutation.mutate()}
            disabled={approveMutation.isPending}
          >
            {approveMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            Approve Recipe
          </Button>
        )}
        
        {isApproved && (
          <Button
            variant="outline"
            className="text-amber-600 border-amber-200 hover:bg-amber-50"
            onClick={() => rejectMutation.mutate()}
            disabled={rejectMutation.isPending}
          >
            {rejectMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            Reject Recipe
          </Button>
        )}
      </div>
    </CardFooter>
  );
};

export default RecipeActions;

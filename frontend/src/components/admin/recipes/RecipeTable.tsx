import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Eye,
  Edit,
  Trash2,
  Loader2,
  Image,
  Check,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { API_URL } from "@/lib/constants";


interface RecipeTableProps {
  recipes: any[] | undefined;
  isLoading: boolean;
  onRefetch: () => void;
  onViewRecipe: (id: string) => void;
  onEditRecipe: (id: string) => void;
  handleDeleteClick: (id: string) => void;
}

const RecipeTable = ({
  recipes,
  isLoading,
  onRefetch,
  onViewRecipe,
  onEditRecipe,
  handleDeleteClick
}: RecipeTableProps) => {
  const { toast } = useToast();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleApprove = async (recipeId: string) => {
    try {
      setLoadingId(recipeId);
      const response = await fetch(`${API_URL}/api/recipes/${recipeId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
        body: JSON.stringify({ status: 'approved' })
      });

      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "Success",
          description: "Recipe approved successfully",
        });
        onRefetch(); // Refresh the recipes list
      } else {
        throw new Error(data.error || 'Failed to approve recipe');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoadingId(null);
    }
  };

  const handleReject = async (recipeId: string) => {
    try {
      setLoadingId(recipeId);
      const response = await fetch(`${API_URL}/api/recipes/${recipeId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
        body: JSON.stringify({ status: 'rejected' })
      });

      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "Success",
          description: "Recipe rejected successfully",
        });
        onRefetch(); // Refresh the recipes list
      } else {
        throw new Error(data.error || 'Failed to reject recipe');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoadingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!recipes || recipes.length === 0) {
    return <div className="text-center py-12 text-muted-foreground">No recipes found</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recipes.map((recipe) => (
            <TableRow key={recipe._id}>
              <TableCell>
                {recipe.recipeImage ? (
                  <img 
                    src={recipe.recipeImage} 
                    alt={recipe.name} 
                    className="h-10 w-10 rounded object-cover" 
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-muted">
                    <Image className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
              </TableCell>
              <TableCell className="font-medium">{recipe.name}</TableCell>
              <TableCell>{recipe.author}</TableCell>
              <TableCell>
                <Badge variant="outline" 
                  className={`
                    ${recipe.status === 'approved' ? 'bg-green-100 text-green-800' : 
                      recipe.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'}
                  `}
                >
                  {recipe.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  {recipe.status !== 'approved' && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleApprove(recipe._id)}
                      disabled={loadingId === recipe._id}
                      className="h-8 w-8 text-green-500 hover:text-green-600 hover:bg-green-50"
                    >
                      {loadingId === recipe._id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Check className="h-4 w-4" />
                      )}
                    </Button>
                  )}

                  {recipe.status !== 'rejected' && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleReject(recipe._id)}
                      disabled={loadingId === recipe._id}
                      className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      {loadingId === recipe._id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <X className="h-4 w-4" />
                      )}
                    </Button>
                  )}

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onViewRecipe(recipe._id)}
                    className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEditRecipe(recipe._id)}
                    className="h-8 w-8 text-gray-500 hover:text-gray-600 hover:bg-gray-50"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteClick(recipe._id)}
                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecipeTable;

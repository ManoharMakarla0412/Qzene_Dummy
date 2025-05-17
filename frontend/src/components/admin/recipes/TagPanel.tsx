
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, X, Loader2 } from "lucide-react";

interface Tag {
  id: string;
  name: string;
  count?: number;
}

const TagPanel = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [newTag, setNewTag] = useState("");

  // Fetch tags - in a real app, this would be from a dedicated table
  // For demo, we'll extract tags from recipes
  const { data: tags, isLoading } = useQuery({
    queryKey: ["recipe-tags"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('recipes')
        .select('tags')
        .not('tags', 'is', null);
      
      if (error) throw error;

      // Count tags and create unique list
      const tagMap = new Map<string, number>();
      data.forEach(recipe => {
        if (recipe.tags && Array.isArray(recipe.tags)) {
          recipe.tags.forEach((tag: string) => {
            const trimmedTag = tag.trim().toLowerCase();
            if (trimmedTag) {
              tagMap.set(trimmedTag, (tagMap.get(trimmedTag) || 0) + 1);
            }
          });
        }
      });

      // Convert to array of tag objects
      const tagList: Tag[] = Array.from(tagMap).map(([name, count], index) => ({
        id: `tag-${index + 1}`,
        name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize
        count
      }));
      
      // If no tags found, provide defaults
      if (tagList.length === 0) {
        return [
          { id: 'tag-1', name: 'Vegetarian' },
          { id: 'tag-2', name: 'Vegan' },
          { id: 'tag-3', name: 'Gluten-Free' },
          { id: 'tag-4', name: 'Dairy-Free' },
          { id: 'tag-5', name: 'Keto' },
          { id: 'tag-6', name: 'Low-Carb' },
          { id: 'tag-7', name: 'High-Protein' },
          { id: 'tag-8', name: 'Breakfast' },
          { id: 'tag-9', name: 'Lunch' },
          { id: 'tag-10', name: 'Dinner' },
          { id: 'tag-11', name: 'Dessert' },
          { id: 'tag-12', name: 'Snack' },
          { id: 'tag-13', name: 'Quick' },
          { id: 'tag-14', name: 'Easy' },
          { id: 'tag-15', name: 'Gourmet' },
        ];
      }
      
      return tagList;
    }
  });

  // Add tag mutation - for demo purposes
  const addTagMutation = useMutation({
    mutationFn: async (name: string) => {
      // In a real app, you would add to a tags table
      console.log(`Adding tag: ${name}`);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      return { id: `tag-${Date.now()}`, name };
    },
    onSuccess: (newTag) => {
      queryClient.setQueryData(['recipe-tags'], (old: Tag[] | undefined) => [
        ...(old || []),
        { ...newTag, count: 0 }
      ]);
      toast({
        title: 'Tag added',
        description: `${newTag.name} has been added to tags`
      });
      setNewTag('');
    }
  });

  // Delete tag mutation - for demo purposes
  const deleteTagMutation = useMutation({
    mutationFn: async (id: string) => {
      // In a real app, you would delete from the tags table
      console.log(`Deleting tag: ${id}`);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      return { id };
    },
    onSuccess: (result) => {
      queryClient.setQueryData(['recipe-tags'], (old: Tag[] | undefined) => 
        old?.filter(tag => tag.id !== result.id)
      );
      toast({
        title: 'Tag deleted',
        description: 'The tag has been removed'
      });
    }
  });

  const handleAddTag = () => {
    if (newTag.trim()) {
      addTagMutation.mutate(newTag.trim());
    }
  };

  const handleDeleteTag = (tag: Tag) => {
    deleteTagMutation.mutate(tag.id);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tags</CardTitle>
        <CardDescription>
          Manage recipe tags
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-6">
          <Input 
            placeholder="New tag name..." 
            className="max-w-sm"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />
          <Button 
            onClick={handleAddTag}
            disabled={!newTag.trim() || addTagMutation.isPending}
          >
            {addTagMutation.isPending ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <PlusCircle className="h-4 w-4 mr-2" />
            )}
            Add Tag
          </Button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : tags && tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div 
                key={tag.id} 
                className="flex items-center space-x-1 bg-muted px-3 py-1.5 rounded-md"
              >
                <span className="text-sm">{tag.name}</span>
                {tag.count !== undefined && (
                  <span className="text-xs text-muted-foreground">({tag.count})</span>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-5 w-5 p-0 ml-1 rounded-full hover:bg-background hover:text-red-600"
                  onClick={() => handleDeleteTag(tag)}
                  disabled={deleteTagMutation.isPending && deleteTagMutation.variables === tag.id}
                >
                  {deleteTagMutation.isPending && deleteTagMutation.variables === tag.id ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <X className="h-3 w-3" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No tags found. Add your first tag above.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TagPanel;


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChefProfile } from "./types";
import ChefTable from "./ChefTable";
import TopChefs from "./TopChefs";
import ChefApplications from "./ChefApplications";

interface ChefTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  filteredChefs: ChefProfile[] | undefined;
  topChefs: ChefProfile[] | undefined;
  isLoading: boolean;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ChefTabs = ({
  activeTab,
  setActiveTab,
  filteredChefs,
  topChefs,
  isLoading,
  onView,
  onEdit,
  onDelete,
}: ChefTabsProps) => {
  return (
    <Tabs defaultValue="all-chefs" onValueChange={setActiveTab}>
      <TabsList className="mb-6">
        <TabsTrigger value="all-chefs">All Chefs</TabsTrigger>
        <TabsTrigger value="top-chefs">Top Chefs</TabsTrigger>
        <TabsTrigger value="applications">Applications</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all-chefs">
        <ChefTable 
          chefs={filteredChefs} 
          isLoading={isLoading} 
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TabsContent>
      
      <TabsContent value="top-chefs">
        <TopChefs 
          chefs={topChefs || []} 
          onView={onView}
          onEdit={onEdit}
        />
      </TabsContent>
      
      <TabsContent value="applications">
        <ChefApplications />
      </TabsContent>
    </Tabs>
  );
};

export default ChefTabs;

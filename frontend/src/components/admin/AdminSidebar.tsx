
import { 
  Home, 
  Search, 
  Compass, 
  BookOpen, 
  ChefHat, 
  MessageSquare, 
  Settings, 
  HelpCircle,
  Phone,
  ShoppingCart,
  Users,
  LayoutDashboard,
  BookmarkIcon,
  FileText,
  BarChart3,
  Package,
  Star
} from "lucide-react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";

interface AdminSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const AdminSidebar = ({ activeSection, setActiveSection }: AdminSidebarProps) => {
  const navigate = useNavigate();
  
  const menuItems = [
    { id: "summary", label: "Dashboard", icon: <LayoutDashboard size={20} />, onClick: () => setActiveSection("summary") },
    { id: "analytics", label: "Analytics", icon: <BarChart3 size={20} />, onClick: () => setActiveSection("analytics") },
    { id: "recipe-management", label: "Recipes", icon: <BookOpen size={20} />, onClick: () => setActiveSection("recipe-management") },
    { id: "chef-management", label: "Chef Management", icon: <ChefHat size={20} />, onClick: () => setActiveSection("chef-management") },
    { id: "user-management", label: "Users", icon: <Users size={20} />, onClick: () => setActiveSection("user-management") },
    { id: "order-management", label: "Orders", icon: <ShoppingCart size={20} />, onClick: () => setActiveSection("order-management") },
    { id: "feedback-control", label: "Reviews", icon: <Star size={20} />, onClick: () => setActiveSection("feedback-control") },
    { divider: true },
    { id: "explore", label: "Content", icon: <FileText size={20} />, onClick: () => setActiveSection("explore") },
    { id: "popular-recipes", label: "Featured Recipes", icon: <BookmarkIcon size={20} />, onClick: () => setActiveSection("popular-recipes") },
    { id: "categories", label: "Categories", icon: <Package size={20} />, onClick: () => setActiveSection("categories") },
    { divider: true },
    { id: "site-management", label: "Settings", icon: <Settings size={20} />, onClick: () => setActiveSection("site-management") },
    { id: "help", label: "Help Center", icon: <HelpCircle size={20} />, onClick: () => setActiveSection("help") },
    { id: "contact", label: "Contact Support", icon: <Phone size={20} />, onClick: () => setActiveSection("contact") },
    { id: "home", label: "View Site", icon: <Home size={20} />, onClick: () => navigate("/") },
  ];

  return (
    <div className="h-full py-4 flex flex-col">
      <div className="mb-6 px-6">
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/24708f27-bbd0-4ca9-aafb-64a3f0d94ba8.png" 
            alt="Qzene Logo" 
            className="h-10"
          />
          <span className="text-lg font-semibold">Admin</span>
        </div>
      </div>
      
      <SidebarMenu>
        {menuItems.map((item, index) => (
          item.divider ? (
            <div key={`divider-${index}`} className="mx-4 my-2 border-t border-gray-200"></div>
          ) : (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                onClick={item.onClick}
                isActive={activeSection === item.id}
                className="justify-start w-full"
              >
                {item.icon}
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        ))}
      </SidebarMenu>
    </div>
  );
};

export default AdminSidebar;

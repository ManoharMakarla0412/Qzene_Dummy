
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Users, BookOpen, ChefHat, ShoppingCart } from "lucide-react";

const AdminSummary = () => {
  const { data: recentOrders } = useQuery({
    queryKey: ["recentOrders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('purchases')
        .select("*, recipes(name)")
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data;
    },
  });

  const { data: popularRecipes } = useQuery({
    queryKey: ["popularRecipes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('recipes')
        .select("id, name, count(*)", { count: "exact" })
        .order('count', { ascending: false })
        .limit(5);
      
      if (error) {
        // Fallback with mock data if query fails
        return [
          { name: "Spaghetti Carbonara", count: 42 },
          { name: "Thai Green Curry", count: 36 },
          { name: "Beef Stroganoff", count: 28 },
          { name: "Classic Burger", count: 24 },
          { name: "Vegetable Stir Fry", count: 19 }
        ];
      }
      return data;
    },
  });

  // Mock data for the stats cards
  const statsData = [
    { title: "Total Users", value: "2,834", icon: <Users className="h-5 w-5 text-muted-foreground" /> },
    { title: "Total Recipes", value: "486", icon: <BookOpen className="h-5 w-5 text-muted-foreground" /> },
    { title: "Active Chefs", value: "68", icon: <ChefHat className="h-5 w-5 text-muted-foreground" /> },
    { title: "Total Orders", value: "1,294", icon: <ShoppingCart className="h-5 w-5 text-muted-foreground" /> },
  ];

  // Mock data for sales chart
  const salesData = [
    { name: "Jan", sales: 2400 },
    { name: "Feb", sales: 1398 },
    { name: "Mar", sales: 9800 },
    { name: "Apr", sales: 3908 },
    { name: "May", sales: 4800 },
    { name: "Jun", sales: 3800 },
  ];

  // Mock data for pie chart
  const pieData = [
    { name: "Italian", value: 35 },
    { name: "Mexican", value: 25 },
    { name: "American", value: 20 },
    { name: "Indian", value: 15 },
    { name: "Other", value: 5 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Recent purchases made by users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders ? (
                recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{order.recipes?.name || 'Unknown Recipe'}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="font-medium">${order.amount}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">Loading recent orders...</p>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Popular Recipes</CardTitle>
            <CardDescription>
              Top viewed and purchased recipes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularRecipes ? (
                popularRecipes.map((recipe, i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-2">
                    <p className="font-medium">{recipe.name}</p>
                    <p className="text-sm text-gray-500">{recipe.count} views</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">Loading popular recipes...</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Sales History</CardTitle>
            <CardDescription>
              Monthly sales performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recipe Categories</CardTitle>
            <CardDescription>
              Distribution by cuisine type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSummary;


import { useState, useEffect } from "react";
import { getRecipesByDevice } from "@/data/recipes";
import { DeviceSupport } from "@/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RecipeGrid from "@/components/RecipeGrid";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "react-router-dom";

const DevicesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tabParam = queryParams.get("tab");
  const [activeTab, setActiveTab] = useState(tabParam || "overview");
  
  // Set the active tab based on URL parameter
  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);
  
  const momeRecipes = getRecipesByDevice("MoMe");
  const simmrRecipes = getRecipesByDevice("Simmr");
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onSearch={handleSearch} />
      
      <div className="container py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-6 relative">
          Smart Device Integration
          <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full border-2 border-qzene-purple/10 animate-spin-slow"></div>
          <div className="absolute -bottom-2 -left-4 w-8 h-8 rounded-full border-2 border-qzene-purple/5 animate-spin-slow"></div>
        </h1>
        
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="mome">MoMe</TabsTrigger>
            <TabsTrigger value="simmr">Simmr</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Qzene Smart Ecosystem</h2>
              <p className="text-gray-600 mb-6">
                Qzene integrates with multiple smart cooking devices, providing a centralized platform for recipe management, device control, and real-time monitoring. Our smart ecosystem is designed to enhance your cooking experience with automation, intelligence, and personalization.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 relative">
                {/* Decorative elements */}
                <div className="absolute top-20 right-20 w-32 h-32 rounded-full border-2 border-qzene-purple/5 animate-spin-slow"></div>
                <div className="absolute bottom-10 left-40 w-16 h-16 rounded-full bg-qzene-purple/3"></div>
                
                <div className="bg-gray-50 rounded-lg p-6 relative">
                  <img 
                    src="/lovable-uploads/61e0045b-9299-4f04-b766-a674df17b079.png" 
                    alt="MoMe Logo" 
                    className="h-8 mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2">MoMe: The AI-Powered Cooking Machine</h3>
                  <p className="text-gray-600 mb-4">
                    MoMe is an intelligent cooking assistant that automates meal preparation with precision. Supporting multiple cuisines, it offers remote control via a mobile app and ensures safety with advanced sensors.
                  </p>
                  
                  <div className="aspect-video bg-white rounded-lg overflow-hidden mb-4 shadow-sm">
                    <img 
                      src="/lovable-uploads/bcf7739b-7b8d-41d2-835a-f15d83824be4.png" 
                      alt="MoMe Device" 
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  
                  <div className="flex justify-between items-center mt-6">
                    <Button 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => setActiveTab("mome")}
                    >
                      Learn More
                    </Button>
                    <span className="text-sm text-gray-500">Compatible Recipes: 120+</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 relative">
                  <img 
                    src="/lovable-uploads/bb6be9a0-b572-4846-82bb-e3cd69489db3.png" 
                    alt="Simmr Logo" 
                    className="h-8 mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2">Simmr: Smart Intelligent Induction Cooktop</h3>
                  <p className="text-gray-600 mb-4">
                    With Simmr, you bring the restaurant home. Unleash your inner chef and let every meal be a masterpiece with precise temperature control and guided cooking.
                  </p>
                  
                  <div className="aspect-video bg-white rounded-lg overflow-hidden mb-4 shadow-sm">
                    <img 
                      src="/lovable-uploads/35653b55-b377-4b2b-998a-99fd226eece6.png" 
                      alt="Simmr Device" 
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  
                  <div className="flex justify-between items-center mt-6">
                    <Button 
                      className="bg-amber-600 hover:bg-amber-700"
                      onClick={() => setActiveTab("simmr")}
                    >
                      Learn More
                    </Button>
                    <span className="text-sm text-gray-500">Compatible Recipes: 135+</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h3 className="text-xl font-bold mb-4">How Qzene Enhances Your Smart Cooking Experience</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="bg-qzene-purple/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sync text-qzene-purple">
                        <path d="M21.5 2v6h-6" />
                        <path d="M2.5 12V6h6" />
                        <path d="M2 19a9 9 0 0 1 9 9 9 9 0 0 0 9-9 9 9 0 0 0-9-9 9 9 0 0 0-9 9Z" />
                      </svg>
                    </div>
                    <h4 className="font-bold mb-2">Unified Recipe Management</h4>
                    <p className="text-gray-600">
                      Discover, save, and modify recipes across all your devices with seamless cloud syncing.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="bg-qzene-purple/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brain-circuit text-qzene-purple">
                        <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08 2.5 2.5 0 0 0 4.91.05L12 20V4.5Z" />
                        <path d="M16 8V5c0-1.1.9-2 2-2" />
                        <path d="M12 13h4" />
                        <path d="M12 18h6a2 2 0 0 1 2 2v1" />
                        <path d="M12 8h8" />
                        <path d="M20.5 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
                        <path d="M16.5 13a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
                        <path d="M20.5 21a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
                        <path d="M18.5 3a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
                      </svg>
                    </div>
                    <h4 className="font-bold mb-2">AI-Powered Assistance</h4>
                    <p className="text-gray-600">
                      Leverage AI to optimize cooking techniques, suggest meal plans, and enhance your overall experience.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="bg-qzene-purple/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-radio-tower text-qzene-purple">
                        <path d="M4.9 16.1C1 12.2 1 5.8 4.9 1.9" />
                        <path d="M7.8 4.7a6.14 6.14 0 0 0-.8 7.5" />
                        <circle cx="12" cy="9" r="2" />
                        <path d="M16.2 4.8c2 2 2.26 5.11.8 7.47" />
                        <path d="M19.1 1.9a9.96 9.96 0 0 1 0 14.1" />
                        <path d="M9.5 18h5" />
                        <path d="m8 22 4-11 4 11" />
                      </svg>
                    </div>
                    <h4 className="font-bold mb-2">Real-Time Monitoring</h4>
                    <p className="text-gray-600">
                      Track cooking progress, adjust settings remotely, and receive notifications for a hands-free experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="mome">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg p-6 shadow-lg sticky top-20">
                  <img 
                    src="/lovable-uploads/61e0045b-9299-4f04-b766-a674df17b079.png" 
                    alt="MoMe Logo" 
                    className="h-10 mb-4"
                  />
                  <h2 className="text-2xl font-bold mb-4">MoMe</h2>
                  <p className="text-gray-600 mb-6">
                    The AI-Powered Cooking Machine that brings the chef experience to your home.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <h3 className="font-medium">Key Features</h3>
                      <ul className="text-sm text-gray-600 mt-2 space-y-1">
                        <li className="flex items-start gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-green-500 mt-0.5">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                          <span>Smart Cooking Automation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-green-500 mt-0.5">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                          <span>Multi-Cuisine Support</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-green-500 mt-0.5">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                          <span>IoT-Enabled Control</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-green-500 mt-0.5">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                          <span>Self-Cleaning System</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-green-500 mt-0.5">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                          <span>AI-Powered Recipe Customization</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">Specifications</h3>
                      <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                        <div className="bg-gray-50 p-2 rounded">
                          <p className="text-gray-500">Dimensions</p>
                          <p className="font-medium">58cm x 40cm x 40cm</p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded">
                          <p className="text-gray-500">Weight</p>
                          <p className="font-medium">20kg</p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded">
                          <p className="text-gray-500">Power</p>
                          <p className="font-medium">110-240V, 1300-2000W</p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded">
                          <p className="text-gray-500">Connectivity</p>
                          <p className="font-medium">Wi-Fi, Bluetooth 5.0</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Learn More About MoMe
                  </Button>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg p-6 shadow-lg mb-8">
                  <h2 className="text-2xl font-bold mb-4">How MoMe Works</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-green-700">1</span>
                      </div>
                      <h3 className="font-bold text-green-800 mb-2">Select Recipe</h3>
                      <p className="text-gray-600 text-sm">
                        Choose a recipe, adjust portions, and tweak flavors to your preference.
                      </p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-green-700">2</span>
                      </div>
                      <h3 className="font-bold text-green-800 mb-2">Load Ingredients</h3>
                      <p className="text-gray-600 text-sm">
                        Place ingredients in the containers—MoMe measures perfectly.
                      </p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-green-700">3</span>
                      </div>
                      <h3 className="font-bold text-green-800 mb-2">Press Start & Enjoy</h3>
                      <p className="text-gray-600 text-sm">
                        Tap to cook, let MoMe handle the rest while you relax.
                      </p>
                    </div>
                  </div>
                  
                  <img 
                    src="/lovable-uploads/bcf7739b-7b8d-41d2-835a-f15d83824be4.png" 
                    alt="MoMe Device" 
                    className="w-full h-auto rounded-lg mb-6"
                  />
                </div>
                
                <RecipeGrid 
                  recipes={momeRecipes.slice(0, 8)} 
                  title="MoMe Compatible Recipes" 
                  subtitle="Over 120+ recipes optimized for your MoMe device"
                />
                
                <div className="text-center mt-6">
                  <Button className="bg-qzene-purple hover:bg-qzene-purple/90">
                    View All MoMe Recipes
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="simmr">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg p-6 shadow-lg sticky top-20">
                  <img 
                    src="/lovable-uploads/bb6be9a0-b572-4846-82bb-e3cd69489db3.png" 
                    alt="Simmr Logo" 
                    className="h-10 mb-4"
                  />
                  <h2 className="text-2xl font-bold mb-4">Simmr</h2>
                  <p className="text-gray-600 mb-6">
                    Smart Intelligent Induction Cooktop for the chef in you.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <h3 className="font-medium">Key Features</h3>
                      <ul className="text-sm text-gray-600 mt-2 space-y-1">
                        <li className="flex items-start gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-amber-500 mt-0.5">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                          <span>Smart Power Control (300W-2000W)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-amber-500 mt-0.5">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                          <span>Interactive 7" Touchscreen</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-amber-500 mt-0.5">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                          <span>Integrated Weighing Scale</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-amber-500 mt-0.5">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                          <span>No-Burn Safety Sensors</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-amber-500 mt-0.5">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                          <span>Mobile App Connectivity</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">Benefits</h3>
                      <ul className="text-sm text-gray-600 mt-2 space-y-1">
                        <li className="flex items-start gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-amber-500 mt-0.5">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                          <span>Guided Cooking Experience</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-amber-500 mt-0.5">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                          <span>Connected Kitchen</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-amber-500 mt-0.5">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                          <span>Temperature Stability (±0.1°C)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-amber-500 mt-0.5">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                          <span>Energy Efficiency (99%)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-amber-600 hover:bg-amber-700">
                    Learn More About Simmr
                  </Button>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg p-6 shadow-lg mb-8">
                  <h2 className="text-2xl font-bold mb-4">Why Choose Simmr?</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="font-bold text-lg mb-3">100% Control, 0% Stress</h3>
                      <p className="text-gray-600 mb-4">
                        With Simmr, you bring the restaurant home. Unleash your inner chef and let every meal be a masterpiece with precise temperature control and guided recipes.
                      </p>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Temperature Stability</span>
                          <span className="text-sm text-green-600">Superior</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full w-[95%]"></div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">User Experience</span>
                          <span className="text-sm text-green-600">Excellent</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full w-[90%]"></div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Cooking Results</span>
                          <span className="text-sm text-green-600">Professional</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full w-[98%]"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <img 
                        src="/lovable-uploads/35653b55-b377-4b2b-998a-99fd226eece6.png" 
                        alt="Simmr Device" 
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="font-bold text-lg mb-3">Features That Make Simmr Special</h3>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-amber-50 p-3 rounded-lg text-center">
                        <div className="text-amber-600 mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap mx-auto">
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                          </svg>
                        </div>
                        <h4 className="font-medium text-sm">Smart Power Control</h4>
                      </div>
                      
                      <div className="bg-amber-50 p-3 rounded-lg text-center">
                        <div className="text-amber-600 mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-smartphone mx-auto">
                            <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                            <path d="M12 18h.01" />
                          </svg>
                        </div>
                        <h4 className="font-medium text-sm">Mobile App</h4>
                      </div>
                      
                      <div className="bg-amber-50 p-3 rounded-lg text-center">
                        <div className="text-amber-600 mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart mx-auto">
                            <circle cx="8" cy="21" r="1" />
                            <circle cx="19" cy="21" r="1" />
                            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                          </svg>
                        </div>
                        <h4 className="font-medium text-sm">Built-in Marketplace</h4>
                      </div>
                      
                      <div className="bg-amber-50 p-3 rounded-lg text-center">
                        <div className="text-amber-600 mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check mx-auto">
                            <path d="M20 13c0 5-3.5 7.5-8 8.5-4.5-1-8-3.5-8-8.5V6a14.6 14.6 0 0 0 8-2c2.9 1 5.6 1.7 8 2" />
                            <path d="m9 12 2 2 4-4" />
                          </svg>
                        </div>
                        <h4 className="font-medium text-sm">Certification Ready</h4>
                      </div>
                    </div>
                  </div>
                </div>
                
                <RecipeGrid 
                  recipes={simmrRecipes.slice(0, 8)} 
                  title="Simmr Compatible Recipes" 
                  subtitle="Over 135+ recipes optimized for your Simmr device"
                />
                
                <div className="text-center mt-6">
                  <Button className="bg-qzene-purple hover:bg-qzene-purple/90">
                    View All Simmr Recipes
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Community Join Section */}
        <div className="mt-16 bg-white rounded-lg p-8 shadow-lg relative">
          <div className="absolute top-10 right-10 w-32 h-32 rounded-full border-4 border-qzene-purple/5 animate-spin-slow"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full border-4 border-qzene-purple/3 animate-spin-slow"></div>
          <div className="absolute top-20 left-1/4 w-16 h-16 rounded-full bg-qzene-purple/3"></div>
          
          <div className="text-center max-w-3xl mx-auto relative z-10">
            <h2 className="text-3xl font-bold mb-4">Join Our Culinary Community</h2>
            <p className="text-gray-600 mb-8">
              Whether you're an aspiring chef or a cooking enthusiast, our community welcomes you. Share recipes, get feedback, and connect with other Qzene users.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="w-14 h-14 bg-qzene-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chef-hat text-qzene-purple">
                    <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
                    <line x1="6" x2="18" y1="17" y2="17" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2 text-center">Become a Chef</h3>
                <p className="text-gray-600 text-center">
                  Submit your signature recipes and earn recognition in our growing culinary community.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="w-14 h-14 bg-qzene-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tv text-qzene-purple">
                    <rect width="20" height="15" x="2" y="7" rx="2" ry="2" />
                    <polyline points="17 2 12 7 7 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2 text-center">Join Live Events</h3>
                <p className="text-gray-600 text-center">
                  Participate in virtual cooking classes hosted by professional chefs and culinary experts.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="w-14 h-14 bg-qzene-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-award text-qzene-purple">
                    <circle cx="12" cy="8" r="6" />
                    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2 text-center">Earn Rewards</h3>
                <p className="text-gray-600 text-center">
                  Get exclusive access to new recipes, special offers, and cooking challenges.
                </p>
              </div>
            </div>
            
            <Button className="bg-qzene-purple-dark hover:bg-qzene-purple text-white px-8 py-6 rounded-lg text-lg">
              Join the Community
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default DevicesPage;


import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const DeviceSection = () => {
  return (
    <div className="bg-gray-50 py-16 relative overflow-hidden">
      {/* Decorative spiral elements inspired by logo */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full border-4 border-qzene-purple/5 animate-spin-slow"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full border-4 border-qzene-purple/3 animate-spin-slow"></div>
      <div className="absolute top-40 left-1/4 w-20 h-20 rounded-full bg-qzene-purple/3"></div>
      <div className="absolute bottom-40 right-1/4 w-16 h-16 rounded-full bg-qzene-purple/5"></div>

      <div className="container relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
            Supported Smart Devices
            <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-qzene-purple/10 z-0"></div>
            <div className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-qzene-purple/10 z-0"></div>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Qzene works seamlessly with these smart cooking devices to bring you the ultimate cooking experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* MoMe Device */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden relative group hover:shadow-xl transition-shadow duration-300">
            <div className="absolute top-5 right-5 w-16 h-16 rounded-full border-2 border-qzene-purple/10 animate-spin-slow group-hover:border-qzene-purple/20"></div>

            <div className="p-6 relative">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/lovable-uploads/61e0045b-9299-4f04-b766-a674df17b079.png" 
                  alt="MoMe Logo" 
                  className="h-8"
                />
                <h3 className="text-xl font-bold">MoMe</h3>
              </div>
              <p className="text-gray-600 mb-6">
                An intelligent cooking assistant that automates meal preparation with precision. Supporting multiple cuisines with remote control via mobile app.
              </p>
              
              <div className="mb-6">
                <h4 className="font-medium mb-2">Key Features</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Smart Cooking Automation</li>
                  <li>• Multi-Cuisine Support</li>
                  <li>• IoT-Enabled Control</li>
                  <li>• Self-Cleaning System</li>
                  <li>• AI-Powered Recipe Customization</li>
                </ul>
              </div>
              
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-6">
                <img 
                  src="/lovable-uploads/bcf7739b-7b8d-41d2-835a-f15d83824be4.png" 
                  alt="MoMe Device" 
                  className="w-full h-full object-contain"
                />
              </div>
              
              <Link to="/devices?tab=mome">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Explore MoMe Recipes
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Simmr Device */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden relative group hover:shadow-xl transition-shadow duration-300">
            <div className="absolute top-5 right-5 w-16 h-16 rounded-full border-2 border-amber-500/10 animate-spin-slow group-hover:border-amber-500/20"></div>

            <div className="p-6 relative">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/lovable-uploads/bb6be9a0-b572-4846-82bb-e3cd69489db3.png" 
                  alt="Simmr Logo" 
                  className="h-8"
                />
                <h3 className="text-xl font-bold">Simmr</h3>
              </div>
              <p className="text-gray-600 mb-6">
                A smart intelligent induction cooktop that brings restaurant-quality cooking to your home. With precise temperature control and guided recipes.
              </p>
              
              <div className="mb-6">
                <h4 className="font-medium mb-2">Key Features</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Smart Power Control (300W-2000W)</li>
                  <li>• Interactive 7" Touchscreen</li>
                  <li>• Integrated Weighing Scale</li>
                  <li>• No-Burn Safety Sensors</li>
                  <li>• Mobile App Connectivity</li>
                </ul>
              </div>
              
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-6">
                <img 
                  src="/lovable-uploads/35653b55-b377-4b2b-998a-99fd226eece6.png" 
                  alt="Simmr Device" 
                  className="w-full h-full object-contain"
                />
              </div>
              
              <Link to="/devices?tab=simmr">
                <Button className="w-full bg-amber-600 hover:bg-amber-700">
                  Explore Simmr Recipes
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeviceSection;

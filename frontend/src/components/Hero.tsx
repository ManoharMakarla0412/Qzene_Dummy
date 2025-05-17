
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/0fc1a6fa-77a6-4b64-821e-8b4f80a638ad.png" 
          alt="Food banner" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-qzene-purple/30 to-black/30"></div>
      </div>
      
      {/* Decorative spiral elements inspired by logo */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full border-4 border-qzene-purple/10 animate-spin-slow"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full border-4 border-qzene-purple/5 animate-spin-slow"></div>
      <div className="absolute top-40 left-1/4 w-20 h-20 rounded-full bg-qzene-purple/5"></div>
      <div className="absolute bottom-40 right-1/4 w-16 h-16 rounded-full bg-qzene-purple/10"></div>
      
      <div className="container py-16 md:py-24 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-qzene-dark">
            The Future of <span className="text-qzene-purple-dark">Smart Cooking</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-xl">
            Qzene integrates with multiple smart cooking devices, providing a centralized platform for recipe management, device control, and real-time monitoring.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/recipes">
              <Button className="bg-qzene-purple-dark hover:bg-qzene-purple/90">
                Explore Recipes
              </Button>
            </Link>
            <Link to="/devices">
              <Button variant="outline" className="border-qzene-purple-dark text-qzene-purple-dark hover:bg-qzene-purple/10">
                Learn More
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-2">
              <img src="https://randomuser.me/api/portraits/women/79.jpg" alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
              <img src="https://randomuser.me/api/portraits/women/45.jpg" alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
            </div>
            <p className="text-sm text-gray-700">
              Trusted by <span className="font-medium">10,000+</span> home chefs
            </p>
          </div>
        </div>
        <div className="flex-1 flex justify-center relative z-10">
          <div className="w-full max-w-lg rounded-lg shadow-2xl overflow-hidden bg-white">
            <img 
              src="/lovable-uploads/0fc1a6fa-77a6-4b64-821e-8b4f80a638ad.png" 
              alt="Smart Kitchen" 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-qzene-purple/20 to-transparent"></div>
          </div>
          {/* Decorative element */}
          <div className="absolute -bottom-5 -right-5 w-24 h-24 rounded-full bg-qzene-purple/20 z-0"></div>
          <div className="absolute -top-5 -left-5 w-16 h-16 rounded-full bg-qzene-purple-dark/10 z-0"></div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
}

export default Hero;

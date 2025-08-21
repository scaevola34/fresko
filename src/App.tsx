import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navigation from "./components/layout/Navigation";
import Home from "./pages/Home";
import Artists from "./pages/Artists";
import Walls from "./pages/Walls";
import Map from "./pages/Map";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<"artist" | "wall_owner">("artist");

  const handleLogin = (type: "artist" | "wall_owner") => {
    setUserType(type);
    setIsLoggedIn(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Navigation 
              isLoggedIn={isLoggedIn} 
              userType={userType} 
              onLogin={handleLogin}
            />
            <Routes>
              <Route path="/" element={<Home onLogin={handleLogin} />} />
              <Route path="/artistes" element={<Artists />} />
              <Route path="/murs" element={<Walls />} />
              <Route path="/carte" element={<Map />} />
              <Route path="/comment-ca-marche" element={<HowItWorks />} />
              <Route path="/a-propos" element={<About />} />
              <Route path="/dashboard" element={<DashboardLayout userType={userType} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

export default App;

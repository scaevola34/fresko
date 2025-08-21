import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/layout/Navigation";
import Home from "./pages/Home";
import Artists from "./pages/Artists";
import Walls from "./pages/Walls";
import Map from "./pages/Map";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import NotFound from "./pages/NotFound";
import Footer from "./components/layout/Footer";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import { ArtistProfile } from "./components/profiles/ArtistProfile";
import { WallProfile } from "./components/profiles/WallProfile";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { user, userType, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/artistes" element={<Artists />} />
            <Route path="/artistes/:id" element={<ArtistProfile artistId="artist-1" />} />
            <Route path="/murs" element={<Walls />} />
            <Route path="/murs/:id" element={<WallProfile wallId="wall-1" />} />
            <Route path="/carte" element={<Map />} />
            <Route path="/comment-ca-marche" element={<HowItWorks />} />
            <Route path="/a-propos" element={<About />} />
            <Route 
              path="/dashboard" 
              element={
                user ? (
                  <DashboardLayout userType={userType} />
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

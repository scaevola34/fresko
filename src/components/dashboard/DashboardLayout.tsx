import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  Palette,
  Building2,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import ArtistDashboard from "./ArtistDashboard";
import WallOwnerDashboard from "./WallOwnerDashboard";

type UserType = "artist" | "wall_owner";

interface DashboardLayoutProps {
  userType?: UserType;
  userName?: string;
  userAvatar?: string;
}

const DashboardLayout = ({ 
  userType = "artist", 
  userName = "Julie Dubois",
  userAvatar = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80"
}: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUserType, setCurrentUserType] = useState<UserType>(userType);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-4">
          {/* Logo & Toggle */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleSidebar}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Palette className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl text-graffiti hidden md:inline-block">
                WXLLSPACE
              </span>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex-1 flex items-center justify-end space-x-4">
            {/* User Type Toggle - Demo Purpose */}
            <div className="hidden md:flex items-center space-x-2">
              <Button
                variant={currentUserType === "artist" ? "hero" : "outline"}
                size="sm"
                onClick={() => setCurrentUserType("artist")}
                className="transition-all"
              >
                <Palette className="h-4 w-4 mr-2" />
                Artiste
              </Button>
              <Button
                variant={currentUserType === "wall_owner" ? "graffiti" : "outline"}
                size="sm"
                onClick={() => setCurrentUserType("wall_owner")}
                className="transition-all"
              >
                <Building2 className="h-4 w-4 mr-2" />
                Propriétaire
              </Button>
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">3</span>
              </span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                    <AvatarImage src={userAvatar} alt={userName} />
                    <AvatarFallback>{userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-card border-border" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userName}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {currentUserType === "artist" ? "Artiste Street Art" : "Propriétaire de mur"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Paramètres</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Se déconnecter</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 transform bg-card border-r border-border transition-transform duration-300 ease-in-out md:relative md:top-0 md:h-screen md:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:hidden"
      )}>
        <div className="flex h-full flex-col p-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Navigation</h3>
            <nav className="space-y-2">
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => {
                  setCurrentUserType("artist");
                  setSidebarOpen(false);
                }}
              >
                <Palette className="mr-2 h-4 w-4" />
                Dashboard Artiste
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => {
                  setCurrentUserType("wall_owner");
                  setSidebarOpen(false);
                }}
              >
                <Building2 className="mr-2 h-4 w-4" />
                Dashboard Propriétaire
              </Button>
            </nav>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "transition-all duration-300 ease-in-out",
        "md:ml-0" // Always full width on desktop since sidebar is hidden by default
      )}>
        {currentUserType === "artist" ? (
          <ArtistDashboard />
        ) : (
          <WallOwnerDashboard />
        )}
      </main>
    </div>
  );
};

export default DashboardLayout;
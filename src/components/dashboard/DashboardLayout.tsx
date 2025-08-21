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
  LogOut, 
  Palette,
  Building2,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import ArtistDashboard from "./ArtistDashboard";
import WallOwnerDashboard from "./WallOwnerDashboard";

type UserType = "artist" | "wall_owner";

interface DashboardLayoutProps {
  userType?: UserType;
  userName?: string;
  userAvatar?: string;
}

const DashboardLayout = ({ 
  userType, 
  userName,
  userAvatar
}: DashboardLayoutProps) => {
  const { user, userType: authUserType, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Use auth data with fallbacks
  const displayUserType = userType || authUserType || "artist";
  const displayUserName = userName || user?.user_metadata?.full_name || user?.email || "Utilisateur";
  const displayUserAvatar = userAvatar;

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
            {/* User Type Display */}
            <div className="hidden md:block text-sm text-muted-foreground">
              {displayUserType === "artist" ? "Artiste" : "Propriétaire"}
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
                    <AvatarImage src={displayUserAvatar} alt={displayUserName} />
                    <AvatarFallback>{displayUserName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-card border-border" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{displayUserName}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {displayUserType === "artist" ? "Artiste Street Art" : "Propriétaire de mur"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Mon Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Mon Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
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


      {/* Main Content */}
      <main className="w-full">
        {displayUserType === "artist" ? (
          <ArtistDashboard />
        ) : (
          <WallOwnerDashboard />
        )}
      </main>
    </div>
  );
};

export default DashboardLayout;
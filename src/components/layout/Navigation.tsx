import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Palette, 
  Menu, 
  X, 
  User, 
  LogIn,
  MapPin,
  Building2,
  Users,
  HelpCircle,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  isLoggedIn?: boolean;
  userType?: "artist" | "wall_owner";
  onLogin?: (type: "artist" | "wall_owner") => void;
}

const Navigation = ({ isLoggedIn = false, userType, onLogin }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { href: "/", label: "Accueil", icon: null },
    { href: "/artistes", label: "Artistes", icon: Users },
    { href: "/murs", label: "Murs", icon: Building2 },
    { href: "/carte", label: "Carte", icon: MapPin },
    { href: "/comment-ca-marche", label: "Comment ça marche", icon: HelpCircle },
    { href: "/a-propos", label: "À propos", icon: Info },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 mr-8">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Palette className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl text-graffiti">WXLLSPACE</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive(item.href) 
                  ? "text-primary border-b-2 border-primary pb-1" 
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative">
                  <User className="h-5 w-5 mr-2" />
                  {userType === "artist" ? "Artiste" : "Propriétaire"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-border">
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">
                    <Palette className="mr-2 h-4 w-4" />
                    Mon Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Mon Profil
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogIn className="mr-2 h-4 w-4" />
                  Se déconnecter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <Button 
                variant="ghost" 
                onClick={() => onLogin?.("artist")}
              >
                Je suis artiste
              </Button>
              <Button 
                variant="hero"
                onClick={() => onLogin?.("wall_owner")}
              >
                J'ai un mur
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                <span>{item.label}</span>
              </Link>
            ))}
            
            {!isLoggedIn && (
              <div className="pt-4 border-t space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    onLogin?.("artist");
                    setIsOpen(false);
                  }}
                >
                  <Palette className="mr-2 h-4 w-4" />
                  Je suis artiste
                </Button>
                <Button 
                  variant="hero" 
                  className="w-full justify-start"
                  onClick={() => {
                    onLogin?.("wall_owner");
                    setIsOpen(false);
                  }}
                >
                  <Building2 className="mr-2 h-4 w-4" />
                  J'ai un mur
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
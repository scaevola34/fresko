import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin,
  Search,
  Filter,
  Navigation,
  Building2,
  Users,
  Layers,
  Zap
} from "lucide-react";

const Map = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [mapFilter, setMapFilter] = useState("all");

  // Mock data for map markers
  const locations = [
    {
      id: "1",
      type: "artist",
      name: "Julie Dubois",
      specialty: "Art Urbain",
      location: "Toulouse",
      lat: 43.6047,
      lng: 1.4442,
      rating: 4.8,
      projects: 25
    },
    {
      id: "2",
      type: "wall", 
      title: "Façade Restaurant Le Graffiti",
      location: "75011 Paris",
      lat: 48.8566,
      lng: 2.3522,
      budget: "1200-1800€",
      size: "5x3m"
    },
    {
      id: "3",
      type: "artist",
      name: "Zéphyr",
      specialty: "Graffiti", 
      location: "Paris",
      lat: 48.8534,
      lng: 2.3488,
      rating: 4.9,
      projects: 18
    },
    {
      id: "4",
      type: "wall",
      title: "Mur d'Accueil - Café Central", 
      location: "69001 Lyon",
      lat: 45.7640,
      lng: 4.8357,
      budget: "600-900€", 
      size: "3x2m"
    }
  ];

  const filterOptions = [
    { value: "all", label: "Tout afficher" },
    { value: "artists", label: "Artistes" },
    { value: "walls", label: "Murs disponibles" },
    { value: "projects", label: "Projets en cours" }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-graffiti mb-4">
            Carte Interactive
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez la communauté FRESKO près de chez vous : artistes, murs disponibles et projets en cours
          </p>
        </div>

        {/* Map Controls */}
        <Card className="elevated mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Rechercher une ville..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={mapFilter} onValueChange={setMapFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrer la carte" />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline_glow" className="w-full">
                <Navigation className="mr-2 h-4 w-4" />
                Ma position
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Map Placeholder */}
          <div className="lg:col-span-3">
            <Card className="elevated h-[600px]">
              <CardContent className="p-0 h-full">
                <div className="relative w-full h-full bg-gradient-to-br from-muted/30 to-muted/60 rounded-lg flex items-center justify-center">
                  {/* Map Placeholder */}
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto animate-glow-pulse">
                      <MapPin className="h-12 w-12 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold">Carte Interactive</h3>
                      <p className="text-muted-foreground max-w-sm">
                        La carte interactive sera intégrée ici pour visualiser tous les artistes, 
                        murs disponibles et projets en cours dans votre région.
                      </p>
                    </div>
                    
                    {/* Mock Map Elements */}
                    <div className="grid grid-cols-2 gap-4 mt-8 max-w-md mx-auto">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <span>Artistes</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 bg-secondary rounded-full"></div>
                        <span>Murs disponibles</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 bg-accent rounded-full"></div>
                        <span>Projets en cours</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
                        <span>Projets terminés</span>
                      </div>
                    </div>
                  </div>

                  {/* Mock Map Markers */}
                  <div className="absolute top-20 left-20 animate-bounce" style={{ animationDelay: "0s" }}>
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  
                  <div className="absolute top-32 right-32 animate-bounce" style={{ animationDelay: "0.5s" }}>
                    <div className="w-8 h-8 bg-gradient-secondary rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                      <Building2 className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  
                  <div className="absolute bottom-24 left-32 animate-bounce" style={{ animationDelay: "1s" }}>
                    <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                      <Zap className="h-4 w-4 text-accent-foreground" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar with locations */}
          <div className="space-y-6">
            {/* Legend */}
            <Card className="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5" />
                  Légende
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gradient-primary rounded-full"></div>
                  <span className="text-sm">Artistes disponibles</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gradient-secondary rounded-full"></div>
                  <span className="text-sm">Murs à décorer</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gradient-accent rounded-full"></div>
                  <span className="text-sm">Projets en cours</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-muted rounded-full"></div>
                  <span className="text-sm">Œuvres terminées</span>
                </div>
              </CardContent>
            </Card>

            {/* Nearby Items */}
            <Card className="elevated">
              <CardHeader>
                <CardTitle>Près de vous</CardTitle>
                <CardDescription>
                  Découvrez ce qui se passe dans votre région
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {locations.slice(0, 4).map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className={`w-3 h-3 rounded-full ${
                      item.type === "artist" ? "bg-gradient-primary" : "bg-gradient-secondary"
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {item.type === "artist" ? item.name : item.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {item.location}
                      </p>
                      {item.type === "artist" && (
                        <p className="text-xs text-muted-foreground">
                          {item.specialty}
                        </p>
                      )}
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={item.type === "artist" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"}
                    >
                      {item.type === "artist" ? "Artiste" : "Mur"}
                    </Badge>
                  </div>
                ))}

                <Button variant="outline_glow" className="w-full mt-4">
                  Voir tous les résultats
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="elevated">
              <CardContent className="p-6">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-primary">156</div>
                  <div className="text-sm text-muted-foreground">Éléments sur la carte</div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4 text-center">
                  <div>
                    <div className="text-lg font-semibold text-secondary">28</div>
                    <div className="text-xs text-muted-foreground">Artistes</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-accent">12</div>
                    <div className="text-xs text-muted-foreground">Murs libres</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Map;
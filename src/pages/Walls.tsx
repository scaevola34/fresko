import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { 
  Search,
  MapPin,
  Building2,
  Euro,
  Ruler,
  Calendar,
  Filter,
  SlidersHorizontal,
  Plus,
  Palette
} from "lucide-react";

const Walls = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const walls = [
    {
      id: "a82720ef-f944-4cc8-9f48-fdcfb7249a9b",
      title: "Façade Restaurant Le Graffiti",
      type: "Extérieur",
      location: "75011 Paris",
      surface: "béton",
      ownerType: "Professionnel",
      size: "5x3m",
      area: 15,
      budget: "1200-1800€",
      deadline: "2024-10-15",
      description: "Mur extérieur visible depuis la rue principale, idéal pour une fresque colorée qui reflète l'esprit du restaurant.",
      image: "https://images.unsplash.com/photo-1571019613914-85f342c6a11e?q=80&w=400&auto=format&fit=crop",
      status: "Ouvert"
    },
    {
      id: "b92830fg-f944-4cc8-9f48-fdcfb7249a9c", 
      title: "Mur d'Accueil - Café Central",
      type: "Intérieur",
      location: "69001 Lyon",
      surface: "plâtre",
      ownerType: "Particulier", 
      size: "3x2m",
      area: 6,
      budget: "600-900€",
      deadline: "2024-11-01",
      description: "Mur d'accueil dans un café cosy, recherche une œuvre chaleureuse et accueillante pour les clients.",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=400&auto=format&fit=crop",
      status: "Ouvert"
    },
    {
      id: "c03941gh-f944-4cc8-9f48-fdcfb7249a9d",
      title: "Entrée Bureaux - Start-up Tech", 
      type: "Extérieur",
      location: "13001 Marseille",
      surface: "béton",
      ownerType: "Professionnel",
      size: "4x2.5m", 
      area: 10,
      budget: "800-1200€",
      deadline: "2024-09-30",
      description: "Mur d'entrée d'une start-up technologique, recherche une œuvre moderne et inspirante.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=400&auto=format&fit=crop",
      status: "En cours"
    },
    {
      id: "d14052hi-f944-4cc8-9f48-fdcfb7249a9e",
      title: "Cour Intérieure - Résidence",
      type: "Extérieur", 
      location: "33000 Bordeaux",
      surface: "brique",
      ownerType: "Particulier",
      size: "6x4m",
      area: 24,
      budget: "1500-2200€", 
      deadline: "2024-12-15",
      description: "Grande cour d'immeuble résidentiel, espace pour une fresque communautaire colorée et positive.",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=400&auto=format&fit=crop",
      status: "Ouvert"
    },
    {
      id: "e25163ij-f944-4cc8-9f48-fdcfb7249a9f",
      title: "Salle de Sport - Fitness Club",
      type: "Intérieur",
      location: "59000 Lille", 
      surface: "béton",
      ownerType: "Professionnel",
      size: "8x3m",
      area: 24,
      budget: "1800-2500€",
      deadline: "2024-10-30",
      description: "Mur principal d'une salle de sport, recherche une œuvre motivante et énergisante pour les sportifs.",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop",
      status: "Ouvert"
    },
    {
      id: "f36274jk-f944-4cc8-9f48-fdcfb7249a90",
      title: "Passage Piéton - Quartier Historique",
      type: "Extérieur",
      location: "67000 Strasbourg",
      surface: "pierre",
      ownerType: "Public", 
      size: "10x4m",
      area: 40,
      budget: "2500-3500€",
      deadline: "2025-01-20",
      description: "Passage piéton dans le centre historique, projet municipal pour embellir l'espace urbain.",
      image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=400&auto=format&fit=crop",
      status: "Ouvert"
    }
  ];

  const wallTypes = ["Intérieur", "Extérieur"];
  const ownerTypes = ["Particulier", "Professionnel", "Public"];
  const locations = ["Paris", "Lyon", "Marseille", "Bordeaux", "Lille", "Strasbourg"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ouvert": return "bg-gradient-secondary";
      case "En cours": return "bg-gradient-accent";
      case "Terminé": return "bg-gradient-primary";
      default: return "bg-muted";
    }
  };

  const filteredWalls = walls.filter(wall => {
    const matchesSearch = wall.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         wall.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         wall.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || wall.type === selectedType;
    const matchesLocation = selectedLocation === "all" || wall.location.includes(selectedLocation);
    
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-graffiti mb-4">
            Murs Disponibles
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explorez les espaces qui attendent d'être transformés par votre créativité artistique
          </p>
        </div>

        {/* Filters */}
        <Card className="elevated mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Rechercher un mur..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Type de mur" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  {wallTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Localisation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les villes</SelectItem>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value="all" onValueChange={() => {}}>
                <SelectTrigger>
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="Ouvert">Ouvert</SelectItem>
                  <SelectItem value="En cours">En cours</SelectItem>
                  <SelectItem value="Terminé">Terminé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Add Wall CTA */}
        <Card className="elevated mb-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">Vous avez un mur à proposer ?</h3>
                <p className="text-muted-foreground">
                  Ajoutez votre mur à notre marketplace et trouvez l'artiste parfait pour votre projet
                </p>
              </div>
              <Button variant="hero" size="lg" className="shrink-0">
                <Plus className="mr-2 h-5 w-5" />
                Ajouter mon mur
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Artist CTA */}
        <Card className="elevated mb-8 bg-gradient-to-r from-secondary/10 to-accent/10 border-secondary/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">Vous êtes un artiste non référencé ?</h3>
                <p className="text-muted-foreground">
                  Référencez-vous et trouvez des opportunités de murs à agrémenter
                </p>
              </div>
              <Button variant="graffiti" size="lg" className="shrink-0">
                <Palette className="mr-2 h-5 w-5" />
                Devenir artiste partenaire
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {filteredWalls.length} mur{filteredWalls.length > 1 ? 's' : ''} disponible{filteredWalls.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Walls Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWalls.map((wall) => (
            <Card key={wall.id} className="elevated transition-smooth hover:shadow-glow-primary group">
              <CardHeader className="pb-4">
                <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
                  <img 
                    src={wall.image}
                    alt={wall.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className={`${getStatusColor(wall.status)} text-white border-0`}>
                      {wall.status}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                      {wall.type}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <CardTitle className="text-xl line-clamp-2">{wall.title}</CardTitle>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{wall.location}</span>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {wall.description}
                  </CardDescription>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-muted-foreground" />
                    <span>{wall.size} ({wall.area}m²)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span>{wall.ownerType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Euro className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-secondary">{wall.budget}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{new Date(wall.deadline).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {wall.surface}
                  </Badge>
                </div>
                
                <div className="flex gap-2">
                  <Link to={`/murs/${wall.id}`} className="flex-1">
                    <Button variant="outline_glow" className="w-full">
                      Voir détails
                    </Button>
                  </Link>
                  <Button 
                    variant={wall.status === "Ouvert" ? "hero" : "secondary"} 
                    size="sm" 
                    className="px-4"
                    disabled={wall.status !== "Ouvert"}
                    onClick={() => {
                      // Check authentication and handle application
                      console.log("Apply for wall", wall.id);
                    }}
                  >
                    {wall.status === "Ouvert" ? "Candidater" : wall.status}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredWalls.length === 0 && (
          <Card className="elevated text-center py-12">
            <CardContent>
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Aucun mur trouvé</h3>
              <p className="text-muted-foreground mb-6">
                Essayez de modifier vos critères de recherche ou supprimez les filtres
              </p>
              <Button 
                variant="hero" 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedType("all");
                  setSelectedLocation("all");
                }}
              >
                Réinitialiser les filtres
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Load More */}
        {filteredWalls.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline_glow" size="lg">
              Voir plus de murs
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Walls;
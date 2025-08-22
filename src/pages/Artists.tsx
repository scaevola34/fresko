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
  Star,
  Filter,
  SlidersHorizontal
} from "lucide-react";

const Artists = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const artists = [
    {
      id: "550e8400-e29b-41d4-a716-446655440000",
      name: "Julie Dubois",
      specialty: "Art Urbain",
      location: "Toulouse",
      rating: 4.8,
      projects: 25,
      description: "Artiste passionnée spécialisée dans l'art urbain contemporain avec plus de 5 ans d'expérience.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400&auto=format&fit=crop",
      price: "800-1500€"
    },
    {
      id: "f5cab3dd-b4af-4a2e-a803-169097e6c583",
      name: "Zéphyr",
      specialty: "Graffiti",
      location: "Paris",
      rating: 4.9,
      projects: 18,
      description: "Artiste graffeur reconnu dans la scène parisienne, spécialiste des lettres et personnages.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop",
      price: "600-1200€"
    },
    {
      id: "7b0f925f-cd9d-41d4-8c38-725841d42f4a",
      name: "Bibstreet",
      specialty: "Street Art",
      location: "Montpellier", 
      rating: 4.7,
      projects: 12,
      description: "Créateur d'œuvres colorées et engagées, expert en techniques mixtes sur murs urbains.",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop",
      price: "500-1000€"
    },
    {
      id: "d0b1c9cb-e8d3-4df7-a67d-e05dc4764d12",
      name: "Maya Colors",
      specialty: "Art Urbain",
      location: "Lyon",
      rating: 4.6,
      projects: 15,
      description: "Artiste émergente spécialisée dans les portraits réalistes et compositions géométriques.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
      price: "700-1300€"
    },
    {
      id: "1f72b93b-3367-4393-97da-4c5e881bb5d6",
      name: "Urban Flow",
      specialty: "Graffiti",
      location: "Marseille",
      rating: 4.8,
      projects: 22,
      description: "Collectif d'artistes spécialisé dans les fresques murales de grande envergure.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
      price: "900-2000€"
    },
    {
      id: "6bce69cd-a9f0-46e1-aec0-eae478cffc4a",
      name: "Neon Dreams",
      specialty: "Street Art",
      location: "Nice",
      rating: 4.5,
      projects: 8,
      description: "Artiste innovant mêlant techniques traditionnelles et effets fluorescents pour créer des œuvres uniques.",
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=400&auto=format&fit=crop",
      price: "650-1100€"
    }
  ];

  const specialties = ["Art Urbain", "Graffiti", "Street Art"];
  const locations = ["Toulouse", "Paris", "Montpellier", "Lyon", "Marseille", "Nice"];

  const filteredArtists = artists.filter(artist => {
    const matchesSearch = artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artist.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artist.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "all" || artist.specialty === selectedSpecialty;
    const matchesLocation = selectedLocation === "all" || artist.location === selectedLocation;
    
    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-graffiti mb-4">
            Nos Artistes
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez notre communauté d'artistes talentueux prêts à transformer votre espace en œuvre d'art unique
          </p>
        </div>

        {/* Filters */}
        <Card className="elevated mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Rechercher un artiste..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="Spécialité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les spécialités</SelectItem>
                  {specialties.map(specialty => (
                    <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
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

              <div></div>
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
                <span className="mr-2 h-5 w-5">🎨</span>
                Devenir artiste partenaire
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {filteredArtists.length} artiste{filteredArtists.length > 1 ? 's' : ''} trouvé{filteredArtists.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Artists Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtists.map((artist) => (
            <Card key={artist.id} className="elevated transition-smooth hover:shadow-glow-primary group">
              <CardHeader className="pb-4">
                <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
                  <img 
                    src={artist.image}
                    alt={`Œuvre de ${artist.name}`}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
                    <Star className="h-3 w-3 text-accent fill-accent" />
                    <span className="text-xs font-medium">{artist.rating}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <CardTitle className="text-xl">{artist.name}</CardTitle>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{artist.location}</span>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {artist.description}
                  </CardDescription>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {artist.projects} projets réalisés
                  </div>
                  <div className="text-sm font-semibold text-secondary">
                    {artist.price}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Link to={`/artistes/${artist.id}`} className="flex-1">
                    <Button variant="outline_glow" className="w-full">
                      Voir le profil
                    </Button>
                  </Link>
                  <Button 
                    variant="hero" 
                    size="sm" 
                    className="px-4"
                    onClick={() => {
                      // Check authentication and handle contact
                      console.log("Contact artist", artist.id);
                    }}
                  >
                    Contacter
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredArtists.length === 0 && (
          <Card className="elevated text-center py-12">
            <CardContent>
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Aucun artiste trouvé</h3>
              <p className="text-muted-foreground mb-6">
                Essayez de modifier vos critères de recherche ou supprimez les filtres
              </p>
              <Button 
                variant="hero" 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedSpecialty("all");
                  setSelectedLocation("all");
                }}
              >
                Réinitialiser les filtres
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Load More */}
        {filteredArtists.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline_glow" size="lg">
              Voir plus d'artistes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Artists;
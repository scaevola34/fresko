import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal } from "@/components/auth/AuthModal";
import { 
  Star, 
  MapPin, 
  Instagram, 
  Globe, 
  MessageCircle,
  Calendar,
  Award,
  Palette,
  Eye,
  ChevronLeft,
  ExternalLink
} from "lucide-react";

interface ArtistProfileProps {
  artistId: string;
  onBack?: () => void;
}

export const ArtistProfile = ({ artistId, onBack }: ArtistProfileProps) => {
  const { user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Mock artist data - replace with actual API call
  const artist = {
    id: artistId,
    name: "Julie Dubois",
    style: "Art Urbain",
    location: "Toulouse, France",
    bio: "Artiste urbaine passionnée depuis plus de 8 ans, je me spécialise dans les fresques colorées qui racontent des histoires. Mon travail puise dans la culture pop et les traditions locales pour créer des œuvres uniques qui transforment l'espace urbain.",
    rating: 4.8,
    reviewCount: 34,
    projectsCount: 25,
    experienceYears: 8,
    profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
    instagram: "@julieduboisart",
    website: "www.juliedubois-art.com",
    portfolio: [
      {
        id: "1",
        title: "Fresque Quartier Saint-Michel",
        year: 2024,
        location: "Toulouse",
        image: "https://images.unsplash.com/photo-1571019613914-85f342c6a11e?q=80&w=400&auto=format&fit=crop",
        description: "Grande fresque de 20m² représentant l'histoire du quartier"
      },
      {
        id: "2", 
        title: "Mural Café des Arts",
        year: 2023,
        location: "Lyon",
        image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=400&auto=format&fit=crop",
        description: "Création d'une ambiance chaleureuse pour ce café culturel"
      },
      {
        id: "3",
        title: "Façade École Primaire",
        year: 2023,
        location: "Montpellier", 
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=400&auto=format&fit=crop",
        description: "Fresque éducative et ludique pour les enfants"
      }
    ],
    reviews: [
      {
        id: "1",
        author: "Marie L.",
        rating: 5,
        date: "2024-01-15",
        comment: "Travail exceptionnel ! Julie a transformé notre mur en véritable œuvre d'art. Professionnelle et créative."
      },
      {
        id: "2",
        author: "Pierre M.",
        rating: 5,
        date: "2023-12-20",
        comment: "Résultat au-delà de nos espérances. Communication parfaite tout au long du projet."
      }
    ],
    specialties: ["Fresque murale", "Art figuratif", "Couleurs vives", "Portraits"],
    availability: "Disponible",
    priceRange: "800-2500€"
  };

  const handleContact = () => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    // Redirect to chat or messaging interface
    console.log("Opening chat with artist", artistId);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        {onBack && (
          <Button variant="ghost" onClick={onBack} className="mb-6">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Retour aux artistes
          </Button>
        )}

        {/* Header */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card className="elevated">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="shrink-0">
                    <img
                      src={artist.profileImage}
                      alt={artist.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-primary/20"
                    />
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div>
                      <h1 className="text-3xl font-bold text-graffiti mb-2">{artist.name}</h1>
                      <div className="flex items-center gap-4 text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{artist.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{artist.experienceYears} ans d'expérience</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{artist.rating}</span>
                          <span className="text-muted-foreground">({artist.reviewCount} avis)</span>
                        </div>
                        <Badge className="bg-gradient-secondary text-white border-0">
                          {artist.availability}
                        </Badge>
                      </div>

                      <Badge variant="outline" className="bg-gradient-primary text-white border-0 mb-4">
                        {artist.style}
                      </Badge>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                      {artist.bio}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {artist.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline">{specialty}</Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                      {artist.instagram && (
                        <Button variant="outline" size="sm">
                          <Instagram className="mr-2 h-4 w-4" />
                          Instagram
                          <ExternalLink className="ml-2 h-3 w-3" />
                        </Button>
                      )}
                      {artist.website && (
                        <Button variant="outline" size="sm">
                          <Globe className="mr-2 h-4 w-4" />
                          Site web
                          <ExternalLink className="ml-2 h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Card */}
          <Card className="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Contacter l'artiste
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary mb-1">{artist.priceRange}</div>
                <div className="text-sm text-muted-foreground">Fourchette de prix</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center text-sm">
                <div>
                  <div className="font-semibold text-primary">{artist.projectsCount}</div>
                  <div className="text-muted-foreground">Projets</div>
                </div>
                <div>
                  <div className="font-semibold text-primary">{artist.reviewCount}</div>
                  <div className="text-muted-foreground">Avis</div>
                </div>
              </div>

              <Button 
                variant="hero" 
                className="w-full" 
                size="lg"
                onClick={handleContact}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Contacter Julie
              </Button>
              
              <p className="text-xs text-center text-muted-foreground">
                Réponse généralement sous 24h
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="portfolio" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="portfolio" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Avis ({artist.reviewCount})
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              À propos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artist.portfolio.map((work) => (
                <Card key={work.id} className="elevated group cursor-pointer transition-smooth hover:shadow-glow-primary">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={work.image}
                        alt={work.title}
                        className="w-full h-48 object-cover rounded-t-lg transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-t-lg flex items-center justify-center">
                        <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <Badge className="absolute top-3 left-3 bg-gradient-primary text-white border-0">
                        {work.year}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-1">{work.title}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                        <MapPin className="h-3 w-3" />
                        {work.location}
                      </div>
                      <p className="text-sm text-muted-foreground">{work.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="space-y-6">
              {artist.reviews.map((review) => (
                <Card key={review.id} className="elevated">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                        {review.author.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">{review.author}</span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="about">
            <Card className="elevated">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Parcours artistique</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {artist.bio}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Spécialités</h3>
                  <div className="flex flex-wrap gap-2">
                    {artist.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline">{specialty}</Badge>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Expérience</h4>
                    <p className="text-muted-foreground">{artist.experienceYears} années d'expérience professionnelle</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Projets réalisés</h4>
                    <p className="text-muted-foreground">{artist.projectsCount} œuvres créées via WXLLSPACE</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Réseaux sociaux</h4>
                  <div className="flex items-center gap-4">
                    {artist.instagram && (
                      <Button variant="outline" size="sm">
                        <Instagram className="mr-2 h-4 w-4" />
                        {artist.instagram}
                      </Button>
                    )}
                    {artist.website && (
                      <Button variant="outline" size="sm">
                        <Globe className="mr-2 h-4 w-4" />
                        Site web
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <AuthModal 
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          defaultType="wall_owner"
          defaultTab="signup"
        />
      </div>
    </div>
  );
};
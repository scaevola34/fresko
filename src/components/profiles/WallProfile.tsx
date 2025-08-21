import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal } from "@/components/auth/AuthModal";
import { 
  MapPin,
  Building2,
  Euro,
  Ruler,
  Calendar,
  MessageCircle,
  ChevronLeft,
  Camera,
  Info,
  User,
  CheckCircle
} from "lucide-react";

interface WallProfileProps {
  wallId: string;
  onBack?: () => void;
}

export const WallProfile = ({ wallId, onBack }: WallProfileProps) => {
  const { user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Mock wall data - replace with actual API call
  const wall = {
    id: wallId,
    title: "Façade Restaurant Le Graffiti",
    description: "Nous recherchons un artiste pour créer une fresque colorée et dynamique qui reflète l'esprit convivial de notre restaurant. Le mur est situé dans une rue passante du 11ème arrondissement, visible par de nombreux piétons et clients potentiels.",
    type: "Extérieur",
    location: "75011 Paris",
    address: "15 Rue de la Fontaine au Roi, 75011 Paris",
    surface: "béton",
    ownerType: "Professionnel",
    ownerName: "Restaurant Le Graffiti",
    size: "5x3m",
    area: 15,
    height: 3,
    width: 5,
    budget: {
      min: 1200,
      max: 1800,
      currency: "€"
    },
    deadline: "2024-10-15",
    status: "Ouvert",
    mainImage: "https://images.unsplash.com/photo-1571019613914-85f342c6a11e?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1571019613914-85f342c6a11e?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=400&auto=format&fit=crop"
    ],
    requirements: [
      "Style coloré et dynamique",
      "Thème en accord avec l'esprit du restaurant", 
      "Résistant aux intempéries",
      "Respectueux de l'environnement urbain"
    ],
    amenities: [
      "Accès facile au mur",
      "Électricité disponible",
      "Point d'eau à proximité",
      "Parking possible"
    ],
    contactInfo: {
      preferredContact: "Via la plateforme WXLLSPACE",
      responseTime: "24-48h"
    },
    createdAt: "2024-01-10"
  };

  const handleApply = () => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    // Redirect to application or messaging interface
    console.log("Applying for wall", wallId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ouvert": return "bg-gradient-secondary";
      case "En cours": return "bg-gradient-accent";
      case "Terminé": return "bg-gradient-primary";
      default: return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        {onBack && (
          <Button variant="ghost" onClick={onBack} className="mb-6">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Retour aux murs
          </Button>
        )}

        {/* Header */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card className="elevated">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={wall.mainImage}
                    alt={wall.title}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${getStatusColor(wall.status)} text-white border-0`}>
                      {wall.status}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                      {wall.type}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-graffiti mb-4">{wall.title}</h1>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{wall.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      <span>{wall.ownerType}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Échéance: {new Date(wall.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {wall.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Apply Card */}
          <Card className="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Candidater au projet
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary mb-1">
                  {wall.budget.min}-{wall.budget.max}{wall.budget.currency}
                </div>
                <div className="text-sm text-muted-foreground">Budget proposé</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center text-sm">
                <div>
                  <div className="font-semibold text-primary">{wall.area}m²</div>
                  <div className="text-muted-foreground">Surface</div>
                </div>
                <div>
                  <div className="font-semibold text-primary">{wall.size}</div>
                  <div className="text-muted-foreground">Dimensions</div>
                </div>
              </div>

              <Button 
                variant="hero" 
                className="w-full" 
                size="lg"
                onClick={handleApply}
                disabled={wall.status !== "Ouvert"}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                {wall.status === "Ouvert" ? "Candidater" : wall.status}
              </Button>
              
              <p className="text-xs text-center text-muted-foreground">
                {wall.contactInfo.responseTime} de délai de réponse
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="details" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              Détails
            </TabsTrigger>
            <TabsTrigger value="photos" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Photos ({wall.images.length})
            </TabsTrigger>
            <TabsTrigger value="owner" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Propriétaire
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ruler className="h-5 w-5" />
                    Spécifications techniques
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Dimensions</label>
                      <p className="text-muted-foreground">{wall.size} ({wall.area}m²)</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Surface</label>
                      <p className="text-muted-foreground capitalize">{wall.surface}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Type</label>
                      <p className="text-muted-foreground">{wall.type}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Propriétaire</label>
                      <p className="text-muted-foreground">{wall.ownerType}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Adresse</label>
                    <p className="text-muted-foreground">{wall.address}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Exigences du projet
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Attentes artistiques</label>
                    <div className="space-y-2">
                      {wall.requirements.map((req, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-sm text-muted-foreground">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Commodités disponibles</label>
                    <div className="space-y-2">
                      {wall.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-secondary" />
                          <span className="text-sm text-muted-foreground">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="elevated md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Euro className="h-5 w-5" />
                    Budget et calendrier
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Budget proposé</label>
                    <div className="text-2xl font-bold text-secondary">
                      {wall.budget.min}-{wall.budget.max}{wall.budget.currency}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Négociable selon l'expérience et la complexité
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Échéance souhaitée</label>
                    <div className="text-2xl font-bold text-primary">
                      {new Date(wall.deadline).toLocaleDateString()}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Dates flexibles selon disponibilités
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="photos">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wall.images.map((image, index) => (
                <Card key={index} className="elevated group cursor-pointer">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={image}
                        alt={`Vue ${index + 1} du mur`}
                        className="w-full h-48 object-cover rounded-lg transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg"></div>
                      <Badge className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm text-foreground border-0">
                        Vue {index + 1}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="owner">
            <Card className="elevated">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {wall.ownerName.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1">{wall.ownerName}</h3>
                    <Badge className="bg-gradient-secondary text-white border-0 mb-4">
                      {wall.ownerType}
                    </Badge>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">À propos du projet</h4>
                        <p className="text-muted-foreground">
                          {wall.description}
                        </p>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Contact préféré</h4>
                          <p className="text-muted-foreground">{wall.contactInfo.preferredContact}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Temps de réponse</h4>
                          <p className="text-muted-foreground">{wall.contactInfo.responseTime}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Publié le</h4>
                        <p className="text-muted-foreground">
                          {new Date(wall.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <AuthModal 
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          defaultType="artist"
          defaultTab="signup"
        />
      </div>
    </div>
  );
};
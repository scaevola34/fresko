import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Palette, 
  Building2, 
  Users, 
  TrendingUp, 
  Star,
  ArrowRight,
  Sparkles
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [userType, setUserType] = useState<"artist" | "wall_owner">("artist");

  if (showDashboard) {
    return <DashboardLayout userType={userType} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="bg-gradient-primary text-white border-0 animate-glow-pulse">
              <Sparkles className="mr-2 h-4 w-4" />
              Nouvelle interface Dashboard
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold text-graffiti">
              Faites parler les murs
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                avec l'art
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              La marketplace qui met en relation street artists et propriétaires de murs pour créer des œuvres uniques.
              Découvrez notre nouveau dashboard amélioré !
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="hero" 
                size="xl" 
                className="animate-float"
                onClick={() => {
                  setUserType("artist");
                  setShowDashboard(true);
                }}
              >
                <Palette className="mr-2 h-6 w-6" />
                Dashboard Artiste
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="graffiti" 
                size="xl"
                className="animate-float"
                style={{ animationDelay: "0.2s" }}
                onClick={() => {
                  setUserType("wall_owner");
                  setShowDashboard(true);
                }}
              >
                <Building2 className="mr-2 h-6 w-6" />
                Dashboard Propriétaire
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Nouvelles Fonctionnalités</h2>
            <p className="text-xl text-muted-foreground">
              Découvrez les améliorations apportées aux dashboards
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Artist Features */}
            <Card className="elevated transition-smooth hover:shadow-glow-primary group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:animate-glow-pulse">
                  <Palette className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Dashboard Artiste Amélioré</CardTitle>
                <CardDescription>
                  Interface moderne pour gérer vos projets artistiques
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Suivi en temps réel des projets
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  Gestion du portfolio visuel
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  Statistiques détaillées des revenus
                </div>
              </CardContent>
            </Card>

            {/* Wall Owner Features */}
            <Card className="elevated transition-smooth hover:shadow-glow-secondary group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center mb-4 group-hover:animate-glow-pulse">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Dashboard Propriétaire</CardTitle>
                <CardDescription>
                  Trouvez et gérez vos projets d'art mural
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Gestion des candidatures d'artistes
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  Suivi de progression des œuvres
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  Système de notation et avis
                </div>
              </CardContent>
            </Card>

            {/* Design Improvements */}
            <Card className="elevated transition-smooth hover:shadow-glow-accent group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mb-4 group-hover:animate-glow-pulse">
                  <Star className="h-6 w-6 text-accent-foreground" />
                </div>
                <CardTitle>Design Moderne</CardTitle>
                <CardDescription>
                  Interface inspirée de l'art urbain et du street art
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Gradients et effets lumineux
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  Animations fluides et interactives
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  Design système cohérent
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto animate-glow-pulse">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
                <div className="text-4xl font-bold text-primary">18+</div>
                <div className="text-muted-foreground">Artistes Actifs</div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto animate-glow-pulse">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <div className="text-4xl font-bold text-secondary">1+</div>
                <div className="text-muted-foreground">Murs Disponibles</div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto animate-glow-pulse">
                <TrendingUp className="h-8 w-8 text-accent-foreground" />
              </div>
              <div>
                <div className="text-4xl font-bold text-accent">1200+</div>
                <div className="text-muted-foreground">Projets Réalisés</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold">
              Prêt à découvrir les nouveaux dashboards ?
            </h2>
            <p className="text-xl text-muted-foreground">
              Explorez les interfaces améliorées pour artistes et propriétaires de murs
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline_glow" 
                size="lg"
                onClick={() => {
                  setUserType("artist");
                  setShowDashboard(true);
                }}
              >
                Tester Interface Artiste
              </Button>
              <Button 
                variant="outline_glow" 
                size="lg"
                onClick={() => {
                  setUserType("wall_owner");
                  setShowDashboard(true);
                }}
              >
                Tester Interface Propriétaire
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

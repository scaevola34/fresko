import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Palette, 
  TrendingUp, 
  MessageCircle, 
  Star, 
  Calendar,
  Euro,
  Camera,
  Users,
  MapPin,
  Clock
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  status: "en_cours" | "terminé" | "en_attente";
  progress: number;
  clientName: string;
  location: string;
  budget: number;
  deadline: string;
  image?: string;
}

interface Stats {
  totalProjects: number;
  completedProjects: number;
  totalEarnings: number;
  averageRating: number;
  messagesCount: number;
}

const ArtistDashboard = () => {
  const [stats] = useState<Stats>({
    totalProjects: 28,
    completedProjects: 25,
    totalEarnings: 15420,
    averageRating: 4.8,
    messagesCount: 7
  });

  const [projects] = useState<Project[]>([
    {
      id: "1",
      title: "Fresque Urbaine - Café Central",
      status: "en_cours",
      progress: 65,
      clientName: "Thomas Moreau", 
      location: "75011 Paris",
      budget: 1200,
      deadline: "2024-09-15",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"
    },
    {
      id: "2", 
      title: "Mur d'Expression - Lycée Voltaire",
      status: "en_attente",
      progress: 0,
      clientName: "Marie Dubois",
      location: "69001 Lyon", 
      budget: 800,
      deadline: "2024-09-25",
    },
    {
      id: "3",
      title: "Art Mural - Restaurant Le Graffiti",
      status: "terminé",
      progress: 100,
      clientName: "Jean Bernard",
      location: "13001 Marseille",
      budget: 950,
      deadline: "2024-08-20",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "en_cours": return "bg-gradient-secondary";
      case "terminé": return "bg-gradient-accent";
      case "en_attente": return "bg-gradient-primary";
      default: return "bg-muted";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "en_cours": return "En cours";
      case "terminé": return "Terminé";
      case "en_attente": return "En attente";
      default: return status;
    }
  };

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-graffiti">Dashboard Artiste</h1>
          <p className="text-muted-foreground">
            Gérez vos projets et suivez votre activité artistique
          </p>
        </div>
        <Button variant="hero" size="lg" className="animate-glow-pulse">
          <Camera className="mr-2 h-5 w-5" />
          Nouveau Projet
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="elevated transition-smooth hover:shadow-glow-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projets Total</CardTitle>
            <Palette className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProjects}</div>
            <p className="text-xs text-muted-foreground">
              +3 ce mois-ci
            </p>
          </CardContent>
        </Card>

        <Card className="elevated transition-smooth hover:shadow-glow-secondary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus</CardTitle>
            <Euro className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEarnings.toLocaleString()}€</div>
            <p className="text-xs text-muted-foreground">
              +12% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>

        <Card className="elevated transition-smooth hover:shadow-glow-accent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Note Moyenne</CardTitle>
            <Star className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageRating}/5</div>
            <div className="flex mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(stats.averageRating)
                      ? "text-accent fill-accent"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="elevated transition-smooth hover:shadow-glow-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageCircle className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.messagesCount}</div>
            <p className="text-xs text-muted-foreground">
              Nouveaux messages
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="projets" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="projets">Mes Projets</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="profil">Mon Profil</TabsTrigger>
        </TabsList>

        <TabsContent value="projets" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Mes Projets</h2>
            <div className="flex gap-2">
              <Button variant="outline_glow">Filtrer</Button>
              <Button variant="graffiti">
                <Palette className="mr-2 h-4 w-4" />
                Nouveau Projet
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.id} className="elevated transition-smooth hover:shadow-glow-primary">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge className={`${getStatusColor(project.status)} text-white border-0`}>
                      {getStatusText(project.status)}
                    </Badge>
                    <span className="text-sm font-semibold text-secondary">
                      {project.budget}€
                    </span>
                  </div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {project.clientName}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {project.image && (
                    <div className="w-full h-32 rounded-md overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progression</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {project.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(project.deadline).toLocaleDateString()}
                    </div>
                  </div>

                  <Button 
                    variant={project.status === "en_cours" ? "hero" : "outline_glow"} 
                    className="w-full"
                  >
                    {project.status === "en_cours" ? "Continuer" : "Voir Détails"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-6">
          <div className="text-center py-12">
            <Palette className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Portfolio en construction</h3>
            <p className="text-muted-foreground mb-6">
              Ajoutez vos meilleures œuvres pour attirer plus de clients
            </p>
            <Button variant="hero" size="lg">
              <Camera className="mr-2 h-5 w-5" />
              Ajouter des Œuvres
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="messages" className="space-y-6">
          <div className="text-center py-12">
            <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Messagerie</h3>
            <p className="text-muted-foreground">
              Communiquez avec vos clients en temps réel
            </p>
          </div>
        </TabsContent>

        <TabsContent value="profil" className="space-y-6">
          <Card className="elevated">
            <CardHeader>
              <CardTitle>Mon Profil Artiste</CardTitle>
              <CardDescription>
                Gérez vos informations et votre visibilité
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-xl font-semibold">Julie Dubois</h4>
                  <p className="text-muted-foreground">Artiste Street Art</p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(stats.averageRating)
                            ? "text-accent fill-accent"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-1">
                      ({stats.averageRating}/5)
                    </span>
                  </div>
                </div>
              </div>
              <Button variant="neon" className="w-full md:w-auto">
                Modifier mon Profil
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ArtistDashboard;
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileSettings } from "./ProfileSettings";
import { NewWallWorkflow } from "./NewWallWorkflow";
import { ProjectTimeline } from "./ProjectTimeline";
import { ProposalManagement } from "./ProposalManagement";
import { 
  Building2, 
  Search, 
  MessageCircle, 
  Star, 
  Calendar,
  Euro,
  Camera,
  Users,
  MapPin,
  Clock,
  Palette,
  Plus
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  status: "en_recherche" | "en_cours" | "terminé";
  progress: number;
  artistName?: string;
  artistAvatar?: string;
  location: string;
  budget: number;
  wallSize: string;
  deadline: string;
  applicants?: number;
  image?: string;
}

interface Stats {
  totalWalls: number;
  activeProjects: number;
  totalSpent: number;
  averageRating: number;
  messagesCount: number;
}

type DashboardView = "dashboard" | "profile" | "newWall" | "projectTimeline" | "proposals";

const WallOwnerDashboard = () => {
  const [currentView, setCurrentView] = useState<DashboardView>("dashboard");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [stats] = useState<Stats>({
    totalWalls: 8,
    activeProjects: 3,
    totalSpent: 8420,
    averageRating: 4.9,
    messagesCount: 5
  });

  const [projects] = useState<Project[]>([
    {
      id: "1",
      title: "Façade Restaurant Le Graffiti",
      status: "en_cours",
      progress: 45,
      artistName: "Julie Dubois",
      artistAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80",
      location: "75011 Paris",
      budget: 1500,
      wallSize: "5x3m",
      deadline: "2024-09-20",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400"
    },
    {
      id: "2", 
      title: "Mur d'Accueil - Café Central",
      status: "en_recherche",
      progress: 0,
      location: "69001 Lyon", 
      budget: 800,
      wallSize: "3x2m",
      deadline: "2024-10-15",
      applicants: 12
    },
    {
      id: "3",
      title: "Entrée Bureaux - Start-up Tech",
      status: "terminé",
      progress: 100,
      artistName: "Zéphyr",
      artistAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80",
      location: "13001 Marseille",
      budget: 950,
      wallSize: "4x2.5m",
      deadline: "2024-08-15",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "en_cours": return "bg-gradient-secondary";
      case "terminé": return "bg-gradient-accent";
      case "en_recherche": return "bg-gradient-primary";
      default: return "bg-muted";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "en_cours": return "En cours";
      case "terminé": return "Terminé";
      case "en_recherche": return "En recherche";
      default: return status;
    }
  };

  // Render different views based on current state
  if (currentView === "profile") {
    return <ProfileSettings />;
  }

  if (currentView === "newWall") {
    return <NewWallWorkflow onClose={() => setCurrentView("dashboard")} />;
  }

  if (currentView === "projectTimeline" && selectedProjectId) {
    return (
      <ProjectTimeline 
        projectId={selectedProjectId}
        onBack={() => {
          setCurrentView("dashboard");
          setSelectedProjectId(null);
        }}
      />
    );
  }

  if (currentView === "proposals" && selectedProjectId) {
    const project = projects.find(p => p.id === selectedProjectId);
    return (
      <ProposalManagement 
        projectId={selectedProjectId}
        projectTitle={project?.title || "Projet"}
        onBack={() => {
          setCurrentView("dashboard");
          setSelectedProjectId(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-graffiti">Dashboard Propriétaire</h1>
          <p className="text-muted-foreground">
            Gérez vos murs et trouvez les meilleurs artistes
          </p>
        </div>
        <Button 
          variant="hero" 
          size="lg" 
          className="animate-glow-pulse"
          onClick={() => setCurrentView("newWall")}
        >
          <Plus className="mr-2 h-5 w-5" />
          Nouveau Mur
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="elevated transition-smooth hover:shadow-glow-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mes Murs</CardTitle>
            <Building2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalWalls}</div>
            <p className="text-xs text-muted-foreground">
              +2 ce mois-ci
            </p>
          </CardContent>
        </Card>

        <Card className="elevated transition-smooth hover:shadow-glow-secondary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Investissement</CardTitle>
            <Euro className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSpent.toLocaleString()}€</div>
            <p className="text-xs text-muted-foreground">
              Total investi dans l'art
            </p>
          </CardContent>
        </Card>

        <Card className="elevated transition-smooth hover:shadow-glow-accent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
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
          <TabsTrigger value="artistes">Trouver Artistes</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="profil">Mon Profil</TabsTrigger>
        </TabsList>

        <TabsContent value="projets" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Mes Projets</h2>
            <div className="flex gap-2">
              <Button variant="outline_glow">Filtrer</Button>
              <Button 
                variant="graffiti"
                onClick={() => setCurrentView("newWall")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Nouveau Mur
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
                    <Building2 className="h-3 w-3" />
                    {project.wallSize}
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
                  
                  {project.status === "en_recherche" && project.applicants && (
                    <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">
                          {project.applicants} candidatures
                        </span>
                      </div>
                      <Button 
                        variant="hero" 
                        size="sm"
                        onClick={() => {
                          setSelectedProjectId(project.id);
                          setCurrentView("proposals");
                        }}
                      >
                        Candidatures
                      </Button>
                    </div>
                  )}

                  {project.artistName && (
                    <div className="flex items-center gap-3 p-3 bg-secondary/10 rounded-lg">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={project.artistAvatar} />
                        <AvatarFallback>{project.artistName.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{project.artistName}</p>
                        <p className="text-xs text-muted-foreground">Artiste assigné</p>
                      </div>
                    </div>
                  )}
                  
                  {project.status === "en_cours" && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progression</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  )}

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
                    variant={
                      project.status === "en_cours" ? "hero" : 
                      project.status === "en_recherche" ? "graffiti" : "outline_glow"
                    } 
                    className="w-full"
                    onClick={() => {
                      if (project.status === "en_cours") {
                        setSelectedProjectId(project.id);
                        setCurrentView("projectTimeline");
                      } else if (project.status === "en_recherche") {
                        setSelectedProjectId(project.id);
                        setCurrentView("proposals");
                      }
                    }}
                  >
                    {project.status === "en_cours" ? "Suivre Projet" : 
                     project.status === "en_recherche" ? "Candidatures" : "Voir Détails"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="artistes" className="space-y-6">
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Découvrir des Artistes</h3>
            <p className="text-muted-foreground mb-6">
              Parcourez notre communauté d'artistes talentueux
            </p>
            <Button variant="hero" size="lg">
              <Search className="mr-2 h-5 w-5" />
              Explorer les Artistes
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="messages" className="space-y-6">
          <div className="text-center py-12">
            <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Messagerie</h3>
            <p className="text-muted-foreground">
              Communiquez avec les artistes pour vos projets
            </p>
          </div>
        </TabsContent>

        <TabsContent value="profil" className="space-y-6">
          <Card className="elevated">
            <CardHeader>
              <CardTitle>Mon Profil</CardTitle>
              <CardDescription>
                Gérez vos informations et préférences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80" />
                  <AvatarFallback>TM</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-xl font-semibold">Thomas Moreau</h4>
                  <p className="text-muted-foreground">Propriétaire de restaurant</p>
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
              <Button 
                variant="neon" 
                className="w-full md:w-auto"
                onClick={() => setCurrentView("profile")}
              >
                Modifier mon Profil
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WallOwnerDashboard;
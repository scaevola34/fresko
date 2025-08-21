import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  FileText, 
  MessageCircle, 
  Calendar,
  MapPin,
  Building2
} from "lucide-react";

interface ArtistProjectTimelineProps {
  projectId: string;
  onBack: () => void;
}

export const ArtistProjectTimeline = ({ projectId, onBack }: ArtistProjectTimelineProps) => {
  // Mock data - would come from API
  const project = {
    id: projectId,
    title: "Fresque Urbaine - Café Central",
    status: "en_cours" as const,
    progress: 65,
    clientName: "Thomas Moreau",
    clientAvatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80",
    location: "75011 Paris",
    budget: 1200,
    deadline: "2024-09-15",
    description: "Création d'une fresque murale colorée pour l'entrée du café, représentant l'esprit du quartier.",
    surface: "5x3m",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"
  };

  const timeline = [
    {
      id: "1",
      title: "Projet créé",
      description: "Le client a créé le projet et défini ses exigences",
      date: "2024-08-20",
      status: "completed" as const,
      icon: <FileText className="h-4 w-4" />
    },
    {
      id: "2", 
      title: "Candidature acceptée",
      description: "Votre candidature a été sélectionnée par le client",
      date: "2024-08-22",
      status: "completed" as const,
      icon: <CheckCircle className="h-4 w-4" />
    },
    {
      id: "3",
      title: "Devis envoyé", 
      description: "Devis de 1 200€ envoyé et accepté par le client",
      date: "2024-08-25",
      status: "completed" as const,
      icon: <DollarSign className="h-4 w-4" />,
      amount: "1 200€"
    },
    {
      id: "4",
      title: "Début des travaux",
      description: "Commencement de la réalisation de la fresque",
      date: "2024-08-28", 
      status: "completed" as const,
      icon: <Calendar className="h-4 w-4" />
    },
    {
      id: "5",
      title: "Travaux en cours",
      description: "Réalisation en cours - 65% terminé",
      date: "En cours",
      status: "current" as const,
      icon: <Clock className="h-4 w-4" />
    },
    {
      id: "6",
      title: "Livraison prévue",
      description: "Finalisation et livraison du projet",
      date: "2024-09-15",
      status: "upcoming" as const,
      icon: <CheckCircle className="h-4 w-4" />
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-accent";
      case "current": return "text-secondary";
      case "upcoming": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-graffiti">Suivi du Projet</h1>
          <p className="text-muted-foreground">{project.title}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Project Info */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Détails du Projet
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {project.image && (
                <div className="w-full h-32 rounded-md overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Budget</span>
                  <span className="font-semibold text-secondary">{project.budget}€</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Surface</span>
                  <span className="font-medium">{project.surface}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  {project.location}
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  Échéance: {new Date(project.deadline).toLocaleDateString()}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progression</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Client Info */}
          <Card className="elevated">
            <CardHeader>
              <CardTitle>Client</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={project.clientAvatar} />
                  <AvatarFallback>{project.clientName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{project.clientName}</p>
                  <p className="text-sm text-muted-foreground">Propriétaire</p>
                </div>
              </div>
              
              <Button variant="outline_glow" className="w-full">
                <MessageCircle className="mr-2 h-4 w-4" />
                Contacter le Client
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Timeline */}
        <div className="lg:col-span-2">
          <Card className="elevated">
            <CardHeader>
              <CardTitle>Timeline du Projet</CardTitle>
              <CardDescription>
                Suivez l'avancement de votre projet étape par étape
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {timeline.map((item, index) => (
                  <div key={item.id} className="flex gap-4">
                    {/* Icon */}
                    <div className={`
                      flex items-center justify-center w-10 h-10 rounded-full border-2
                      ${item.status === 'completed' ? 'bg-accent border-accent' :
                        item.status === 'current' ? 'bg-secondary border-secondary' :
                        'bg-background border-muted-foreground'}
                    `}>
                      <div className={`
                        ${item.status === 'completed' ? 'text-white' :
                          item.status === 'current' ? 'text-white' :
                          'text-muted-foreground'}
                      `}>
                        {item.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{item.title}</h4>
                        <Badge 
                          variant={
                            item.status === 'completed' ? 'default' :
                            item.status === 'current' ? 'secondary' : 'outline'
                          }
                          className="text-xs"
                        >
                          {item.date}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                      {item.amount && (
                        <div className="text-sm font-medium text-secondary">
                          Montant: {item.amount}
                        </div>
                      )}
                    </div>

                    {/* Connector Line */}
                    {index < timeline.length - 1 && (
                      <div className="absolute left-[2.4rem] w-0.5 h-6 bg-border translate-y-10" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, 
  Check, 
  MessageCircle, 
  Euro, 
  Calendar,
  FileText,
  Camera,
  ArrowLeft,
  Star
} from "lucide-react";

interface TimelineEvent {
  id: string;
  type: "message" | "quote" | "acceptance" | "milestone" | "completion";
  title: string;
  description: string;
  date: string;
  status: "completed" | "current" | "upcoming";
  details?: any;
}

interface ProjectTimelineProps {
  projectId: string;
  onBack: () => void;
}

export const ProjectTimeline = ({ projectId, onBack }: ProjectTimelineProps) => {
  const [project] = useState({
    id: projectId,
    title: "Façade Restaurant Le Graffiti",
    artist: {
      name: "Julie Dubois",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80",
      rating: 4.9
    },
    budget: 1500,
    progress: 45,
    deadline: "2024-09-20",
    daysRemaining: 15,
    status: "en_cours"
  });

  const [timeline] = useState<TimelineEvent[]>([
    {
      id: "1",
      type: "message",
      title: "Premier contact",
      description: "Vous avez envoyé le brief du projet à Julie",
      date: "2024-08-01",
      status: "completed"
    },
    {
      id: "2", 
      type: "quote",
      title: "Devis reçu",
      description: "Julie a envoyé son devis détaillé",
      date: "2024-08-03",
      status: "completed",
      details: {
        amount: 1500,
        timeline: "15 jours",
        materials: "Peinture acrylique premium, vernis de protection"
      }
    },
    {
      id: "3",
      type: "acceptance",
      title: "Devis accepté",
      description: "Vous avez validé le devis et effectué l'acompte",
      date: "2024-08-05",
      status: "completed",
      details: {
        deposit: 450,
        remaining: 1050
      }
    },
    {
      id: "4",
      type: "milestone",
      title: "Début des travaux",
      description: "Julie a commencé la préparation du mur",
      date: "2024-08-08",
      status: "completed"
    },
    {
      id: "5",
      type: "milestone",
      title: "Phase de création en cours",
      description: "Réalisation de l'esquisse et début de la peinture",
      date: "2024-08-15",
      status: "current"
    },
    {
      id: "6",
      type: "milestone",
      title: "Finalisation prévue",
      description: "Finitions et vernis de protection",
      date: "2024-08-20",
      status: "upcoming"
    },
    {
      id: "7",
      type: "completion",
      title: "Livraison finale",
      description: "Réception du projet terminé",
      date: "2024-08-22",
      status: "upcoming"
    }
  ]);

  const getEventIcon = (type: string, status: string) => {
    const iconClass = status === "completed" ? "text-primary" : 
                     status === "current" ? "text-secondary" : "text-muted-foreground";
    
    switch (type) {
      case "message": return <MessageCircle className={`h-4 w-4 ${iconClass}`} />;
      case "quote": return <FileText className={`h-4 w-4 ${iconClass}`} />;
      case "acceptance": return <Euro className={`h-4 w-4 ${iconClass}`} />;
      case "milestone": return <Clock className={`h-4 w-4 ${iconClass}`} />;
      case "completion": return <Check className={`h-4 w-4 ${iconClass}`} />;
      default: return <Clock className={`h-4 w-4 ${iconClass}`} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-primary";
      case "current": return "bg-secondary animate-pulse";
      case "upcoming": return "bg-muted";
      default: return "bg-muted";
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        <Badge className="bg-gradient-secondary text-white">
          En cours
        </Badge>
      </div>

      {/* Project Overview */}
      <Card className="elevated">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl">{project.title}</CardTitle>
              <CardDescription>
                Suivi détaillé de votre projet de street art
              </CardDescription>
            </div>
            <div className="text-right space-y-1">
              <div className="text-2xl font-bold text-secondary">
                {project.budget.toLocaleString()}€
              </div>
              <div className="text-sm text-muted-foreground">
                Budget total
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Artist Info */}
          <div className="flex items-center justify-between p-4 bg-secondary/10 rounded-lg">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={project.artist.avatar} />
                <AvatarFallback>{project.artist.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">{project.artist.name}</h4>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-accent fill-accent" />
                  <span className="text-sm text-muted-foreground">
                    {project.artist.rating}/5
                  </span>
                </div>
              </div>
            </div>
            <Button variant="hero" size="sm">
              <MessageCircle className="mr-2 h-4 w-4" />
              Contacter
            </Button>
          </div>

          {/* Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h4 className="font-semibold">Progression du projet</h4>
                <p className="text-sm text-muted-foreground">
                  {project.daysRemaining} jours restants
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{project.progress}%</div>
                <div className="text-sm text-muted-foreground">Terminé</div>
              </div>
            </div>
            <Progress value={project.progress} className="h-3" />
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-primary/5 rounded-lg">
            <div className="text-center">
              <div className="text-lg font-bold text-primary">Aug 22</div>
              <div className="text-sm text-muted-foreground">Livraison</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-secondary">450€</div>
              <div className="text-sm text-muted-foreground">Acompte versé</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-accent">1050€</div>
              <div className="text-sm text-muted-foreground">Restant dû</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card className="elevated">
        <CardHeader>
          <CardTitle>Chronologie du projet</CardTitle>
          <CardDescription>
            Suivez chaque étape de la réalisation de votre mur
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {timeline.map((event, index) => (
              <div key={event.id} className="relative">
                {/* Connector Line */}
                {index < timeline.length - 1 && (
                  <div className="absolute left-6 top-8 w-0.5 h-16 bg-border" />
                )}
                
                <div className="flex gap-4">
                  {/* Event Icon */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getStatusColor(event.status)}`}>
                    {getEventIcon(event.type, event.status)}
                  </div>
                  
                  {/* Event Content */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{event.title}</h4>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {new Date(event.date).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground">{event.description}</p>
                    
                    {/* Event Details */}
                    {event.details && (
                      <Card className="bg-muted/30">
                        <CardContent className="p-3">
                          {event.type === "quote" && (
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Montant:</span>
                                <span className="font-semibold">{event.details.amount}€</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Délai:</span>
                                <span>{event.details.timeline}</span>
                              </div>
                              <div className="text-sm">
                                <span className="block text-muted-foreground">Matériaux:</span>
                                <span>{event.details.materials}</span>
                              </div>
                            </div>
                          )}
                          
                          {event.type === "acceptance" && (
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Acompte versé:</span>
                                <span className="font-semibold text-primary">{event.details.deposit}€</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Solde restant:</span>
                                <span className="font-semibold">{event.details.remaining}€</span>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Separator className="my-6" />
          
          {/* Actions */}
          <div className="flex gap-2">
            <Button variant="hero">
              <Camera className="mr-2 h-4 w-4" />
              Voir les photos
            </Button>
            <Button variant="outline">
              <MessageCircle className="mr-2 h-4 w-4" />
              Envoyer un message
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
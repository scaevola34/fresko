import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  MessageCircle, 
  Star, 
  Euro, 
  Clock, 
  Check, 
  X,
  Eye,
  Calendar,
  User
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Proposal {
  id: string;
  artist: {
    name: string;
    avatar: string;
    rating: number;
    completedProjects: number;
    style: string;
  };
  budget: number;
  timeline: string;
  message: string;
  portfolio: string[];
  submittedAt: string;
  status: "pending" | "accepted" | "rejected";
}

interface ProposalManagementProps {
  projectId: string;
  projectTitle: string;
  onBack: () => void;
}

export const ProposalManagement = ({ 
  projectId, 
  projectTitle, 
  onBack 
}: ProposalManagementProps) => {
  const { toast } = useToast();
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  
  const [proposals] = useState<Proposal[]>([
    {
      id: "1",
      artist: {
        name: "Julie Dubois",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80",
        rating: 4.9,
        completedProjects: 23,
        style: "Graffiti moderne"
      },
      budget: 1500,
      timeline: "15 jours",
      message: "Bonjour ! Votre projet m'inspire énormément. Je propose une approche moderne avec des couleurs vives qui s'harmoniseront parfaitement avec l'ambiance de votre restaurant...",
      portfolio: [
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300"
      ],
      submittedAt: "2024-08-15",
      status: "pending"
    },
    {
      id: "2", 
      artist: {
        name: "Alex Chen",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80",
        rating: 4.7,
        completedProjects: 31,
        style: "Street art abstrait"
      },
      budget: 1200,
      timeline: "20 jours",
      message: "Je suis spécialisé dans les fresques murales pour restaurants. Mon style abstrait moderne apportera une touche d'originalité unique à votre établissement...",
      portfolio: [
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=300",
        "https://images.unsplash.com/photo-1578662015441-c78c5aba4fbb?w=300"
      ],
      submittedAt: "2024-08-14",
      status: "pending"
    },
    {
      id: "3",
      artist: {
        name: "Maya Rodriguez", 
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80",
        rating: 4.8,
        completedProjects: 18,
        style: "Réalisme urbain"
      },
      budget: 1800,
      timeline: "12 jours",
      message: "Passionnée par l'art culinaire, je propose une fresque qui célèbre la gastronomie française avec un style réaliste contemporain...",
      portfolio: [
        "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=300",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300"
      ],
      submittedAt: "2024-08-13",
      status: "pending"
    }
  ]);

  const handleAcceptProposal = (proposalId: string) => {
    toast({
      title: "Candidature acceptée",
      description: "L'artiste a été notifié de votre acceptation."
    });
  };

  const handleRejectProposal = (proposalId: string) => {
    if (!feedbackMessage.trim()) {
      toast({
        variant: "destructive", 
        title: "Message requis",
        description: "Veuillez ajouter un message de feedback avant de rejeter."
      });
      return;
    }
    
    toast({
      title: "Candidature rejetée",
      description: "Votre feedback a été envoyé à l'artiste."
    });
    
    setFeedbackMessage("");
    setSelectedProposal(null);
  };

  const startChat = (artistName: string) => {
    toast({
      title: "Chat démarré",
      description: `Conversation créée avec ${artistName}.`
    });
  };

  const pendingProposals = proposals.filter(p => p.status === "pending");
  const processedProposals = proposals.filter(p => p.status !== "pending");

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-graffiti">Candidatures</h1>
            <p className="text-muted-foreground">{projectTitle}</p>
          </div>
        </div>
        <Badge className="bg-gradient-primary text-white">
          {pendingProposals.length} nouvelle(s) candidature(s)
        </Badge>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="pending">
            En attente ({pendingProposals.length})
          </TabsTrigger>
          <TabsTrigger value="processed">
            Traitées ({processedProposals.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingProposals.length === 0 ? (
            <Card className="p-12 text-center">
              <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Aucune candidature en attente</h3>
              <p className="text-muted-foreground">
                Les nouvelles candidatures apparaîtront ici
              </p>
            </Card>
          ) : (
            <div className="grid gap-6">
              {pendingProposals.map((proposal) => (
                <Card key={proposal.id} className="elevated">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={proposal.artist.avatar} />
                          <AvatarFallback>{proposal.artist.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <CardTitle className="text-xl">{proposal.artist.name}</CardTitle>
                          <CardDescription>{proposal.artist.style}</CardDescription>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-accent fill-accent" />
                              <span>{proposal.artist.rating}/5</span>
                            </div>
                            <span className="text-muted-foreground">
                              {proposal.artist.completedProjects} projets terminés
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-2xl font-bold text-secondary">
                          {proposal.budget.toLocaleString()}€
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {proposal.timeline}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {/* Message */}
                    <div className="space-y-2">
                      <h4 className="font-semibold">Message de candidature</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {proposal.message}
                      </p>
                    </div>

                    {/* Portfolio */}
                    <div className="space-y-3">
                      <h4 className="font-semibold">Portfolio</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {proposal.portfolio.map((image, index) => (
                          <div key={index} className="relative group cursor-pointer">
                            <img
                              src={image}
                              alt={`Portfolio ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg transition-transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                              <Eye className="h-5 w-5 text-white" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Submission Info */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Candidature du {new Date(proposal.submittedAt).toLocaleDateString('fr-FR')}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t">
                      <Button 
                        variant="hero"
                        onClick={() => handleAcceptProposal(proposal.id)}
                        className="flex-1"
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Accepter
                      </Button>
                      
                      <Button 
                        variant="outline"
                        onClick={() => startChat(proposal.artist.name)}
                        className="flex-1"
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Discuter
                      </Button>
                      
                      <Button 
                        variant="outline"
                        onClick={() => setSelectedProposal(proposal.id)}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Rejeter
                      </Button>
                    </div>

                    {/* Feedback Form */}
                    {selectedProposal === proposal.id && (
                      <Card className="bg-muted/30">
                        <CardContent className="p-4 space-y-4">
                          <div className="space-y-2">
                            <h5 className="font-semibold">Message de feedback (optionnel)</h5>
                            <Textarea
                              value={feedbackMessage}
                              onChange={(e) => setFeedbackMessage(e.target.value)}
                              placeholder="Expliquez pourquoi cette candidature ne correspond pas à vos attentes..."
                              rows={3}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="destructive"
                              size="sm"
                              onClick={() => handleRejectProposal(proposal.id)}
                            >
                              Confirmer le rejet
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedProposal(null)}
                            >
                              Annuler
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="processed" className="space-y-4">
          {processedProposals.length === 0 ? (
            <Card className="p-12 text-center">
              <Check className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Aucune candidature traitée</h3>
              <p className="text-muted-foreground">
                Les candidatures acceptées ou rejetées apparaîtront ici
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {processedProposals.map((proposal) => (
                <Card key={proposal.id} className={`opacity-75 ${
                  proposal.status === "accepted" ? "border-primary/50" : "border-destructive/50"
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={proposal.artist.avatar} />
                          <AvatarFallback>{proposal.artist.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{proposal.artist.name}</h4>
                          <p className="text-sm text-muted-foreground">{proposal.artist.style}</p>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <Badge className={
                          proposal.status === "accepted" 
                            ? "bg-primary text-white" 
                            : "bg-destructive text-white"
                        }>
                          {proposal.status === "accepted" ? "Acceptée" : "Rejetée"}
                        </Badge>
                        <div className="text-sm font-semibold">
                          {proposal.budget.toLocaleString()}€
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
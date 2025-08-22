import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Palette, 
  Building2, 
  Users, 
  TrendingUp, 
  Star,
  ArrowRight,
  Sparkles,
  MapPin,
  Euro,
  Shield,
  CheckCircle
} from "lucide-react";
import { AuthModal } from "@/components/auth/AuthModal";
import { useAuth } from "@/hooks/useAuth";
import { useStats } from "@/hooks/useStats";

const Home = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState<'artist' | 'wall_owner'>('artist');
  const { user } = useAuth();
  const { stats } = useStats();

  const handleAuthClick = (type: 'artist' | 'wall_owner') => {
    if (user) {
      // User is already logged in, redirect to dashboard
      window.location.href = '/dashboard';
    } else {
      setAuthType(type);
      setAuthModalOpen(true);
    }
  };
  const featuredArtists = [
    {
      id: "1",
      name: "Julie Dubois",
      specialty: "Art Urbain",
      location: "Toulouse",
      rating: 4.8,
      projects: 25,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: "2", 
      name: "Zéphyr",
      specialty: "Graffiti",
      location: "Paris",
      rating: 4.9,
      projects: 18,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop"
    },
    {
      id: "3",
      name: "Bibstreet", 
      specialty: "Street Art",
      location: "Montpellier",
      rating: 4.7,
      projects: 12,
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop"
    }
  ];

  const workflowSteps = [
    {
      icon: Users,
      title: "Choisissez l'artiste",
      description: "Parcourez notre sélection d'artistes vérifiés et trouvez celui qui correspond à votre vision."
    },
    {
      icon: MapPin,
      title: "Définissez le projet", 
      description: "Décrivez votre mur, vos attentes et négociez directement avec l'artiste."
    },
    {
      icon: Palette,
      title: "Créez l'œuvre",
      description: "Suivez l'avancement en temps réel et communiquez avec votre artiste."
    },
    {
      icon: CheckCircle,
      title: "Admirez le résultat",
      description: "Profitez de votre nouvelle œuvre d'art urbain qui transforme votre espace."
    }
  ];

  const testimonials = [
    {
      name: "Thomas Moreau",
      role: "Propriétaire de restaurant",
      content: "FRESKO m'a permis de transformer la façade de mon commerce en une véritable œuvre d'art. Le processus était simple et le résultat est spectaculaire!",
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=80&auto=format&fit=crop"
    },
    {
      name: "Julie Lambert",
      role: "Artiste street art", 
      content: "Grâce à FRESKO, j'ai pu trouver des projets intéressants et développer ma visibilité. Un outil essentiel pour les artistes urbains!",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=80&auto=format&fit=crop"
    },
    {
      name: "Nicolas Petit",
      role: "Directeur d'agence",
      content: "La fresque réalisée dans nos locaux a transformé l'ambiance de travail. Le processus de sélection d'artiste était fluide et professionnel.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=80&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-20">
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="bg-gradient-primary text-white border-0 animate-glow-pulse">
              <Sparkles className="mr-2 h-4 w-4" />
              La marketplace française du street art
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
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/artistes">
                <Button 
                  variant="hero" 
                  size="xl" 
                  className="animate-float"
                >
                  <Palette className="mr-2 h-6 w-6" />
                  Je suis un artiste
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link to="/murs">
                <Button 
                  variant="graffiti" 
                  size="xl"
                  className="animate-float"
                  style={{ animationDelay: "0.2s" }}
                >
                  <Building2 className="mr-2 h-6 w-6" />
                  J'ai un mur disponible
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto animate-glow-pulse">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
                <div className="text-4xl font-bold text-primary">{stats.artistsCount}+</div>
                <div className="text-muted-foreground">Artistes</div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto animate-glow-pulse">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <div className="text-4xl font-bold text-secondary">{stats.wallsCount}+</div>
                <div className="text-muted-foreground">Murs</div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto animate-glow-pulse">
                <TrendingUp className="h-8 w-8 text-accent-foreground" />
              </div>
              <div>
                <div className="text-4xl font-bold text-accent">{stats.projectsCount}+</div>
                <div className="text-muted-foreground">Projets</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artists Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Artistes en vedette</h2>
            <p className="text-xl text-muted-foreground">
              Découvrez des artistes talentueux prêts à transformer votre espace en œuvre d'art unique
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredArtists.map((artist) => (
              <Card key={artist.id} className="elevated transition-smooth hover:shadow-glow-primary group">
                <CardHeader className="pb-4">
                  <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                    <img 
                      src={artist.image}
                      alt={`Œuvre de ${artist.name}`}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{artist.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-accent fill-accent" />
                      <span className="text-sm font-medium">{artist.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{artist.name}</CardTitle>
                  <CardDescription>{artist.specialty}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary">{artist.specialty}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {artist.projects} projets réalisés
                    </span>
                  </div>
                  
                  <Link to={`/artistes/${artist.id}`}>
                    <Button variant="outline_glow" className="w-full">
                      Voir le profil
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/artistes">
              <Button variant="hero" size="lg">
                Voir tous les artistes
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Comment ça marche ?</h2>
            <p className="text-xl text-muted-foreground">
              Un processus simple et sécurisé pour concrétiser votre projet artistique
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowSteps.map((step, index) => (
              <Card key={index} className="elevated transition-smooth hover:shadow-glow-secondary text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4 animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/comment-ca-marche">
              <Button variant="graffiti" size="lg">
                En savoir plus
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why choose FRESKO */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Pourquoi choisir FRESKO ?</h2>
            <p className="text-xl text-muted-foreground">
              Une plateforme sécurisée qui met la qualité et la confiance au cœur de chaque collaboration artistique
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="elevated transition-smooth hover:shadow-glow-primary text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Artistes vérifiés</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Tous nos artistes sont sélectionnés pour leur talent et leur professionnalisme
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="elevated transition-smooth hover:shadow-glow-secondary text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Euro className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Paiement sécurisé</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Transactions protégées avec paiement échelonné selon l'avancement
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="elevated transition-smooth hover:shadow-glow-accent text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-accent-foreground" />
                </div>
                <CardTitle>Satisfaction garantie</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Support client dédié pour vous accompagner tout au long du projet
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Ils nous font confiance</h2>
            <p className="text-xl text-muted-foreground">
              Découvrez les témoignages de notre communauté d'artistes et propriétaires
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="elevated transition-smooth hover:shadow-glow-primary">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img 
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">
                    "{testimonial.content}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold">
              Prêt à donner vie à votre projet?
            </h2>
            <p className="text-xl text-muted-foreground">
              Rejoignez FRESKO aujourd'hui et connectez-vous avec une communauté passionnée. 
              Que vous soyez artiste ou propriétaire, votre prochaine collaboration vous attend.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/artistes">
                <Button 
                  variant="hero" 
                  size="lg"
                >
                  Je suis artiste
                </Button>
              </Link>
              <Link to="/murs">
                <Button 
                  variant="graffiti" 
                  size="lg"
                >
                  J'ai un mur
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultType={authType}
        defaultTab="signup"
      />
    </div>
  );
};

export default Home;
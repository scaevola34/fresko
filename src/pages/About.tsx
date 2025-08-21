import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Palette,
  Users,
  Target,
  Heart,
  Award,
  Globe,
  TrendingUp,
  Lightbulb,
  ArrowRight,
  Mail,
  Sparkles
} from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Palette,
      title: "Passion Artistique",
      description: "Nous croyons en la puissance transformatrice de l'art urbain et du street art pour embellir nos espaces de vie et créer du lien social."
    },
    {
      icon: Users,
      title: "Communauté",
      description: "WXLLSPACE unit artistes et propriétaires dans une communauté bienveillante où chacun peut exprimer sa créativité et ses besoins."
    },
    {
      icon: Target,
      title: "Qualité",
      description: "Nous sélectionnons rigoureusement nos artistes partenaires pour garantir un service professionnel et des œuvres de haute qualité."
    },
    {
      icon: Heart,
      title: "Accessibilité",
      description: "L'art ne doit pas être réservé aux galeries. Nous démocratisons l'accès à l'art en rendant possible sa création dans tous les espaces."
    }
  ];

  const team = [
    {
      name: "Marie Dubois",
      role: "Fondatrice & CEO",
      description: "Passionnée d'art urbain depuis 10 ans, Marie a créé WXLLSPACE pour démocratiser l'accès à l'art mural.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Thomas Laurent",
      role: "Directeur Artistique",
      description: "Ancien street artist reconnu, Thomas supervise la sélection des artistes et garantit la qualité des projets.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Sarah Martin",
      role: "Responsable Communauté",
      description: "Sarah accompagne nos utilisateurs au quotidien et anime notre communauté d'artistes et de clients.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b589?q=80&w=200&auto=format&fit=crop"
    }
  ];

  const milestones = [
    {
      year: "2021",
      title: "Naissance de l'idée",
      description: "Marie Dubois imagine une plateforme pour connecter artistes et propriétaires de murs"
    },
    {
      year: "2022",
      title: "Lancement de la beta",
      description: "Premiers tests avec 5 artistes pilotes à Paris et Lyon"
    },
    {
      year: "2023",
      title: "Expansion nationale",
      description: "Ouverture dans 10 grandes villes françaises"
    },
    {
      year: "2024", 
      title: "1000+ projets réalisés",
      description: "Dépassement du cap des 1000 œuvres créées via la plateforme"
    }
  ];

  const stats = [
    { icon: Users, value: "18+", label: "Artistes partenaires" },
    { icon: Palette, value: "1200+", label: "Projets réalisés" },
    { icon: Globe, value: "25+", label: "Villes couvertes" },
    { icon: Award, value: "4.8/5", label: "Satisfaction client" }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-gradient-primary text-white border-0 animate-glow-pulse mb-4">
            <Sparkles className="mr-2 h-4 w-4" />
            Notre histoire
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-graffiti mb-6">
            À propos de WXLLSPACE
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            La première marketplace française dédiée au street art, née de la passion de démocratiser 
            l'art urbain et de transformer nos espaces quotidiens en galeries à ciel ouvert.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-20">
          <Card className="elevated bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-glow-pulse">
                <Target className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-6">Notre Mission</h2>
              <p className="text-lg leading-relaxed max-w-4xl mx-auto mb-8">
                WXLLSPACE révolutionne l'accès à l'art en créant des ponts entre artistes talentueux et propriétaires 
                d'espaces. Notre mission est de transformer chaque mur en une toile d'expression artistique, 
                rendant l'art accessible à tous et valorisant le travail des créateurs urbains.
              </p>
              <div className="flex justify-center gap-4">
                <Link to="/artistes">
                  <Button variant="hero">
                    Découvrir nos artistes
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Nos Valeurs</h2>
            <p className="text-xl text-muted-foreground">
              Les principes qui guident chacune de nos actions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="elevated transition-smooth hover:shadow-glow-primary text-center h-full">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-float"
                       style={{ animationDelay: `${index * 0.2}s` }}>
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-muted/30 -mx-4 px-4 mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">WXLLSPACE en Chiffres</h2>
            <p className="text-xl text-muted-foreground">
              L'impact de notre communauté depuis le lancement
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="elevated transition-smooth hover:shadow-glow-secondary text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4 animate-glow-pulse">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-secondary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>


        {/* Vision Section */}
        <section className="mb-20">
          <Card className="elevated bg-gradient-to-r from-secondary/5 to-accent/5 border-secondary/20">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-6 animate-glow-pulse">
                <Lightbulb className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-6">Notre Vision</h2>
              <p className="text-lg leading-relaxed max-w-4xl mx-auto mb-8">
                Nous imaginons un futur où chaque quartier, chaque rue, chaque espace urbain raconte une histoire 
                à travers l'art. WXLLSPACE ambitionne de devenir la référence européenne de l'art mural collaboratif, 
                créant des milliers d'œuvres qui embellissent notre quotidien et soutiennent les artistes locaux.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Badge variant="outline">Art accessible</Badge>
                <Badge variant="outline">Innovation sociale</Badge>
                <Badge variant="outline">Création locale</Badge>
                <Badge variant="outline">Transformation urbaine</Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact CTA */}
        <section className="text-center">
          <Card className="elevated">
            <CardContent className="p-12">
              <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="h-8 w-8 text-accent-foreground" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Une question ? Une idée ?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Nous serions ravis d'échanger avec vous sur votre projet ou sur WXLLSPACE
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg">
                  <Mail className="mr-2 h-5 w-5" />
                  Nous contacter
                </Button>
                <Link to="/comment-ca-marche">
                  <Button variant="outline_glow" size="lg">
                    Comment ça marche ?
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  WXLLSPACE - La marketplace du street art • Créé avec ❤️ en France
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default About;
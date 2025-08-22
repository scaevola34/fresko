import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Search,
  MessageCircle, 
  Palette,
  CheckCircle,
  Users,
  MapPin,
  Euro,
  Shield,
  Calendar,
  Star,
  ArrowRight,
  Sparkles
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: Search,
      title: "Découvrez & Choisissez",
      subtitle: "Trouvez l'artiste parfait",
      description: "Parcourez notre sélection d'artistes vérifiés, consultez leurs portfolios, lisez les avis clients et trouvez celui qui correspond à votre vision artistique.",
      details: [
        "Filtres par spécialité, localisation et budget",
        "Portfolios détaillés avec œuvres précédentes", 
        "Système de notation et avis clients",
        "Possibilité de contacter directement l'artiste"
      ],
      color: "primary"
    },
    {
      id: 2,
      icon: MessageCircle,
      title: "Échangez & Négociez", 
      subtitle: "Définissez votre projet ensemble",
      description: "Contactez l'artiste, décrivez votre vision, négociez le prix et planifiez les détails de votre projet en toute transparence.",
      details: [
        "Messagerie intégrée sécurisée",
        "Devis détaillé et transparent",
        "Planning et délais convenus ensemble",
        "Validation mutuelle avant démarrage"
      ],
      color: "secondary"
    },
    {
      id: 3,
      icon: Palette,
      title: "Créez & Suivez",
      subtitle: "Votre œuvre prend vie",
      description: "L'artiste réalise votre fresque pendant que vous suivez l'avancement en temps réel grâce à notre système de suivi intégré.",
      details: [
        "Photos d'avancement régulières",
        "Communication continue avec l'artiste", 
        "Paiement échelonné selon l'avancement",
        "Possibilité d'ajustements en cours de route"
      ],
      color: "accent"
    },
    {
      id: 4,
      icon: CheckCircle,
      title: "Admirez & Évaluez",
      subtitle: "Votre espace transformé",
      description: "Profitez de votre nouvelle œuvre d'art urbain et partagez votre expérience en laissant un avis pour aider la communauté.",
      details: [
        "Réception et validation finale de l'œuvre",
        "Photos professionnelles de l'œuvre terminée",
        "Système d'évaluation mutuelle",
        "Partage sur les réseaux sociaux"
      ],
      color: "primary"
    }
  ];

  const advantages = [
    {
      icon: Shield,
      title: "Sécurité Garantie",
      description: "Artistes vérifiés, paiements sécurisés et assurance projet incluse"
    },
    {
      icon: Euro,
      title: "Prix Transparents",
      description: "Devis détaillés, pas de frais cachés, paiement échelonné selon l'avancement"
    },
    {
      icon: Users,
      title: "Communauté Active",
      description: "Plus de 1000+ projets réalisés, réseau d'artistes professionnels"
    },
    {
      icon: Star,
      title: "Satisfaction Client",
      description: "98% de satisfaction client, support dédié tout au long du projet"
    }
  ];

  const faqs = [
    {
      question: "Comment sont sélectionnés les artistes ?",
      answer: "Tous nos artistes passent par un processus de vérification rigoureux incluant l'évaluation de leur portfolio, de leurs références et de leur professionnalisme."
    },
    {
      question: "Quels sont les délais moyens pour un projet ?",
      answer: "Les délais varient selon la taille et la complexité du projet, généralement entre 1 semaine et 1 mois. Chaque projet est planifié individuellement avec l'artiste."
    },
    {
      question: "Comment fonctionne le paiement ?",
      answer: "Le paiement est échelonné : 30% à la validation du devis, 40% en cours de réalisation et 30% à la livraison finale. Tous les paiements sont sécurisés."
    },
    {
      question: "Que se passe-t-il en cas de problème ?",
      answer: "Notre équipe support vous accompagne tout au long du projet. En cas de litige, nous proposons une médiation et des solutions adaptées à chaque situation."
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary": return "bg-gradient-primary text-white";
      case "secondary": return "bg-gradient-secondary text-white";
      case "accent": return "bg-gradient-accent text-accent-foreground";
      default: return "bg-gradient-primary text-white";
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-gradient-primary text-white border-0 animate-glow-pulse mb-4">
            <Sparkles className="mr-2 h-4 w-4" />
            Guide complet
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-graffiti mb-6">
            Comment ça marche ?
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez notre processus simple et sécurisé pour concrétiser votre projet d'art mural, 
            de la recherche d'artiste à la réalisation finale de votre œuvre unique.
          </p>
        </div>

        {/* Steps Section */}
        <div className="space-y-20 mb-20">
          {steps.map((step, index) => (
            <div key={step.id} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
              {/* Content */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-16 h-16 ${getColorClasses(step.color)} rounded-full flex items-center justify-center animate-glow-pulse`}>
                    <step.icon className="h-8 w-8" />
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">
                      Étape {step.id}
                    </Badge>
                    <h2 className="text-3xl font-bold">{step.title}</h2>
                    <p className="text-lg text-muted-foreground">{step.subtitle}</p>
                  </div>
                </div>

                <p className="text-lg leading-relaxed">
                  {step.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {step.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center gap-3">
                      <div className={`w-2 h-2 ${step.color === 'primary' ? 'bg-primary' : step.color === 'secondary' ? 'bg-secondary' : 'bg-accent'} rounded-full`}></div>
                      <span className="text-sm">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual */}
              <div className="flex-1 max-w-md">
                <Card className="elevated transition-smooth hover:shadow-glow-primary">
                  <CardContent className="p-8 text-center">
                    <div className={`w-24 h-24 ${getColorClasses(step.color)} rounded-full flex items-center justify-center mx-auto mb-6 animate-float`} 
                         style={{ animationDelay: `${index * 0.2}s` }}>
                      <step.icon className="h-12 w-12" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.subtitle}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>

        {/* Advantages Section */}
        <section className="py-20 bg-muted/30 -mx-4 px-4 mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Pourquoi choisir FRESKO ?</h2>
            <p className="text-xl text-muted-foreground">
              Une plateforme conçue pour la réussite de votre projet artistique
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <Card key={index} className="elevated transition-smooth hover:shadow-glow-secondary text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4 animate-float"
                       style={{ animationDelay: `${index * 0.1}s` }}>
                    <advantage.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{advantage.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {advantage.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Timeline Visual */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Chronologie Type d'un Projet</h2>
            <p className="text-xl text-muted-foreground">
              Exemple concret : fresque de 15m² sur façade de restaurant
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 w-1 h-full bg-gradient-to-b from-primary via-secondary to-accent rounded-full opacity-20"></div>

            <div className="space-y-12">
              {[
                { day: "J+0", title: "Premier Contact", description: "Discussion initiale avec l'artiste, visite du mur" },
                { day: "J+2", title: "Devis & Validation", description: "Réception du devis détaillé, signature du contrat" },
                { day: "J+7", title: "Préparation", description: "Achat des matériaux, préparation du mur" },
                { day: "J+10", title: "Réalisation", description: "Création de la fresque (3-5 jours selon complexité)" },
                { day: "J+15", title: "Livraison", description: "Finalisation, nettoyage, réception de l'œuvre" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-8">
                  <div className={`${index % 2 === 0 ? 'order-1' : 'order-3'} flex-1 text-${index % 2 === 0 ? 'right' : 'left'}`}>
                    <Card className="elevated inline-block max-w-md">
                      <CardContent className="p-4">
                        <Badge className="mb-2">{item.day}</Badge>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="order-2 w-4 h-4 bg-gradient-primary rounded-full border-4 border-background z-10 animate-glow-pulse"></div>
                  
                  <div className={`${index % 2 === 0 ? 'order-3' : 'order-1'} flex-1`}></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Questions Fréquentes</h2>
            <p className="text-xl text-muted-foreground">
              Tout ce que vous devez savoir sur FRESKO
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <Card key={index} className="elevated transition-smooth hover:shadow-glow-primary">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-primary/5 to-secondary/5 -mx-4 px-4 py-20 rounded-lg">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold">
              Prêt à commencer votre projet ?
            </h2>
            <p className="text-xl text-muted-foreground">
              Rejoignez les centaines de clients satisfaits qui ont transformé leur espace grâce à FRESKO
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/artistes">
                  <Button variant="hero" size="lg">
                    Découvrez les artistes
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/murs">
                  <Button variant="graffiti" size="lg">
                    Proposez votre mur
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-secondary" />
                <span>Gratuit et sans engagement</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-secondary" />
                <span>100% sécurisé</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HowItWorks;
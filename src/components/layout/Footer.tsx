import { Link } from "react-router-dom";
import { Palette, Instagram, Twitter, Facebook } from "lucide-react";
import { Logo } from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-card border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Logo />
            <p className="text-muted-foreground">
              La marketplace française qui connecte les artistes urbains avec les propriétaires de murs.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-semibold">Navigation</h4>
            <div className="space-y-2">
              <Link to="/artistes" className="block text-muted-foreground hover:text-primary transition-colors">
                Artistes
              </Link>
              <Link to="/murs" className="block text-muted-foreground hover:text-primary transition-colors">
                Murs disponibles
              </Link>
              <Link to="/carte" className="block text-muted-foreground hover:text-primary transition-colors">
                Carte interactive
              </Link>
              <Link to="/comment-ca-marche" className="block text-muted-foreground hover:text-primary transition-colors">
                Comment ça marche
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold">Support</h4>
            <div className="space-y-2">
              <Link to="/a-propos" className="block text-muted-foreground hover:text-primary transition-colors">
                À propos
              </Link>
              <Link to="#" className="block text-muted-foreground hover:text-primary transition-colors">
                FAQ
              </Link>
              <a 
                href="https://typeform.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </a>
              <Link to="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Conditions d'utilisation
              </Link>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-semibold">Suivez-nous</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              Rejoignez notre communauté d'artistes et de passionnés d'art urbain.
            </p>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} FRESKO. Tous droits réservés.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Politique de confidentialité
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Mentions légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
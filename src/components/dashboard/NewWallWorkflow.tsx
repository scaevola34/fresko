import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Camera, 
  Euro, 
  Calendar, 
  MapPin, 
  ArrowRight,
  ArrowLeft,
  Check
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Step = "details" | "photos" | "budget" | "review";

interface WallData {
  title: string;
  description: string;
  location: string;
  postalCode: string;
  surfaceType: string;
  ownerType: string;
  indoor: boolean;
  height: string;
  width: string;
  budgetMin: string;
  budgetMax: string;
  desiredTiming: string;
  deadline: string;
  photos: File[];
}

export const NewWallWorkflow = ({ onClose }: { onClose: () => void }) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<Step>("details");
  const [isLoading, setIsLoading] = useState(false);
  
  const [wallData, setWallData] = useState<WallData>({
    title: "",
    description: "",
    location: "",
    postalCode: "",
    surfaceType: "béton",
    ownerType: "individuel",
    indoor: false,
    height: "",
    width: "",
    budgetMin: "",
    budgetMax: "",
    desiredTiming: "1-3_mois",
    deadline: "",
    photos: []
  });

  const steps: { key: Step; title: string; description: string }[] = [
    { key: "details", title: "Détails du mur", description: "Informations de base" },
    { key: "photos", title: "Photos", description: "Ajoutez des images" },
    { key: "budget", title: "Budget & Planning", description: "Définissez votre budget" },
    { key: "review", title: "Récapitulatif", description: "Vérifiez et publiez" }
  ];

  const handleInputChange = (field: keyof WallData, value: any) => {
    setWallData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setWallData(prev => ({ ...prev, photos: [...prev.photos, ...files] }));
  };

  const removePhoto = (index: number) => {
    setWallData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      // Here you would submit to Supabase
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      toast({
        title: "Mur publié avec succès",
        description: "Votre mur est maintenant visible par les artistes."
      });
      
      onClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la publication."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    const stepIndex = steps.findIndex(s => s.key === currentStep);
    if (stepIndex < steps.length - 1) {
      setCurrentStep(steps[stepIndex + 1].key);
    }
  };

  const prevStep = () => {
    const stepIndex = steps.findIndex(s => s.key === currentStep);
    if (stepIndex > 0) {
      setCurrentStep(steps[stepIndex - 1].key);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "details":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre du projet *</Label>
                <Input
                  id="title"
                  value={wallData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Ex: Façade de mon restaurant"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={wallData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Décrivez votre projet, vos attentes..."
                  rows={4}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Localisation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Adresse *</Label>
                  <Input
                    id="location"
                    value={wallData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="123 Rue de la Paix"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Code postal *</Label>
                  <Input
                    id="postalCode"
                    value={wallData.postalCode}
                    onChange={(e) => handleInputChange("postalCode", e.target.value)}
                    placeholder="75001"
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Caractéristiques du mur</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type de surface</Label>
                  <Select value={wallData.surfaceType} onValueChange={(value) => handleInputChange("surfaceType", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="béton">Béton</SelectItem>
                      <SelectItem value="brique">Brique</SelectItem>
                      <SelectItem value="métal">Métal</SelectItem>
                      <SelectItem value="bois">Bois</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Type de propriétaire</Label>
                  <Select value={wallData.ownerType} onValueChange={(value) => handleInputChange("ownerType", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individuel">Individuel</SelectItem>
                      <SelectItem value="entreprise">Entreprise</SelectItem>
                      <SelectItem value="association">Association</SelectItem>
                      <SelectItem value="collectivité">Collectivité</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="indoor"
                    checked={wallData.indoor}
                    onCheckedChange={(checked) => handleInputChange("indoor", checked)}
                  />
                  <Label htmlFor="indoor">Mur intérieur</Label>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="height">Hauteur (m) *</Label>
                  <Input
                    id="height"
                    value={wallData.height}
                    onChange={(e) => handleInputChange("height", e.target.value)}
                    placeholder="3.5"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="width">Largeur (m) *</Label>
                  <Input
                    id="width"
                    value={wallData.width}
                    onChange={(e) => handleInputChange("width", e.target.value)}
                    placeholder="5.0"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case "photos":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Ajoutez des photos de votre mur</h3>
              <p className="text-muted-foreground">
                Les photos aident les artistes à mieux comprendre votre projet
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {wallData.photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removePhoto(index)}
                  >
                    ✕
                  </Button>
                </div>
              ))}
              
              <label className="w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                <Camera className="h-6 w-6 text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">Ajouter une photo</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </label>
            </div>
          </div>
        );

      case "budget":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Budget</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budgetMin">Budget minimum (€) *</Label>
                  <Input
                    id="budgetMin"
                    value={wallData.budgetMin}
                    onChange={(e) => handleInputChange("budgetMin", e.target.value)}
                    placeholder="800"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budgetMax">Budget maximum (€) *</Label>
                  <Input
                    id="budgetMax"
                    value={wallData.budgetMax}
                    onChange={(e) => handleInputChange("budgetMax", e.target.value)}
                    placeholder="1500"
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Planning</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Timing souhaité</Label>
                  <Select value={wallData.desiredTiming} onValueChange={(value) => handleInputChange("desiredTiming", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgent">Urgent (moins d'1 mois)</SelectItem>
                      <SelectItem value="1-3_mois">1-3 mois</SelectItem>
                      <SelectItem value="3-6_mois">3-6 mois</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Date limite (optionnel)</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={wallData.deadline}
                    onChange={(e) => handleInputChange("deadline", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case "review":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Check className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Récapitulatif de votre projet</h3>
              <p className="text-muted-foreground">
                Vérifiez les informations avant de publier votre mur
              </p>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    {wallData.title || "Titre non défini"}
                  </CardTitle>
                  <CardDescription>{wallData.description || "Aucune description"}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {wallData.location}, {wallData.postalCode}
                    </div>
                    <Badge variant="secondary">
                      {wallData.height}m × {wallData.width}m
                    </Badge>
                    <Badge variant="outline">
                      {wallData.surfaceType}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Euro className="h-4 w-4" />
                      {wallData.budgetMin}€ - {wallData.budgetMax}€
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {wallData.desiredTiming.replace("_", "-")}
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    {wallData.photos.length} photo(s) ajoutée(s)
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-graffiti">Nouveau Mur</h1>
            <p className="text-muted-foreground">
              Ajoutez votre mur pour trouver l'artiste idéal
            </p>
          </div>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center space-x-4">
          {steps.map((step, index) => (
            <div key={step.key} className="flex items-center">
              <div className={`flex items-center space-x-2 ${
                currentStep === step.key ? "text-primary" : 
                steps.findIndex(s => s.key === currentStep) > index ? "text-primary" : "text-muted-foreground"
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep === step.key ? "bg-primary text-white" :
                  steps.findIndex(s => s.key === currentStep) > index ? "bg-primary text-white" : "bg-muted"
                }`}>
                  {index + 1}
                </div>
                <div className="hidden md:block">
                  <div className="font-medium">{step.title}</div>
                  <div className="text-xs text-muted-foreground">{step.description}</div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="h-4 w-4 mx-4 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <Card className="elevated">
          <CardContent className="p-6">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === "details"}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Précédent
          </Button>
          
          {currentStep === "review" ? (
            <Button 
              variant="hero" 
              onClick={handleSubmit}
              disabled={isLoading}
              className="animate-glow-pulse"
            >
              {isLoading ? "Publication..." : "Publier le Mur"}
            </Button>
          ) : (
            <Button 
              variant="hero" 
              onClick={nextStep}
            >
              Suivant
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
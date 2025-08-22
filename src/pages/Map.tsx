import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin,
  Search,
  Filter,
  Navigation,
  Building2,
  Users,
  Layers,
  Zap
} from "lucide-react";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [mapFilter, setMapFilter] = useState("all");
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  // Mock data for map markers
  const locations = [
    {
      id: "1",
      type: "artist",
      name: "Julie Dubois",
      specialty: "Art Urbain",
      location: "Toulouse",
      lat: 43.6047,
      lng: 1.4442,
      rating: 4.8,
      projects: 25
    },
    {
      id: "2",
      type: "wall", 
      title: "Façade Restaurant Le Graffiti",
      location: "75011 Paris",
      lat: 48.8566,
      lng: 2.3522,
      budget: "1200-1800€",
      size: "5x3m"
    },
    {
      id: "3",
      type: "artist",
      name: "Zéphyr",
      specialty: "Graffiti", 
      location: "Paris",
      lat: 48.8534,
      lng: 2.3488,
      rating: 4.9,
      projects: 18
    },
    {
      id: "4",
      type: "wall",
      title: "Mur d'Accueil - Café Central", 
      location: "69001 Lyon",
      lat: 45.7640,
      lng: 4.8357,
      budget: "600-900€", 
      size: "3x2m"
    }
  ];

  const filterOptions = [
    { value: "all", label: "Tout afficher" },
    { value: "artists", label: "Artistes" },
    { value: "walls", label: "Murs disponibles" },
    { value: "projects", label: "Projets en cours" }
  ];

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2NhZXZvbGEzNCIsImEiOiJjbWVtczJ0ZHgwOG94MmpzYWU2ejRmOTQ2In0._NSEAoVXkFiG_9m8hMhH3A';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [2.3522, 48.8566], // Center on Paris
      zoom: 6
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Add markers for each location
    locations.forEach((location) => {
      if (!map.current) return;
      
      // Create custom marker element
      const markerElement = document.createElement('div');
      markerElement.className = 'custom-marker';
      markerElement.style.width = '32px';
      markerElement.style.height = '32px';
      markerElement.style.borderRadius = '50%';
      markerElement.style.border = '2px solid white';
      markerElement.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
      markerElement.style.cursor = 'pointer';
      markerElement.style.display = 'flex';
      markerElement.style.alignItems = 'center';
      markerElement.style.justifyContent = 'center';
      
      if (location.type === 'artist') {
        markerElement.style.background = 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary)))';
        markerElement.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="m22 2-1 1"></path><path d="m16 8 2-2"></path></svg>';
      } else {
        markerElement.style.background = 'linear-gradient(135deg, hsl(var(--secondary)), hsl(var(--secondary)))';
        markerElement.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>';
      }

      // Create popup content
      const popupContent = location.type === 'artist' 
        ? `<div class="p-2">
             <h3 class="font-bold text-sm">${location.name}</h3>
             <p class="text-xs text-gray-600">${location.specialty}</p>
             <p class="text-xs text-gray-500">${location.location}</p>
             <p class="text-xs">⭐ ${location.rating} • ${location.projects} projets</p>
           </div>`
        : `<div class="p-2">
             <h3 class="font-bold text-sm">${location.title}</h3>
             <p class="text-xs text-gray-600">${location.budget}</p>
             <p class="text-xs text-gray-500">${location.location}</p>
             <p class="text-xs">Taille: ${location.size}</p>
           </div>`;

      // Create marker and popup
      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat([location.lng, location.lat])
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent))
        .addTo(map.current);
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, []);

  const handleMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.current?.flyTo({
            center: [longitude, latitude],
            zoom: 12
          });
          
          // Add user location marker
          new mapboxgl.Marker({ color: '#ff6b6b' })
            .setLngLat([longitude, latitude])
            .setPopup(new mapboxgl.Popup().setHTML('<div class="p-2"><h3 class="font-bold text-sm">Votre position</h3></div>'))
            .addTo(map.current!);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-graffiti mb-4">
            Carte Interactive
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez la communauté FRESKO près de chez vous : artistes, murs disponibles et projets en cours
          </p>
        </div>

        {/* Map Controls */}
        <Card className="elevated mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Rechercher une ville..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={mapFilter} onValueChange={setMapFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrer la carte" />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline_glow" className="w-full" onClick={handleMyLocation}>
                <Navigation className="mr-2 h-4 w-4" />
                Ma position
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Interactive Map */}
          <div className="lg:col-span-3">
            <Card className="elevated h-[600px]">
              <CardContent className="p-0 h-full">
                <div ref={mapContainer} className="w-full h-full rounded-lg" />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar with locations */}
          <div className="space-y-6">
            {/* Legend */}
            <Card className="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5" />
                  Légende
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-gradient-primary rounded-full"></div>
                    <span className="text-sm">Artistes disponibles</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">28</Badge>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-gradient-secondary rounded-full"></div>
                    <span className="text-sm">Murs à décorer</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">12</Badge>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-gradient-accent rounded-full"></div>
                    <span className="text-sm">Projets en cours</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">8</Badge>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-muted rounded-full"></div>
                    <span className="text-sm">Œuvres terminées</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">108</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Nearby Items */}
            <Card className="elevated">
              <CardHeader>
                <CardTitle>Près de vous</CardTitle>
                <CardDescription>
                  Découvrez ce qui se passe dans votre région
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {locations.slice(0, 4).map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className={`w-3 h-3 rounded-full ${
                      item.type === "artist" ? "bg-gradient-primary" : "bg-gradient-secondary"
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {item.type === "artist" ? item.name : item.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {item.location}
                      </p>
                      {item.type === "artist" && (
                        <p className="text-xs text-muted-foreground">
                          {item.specialty}
                        </p>
                      )}
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={item.type === "artist" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"}
                    >
                      {item.type === "artist" ? "Artiste" : "Mur"}
                    </Badge>
                  </div>
                ))}

                <Button variant="outline_glow" className="w-full mt-4">
                  Voir tous les résultats
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="elevated">
              <CardContent className="p-6">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-primary">156</div>
                  <div className="text-sm text-muted-foreground">Éléments sur la carte</div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4 text-center">
                  <div>
                    <div className="text-lg font-semibold text-secondary">28</div>
                    <div className="text-xs text-muted-foreground">Artistes</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-accent">12</div>
                    <div className="text-xs text-muted-foreground">Murs libres</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Map;
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { Marker, icon } from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Category type for map points
export type MapCategory = 'startup' | 'empresa' | 'universidade' | 'governo' | 'evento';

// Interface for map point data
interface MapPoint {
  id: number;
  name: string;
  category: MapCategory;
  area?: string;
  lat: number;
  lng: number;
  description?: string;
  website?: string;
  address?: string;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.html',
  styleUrls: ['./map.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class MapComponent implements OnInit, OnDestroy {
  private map: L.Map | undefined;
  private markers: L.LayerGroup | undefined;
  private filteredPoints: MapPoint[] = [];
  private allPoints: MapPoint[] = [];
  
  // Default coordinates for Joinville
  private readonly defaultLat = -26.3044;
  private readonly defaultLng = -48.8487;
  private readonly defaultZoom = 13;

  // Category icons with colored circles instead of external SVGs
  private readonly icons = {
    startup: L.divIcon({
      html: `
        <div style="
          width: 32px;
          height: 32px;
          background-color: #e74c3c;
          border-radius: 50%;
          border: 3px solid white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          ">
          🚀
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      className: 'custom-icon'
    } as any),
    empresa: L.divIcon({
      html: `
        <div style="
          width: 32px;
          height: 32px;
          background-color: #3498db;
          border-radius: 50%;
          border: 3px solid white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          ">
          🏢
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      className: 'custom-icon'
    } as any),
    universidade: L.divIcon({
      html: `
        <div style="
          width: 32px;
          height: 32px;
          background-color: #9b59b6;
          border-radius: 50%;
          border: 3px solid white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          ">
          🎓
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      className: 'custom-icon'
    } as any),
    governo: L.divIcon({
      html: `
        <div style="
          width: 32px;
          height: 32px;
          background-color: #f39c12;
          border-radius: 50%;
          border: 3px solid white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          ">
          🏛️
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      className: 'custom-icon'
    } as any),
    evento: L.divIcon({
      html: `
        <div style="
          width: 32px;
          height: 32px;
          background-color: #2ecc71;
          border-radius: 50%;
          border: 3px solid white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          ">
          📅
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      className: 'custom-icon'
    } as any)
  };

  // Modal state
  showModal = false;
  newPoint: Partial<MapPoint> = {};
  isSubmitting = false;
  showPopup: boolean = false;
  popupMessage: string = '';
  popupType: 'success' | 'error' = 'success';

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.initMap();
    this.loadMapPoints();
    this.setupEventListeners();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  private initMap(): void {
    // Initialize the map
    this.map = L.map('map').setView([this.defaultLat, this.defaultLng], this.defaultZoom);
    
    // Add tile layer (using OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map!);

    // Initialize markers layer group
    this.markers = L.layerGroup().addTo(this.map);
  }

  private loadMapPoints(): void {
    // Load points from backend API
    this.http.get<any[]>('/map').subscribe({
      next: (points) => {
        // Map backend fields to frontend MapPoint structure
        this.allPoints = points.map(p => ({
          id: p.id,
          name: p.title,
          category: p.type as MapCategory,
          lat: p.latitude,
          lng: p.longitude,
          description: p.description || '',
          address: p.address || p.description || ''
        }));
        this.filteredPoints = [...this.allPoints];
        this.updateMarkers();
        console.log('Points loaded from backend:', this.allPoints);
      },
      error: (error) => {
        console.error('Error loading map points from backend:', error);
        // Fallback to default points if API fails
        this.allPoints = this.getDefaultPoints();
        this.filteredPoints = [...this.allPoints];
        this.updateMarkers();
      }
    });
  }

  private getDefaultPoints(): MapPoint[] {
    return [
      {
        id: 1,
        name: 'Prefeitura de Joinville',
        category: 'governo',
        area: 'servicos',
        lat: -26.3044,
        lng: -48.8487,
        description: 'Prefeitura Municipal de Joinville',
        website: 'https://www.joinville.sc.gov.br'
      },
      {
        id: 2,
        name: 'Universidade Federal de Santa Catarina - Campus Joinville',
        category: 'universidade',
        area: 'educacao',
        lat: -26.2975,
        lng: -48.8433,
        description: 'Campus Joinville da UFSC',
        website: 'https://joinville.ufsc.br'
      },
      {
        id: 3,
        name: 'Inovaparq - Parque Tecnológico',
        category: 'empresa',
        area: 'tecnologia',
        lat: -26.2912,
        lng: -48.8501,
        description: 'Parque Tecnológico de Joinville',
        website: 'https://www.inovaparq.com.br'
      },
      {
        id: 4,
        name: 'Startup TechJoin',
        category: 'startup',
        area: 'tecnologia',
        lat: -26.3001,
        lng: -48.8403,
        description: 'Startup de soluções tecnológicas para a região',
        website: 'https://techjoin.example.com'
      },
      {
        id: 5,
        name: 'Feira de Inovação 2023',
        category: 'evento',
        area: 'tecnologia',
        lat: -26.3087,
        lng: -48.8456,
        description: 'Maior evento de inovação da região',
        website: 'https://feirainovacao.example.com'
      }
    ];
  }

  private updateMarkers(): void {
    // Clear existing markers
    if (this.markers) {
      this.markers.clearLayers();
    }

    this.filteredPoints.forEach(point => {
      const marker = L.marker([point.lat, point.lng], {
        icon: this.icons[point.category] || this.icons.startup
      });
      
      // Create popup content
      let popupContent = `<b>${point.name}</b><br>`;
      popupContent += `<small>${this.getCategoryName(point.category)}</small><br>`;
      if (point.description) {
        popupContent += `<p>${point.description}</p>`;
      }
      if (point.website) {
        popupContent += `<a href="${point.website}" target="_blank">Visitar website</a>`;
      }
      
      marker.bindPopup(popupContent);
      if (this.markers) {
        this.markers.addLayer(marker);
      }
    });
  }

  private getCategoryName(category: MapCategory): string {
    const names: Record<MapCategory, string> = {
      startup: 'Startup',
      empresa: 'Empresa',
      universidade: 'Universidade',
      governo: 'Órgão Governamental',
      evento: 'Evento'
    };
    return names[category];
  }

  private setupEventListeners(): void {
    // Filter checkboxes
    document.querySelectorAll('.filter-option input').forEach(checkbox => {
      checkbox.addEventListener('change', () => this.applyFiltersMethod());
    });

    // Clear filters button
    document.querySelector('.clear-filters')?.addEventListener('click', () => {
      document.querySelectorAll('.filter-option input').forEach((checkbox) => {
        (checkbox as HTMLInputElement).checked = true;
      });
      this.applyFiltersMethod();
    });
  }

  private applyFiltersMethod(): void {
    const selectedCategories = Array.from(
      document.querySelectorAll('.filter-option input[data-category]:checked')
    ).map(el => (el as HTMLInputElement).dataset['category']);

    const selectedAreas = Array.from(
      document.querySelectorAll('.filter-option input[data-area]:checked')
    ).map(el => (el as HTMLInputElement).dataset['area']);

    this.filteredPoints = this.allPoints.filter(point => {
      const categoryMatch =
        selectedCategories.length === 0 || selectedCategories.includes(point.category);
      const areaMatch =
        !point.area || selectedAreas.length === 0 || selectedAreas.includes(point.area);
      return categoryMatch && areaMatch;
    });

    this.updateMarkers();
  }

  private showAddPointModal(): void {
    this.showModal = true;
    this.newPoint = {}; // Reset form
  }

  private hideAddPointModal(): void {
    this.showModal = false;
  }

  // Public methods to be called from template
  openAddPointModal(): void {
    if (this.authService.isLoggedIn()) {
      this.showAddPointModal();
    } else {
      // Redirect to login with return URL
      this.authService.redirectToLogin('/mapa');
    }
  }

  hideAddPointModalPublic(): void {
    this.hideAddPointModal();
  }

  searchAddress(): void {
    const address = (document.getElementById('pointAddress') as HTMLInputElement).value;
    if (!address) {
      this.popupType = 'error';
      this.popupMessage = 'Por favor, digite um endereço para buscar.';
      this.showPopup = true;
      setTimeout(() => { this.showPopup = false; }, 2500);
      return;
    }

    this.popupType = 'success';
    this.popupMessage = 'Buscando endereço...';
    this.showPopup = true;

    // Geocoding via backend (evita CORS e headers bloqueados pelo browser)
    const queryAddress = `${address}, Joinville, Santa Catarina, Brazil`;
    this.http.get<any[]>(`/map/geocode?q=${encodeURIComponent(queryAddress)}`).subscribe({
      next: (results) => {
        if (results && results.length > 0) {
          const result = results[0];
          const lat = parseFloat(result.lat);
          const lng = parseFloat(result.lon);
          
          this.newPoint.lat = lat;
          this.newPoint.lng = lng;
          
          // Center map on the found location
          if (this.map) {
            this.map.setView([lat, lng], 16);
          }
          
          // Show a temporary marker
          if (this.tempMarker) {
            if (this.map) {
              this.map.removeLayer(this.tempMarker);
            }
          }
          this.tempMarker = L.marker([lat, lng], {
            icon: L.divIcon({
              html: `
                <div style="
                  width: 32px;
                  height: 32px;
                  background-color: #f39c12;
                  border-radius: 50%;
                  border: 3px solid white;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                  ">
                  📍
                </div>
              `,
              iconSize: [32, 32],
              iconAnchor: [16, 32],
              className: 'custom-icon'
            } as any),
            zIndexOffset: 1000
          }).addTo(this.map!);

          this.popupType = 'success';
          this.popupMessage = `Endereço encontrado: ${result.address}`;
          this.showPopup = true;
          setTimeout(() => { this.showPopup = false; }, 3000);
        } else {
          this.popupType = 'error';
          this.popupMessage = 'Endereço não encontrado. Tente um endereço mais específico.';
          this.showPopup = true;
          setTimeout(() => { this.showPopup = false; }, 2500);
        }
      },
      error: (err) => {
        console.error('Geocoding error:', err);
        this.popupType = 'error';
        this.popupMessage = 'Erro ao buscar endereço. Tente novamente.';
        this.showPopup = true;
        setTimeout(() => { this.showPopup = false; }, 2500);
      }
    });
  }

  private tempMarker: L.Marker | null = null;

  submitNewPoint(): void {
    // Validate form data
    if (!this.newPoint.name || !this.newPoint.category || !this.newPoint.address) {
      this.popupType = 'error';
      this.popupMessage = 'Por favor, preencha todos os campos obrigatórios.';
      this.showPopup = true;
      setTimeout(() => { this.showPopup = false; }, 2500);
      return;
    }

    this.isSubmitting = true;
    
    // Map frontend fields to backend MapPointModel structure
    const pointToSubmit: any = {
      title: this.newPoint.name,
      type: this.newPoint.category,
      latitude: this.newPoint.lat || this.defaultLat,
      longitude: this.newPoint.lng || this.defaultLng,
      description: this.newPoint.description || this.newPoint.address,
      approved: false
    };

    console.log('Submitting point:', pointToSubmit);

    this.http.post('/map', pointToSubmit).subscribe({
      next: (created: any) => {
        console.log('Point created successfully:', created);
        // Add the created point to our map (with the fields we expect)
        const mapPoint: MapPoint = {
          id: created.id,
          name: created.title,
          category: created.type as MapCategory,
          lat: created.latitude,
          lng: created.longitude,
          description: created.description,
          address: this.newPoint.address
        };
        this.allPoints.push(mapPoint);
        this.filteredPoints.push(mapPoint);
        this.updateMarkers();
        this.isSubmitting = false;
        
        // Close modal immediately
        this.hideAddPointModal();
        this.newPoint = {}; // Reset form
        
        if (this.tempMarker && this.map) {
          this.map.removeLayer(this.tempMarker);
          this.tempMarker = null;
        }
        
        // Show success notification
        this.popupType = 'success';
        this.popupMessage = 'Ponto adicionado com sucesso!';
        this.showPopup = true;
        setTimeout(() => { this.showPopup = false; }, 3000);
      },
      error: (err) => {
        console.error('Error creating point:', err);
        this.isSubmitting = false;
        this.popupType = 'error';
        this.popupMessage = 'Erro ao adicionar ponto: ' + (err.error?.message || 'Tente novamente.');
        this.showPopup = true;
        setTimeout(() => { this.showPopup = false; }, 2500);
      }
    });
  }
}


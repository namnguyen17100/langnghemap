/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Làng Nghề Map - Interactive GIS Map View (Leaflet Engine)
 * Provides accurate OpenStreetMap & Carto GIS cartography of Vietnam with real coordinates
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import L from 'leaflet';
import { Village, Category } from '../../types';
import { VillageService } from '../../services/villageService';

interface InteractiveMapViewProps {
  onSelectVillage: (villageId: string) => void;
  bookmarks: string[];
  onToggleBookmark: (villageId: string) => void;
}

// Tile Layer configurations (Google Maps & GIS layers)
const TILE_LAYERS = {
  googleRoad: {
    name: 'Google Maps Đường phố (Tiếng Việt)',
    url: 'https://mt{s}.google.com/vt/lyrs=m&hl=vi&x={x}&y={y}&z={z}',
    subdomains: ['0', '1', '2', '3'],
    attribution: '&copy; Google Maps',
    maxZoom: 20,
  },
  googleSatellite: {
    name: 'Google Maps Vệ tinh kết hợp (Hybrid)',
    url: 'https://mt{s}.google.com/vt/lyrs=y&hl=vi&x={x}&y={y}&z={z}',
    subdomains: ['0', '1', '2', '3'],
    attribution: '&copy; Google Maps',
    maxZoom: 20,
  },
  googleTerrain: {
    name: 'Google Maps Địa hình',
    url: 'https://mt{s}.google.com/vt/lyrs=p&hl=vi&x={x}&y={y}&z={z}',
    subdomains: ['0', '1', '2', '3'],
    attribution: '&copy; Google Maps',
    maxZoom: 20,
  },
  standard: {
    name: 'Đô thị & Đường sá (Esri)',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    subdomains: ['0', '1', '2', '3'],
    attribution: 'Tiles &copy; Esri',
    maxZoom: 19,
  },
};

// Craft category icons mapping
const CATEGORY_ICONS: Record<string, string> = {
  'gom-su': 'soup_kitchen',
  'det-may': 'styler',
  'dan-lat': 'nest_cam_floodlight',
  'tranh-giay': 'palette',
  'dieu-khac': 'carpenter',
  'ren-duc': 'hardware',
};

export const InteractiveMapView: React.FC<InteractiveMapViewProps> = ({
  onSelectVillage,
  bookmarks,
  onToggleBookmark,
}) => {
  const [villages] = useState<Village[]>(VillageService.getAllVillages());
  const [categories] = useState<Category[]>(VillageService.getCategories());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedVillageId, setSelectedVillageId] = useState<string>('bat-trang');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [activeCenturies, setActiveCenturies] = useState<number>(21);
  const [mapLayer, setMapLayer] = useState<'googleRoad' | 'googleSatellite' | 'googleTerrain' | 'standard'>('googleRoad');
  const [showRadiusRings, setShowRadiusRings] = useState<boolean>(true);
  const [showCulturalRoute, setShowCulturalRoute] = useState<boolean>(true);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);
  const routeLayerRef = useRef<L.Polyline | null>(null);
  const radiusCircleRef = useRef<L.Circle | null>(null);

  // Filter logic
  const filteredVillages = useMemo(() => {
    return villages.filter((v) => {
      const matchCat = selectedCategory === 'all' || v.categoryId === selectedCategory;
      const matchRegion = selectedRegion === 'all' || v.region === selectedRegion;
      const craftTypeStr = v.craftType || v.sectorTag || v.categoryName || '';
      const matchQuery =
        !searchQuery ||
        v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.province.toLowerCase().includes(searchQuery.toLowerCase()) ||
        craftTypeStr.toLowerCase().includes(searchQuery.toLowerCase());
      
      const century = v.establishedCentury || 15;
      const matchCentury = century <= activeCenturies;

      return matchCat && matchRegion && matchQuery && matchCentury;
    });
  }, [villages, selectedCategory, selectedRegion, searchQuery, activeCenturies]);

  const selectedVillage = useMemo(() => {
    return villages.find((v) => v.id === selectedVillageId) || villages[0];
  }, [villages, selectedVillageId]);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center map on Central Vietnam
    const map = L.map(mapContainerRef.current, {
      center: [16.0544, 107.5],
      zoom: 6,
      minZoom: 5,
      maxZoom: 18,
      zoomControl: false, // We render our custom styled zoom controls
    });

    // Add initial tile layer
    const config = TILE_LAYERS[mapLayer];
    const tileLayer = L.tileLayer(config.url, {
      attribution: config.attribution,
      subdomains: config.subdomains,
      maxZoom: config.maxZoom,
    }).addTo(map);

    tileLayerRef.current = tileLayer;

    // Create markers layer group
    const markersGroup = L.layerGroup().addTo(map);
    markersGroupRef.current = markersGroup;

    mapInstanceRef.current = map;

    // Use ResizeObserver so Leaflet handles flex containers and window sizes instantly
    const resizeObserver = new ResizeObserver(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    });

    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }

    // Additional immediate and staggered size checks
    requestAnimationFrame(() => map.invalidateSize());
    const timer1 = setTimeout(() => map.invalidateSize(), 150);
    const timer2 = setTimeout(() => map.invalidateSize(), 400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle Tile Layer Switch
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const config = TILE_LAYERS[mapLayer];
    const newTileLayer = L.tileLayer(config.url, {
      attribution: config.attribution,
      subdomains: config.subdomains,
      maxZoom: config.maxZoom,
    }).addTo(map);

    tileLayerRef.current = newTileLayer;
    map.invalidateSize();
  }, [mapLayer]);

  // Update Markers, Route, and Radius on data / filter change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersGroupRef.current;
    if (!map || !markersGroup) return;

    // Clear previous markers
    markersGroup.clearLayers();

    // Remove previous route and radius
    if (routeLayerRef.current) {
      map.removeLayer(routeLayerRef.current);
      routeLayerRef.current = null;
    }
    if (radiusCircleRef.current) {
      map.removeLayer(radiusCircleRef.current);
      radiusCircleRef.current = null;
    }

    // Add markers for filtered villages
    filteredVillages.forEach((village) => {
      const lat = village.coordinates?.lat || village.coords?.lat || 21.0;
      const lng = village.coordinates?.lng || village.coords?.lng || 105.8;
      const isSelected = village.id === selectedVillageId;
      const isBookmarked = bookmarks.includes(village.id);
      const iconName = CATEGORY_ICONS[village.categoryId] || 'local_activity';

      // Custom HTML Marker Pin
      const iconHtml = `
        <div class="custom-craft-marker ${isSelected ? 'selected' : ''}" style="cursor: pointer;">
          <div class="relative flex flex-col items-center group">
            ${isSelected ? '<div class="absolute -top-1 w-10 h-10 rounded-full bg-[#7a3e26]/30 animate-ping"></div>' : ''}
            <div class="marker-pin w-8 h-8 md:w-9 md:h-9 rounded-full ${
              isSelected ? 'bg-[#5e2812] text-white ring-4 ring-[#ffdbce]' : 'bg-white text-[#5e2812] ring-2 ring-[#7a3e26]'
            } shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110">
              <span class="material-symbols-outlined text-[17px] md:text-[19px]">${iconName}</span>
              ${
                isBookmarked
                  ? '<span class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-500 rounded-full border-2 border-white"></span>'
                  : ''
              }
            </div>
            <div class="marker-label mt-1 px-2 py-0.5 rounded-md text-[10px] md:text-[11px] font-bold whitespace-nowrap shadow-md border ${
              isSelected
                ? 'bg-[#5e2812] text-white border-[#5e2812]'
                : 'bg-white/95 text-[#370d00] border-[#e2d5c8] group-hover:bg-[#5e2812] group-hover:text-white'
            }">
              ${village.name}
            </div>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'craft-marker-container',
        iconSize: [40, 56],
        iconAnchor: [20, 36],
        popupAnchor: [0, -36],
      });

      const marker = L.marker([lat, lng], { icon: customIcon });

      // Click on marker
      marker.on('click', () => {
        setSelectedVillageId(village.id);
        map.flyTo([lat, lng], Math.max(map.getZoom(), 9), {
          duration: 1,
        });
      });

      // Interactive popup
      const popupContent = `
        <div style="width: 230px; font-family: 'Be Vietnam Pro', sans-serif;">
          <img src="${village.coverImage || village.imageUrl || ''}" style="width: 100%; height: 110px; object-fit: cover; border-top-left-radius: 14px; border-top-right-radius: 14px;" />
          <div style="padding: 10px 12px;">
            <div style="font-size: 10px; font-weight: bold; color: #7a3e26; text-transform: uppercase;">
              ${village.craftType || village.sectorTag || 'Làng nghề di sản'}
            </div>
            <div style="font-size: 14px; font-weight: bold; color: #1c1c19; margin-top: 2px;">
              ${village.name}
            </div>
            <div style="font-size: 11px; color: #666; margin-top: 2px;">
              📍 ${village.district}, ${village.province}
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 8px; padding-top: 8px; border-top: 1px solid #f0e6dc;">
              <span style="font-size: 11px; font-weight: bold; color: #d97706;">★ ${village.rating || 4.9}</span>
              <span style="font-size: 11px; color: #5e2812; font-weight: 600;">TK ${village.establishedCentury || 14}</span>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        closeButton: true,
        autoClose: true,
      });

      markersGroup.addLayer(marker);
    });

    // Cultural Route Polyline connecting villages north to south
    if (showCulturalRoute && filteredVillages.length > 1) {
      // Sort roughly North to South by lat descending
      const routePoints = [...filteredVillages]
        .sort((a, b) => {
          const latA = a.coordinates?.lat || a.coords?.lat || 0;
          const latB = b.coordinates?.lat || b.coords?.lat || 0;
          return latB - latA;
        })
        .map((v) => [
          v.coordinates?.lat || v.coords?.lat || 21.0,
          v.coordinates?.lng || v.coords?.lng || 105.8,
        ] as [number, number]);

      if (routePoints.length >= 2) {
        const polyline = L.polyline(routePoints, {
          color: '#7a3e26',
          weight: 3.5,
          dashArray: '6, 8',
          opacity: 0.75,
          smoothFactor: 1,
        }).addTo(map);

        routeLayerRef.current = polyline;
      }
    }

    // Radius Circle around selected village
    if (showRadiusRings && selectedVillage) {
      const lat = selectedVillage.coordinates?.lat || selectedVillage.coords?.lat || 21.0;
      const lng = selectedVillage.coordinates?.lng || selectedVillage.coords?.lng || 105.8;

      const circle = L.circle([lat, lng], {
        radius: 18000, // 18 km heritage cultural sphere
        color: '#7a3e26',
        weight: 1.5,
        fillColor: '#a34720',
        fillOpacity: 0.08,
        dashArray: '4, 4',
      }).addTo(map);

      radiusCircleRef.current = circle;
    }
  }, [filteredVillages, selectedVillageId, selectedVillage, showCulturalRoute, showRadiusRings, bookmarks]);

  // Pan to selected village when selectedVillageId changes
  const handleSelectVillageOnMap = (id: string) => {
    setSelectedVillageId(id);
    const target = villages.find((v) => v.id === id);
    if (target && mapInstanceRef.current) {
      const lat = target.coordinates?.lat || target.coords?.lat || 21.0;
      const lng = target.coordinates?.lng || target.coords?.lng || 105.8;
      mapInstanceRef.current.flyTo([lat, lng], 10, { duration: 1.2 });
    }
  };

  // Region Jump handlers
  const handleRegionClick = (reg: string) => {
    setSelectedRegion(reg);
    const map = mapInstanceRef.current;
    if (!map) return;

    if (reg === 'all') {
      map.flyTo([16.0544, 107.5], 6, { duration: 1.2 });
    } else if (reg === 'bac') {
      map.flyTo([21.0285, 105.8542], 8.5, { duration: 1.2 });
    } else if (reg === 'trung') {
      map.flyTo([16.0544, 108.2022], 8, { duration: 1.2 });
    } else if (reg === 'nam') {
      map.flyTo([10.7769, 106.7009], 8, { duration: 1.2 });
    }
  };

  const resetView = () => {
    const map = mapInstanceRef.current;
    if (map) {
      map.flyTo([16.0544, 107.5], 6, { duration: 1 });
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full min-h-0 bg-[#f9f5f0] overflow-hidden">
      {/* Top Filter and Search Bar */}
      <div className="bg-white/95 backdrop-blur-md border-b border-[#e2d5c8] px-4 lg:px-6 py-2.5 shadow-xs shrink-0 z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-lg">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm làng nghề, tỉnh thành, nghệ thuật..."
              className="w-full pl-9 pr-8 py-2 text-xs md:text-sm bg-[#faf6f2] border border-[#e2d5c8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7a3e26]/30 text-stone-800 placeholder:text-stone-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>

          {/* Region Tabs (With smooth geographic flyTo) */}
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto p-1 bg-[#f4ebe1] rounded-xl border border-[#e8dcd0]">
            {[
              { id: 'all', label: 'Toàn quốc' },
              { id: 'bac', label: 'Miền Bắc' },
              { id: 'trung', label: 'Miền Trung' },
              { id: 'nam', label: 'Miền Nam' },
            ].map((reg) => (
              <button
                key={reg.id}
                onClick={() => handleRegionClick(reg.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all shrink-0 ${
                  selectedRegion === reg.id
                    ? 'bg-[#5e2812] text-white shadow-xs'
                    : 'text-stone-700 hover:text-[#5e2812] hover:bg-white/50'
                }`}
              >
                {reg.label}
              </button>
            ))}
          </div>

          {/* Layer and View Mode Toggle */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#f4ebe1] rounded-xl p-1 border border-[#e8dcd0]">
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
                  viewMode === 'map'
                    ? 'bg-white text-[#5e2812] shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span className="material-symbols-outlined text-base">map</span>
                Bản đồ GIS
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
                  viewMode === 'list'
                    ? 'bg-white text-[#5e2812] shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span className="material-symbols-outlined text-base">grid_view</span>
                Danh sách ({filteredVillages.length})
              </button>
            </div>

            {/* Quick cultural route toggle */}
            <button
              onClick={() => setShowCulturalRoute(!showCulturalRoute)}
              title="Bật/Tắt Tuyến Di sản"
              className={`p-1.5 rounded-lg border flex items-center gap-1 transition-colors ${
                showCulturalRoute
                  ? 'bg-[#ffe8dc] text-[#5e2812] border-[#ffb59a]'
                  : 'bg-white border-[#e2d5c8] text-stone-500'
              }`}
            >
              <span className="material-symbols-outlined text-base">route</span>
              <span className="hidden xl:inline text-[11px] font-medium">Tuyến di sản</span>
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto pt-2.5 scrollbar-thin">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 text-xs rounded-full border transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              selectedCategory === 'all'
                ? 'bg-[#7a3e26] text-white border-[#7a3e26]'
                : 'bg-white text-stone-600 border-[#e2d5c8] hover:border-stone-400'
            }`}
          >
            <span className="material-symbols-outlined text-sm">dashboard</span>
            Tất cả ngành nghề ({villages.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 text-xs rounded-full border transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-[#7a3e26] text-white border-[#7a3e26]'
                  : 'bg-white text-stone-600 border-[#e2d5c8] hover:border-stone-400'
              }`}
            >
              <span className="material-symbols-outlined text-sm">
                {CATEGORY_ICONS[cat.id] || cat.icon || 'local_activity'}
              </span>
              {cat.name} ({cat.villageCount || cat.count || 0})
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {viewMode === 'map' ? (
          <>
            {/* Real GIS Leaflet Map Container */}
            <div className="flex-1 relative h-full w-full bg-[#f1ebe3] overflow-hidden">
              <div ref={mapContainerRef} className="w-full h-full z-0" />

              {/* Map Floating Floating Tools (Top-Left) */}
              <div className="absolute top-4 left-4 z-[400] flex flex-col gap-2">
                {/* Zoom & Navigation Controls */}
                <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-md border border-[#e2d5c8] p-1 flex flex-col gap-1">
                  <button
                    onClick={() => mapInstanceRef.current?.zoomIn()}
                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-stone-100 text-stone-700 transition-colors"
                    title="Phóng to bản đồ"
                  >
                    <span className="material-symbols-outlined text-lg">add</span>
                  </button>
                  <button
                    onClick={() => mapInstanceRef.current?.zoomOut()}
                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-stone-100 text-stone-700 transition-colors"
                    title="Thu nhỏ bản đồ"
                  >
                    <span className="material-symbols-outlined text-lg">remove</span>
                  </button>
                  <div className="h-px bg-stone-200 my-0.5"></div>
                  <button
                    onClick={resetView}
                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-stone-100 text-stone-700 transition-colors"
                    title="Căn giữa toàn cảnh Việt Nam"
                  >
                    <span className="material-symbols-outlined text-lg">my_location</span>
                  </button>
                </div>

                {/* Base Layer Switcher */}
                <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-md border border-[#e2d5c8] p-2 text-xs">
                  <span className="font-bold text-stone-600 block mb-1.5 text-[10px] uppercase tracking-wider">
                    Lớp Bản Đồ GIS
                  </span>
                  <div className="flex flex-col gap-1">
                    {[
                      { id: 'googleRoad', label: 'Google Maps Đường phố (Tiếng Việt)', icon: 'map' },
                      { id: 'googleSatellite', label: 'Google Maps Vệ tinh (Hybrid)', icon: 'satellite_alt' },
                      { id: 'googleTerrain', label: 'Google Maps Địa hình', icon: 'landscape' },
                      { id: 'standard', label: 'Bản đồ Đô thị Esri', icon: 'public' },
                    ].map((layer) => (
                      <button
                        key={layer.id}
                        onClick={() => setMapLayer(layer.id as any)}
                        className={`px-2 py-1 rounded-md text-left text-[11px] font-medium flex items-center gap-1.5 transition-colors ${
                          mapLayer === layer.id
                            ? 'bg-[#5e2812] text-white'
                            : 'text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[13px]">{layer.icon}</span>
                        {layer.label}
                      </button>
                    ))}
                  </div>

                  <div className="border-t border-stone-200 mt-2 pt-2 flex flex-col gap-1">
                    <label className="flex items-center gap-1.5 cursor-pointer text-stone-700 text-[11px]">
                      <input
                        type="checkbox"
                        checked={showRadiusRings}
                        onChange={(e) => setShowRadiusRings(e.target.checked)}
                        className="rounded text-[#7a3e26] focus:ring-[#7a3e26]"
                      />
                      Vùng ảnh hưởng di sản
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer text-stone-700 text-[11px]">
                      <input
                        type="checkbox"
                        checked={showCulturalRoute}
                        onChange={(e) => setShowCulturalRoute(e.target.checked)}
                        className="rounded text-[#7a3e26] focus:ring-[#7a3e26]"
                      />
                      Tuyến hành trình di sản
                    </label>
                  </div>
                </div>
              </div>

              {/* Historical Timeline Slider (Bottom Overlay) */}
              <div className="absolute bottom-4 left-4 right-4 md:left-6 md:right-auto md:w-96 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-[#e2d5c8] p-3.5 z-[400]">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#5e2812]">
                    <span className="material-symbols-outlined text-base">history_edu</span>
                    Trục niên đại khởi lập làng nghề
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-[#f4ebe1] text-[#7a3e26] rounded-md font-mono">
                    {activeCenturies <= 20 ? `Thế kỷ ≤ ${activeCenturies}` : 'Toàn bộ (TK 10 - 21)'}
                  </span>
                </div>
                <input
                  type="range"
                  min="11"
                  max="21"
                  step="1"
                  value={activeCenturies}
                  onChange={(e) => setActiveCenturies(Number(e.target.value))}
                  className="w-full accent-[#7a3e26] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-500 mt-1 font-medium">
                  <span>TK 11 (Lý - Trần)</span>
                  <span>TK 15 (Lê Sơ)</span>
                  <span>TK 18 (Nguyễn)</span>
                  <span>TK 21 (Hiện đại)</span>
                </div>
              </div>
            </div>

            {/* Selected Village Side Drawer / Panel (Right Side) */}
            {selectedVillage && (
              <div className="w-80 md:w-96 bg-white border-l border-[#e2d5c8] flex flex-col shadow-xl z-10 h-full overflow-hidden">
                {/* Header Image */}
                <div className="relative h-44 overflow-hidden shrink-0">
                  <img
                    src={selectedVillage.coverImage || selectedVillage.imageUrl || ''}
                    alt={selectedVillage.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-full text-[11px] font-semibold text-[#5e2812] flex items-center gap-1 shadow-sm">
                    <span className="material-symbols-outlined text-xs">local_activity</span>
                    {selectedVillage.craftType || selectedVillage.sectorTag || 'Thủ công di sản'}
                  </span>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => onToggleBookmark(selectedVillage.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-stone-700 hover:text-[#5e2812] transition-colors shadow-sm"
                  >
                    <span
                      className={`material-symbols-outlined text-lg ${
                        bookmarks.includes(selectedVillage.id) ? 'text-amber-500 fill-1' : ''
                      }`}
                    >
                      bookmark
                    </span>
                  </button>

                  {/* Title & Province */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-serif text-lg font-bold leading-tight">
                      {selectedVillage.name}
                    </h3>
                    <p className="text-xs text-stone-200 flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-xs">location_on</span>
                      {selectedVillage.district}, {selectedVillage.province}
                    </p>
                  </div>
                </div>

                {/* Body Details */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 p-2.5 bg-[#fbf8f5] rounded-xl border border-[#ede2d6] text-center">
                    <div>
                      <span className="text-[10px] text-stone-500 block uppercase font-medium">Khởi lập</span>
                      <span className="text-xs font-bold text-[#5e2812] font-serif">
                        {selectedVillage.establishedYear || `${selectedVillage.ageYears} năm`}
                      </span>
                    </div>
                    <div className="border-x border-[#ede2d6]">
                      <span className="text-[10px] text-stone-500 block uppercase font-medium">Nghệ nhân</span>
                      <span className="text-xs font-bold text-[#5e2812] font-serif">
                        {selectedVillage.artisansCount || (selectedVillage.artisans ? selectedVillage.artisans.length : 12)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-500 block uppercase font-medium">Đánh giá</span>
                      <span className="text-xs font-bold text-amber-600 flex items-center justify-center gap-0.5">
                        <span className="material-symbols-outlined text-xs fill-1">star</span>
                        {selectedVillage.rating || 4.9}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm text-[#7a3e26]">description</span>
                      Giới thiệu lịch sử
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed font-serif">
                      {selectedVillage.shortDescription || selectedVillage.summary}
                    </p>
                  </div>

                  {/* Key Highlights */}
                  <div>
                    <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm text-[#7a3e26]">verified</span>
                      Điểm nhấn di sản
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {(selectedVillage.highlights || ['Di sản quốc gia', 'Kỹ nghệ cổ truyền']).map((item, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-[#f4ebe1] text-[#7a3e26] text-[11px] rounded-md font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Master Artisan info */}
                  {selectedVillage.masterArtisan && (
                    <div className="p-3 bg-[#faf5ef] rounded-xl border border-[#e8dcd0]">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={selectedVillage.masterArtisan.avatarUrl || selectedVillage.coverImage || ''}
                          alt={selectedVillage.masterArtisan.name}
                          className="w-10 h-10 rounded-full object-cover border border-[#c4a482]"
                        />
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#7a3e26] tracking-wide block">
                            {selectedVillage.masterArtisan.title || 'Nghệ nhân'}
                          </span>
                          <h5 className="text-xs font-bold text-stone-800">
                            {selectedVillage.masterArtisan.name}
                          </h5>
                          <p className="text-[11px] text-stone-500">
                            {selectedVillage.masterArtisan.experience || '40 năm'} kinh nghiệm
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Visiting Info */}
                  <div className="space-y-1 text-xs text-stone-600">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-stone-400 text-sm">schedule</span>
                      <span>Giờ đón khách: {selectedVillage.visitingHours || '07:30 - 18:00'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-stone-400 text-sm">payments</span>
                      <span>Vé tham quan: {selectedVillage.ticketPrice || 'Miễn phí'}</span>
                    </div>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="p-4 border-t border-[#e2d5c8] bg-white flex flex-col gap-2">
                  <button
                    onClick={() => onSelectVillage(selectedVillage.id)}
                    className="w-full py-2.5 px-4 bg-[#5e2812] hover:bg-[#431c0c] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                  >
                    Khám phá chi tiết làng nghề
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${selectedVillage.name}, ${selectedVillage.district}, ${selectedVillage.province}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 border border-[#e2d5c8] hover:bg-[#f6f3ee] text-[#5e2812] text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-sm text-[#ea4335]">map</span>
                    Mở vị trí trên Google Maps
                    <span className="material-symbols-outlined text-xs">open_in_new</span>
                  </a>
                </div>
              </div>
            )}
          </>
        ) : (
          /* List / Grid View */
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 max-w-7xl mx-auto w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-lg md:text-xl font-bold text-stone-900">
                Danh sách làng nghề di sản ({filteredVillages.length} địa điểm)
              </h2>
              <span className="text-xs text-stone-500">
                Sắp xếp theo tọa độ GIS và niên đại lịch sử
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredVillages.map((v) => (
                <div
                  key={v.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#e2d5c8] shadow-xs hover:shadow-lg transition-all flex flex-col group"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={v.coverImage || v.imageUrl || ''}
                      alt={v.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-white/95 rounded-full text-[11px] font-semibold text-[#5e2812] shadow-xs">
                      {v.craftType || v.sectorTag || 'Di sản'}
                    </span>
                    <button
                      onClick={() => onToggleBookmark(v.id)}
                      className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-stone-700 hover:text-[#5e2812]"
                    >
                      <span
                        className={`material-symbols-outlined text-sm ${
                          bookmarks.includes(v.id) ? 'text-amber-500 fill-1' : ''
                        }`}
                      >
                        bookmark
                      </span>
                    </button>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                        <span className="flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-xs text-[#7a3e26]">location_on</span>
                          {v.province}
                        </span>
                        <span className="text-amber-600 font-bold flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-xs fill-1">star</span>
                          {v.rating || 4.9}
                        </span>
                      </div>
                      <h3 className="font-serif font-bold text-base text-stone-900 group-hover:text-[#5e2812] transition-colors line-clamp-1">
                        {v.name}
                      </h3>
                      <p className="text-xs text-stone-600 line-clamp-2 mt-1 leading-relaxed font-serif">
                        {v.shortDescription || v.summary}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-[11px] text-stone-400">
                        Khởi lập: <strong className="text-stone-700">{v.establishedYear || `${v.ageYears} năm`}</strong>
                      </span>
                      <button
                        onClick={() => onSelectVillage(v.id)}
                        className="text-xs font-bold text-[#7a3e26] hover:text-[#5e2812] flex items-center gap-0.5"
                      >
                        Chi tiết
                        <span className="material-symbols-outlined text-xs">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

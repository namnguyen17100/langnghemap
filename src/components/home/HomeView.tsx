/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Làng Nghề Map - Home Page View
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import L from 'leaflet';
import { Village, Category, HeritageStory, TourPackage } from '../../types';
import { VillageService } from '../../services/villageService';

interface HomeViewProps {
  onNavigate: (tab: string, villageId?: string) => void;
  onToggleBookmark: (villageId: string) => void;
  onSelectVillageForMap?: (villageId: string) => void;
  onSelectVillage?: (villageId: string) => void;
  bookmarks?: string[];
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onToggleBookmark,
  onSelectVillageForMap,
  onSelectVillage,
  bookmarks = [],
}) => {
  const allVillages = useMemo(() => VillageService.getAllVillages(), []);
  const [featuredVillages, setFeaturedVillages] = useState<Village[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [stories, setStories] = useState<HeritageStory[]>([]);
  const [tours, setTours] = useState<TourPackage[]>([]);

  // Hero search states
  const [heroSearch, setHeroSearch] = useState('');
  const [heroRegion, setHeroRegion] = useState('all');

  // Interactive Map Preview State
  const [selectedPinVillage, setSelectedPinVillage] = useState<string>('bat-trang');
  const [mapLayer, setMapLayer] = useState<'heritage' | 'satellite' | 'antique'>('heritage');
  const [timelineYear, setTimelineYear] = useState(2025);

  const homeMapContainerRef = useRef<HTMLDivElement | null>(null);
  const homeMapInstanceRef = useRef<L.Map | null>(null);
  const homeTileLayerRef = useRef<L.TileLayer | null>(null);
  const homeMarkersGroupRef = useRef<L.LayerGroup | null>(null);

  // Home Mini Quiz state
  const [quizAnswered, setQuizAnswered] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(100);

  useEffect(() => {
    const loadData = async () => {
      const [v, c, s, t] = await Promise.all([
        VillageService.getFeaturedVillages(),
        VillageService.getCategories(),
        VillageService.getHeritageStories(),
        VillageService.getTours(),
      ]);
      setFeaturedVillages(v);
      setCategories(c);
      setStories(s);
      setTours(t);
    };
    loadData();
  }, []);

  // Initialize Home Preview Map
  useEffect(() => {
    if (!homeMapContainerRef.current || homeMapInstanceRef.current) return;

    const map = L.map(homeMapContainerRef.current, {
      center: [16.5, 107.0],
      zoom: 6,
      minZoom: 5,
      maxZoom: 18,
      zoomControl: false,
    });

    const getTileConfig = (layer: string) => {
      if (layer === 'satellite') {
        return {
          url: 'https://mt{s}.google.com/vt/lyrs=y&hl=vi&x={x}&y={y}&z={z}',
          subdomains: ['0', '1', '2', '3'],
          attribution: '&copy; Google Maps',
          maxZoom: 20,
        };
      }
      if (layer === 'antique') {
        return {
          url: 'https://mt{s}.google.com/vt/lyrs=p&hl=vi&x={x}&y={y}&z={z}',
          subdomains: ['0', '1', '2', '3'],
          attribution: '&copy; Google Maps',
          maxZoom: 20,
        };
      }
      return {
        url: 'https://mt{s}.google.com/vt/lyrs=m&hl=vi&x={x}&y={y}&z={z}',
        subdomains: ['0', '1', '2', '3'],
        attribution: '&copy; Google Maps',
        maxZoom: 20,
      };
    };

    const config = getTileConfig(mapLayer);
    const tileLayer = L.tileLayer(config.url, {
      attribution: config.attribution,
      subdomains: config.subdomains,
      maxZoom: config.maxZoom,
    }).addTo(map);

    homeTileLayerRef.current = tileLayer;
    const markersGroup = L.layerGroup().addTo(map);
    homeMarkersGroupRef.current = markersGroup;
    homeMapInstanceRef.current = map;

    const resizeObserver = new ResizeObserver(() => {
      if (homeMapInstanceRef.current) {
        homeMapInstanceRef.current.invalidateSize();
      }
    });

    if (homeMapContainerRef.current) {
      resizeObserver.observe(homeMapContainerRef.current);
    }

    requestAnimationFrame(() => map.invalidateSize());
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
      map.remove();
      homeMapInstanceRef.current = null;
    };
  }, []);

  // Switch Home Map Tiles
  useEffect(() => {
    const map = homeMapInstanceRef.current;
    if (!map) return;

    if (homeTileLayerRef.current) {
      map.removeLayer(homeTileLayerRef.current);
    }

    const getTileConfig = (layer: string) => {
      if (layer === 'satellite') {
        return {
          url: 'https://mt{s}.google.com/vt/lyrs=y&hl=vi&x={x}&y={y}&z={z}',
          subdomains: ['0', '1', '2', '3'],
          attribution: '&copy; Google Maps',
          maxZoom: 20,
        };
      }
      if (layer === 'antique') {
        return {
          url: 'https://mt{s}.google.com/vt/lyrs=p&hl=vi&x={x}&y={y}&z={z}',
          subdomains: ['0', '1', '2', '3'],
          attribution: '&copy; Google Maps',
          maxZoom: 20,
        };
      }
      return {
        url: 'https://mt{s}.google.com/vt/lyrs=m&hl=vi&x={x}&y={y}&z={z}',
        subdomains: ['0', '1', '2', '3'],
        attribution: '&copy; Google Maps',
        maxZoom: 20,
      };
    };

    const config = getTileConfig(mapLayer);
    const newTileLayer = L.tileLayer(config.url, {
      attribution: config.attribution,
      subdomains: config.subdomains,
      maxZoom: config.maxZoom,
    }).addTo(map);

    homeTileLayerRef.current = newTileLayer;
    map.invalidateSize();
  }, [mapLayer]);

  // Update Markers on Home Map
  useEffect(() => {
    const map = homeMapInstanceRef.current;
    const markersGroup = homeMarkersGroupRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    allVillages.forEach((village) => {
      const lat = village.coordinates?.lat || village.coords?.lat || 21.0;
      const lng = village.coordinates?.lng || village.coords?.lng || 105.8;
      const isSelected = village.id === selectedPinVillage;

      const html = `
        <div style="cursor: pointer; display: flex; flex-direction: column; align-items: center;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background: ${
            isSelected ? '#5e2812' : '#ffffff'
          }; color: ${isSelected ? '#ffffff' : '#7a3e26'}; border: 2px solid #7a3e26; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(94,40,18,0.25); ${
            isSelected ? 'transform: scale(1.2); box-shadow: 0 0 0 4px rgba(255,219,206,0.9);' : ''
          }">
            <span class="material-symbols-outlined" style="font-size: 16px;">local_activity</span>
          </div>
          <span style="margin-top: 3px; font-size: 10px; font-weight: bold; background: ${
            isSelected ? '#5e2812' : 'rgba(255,255,255,0.95)'
          }; color: ${isSelected ? '#ffffff' : '#370d00'}; padding: 1px 6px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.15); white-space: nowrap;">
            ${village.name}
          </span>
        </div>
      `;

      const customIcon = L.divIcon({
        html,
        className: 'home-custom-marker',
        iconSize: [36, 48],
        iconAnchor: [18, 30],
      });

      const marker = L.marker([lat, lng], { icon: customIcon });
      marker.on('click', () => {
        setSelectedPinVillage(village.id);
        map.flyTo([lat, lng], 9, { duration: 0.8 });
      });

      markersGroup.addLayer(marker);
    });
  }, [allVillages, selectedPinVillage]);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('ban-do');
  };

  const handleQuizChoice = (choice: string) => {
    setQuizAnswered(choice);
    if (choice === 'B') {
      setQuizScore((prev) => prev + 20);
    }
  };

  const handleResetMiniQuiz = () => {
    setQuizAnswered(null);
  };

  return (
    <div className="w-full flex flex-col">
      {/* SECTION 02: HERO BANNER */}
      <section className="relative w-full overflow-hidden bg-[#f6f3ee] pt-8 pb-16 lg:py-20 border-b border-[#e5e2dd]">
        {/* Ambient Warm Heritage Glows */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#ffdbce]/40 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-[#ffdad5]/30 blur-2xl pointer-events-none" />

        <div className="w-full px-4 md:px-8 max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Heading, Search & Stats */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-[#ebe8e3] text-[#5e2812] text-[12px] font-bold uppercase tracking-wider shadow-sm border border-[#d8c2ba]/40">
                <span className="material-symbols-outlined text-[16px] text-[#ab3427]">verified</span>
                <span>Đề tài E01 • Bản Đồ Di Sản Thủ Công Việt Nam</span>
              </div>

              <h1 className="font-display-lg text-[#5e2812] tracking-tight leading-tight">
                Khám phá tinh hoa <br className="hidden sm:inline" />
                <span className="italic font-normal text-[#ab3427]">làng nghề Việt Nam</span>
              </h1>

              <p className="text-[16px] md:text-[17px] text-[#53433e] max-w-xl leading-relaxed">
                Hành trình tìm về những giá trị cội nguồn qua bản đồ số hóa địa không gian. Kết hợp hài hòa giữa cơ sở dữ liệu GIS, thư viện văn hóa nghệ nhân và trải nghiệm du lịch thực cảnh.
              </p>

              {/* Search Widget */}
              <div className="mt-1 p-3 md:p-4 bg-white rounded-2xl shadow-[0_12px_32px_-6px_rgba(122,62,38,0.12)] border border-[#e5e2dd] flex flex-col gap-3">
                <form onSubmit={handleHeroSearch} className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="flex-1 w-full flex items-center gap-2 bg-[#f6f3ee] px-3.5 py-3 rounded-xl border border-[#d8c2ba]/30">
                    <span className="material-symbols-outlined text-[#86736d] text-[22px]">search</span>
                    <input
                      type="text"
                      value={heroSearch}
                      onChange={(e) => setHeroSearch(e.target.value)}
                      placeholder="Nhập tên làng nghề (ví dụ: Bát Tràng, Đông Hồ)..."
                      className="bg-transparent border-none outline-none text-[14px] text-[#1c1c19] placeholder:text-[#86736d] w-full focus:ring-0"
                    />
                  </div>

                  <div className="w-full sm:w-auto flex items-center gap-2">
                    <select
                      value={heroRegion}
                      onChange={(e) => setHeroRegion(e.target.value)}
                      className="bg-[#f6f3ee] px-3.5 py-3 rounded-xl text-[13px] text-[#1c1c19] font-medium border border-[#d8c2ba]/30 outline-none cursor-pointer"
                    >
                      <option value="all">Toàn quốc (Bắc - Trung - Nam)</option>
                      <option value="bac">Miền Bắc</option>
                      <option value="trung">Miền Trung</option>
                      <option value="nam">Miền Nam</option>
                    </select>

                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-[#5e2812] hover:bg-[#7a3e26] text-white px-5 py-3 rounded-xl font-semibold text-[14px] transition-all shadow-md flex-shrink-0"
                    >
                      <span>Khám phá ngay</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                  </div>
                </form>

                {/* Quick Filters */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[12px]">
                  <span className="text-[#86736d] uppercase font-bold tracking-wider mr-1">Gợi ý nhanh:</span>
                  {[
                    { label: 'Gốm sứ', cat: 'gom-su' },
                    { label: 'Dệt lụa', cat: 'det-may' },
                    { label: 'Mây tre đan', cat: 'dan-lat' },
                    { label: 'Tranh dân gian', cat: 'tranh-giay' },
                    { label: 'Chạm khắc', cat: 'dieu-khac' },
                  ].map((chip) => (
                    <button
                      key={chip.label}
                      onClick={() => onNavigate('ban-do')}
                      className="px-2.5 py-1 rounded-lg bg-[#f0ede9] text-[#53433e] font-medium hover:bg-[#5e2812] hover:text-white transition-all"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Stats Counter Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3">
                <div className="flex flex-col">
                  <span className="font-headline-lg text-[#5e2812] font-semibold">
                    3.000<span className="text-[#ab3427] font-light">+</span>
                  </span>
                  <span className="text-[13px] text-[#53433e]">Làng nghề cả nước</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-lg text-[#5e2812] font-semibold">54</span>
                  <span className="text-[13px] text-[#53433e]">Di sản quốc gia</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-lg text-[#5e2812] font-semibold">
                    120<span className="text-[#ab3427] font-light">+</span>
                  </span>
                  <span className="text-[13px] text-[#53433e]">Làng số hóa tọa độ</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-lg text-[#134010] font-semibold">
                    100<span className="text-[18px]">%</span>
                  </span>
                  <span className="text-[13px] text-[#53433e]">Kiểm chứng di sản</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Mosaic with Artisan Quote */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_20px_40px_-10px_rgba(94,40,18,0.22)] bg-[#e5e2dd]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAodYZK5LQAnaEuCGAJkp-nRgPTNmRA3kM8W8fyvqKY1Yyp0KDgL-DmoKBW2y3xAiVfU9HDL6ImuoTZCPInJZp1hndkYPFTFBTtP6BhoYz8x6_GXJvnWRk1P2nNbAgGa1Hf6s3UYjCLLXPPzIPRwPDyXCxVQwNLj-Teef1EEheeD0xlrkBxWfA7WZ1FiV7d0Bj0YIdTYguLqZ7QjXVdsfx6jhj7ppES1kWnt70qzkZ_-uIJJcoM2LC4"
                  alt="Nghệ nhân gốm Bát Tràng"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#5e2812]/90 via-[#5e2812]/20 to-transparent" />

                {/* Floating Heritage Seal Badge */}
                <div className="absolute top-4 right-4 bg-[#fcf9f4]/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md flex items-center gap-2.5 border border-white/40">
                  <span className="material-symbols-outlined text-[#ab3427] text-[22px]">workspace_premium</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#86736d] uppercase font-bold tracking-wider">Danh hiệu</span>
                    <span className="text-[13px] text-[#5e2812] font-bold leading-tight">Báu vật dân gian</span>
                  </div>
                </div>

                {/* Bottom Floating Quote Card */}
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#fcf9f4]/95 backdrop-blur-md shadow-xl border border-white/60">
                  <p className="font-headline-sm italic text-[#5e2812] leading-snug">
                    "Đất nung nở hoa qua bàn tay cần lao của người thợ Việt."
                  </p>
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#e5e2dd]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#ab3427]" />
                      <span className="text-[12px] font-semibold text-[#53433e]">
                        Làng gốm Bát Tràng, Hà Nội
                      </span>
                    </div>
                    <span className="text-[11px] text-[#86736d] font-mono">1352 CE — 2025 CE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03: INTERACTIVE HERITAGE MAP PREVIEW */}
      <section className="w-full py-16 bg-[#fcf9f4]">
        <div className="w-full px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <span className="text-[12px] font-bold text-[#ab3427] uppercase tracking-widest">
                Tọa độ không gian di sản
              </span>
              <h2 className="font-headline-lg text-[#5e2812] mt-1">
                Bản đồ làng nghề truyền thống tương tác
              </h2>
            </div>
            <p className="text-[14px] text-[#53433e] max-w-md">
              Hệ thống trực quan hóa tọa độ GIS kết hợp tư liệu hình ảnh di sản 3 miền, cho phép tra cứu lộ trình văn hóa và thời gian phát triển.
            </p>
          </div>

          {/* Map Preview Box */}
          <div className="w-full rounded-2xl overflow-hidden shadow-xl bg-[#f6f3ee] border border-[#e5e2dd] grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
            {/* Map Canvas (8 Columns) */}
            <div className="lg:col-span-8 relative bg-[#ebe8e3] p-4 flex flex-col justify-between overflow-hidden">
              {/* Dot Grid Layer */}
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#86736d_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

              {/* Map Top Toolbar */}
              <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-white/95 backdrop-blur-md shadow-sm border border-[#e5e2dd]">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setMapLayer('heritage')}
                    className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold flex items-center gap-1 transition-all ${
                      mapLayer === 'heritage'
                        ? 'bg-[#5e2812] text-white shadow-sm'
                        : 'bg-[#f0ede9] text-[#53433e] hover:text-[#1c1c19]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[15px]">map</span>
                    <span>Google Maps Đường phố</span>
                  </button>
                  <button
                    onClick={() => setMapLayer('satellite')}
                    className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold flex items-center gap-1 transition-all ${
                      mapLayer === 'satellite'
                        ? 'bg-[#5e2812] text-white shadow-sm'
                        : 'bg-[#f0ede9] text-[#53433e] hover:text-[#1c1c19]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[15px]">satellite_alt</span>
                    <span>Google Maps Vệ tinh</span>
                  </button>
                  <button
                    onClick={() => setMapLayer('antique')}
                    className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold flex items-center gap-1 transition-all ${
                      mapLayer === 'antique'
                        ? 'bg-[#5e2812] text-white shadow-sm'
                        : 'bg-[#f0ede9] text-[#53433e] hover:text-[#1c1c19]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[15px]">landscape</span>
                    <span>Google Maps Địa hình</span>
                  </button>
                </div>

                <button
                  onClick={() => onNavigate('ban-do')}
                  className="px-3 py-1.5 rounded-lg bg-[#ab3427] text-white text-[12px] font-bold flex items-center gap-1 shadow-sm hover:bg-[#8a1b13] transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">fullscreen</span>
                  <span>Mở toàn màn hình GIS</span>
                </button>
              </div>

              {/* Real Leaflet Map Container */}
              <div className="relative w-full h-[400px] my-3 rounded-xl overflow-hidden border border-[#e2d5c8] shadow-inner bg-[#e9f2f5]">
                <div ref={homeMapContainerRef} className="w-full h-full z-10" />
                <div className="absolute bottom-2 left-2 z-[400] bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] text-stone-600 font-medium border border-stone-200 pointer-events-none">
                  🗺️ Bản đồ GIS Việt Nam • Nhấp vào làng nghề để định vị
                </div>
              </div>

              {/* Bottom Time Range Navigation */}
              <div className="relative z-20 p-3 bg-white/95 backdrop-blur-md rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm border border-[#e5e2dd]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#86736d] text-[18px]">timelapse</span>
                  <span className="text-[13px] text-[#1c1c19] font-medium">
                    Niên đại: Thế kỷ XI — Nay ({timelineYear})
                  </span>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-64">
                  <span className="text-[11px] text-[#86736d]">Lý - Trần</span>
                  <input
                    type="range"
                    min="1000"
                    max="2025"
                    value={timelineYear}
                    onChange={(e) => setTimelineYear(Number(e.target.value))}
                    className="w-full accent-[#ab3427] cursor-pointer"
                  />
                  <span className="text-[11px] text-[#ab3427] font-bold">Hiện đại</span>
                </div>
              </div>
            </div>

            {/* Selected Location Details Panel (4 Columns) */}
            {(() => {
              const activePinData = allVillages.find((v) => v.id === selectedPinVillage) || allVillages[0];
              const isBookmarked = bookmarks.includes(activePinData.id);

              return (
                <div className="lg:col-span-4 bg-white p-6 flex flex-col justify-between border-l border-[#e5e2dd]">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#ffdad5] text-[#ab3427] text-[11px] font-bold uppercase tracking-wider">
                          Điểm ghim đang chọn
                        </span>
                        <h3 className="font-headline-sm text-[#5e2812] text-[20px] font-bold mt-1">
                          {activePinData.name}
                        </h3>
                        <p className="text-[13px] text-[#86736d] flex items-center gap-1 mt-0.5">
                          <span className="material-symbols-outlined text-[16px] text-[#ab3427]">pin_drop</span>
                          {activePinData.district}, {activePinData.province}
                        </p>
                      </div>
                      <button
                        onClick={() => onToggleBookmark(activePinData.id)}
                        className="w-9 h-9 rounded-xl bg-[#f6f3ee] flex items-center justify-center text-[#ab3427] hover:bg-[#ffdad5] transition-colors"
                        title={isBookmarked ? 'Bỏ lưu' : 'Lưu di sản'}
                      >
                        <span className={`material-symbols-outlined text-[20px] ${isBookmarked ? 'fill-1' : ''}`}>
                          bookmark
                        </span>
                      </button>
                    </div>

                    {/* Image preview */}
                    <div className="w-full h-40 rounded-xl overflow-hidden relative shadow-sm">
                      <img
                        src={activePinData.coverImage || activePinData.imageUrl || ''}
                        alt={activePinData.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white text-[11px] font-medium backdrop-blur-sm">
                        {activePinData.establishedYear || `${activePinData.ageYears} năm tuổi`}
                      </div>
                    </div>

                    {/* Metadata info table */}
                    <div className="flex flex-col gap-2 pt-1 text-[13px]">
                      <div className="flex items-center justify-between py-1 border-b border-[#f0ede9]">
                        <span className="text-[#86736d]">Nghề truyền thống</span>
                        <span className="text-[#1c1c19] font-medium">{activePinData.craftType || activePinData.sectorTag || 'Thủ công mỹ nghệ'}</span>
                      </div>
                      <div className="flex items-center justify-between py-1 border-b border-[#f0ede9]">
                        <span className="text-[#86736d]">Di sản xếp hạng</span>
                        <span className="text-[#ab3427] font-semibold">{activePinData.heritageLevelText || 'Di sản Quốc gia'}</span>
                      </div>
                      <div className="flex items-center justify-between py-1 border-b border-[#f0ede9]">
                        <span className="text-[#86736d]">Sản phẩm tiêu biểu</span>
                        <span className="text-[#1c1c19] font-medium truncate max-w-[170px]">
                          {activePinData.featuredProducts ? activePinData.featuredProducts.map((p: any) => p.name || p.title).slice(0, 2).join(', ') : 'Men rạn, men ngọc'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1">
                        <span className="text-[#86736d]">Đánh giá di sản</span>
                        <span className="text-amber-600 font-semibold flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[15px] fill-1">star</span>
                          {activePinData.rating || 4.9} / 5.0
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 pt-3">
                    <button
                      onClick={() => onSelectVillage ? onSelectVillage(activePinData.id) : onNavigate('chi-tiet-lang-nghe', activePinData.id)}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#5e2812] hover:bg-[#7a3e26] text-white font-semibold text-[14px] flex items-center justify-center gap-2 transition-all shadow-md"
                    >
                      <span className="material-symbols-outlined text-[18px]">explore</span>
                      <span>Xem chi tiết hồ sơ di sản</span>
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onNavigate('ban-do')}
                        className="py-2 px-3 rounded-xl bg-[#f6f3ee] hover:bg-[#ebe8e3] text-[#1c1c19] text-[12px] font-semibold flex items-center justify-center gap-1 transition-all"
                      >
                        <span className="material-symbols-outlined text-[16px] text-[#5e2812]">fullscreen</span>
                        <span>Mở bản đồ GIS</span>
                      </button>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${activePinData.name}, ${activePinData.province}, Việt Nam`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3 rounded-xl bg-[#f6f3ee] hover:bg-[#ebe8e3] text-[#5e2812] text-[12px] font-semibold flex items-center justify-center gap-1 transition-all"
                      >
                        <span className="material-symbols-outlined text-[16px] text-[#ea4335]">map</span>
                        <span>Google Maps ↗</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* SECTION 04: FEATURED HERITAGE VILLAGES (GRID CARDS) */}
      <section className="w-full py-16 bg-[#f6f3ee] border-y border-[#e5e2dd]">
        <div className="w-full px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <span className="text-[12px] font-bold text-[#ab3427] uppercase tracking-widest">
                Tiêu điểm bảo tồn
              </span>
              <h2 className="font-headline-lg text-[#5e2812] mt-1">
                Làng nghề nổi bật khắp ba miền
              </h2>
            </div>
            <button
              onClick={() => onNavigate('ban-do')}
              className="inline-flex items-center gap-1 text-[#5e2812] hover:text-[#ab3427] font-semibold text-[14px] transition-colors"
            >
              <span>Xem tất cả 120+ làng nghề</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredVillages.map((village) => (
              <div
                key={village.id}
                onClick={() => onNavigate('chi-tiet-lang-nghe', village.id)}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-[#e5e2dd] transition-all duration-300 flex flex-col cursor-pointer"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#e5e2dd]">
                  <img
                    src={village.coverImage}
                    alt={village.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[#5e2812] text-[11px] font-bold uppercase tracking-wider shadow-sm">
                    {village.categoryName}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(village.id);
                    }}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-110 ${
                      village.isBookmarked ? 'bg-[#ab3427] text-white' : 'bg-white/90 text-[#86736d] hover:text-[#ab3427]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {village.isBookmarked ? 'bookmark' : 'bookmark_border'}
                    </span>
                  </button>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1 text-[#86736d] text-[12px]">
                      <span className="material-symbols-outlined text-[15px] text-[#ab3427]">location_on</span>
                      <span>
                        {village.district}, {village.province}
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-[#5e2812] text-[18px] font-bold mt-1 group-hover:text-[#ab3427] transition-colors">
                      {village.name}
                    </h3>
                    <p className="text-[13px] text-[#53433e] line-clamp-2 mt-1.5 leading-relaxed">
                      {village.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#f0ede9] flex items-center justify-between">
                    <span className="text-[12px] font-semibold text-[#ab3427]">
                      Tuổi nghề: {village.ageText}
                    </span>
                    <span className="text-[#5e2812] group-hover:translate-x-1 transition-transform inline-flex items-center">
                      <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 05: PHÂN LOẠI 6 NHÓM NGÀNH NGHỀ TRUYỀN THỐNG */}
      <section className="w-full py-16 bg-[#fcf9f4]">
        <div className="w-full px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[12px] font-bold text-[#ab3427] uppercase tracking-widest">
              Hệ Thống Phân Loại Văn Hóa
            </span>
            <h2 className="font-headline-lg text-[#5e2812] mt-1">
              6 Nhóm Ngành Thủ Công Truyền Thống
            </h2>
            <p className="text-[14px] text-[#53433e] mt-2">
              Phân định theo chuẩn khảo cứu của Viện Văn hóa Nghệ thuật Quốc gia nhằm số hóa và lưu trữ có hệ thống.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => onNavigate('ban-do')}
                className="p-6 rounded-2xl bg-white border border-[#e5e2dd] hover:border-[#ab3427] transition-all hover:shadow-lg flex items-start gap-4 group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#5e2812]/10 text-[#5e2812] flex items-center justify-center flex-shrink-0 group-hover:bg-[#5e2812] group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[28px]">{cat.iconName}</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-[18px] font-bold text-[#5e2812] group-hover:text-[#ab3427] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[12px] text-[#53433e] mt-1 leading-snug">
                    {cat.sampleVillages}
                  </p>
                  <span className="inline-block mt-3 text-[12px] text-[#5e2812] font-bold group-hover:translate-x-0.5 transition-transform">
                    {cat.villageCount} Làng nghề số hóa →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 06: CÂU CHUYỆN VĂN HÓA & NGHỆ NHÂN */}
      <section className="w-full py-16 bg-[#f6f3ee] border-t border-[#e5e2dd]">
        <div className="w-full px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <span className="text-[12px] font-bold text-[#ab3427] uppercase tracking-widest">
                Ký ức & Con người
              </span>
              <h2 className="font-headline-lg text-[#5e2812] mt-1">
                Câu chuyện nghề và những bàn tay vàng
              </h2>
            </div>
            <p className="text-[14px] text-[#53433e] max-w-sm">
              Lắng nghe những trăn trở, niềm đam mê và bí quyết gia truyền từ thế hệ nghệ nhân giữ lửa cho bản sắc dân tộc.
            </p>
          </div>

          {/* Feature Story Card (5:7 Split) */}
          {stories.map((story) => (
            <div
              key={story.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-white rounded-3xl overflow-hidden shadow-md border border-[#e5e2dd]"
            >
              <div className="lg:col-span-5 min-h-[360px] relative">
                <img
                  src={story.coverImage}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-between gap-5">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-[#ab3427] text-[12px] font-bold uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[16px]">menu_book</span>
                    <span>{story.issueCode}</span>
                  </div>
                  <h3 className="font-headline-md text-[#5e2812] text-[24px] font-bold leading-snug">
                    {story.title}
                  </h3>
                  <blockquote className="italic font-display text-[17px] text-[#86736d] border-l-2 border-[#ab3427] pl-4 my-2 leading-relaxed">
                    {story.quote}
                  </blockquote>
                  <p className="text-[14px] text-[#53433e] leading-relaxed">
                    {story.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#f0ede9]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#5e2812]/10 flex items-center justify-center font-bold text-[#5e2812]">
                      {story.artisanInitials}
                    </div>
                    <div>
                      <p className="text-[14px] font-bold text-[#1c1c19]">{story.artisanName}</p>
                      <p className="text-[12px] text-[#86736d]">{story.artisanTitle}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('chi-tiet-lang-nghe', story.villageId)}
                    className="inline-flex items-center gap-1 font-semibold text-[14px] text-[#5e2812] hover:text-[#ab3427] transition-colors"
                  >
                    <span>Đọc toàn bài</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* 3 Secondary Short Articles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-6 rounded-2xl bg-white border border-[#e5e2dd] flex flex-col justify-between gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#ab3427]">
                  Kỹ thuật Cổ truyền
                </span>
                <h4 className="font-headline-sm text-[#5e2812] text-[17px] font-bold mt-1">
                  Bí mật màu men rạn và lửa nung Bát Tràng
                </h4>
                <p className="text-[13px] text-[#53433e] mt-2 line-clamp-3 leading-relaxed">
                  Cách nghệ nhân kiểm soát độ co giãn nhiệt của men và xương đất để tạo nên những vết rạn tam giác đều đặn như mạng nhện.
                </p>
              </div>
              <button
                onClick={() => onNavigate('chi-tiet-lang-nghe', 'bat-trang')}
                className="text-[#5e2812] hover:text-[#ab3427] text-[13px] font-bold inline-flex items-center gap-1 text-left"
              >
                <span>Tìm hiểu quy trình</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#e5e2dd] flex flex-col justify-between gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#ab3427]">
                  Hội nhập di sản
                </span>
                <h4 className="font-headline-sm text-[#5e2812] text-[17px] font-bold mt-1">
                  Hành trình đưa lụa Vạn Phúc ra sàn diễn quốc tế
                </h4>
                <p className="text-[13px] text-[#53433e] mt-2 line-clamp-3 leading-relaxed">
                  Những nhà thiết kế trẻ kết hợp chất liệu tơ tằm cổ truyền xứ Đoài vào các bộ sưu tập thời trang bền vững đương đại.
                </p>
              </div>
              <button
                onClick={() => onNavigate('chi-tiet-lang-nghe', 'van-phuc')}
                className="text-[#5e2812] hover:text-[#ab3427] text-[13px] font-bold inline-flex items-center gap-1 text-left"
              >
                <span>Xem phóng sự ảnh</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#e5e2dd] flex flex-col justify-between gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#ab3427]">
                  Tư liệu nghệ nhân
                </span>
                <h4 className="font-headline-sm text-[#5e2812] text-[17px] font-bold mt-1">
                  Mộc Kim Bồng và dấu ấn rường cột phố cổ Hội An
                </h4>
                <p className="text-[13px] text-[#53433e] mt-2 line-clamp-3 leading-relaxed">
                  Tài hoa của những người thợ chạm khắc đã dựng nên chùa Cầu, nhà cổ Tấn Ký và hệ thống thuyền buôn xứ Đàng Trong xưa.
                </p>
              </div>
              <button
                onClick={() => onNavigate('ban-do')}
                className="text-[#5e2812] hover:text-[#ab3427] text-[13px] font-bold inline-flex items-center gap-1 text-left"
              >
                <span>Xem lược khảo</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 07: TRẢI NGHIỆM DU LỊCH & TRẮC NGHIỆM KIẾN THỨC */}
      <section className="w-full py-16 bg-[#fcf9f4]">
        <div className="w-full px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[12px] font-bold text-[#ab3427] uppercase tracking-widest">
              Học tập & Tương tác
            </span>
            <h2 className="font-headline-lg text-[#5e2812] mt-1">
              Trải Nghiệm Du Khách & Trắc Nghiệm Di Sản
            </h2>
            <p className="text-[14px] text-[#53433e] mt-2">
              Tham gia các hoạt động một ngày làm nghệ nhân và thử thách vốn hiểu biết về kho tàng văn hóa thủ công dân tộc.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Tour Suggestions (5 Columns) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <h3 className="font-headline-sm text-[#5e2812] text-[18px] font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ab3427]">handyman</span>
                <span>Tour "Một Ngày Làm Nghệ Nhân"</span>
              </h3>

              <div className="flex flex-col gap-3">
                {tours.map((tour) => (
                  <div
                    key={tour.id}
                    onClick={() => onNavigate('chi-tiet-lang-nghe', tour.villageId)}
                    className="p-3.5 rounded-2xl bg-white border border-[#e5e2dd] hover:border-[#ab3427] transition-all flex items-center gap-4 cursor-pointer shadow-sm hover:shadow"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-[#e5e2dd]">
                      <img src={tour.coverImage} alt={tour.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-[14px] font-bold text-[#5e2812] truncate">{tour.title}</h4>
                        <span className="text-[11px] font-bold text-[#ab3427] whitespace-nowrap ml-2">
                          {tour.duration}
                        </span>
                      </div>
                      <p className="text-[12px] text-[#53433e] truncate mt-0.5">{tour.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contribution Banner */}
              <div className="p-5 rounded-2xl bg-[#5e2812] text-white flex flex-col gap-2.5 shadow-md">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-[#ffdbce]">add_location_alt</span>
                  <span className="font-bold text-[15px]">Biết một làng nghề chưa có trên bản đồ?</span>
                </div>
                <p className="text-[13px] text-[#ffdbce] leading-relaxed">
                  Hãy gửi thông tin tư liệu để nhóm nghiên cứu Đề tài E01 xác minh và bổ sung tọa độ số bảo tồn.
                </p>
                <button
                  onClick={() => onNavigate('dong-gop-de-xuat')}
                  className="mt-1 self-start px-4 py-2 bg-white text-[#5e2812] rounded-xl font-bold text-[13px] hover:bg-[#f0ede9] transition-colors shadow-sm"
                >
                  Đóng góp dữ liệu ngay
                </button>
              </div>
            </div>

            {/* Interactive Mini-Quiz Widget (7 Columns) */}
            <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[#e5e2dd] flex flex-col gap-5">
              <div className="flex items-center justify-between border-b border-[#e5e2dd] pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#ab3427]/10 flex items-center justify-center text-[#ab3427]">
                    <span className="material-symbols-outlined text-[22px]">psychology</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-[#5e2812] text-[18px] font-bold">
                      Trắc Nghiệm Tri Thức Di Sản
                    </h3>
                    <span className="text-[12px] text-[#86736d]">Thử tài hiểu biết • Câu hỏi nhanh</span>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full bg-[#134010]/10 text-[#134010] text-[12px] font-bold flex items-center gap-1 border border-[#134010]/20">
                  <span className="material-symbols-outlined text-[16px]">stars</span>
                  <span>Điểm: {quizScore} XP</span>
                </div>
              </div>

              {/* Question text */}
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#ab3427]">
                  Câu hỏi văn hóa:
                </span>
                <p className="text-[16px] md:text-[17px] font-medium text-[#1c1c19] leading-snug">
                  "Làng nghề nào sau đây nổi tiếng với sản phẩm lụa tơ tằm cổ truyền có lịch sử hơn 1.000 năm thuộc quận Hà Đông, Hà Nội?"
                </p>
              </div>

              {/* Choices */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'A', text: 'A. Làng lụa Nha Xá (Hà Nam)' },
                  { id: 'B', text: 'B. Làng lụa Vạn Phúc (Hà Đông)' },
                  { id: 'C', text: 'C. Làng lụa Tân Châu (An Giang)' },
                  { id: 'D', text: 'D. Làng thổ cẩm Chăm Mỹ Nghiệp' },
                ].map((choice) => {
                  const isSelected = quizAnswered === choice.id;
                  const isCorrect = choice.id === 'B';
                  let btnStyle = 'bg-[#f6f3ee] text-[#1c1c19] border border-[#e5e2dd] hover:bg-[#ebe8e3]';

                  if (quizAnswered) {
                    if (isCorrect) {
                      btnStyle = 'bg-[#134010] text-white border-[#134010] font-bold';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-[#ab3427] text-white border-[#ab3427]';
                    } else {
                      btnStyle = 'bg-[#f6f3ee] text-[#86736d] opacity-50 border-[#e5e2dd]';
                    }
                  }

                  return (
                    <button
                      key={choice.id}
                      disabled={quizAnswered !== null}
                      onClick={() => handleQuizChoice(choice.id)}
                      className={`text-left p-3.5 rounded-xl text-[13px] font-medium flex items-center justify-between transition-all ${btnStyle}`}
                    >
                      <span>{choice.text}</span>
                      <span className="material-symbols-outlined text-[18px]">
                        {quizAnswered
                          ? isCorrect
                            ? 'check_circle'
                            : isSelected
                            ? 'cancel'
                            : 'radio_button_unchecked'
                          : 'radio_button_unchecked'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback Alert */}
              {quizAnswered && (
                <div
                  className={`p-4 rounded-xl flex items-start gap-3 ${
                    quizAnswered === 'B'
                      ? 'bg-[#134010]/10 text-[#134010] border border-[#134010]/20'
                      : 'bg-[#ab3427]/10 text-[#ab3427] border border-[#ab3427]/20'
                  }`}
                >
                  <span className="material-symbols-outlined text-[22px] mt-0.5">
                    {quizAnswered === 'B' ? 'check_circle' : 'info'}
                  </span>
                  <div className="flex-1 text-[13px]">
                    <p className="font-bold text-[14px]">
                      {quizAnswered === 'B' ? 'Chính xác! (+20 điểm)' : 'Chưa chính xác!'}
                    </p>
                    <p className="mt-1 text-[#53433e]">
                      Làng lụa Vạn Phúc (Hà Đông) được khởi thủy bởi bà Lã Thị Nga cách đây hơn một thiên niên kỷ, nổi danh với dòng lụa Vân tơ tằm mềm mại, thoáng mát và sang trọng.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handleResetMiniQuiz}
                  className="px-4 py-2 rounded-xl bg-[#f6f3ee] text-[#53433e] font-semibold text-[13px] hover:bg-[#ebe8e3] transition-colors"
                >
                  Làm lại câu này
                </button>
                <button
                  onClick={() => onNavigate('trac-nghiem')}
                  className="px-5 py-2 rounded-xl bg-[#5e2812] hover:bg-[#7a3e26] text-white font-semibold text-[13px] transition-all shadow-md flex items-center gap-1.5"
                >
                  <span>Chinh phục 15 khảo nghiệm</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 08: BẢNG TÍNH NĂNG CÔNG NGHỆ ĐỀ TÀI E01 */}
      <section className="w-full py-12 bg-[#ebe8e3] border-t border-[#e5e2dd]">
        <div className="w-full px-4 md:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#5e2812] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[20px]">map</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-[#5e2812]">Bản đồ số OpenStreetMap</span>
                <span className="text-[12px] text-[#53433e]">Động cơ Leaflet JS mượt mà</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#5e2812] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[20px]">filter_alt</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-[#5e2812]">Lọc GIS Thông Minh</span>
                <span className="text-[12px] text-[#53433e]">Theo vùng, niên đại & nghề</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#5e2812] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[20px]">devices</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-[#5e2812]">Đa Nền Tảng 100%</span>
                <span className="text-[12px] text-[#53433e]">Tối ưu máy tính & di động</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#5e2812] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[20px]">verified_user</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-[#5e2812]">Dữ Liệu Kiểm Chứng</span>
                <span className="text-[12px] text-[#53433e]">Chuẩn Viện Văn Hóa Nghệ Thuật</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

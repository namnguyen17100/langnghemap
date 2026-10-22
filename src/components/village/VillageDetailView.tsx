/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Làng Nghề Map - Village Detail View
 * Corresponds to Image 1 & Image 2 specifications
 */

import React, { useState, useEffect } from 'react';
import { Village, Artisan } from '../../types';
import { VillageService } from '../../services/villageService';

interface VillageDetailViewProps {
  villageId: string;
  onBack: () => void;
  onNavigateToVillage: (id: string) => void;
  bookmarks: string[];
  onToggleBookmark: (villageId: string) => void;
  onOpenMap: (villageId: string) => void;
}

export const VillageDetailView: React.FC<VillageDetailViewProps> = ({
  villageId,
  onBack,
  onNavigateToVillage,
  bookmarks,
  onToggleBookmark,
  onOpenMap,
}) => {
  const [village, setVillage] = useState<Village | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'products' | 'artisans' | 'travel'>('overview');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingFormData, setBookingFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    participants: 2,
    tourType: 'workshop-pottery',
    notes: '',
  });

  useEffect(() => {
    const data = VillageService.getVillageById(villageId) || VillageService.getVillageById('bat-trang');
    setVillage(data);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [villageId]);

  // Audio timer simulation
  useEffect(() => {
    let interval: any;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 1;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  if (!village) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf6f0]">
        <div className="text-center p-8">
          <div className="w-12 h-12 border-4 border-[#7a3e26] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-stone-600 font-medium">Đang tải tư liệu di sản làng nghề...</p>
        </div>
      </div>
    );
  }

  const isBookmarked = bookmarks.includes(village.id);
  const relatedVillages = VillageService.getFeaturedVillages().filter((v: Village) => v.id !== village.id).slice(0, 3);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingModalOpen(false);
      setBookingSuccess(false);
      setBookingFormData({
        name: '',
        phone: '',
        email: '',
        date: '',
        participants: 2,
        tourType: 'workshop-pottery',
        notes: '',
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#faf6f0] text-stone-800 pb-16">
      {/* Breadcrumb Navigation */}
      <div className="bg-[#f3ebe1] border-b border-[#e2d5c8] py-2.5 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-stone-600">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <button onClick={onBack} className="hover:text-[#5e2812] flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">home</span>
              Trang chủ
            </button>
            <span className="text-stone-400">/</span>
            <button onClick={() => onOpenMap(village.id)} className="hover:text-[#5e2812]">
              Bản đồ Di sản
            </button>
            <span className="text-stone-400">/</span>
            <span className="text-stone-500">{village.province}</span>
            <span className="text-stone-400">/</span>
            <span className="text-[#5e2812] font-semibold">{village.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(village.id)}
              className={`flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-semibold transition-colors ${
                isBookmarked
                  ? 'bg-[#5e2812] text-white border-[#5e2812]'
                  : 'bg-white text-stone-700 border-[#e2d5c8] hover:border-stone-400'
              }`}
            >
              <span className={`material-symbols-outlined text-sm ${isBookmarked ? 'fill-1' : ''}`}>
                bookmark
              </span>
              {isBookmarked ? 'Đã lưu di sản' : 'Lưu lại'}
            </button>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                alert('Đã sao chép liên kết hồ sơ làng nghề!');
              }}
              className="p-1 px-2.5 bg-white text-stone-700 hover:text-[#5e2812] border border-[#e2d5c8] rounded-full text-xs font-semibold flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">share</span>
              Chia sẻ
            </button>
          </div>
        </div>
      </div>

      {/* Hero Visual Section */}
      <div className="relative h-[420px] lg:h-[480px] w-full overflow-hidden bg-stone-900">
        <img
          src={village.imageUrl}
          alt={village.name}
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"></div>

        {/* Hero Overlay Content */}
        <div className="absolute inset-0 max-w-7xl mx-auto px-4 lg:px-8 flex flex-col justify-end pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-[#ffdbce] text-[#370d00] font-bold text-xs rounded-full flex items-center gap-1.5 shadow-sm">
                <span className="material-symbols-outlined text-sm">workspace_premium</span>
                Di sản Quốc Gia
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white font-medium text-xs rounded-full border border-white/20">
                {village.craftType}
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white font-medium text-xs rounded-full border border-white/20 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">location_on</span>
                {village.district}, {village.province}
              </span>
            </div>

            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight drop-shadow-md">
              {village.name}
            </h1>

            <p className="text-sm md:text-base text-stone-200 font-sans leading-relaxed drop-shadow-sm max-w-2xl">
              {village.shortDescription}
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setBookingModalOpen(true)}
                className="px-5 py-2.5 bg-[#a34720] hover:bg-[#8c3a16] text-white text-xs md:text-sm font-bold rounded-xl transition-all shadow-lg flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">calendar_month</span>
                Đặt tour trải nghiệm nghệ nhân
              </button>
              <button
                onClick={() => onOpenMap(village.id)}
                className="px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white text-xs md:text-sm font-medium rounded-xl backdrop-blur-md transition-all border border-white/30 flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">explore</span>
                Xem vị trí trên bản đồ GIS
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Key Stat Cards (As in Image 1 & 2) */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          <div className="bg-white rounded-2xl p-4 lg:p-5 border border-[#e2d5c8] shadow-md flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#ffe8dc] flex items-center justify-center text-[#5e2812] shrink-0">
              <span className="material-symbols-outlined text-2xl">history_edu</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                Năm khởi lập
              </span>
              <span className="text-base lg:text-lg font-bold text-stone-900 font-serif">
                {village.establishedYear || 'Hơn 700 năm'}
              </span>
              <p className="text-[10px] text-stone-500">Hơn 7 thế kỷ bảo tồn</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 lg:p-5 border border-[#e2d5c8] shadow-md flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#ffe8dc] flex items-center justify-center text-[#5e2812] shrink-0">
              <span className="material-symbols-outlined text-2xl">military_tech</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                Nghệ nhân
              </span>
              <span className="text-base lg:text-lg font-bold text-stone-900 font-serif">
                {village.artisansCount || (village.artisans ? village.artisans.length : 12)}
              </span>
              <p className="text-[10px] text-stone-500">NNND & NNƯT được công nhận</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 lg:p-5 border border-[#e2d5c8] shadow-md flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#ffe8dc] flex items-center justify-center text-[#5e2812] shrink-0">
              <span className="material-symbols-outlined text-2xl">category</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                Dòng sản phẩm
              </span>
              <span className="text-base lg:text-lg font-bold text-stone-900 font-serif">
                {village.featuredProducts ? village.featuredProducts.length : 4} Dòng chính
              </span>
              <p className="text-[10px] text-stone-500">Hàng trăm mẫu hoa văn cổ</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 lg:p-5 border border-[#e2d5c8] shadow-md flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#ffe8dc] flex items-center justify-center text-[#5e2812] shrink-0">
              <span className="material-symbols-outlined text-2xl">star</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                Đánh giá di sản
              </span>
              <div className="flex items-center gap-1">
                <span className="text-base lg:text-lg font-bold text-amber-600 font-serif">
                  {village.rating || 4.9} / 5.0
                </span>
                <span className="text-[10px] text-stone-400">({village.reviewCount || 128} lượt)</span>
              </div>
              <p className="text-[10px] text-stone-500">Điểm đến tiêu biểu</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-6">
        <div className="flex items-center gap-2 border-b border-[#e2d5c8] overflow-x-auto scrollbar-none">
          {[
            { id: 'overview', label: 'Tổng quan & Giới thiệu', icon: 'info' },
            { id: 'history', label: 'Lịch sử & Kỹ nghệ tinh hoa', icon: 'history' },
            { id: 'products', label: 'Sản phẩm tiêu biểu', icon: 'diamond' },
            { id: 'artisans', label: 'Nghệ nhân truyền đời', icon: 'person' },
            { id: 'travel', label: 'Cẩm nang du lịch & Tour', icon: 'map' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3.5 px-4 font-semibold text-xs md:text-sm whitespace-nowrap flex items-center gap-2 transition-all relative ${
                activeTab === tab.id
                  ? 'text-[#5e2812] border-b-2 border-[#5e2812]'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <span className="material-symbols-outlined text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Body Based on Tab */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Left Content Column (2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            {activeTab === 'overview' && (
              <>
                {/* Audio Guide Player */}
                <div className="bg-gradient-to-r from-[#5e2812] to-[#7a3e26] text-white rounded-2xl p-4 lg:p-5 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 w-full md:w-auto">
                    <button
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      className="w-12 h-12 rounded-full bg-[#ffdbce] text-[#5e2812] hover:bg-white flex items-center justify-center shrink-0 transition-all shadow-md"
                    >
                      <span className="material-symbols-outlined text-2xl">
                        {isPlayingAudio ? 'pause' : 'play_arrow'}
                      </span>
                    </button>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#ffb59a]">
                          Audio Guide Di Sản
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      </div>
                      <h4 className="text-sm font-bold font-serif">
                        Nghe thuyết minh: Truyền tích làng nghề {village.name}
                      </h4>
                      <p className="text-[11px] text-stone-300">Giọng đọc: Di sản Văn hóa Việt Nam • 04:35</p>
                    </div>
                  </div>

                  {/* Audio Progress Bar */}
                  <div className="w-full md:w-48 flex flex-col gap-1">
                    <div className="w-full h-1.5 bg-black/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#ffb59a] transition-all duration-300"
                        style={{ width: `${audioProgress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-stone-300 font-mono">
                      <span>0{Math.floor((audioProgress * 4.5) / 100)}:{String(Math.floor((audioProgress * 27) % 60)).padStart(2, '0')}</span>
                      <span>04:35</span>
                    </div>
                  </div>
                </div>

                {/* Detailed Narrative */}
                <div className="bg-white rounded-2xl p-6 lg:p-8 border border-[#e2d5c8] shadow-xs space-y-4">
                  <h2 className="font-serif text-2xl font-bold text-stone-900 border-b border-[#f0e6dc] pb-3">
                    Lịch sử hình thành & Không gian văn hoá
                  </h2>
                  <p className="text-sm md:text-base text-stone-700 leading-relaxed font-serif">
                    {village.fullDescription}
                  </p>
                  
                  {/* Highlights Bullet Tags */}
                  <div className="pt-4 border-t border-[#f0e6dc]">
                    <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                      Đặc trưng tiêu biểu
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {(village.highlights || ['Di sản quốc gia', 'Kỹ nghệ cổ truyền']).map((h: string, i: number) => (
                        <div
                          key={i}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#faf6f2] border border-[#e2d5c8] rounded-xl text-xs font-medium text-[#5e2812]"
                        >
                          <span className="material-symbols-outlined text-sm text-[#7a3e26]">check_circle</span>
                          {h}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Media Gallery / Lightbox Grid */}
                <div className="bg-white rounded-2xl p-6 lg:p-8 border border-[#e2d5c8] shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-stone-900">
                        Thư viện hình ảnh tư liệu
                      </h3>
                      <p className="text-xs text-stone-500">Khám phá qua lăng kính nhiếp ảnh truyền thống</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {(village.gallery || [village.coverImage || '']).map((img: string, idx: number) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className="group relative h-36 rounded-xl overflow-hidden cursor-pointer border border-[#e2d5c8]"
                      >
                        <img
                          src={img}
                          alt={`${village.name} ${idx}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <span className="material-symbols-outlined text-white text-2xl">zoom_in</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'history' && (
              <div className="bg-white rounded-2xl p-6 lg:p-8 border border-[#e2d5c8] shadow-xs space-y-6">
                <div>
                  <span className="text-xs font-bold text-[#7a3e26] uppercase tracking-wider block">
                    Bí quyết cha truyền con nối
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                    Quy trình sản xuất tinh hoa 5 bước
                  </h2>
                  <p className="text-xs text-stone-500 mt-1">
                    Mỗi tác phẩm là sự kết tinh của đất, nước, lửa và tâm huyết người thợ thủ công.
                  </p>
                </div>

                {/* Steps Accordion / Interactive Timeline */}
                <div className="space-y-3">
                  {(village.craftProcess || []).map((proc: any, index: number) => (
                    <div
                      key={proc.step}
                      className={`border rounded-2xl p-4 transition-all cursor-pointer ${
                        activeStep === index
                          ? 'border-[#7a3e26] bg-[#faf5f0] shadow-xs'
                          : 'border-[#e8dcd0] bg-white hover:bg-[#fcfaf7]'
                      }`}
                      onClick={() => setActiveStep(index)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
                              activeStep === index
                                ? 'bg-[#5e2812] text-white'
                                : 'bg-[#f0e6dc] text-stone-600'
                            }`}
                          >
                            0{proc.step}
                          </div>
                          <h4 className="font-serif font-bold text-stone-900 text-sm md:text-base">
                            {proc.title}
                          </h4>
                        </div>
                        <span className="material-symbols-outlined text-stone-400">
                          {activeStep === index ? 'expand_less' : 'expand_more'}
                        </span>
                      </div>

                      {activeStep === index && (
                        <p className="text-xs md:text-sm text-stone-600 mt-3 pl-11 leading-relaxed border-t border-[#f0e6dc] pt-3">
                          {proc.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="bg-white rounded-2xl p-6 lg:p-8 border border-[#e2d5c8] shadow-xs space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-stone-900">
                    Bộ sưu tập sản phẩm tiêu biểu
                  </h2>
                  <p className="text-xs text-stone-500 mt-1">
                    Những kiệt tác thủ công đại diện cho tay nghề tài hoa của các nghệ nhân {village.name}.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(village.featuredProducts || []).map((prod: any) => (
                    <div
                      key={prod.id || prod.title}
                      className="border border-[#e2d5c8] rounded-2xl overflow-hidden hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div className="h-44 overflow-hidden relative">
                        <img
                          src={prod.imageUrl}
                          alt={prod.name || prod.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute bottom-2 right-2 px-2.5 py-1 bg-black/70 backdrop-blur-md text-white text-[11px] font-bold rounded-lg font-mono">
                          {prod.priceRange || 'Tuyệt tác'}
                        </span>
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-serif font-bold text-base text-stone-900">{prod.name || prod.title}</h4>
                          <p className="text-xs text-stone-600 mt-1 leading-relaxed line-clamp-3">
                            {prod.description}
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                          <span>Nghệ nhân thực hiện:</span>
                          <strong className="text-[#5e2812]">{village.masterArtisan?.name || 'Nghệ nhân Ưu tú'}</strong>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'artisans' && (
              <div className="bg-white rounded-2xl p-6 lg:p-8 border border-[#e2d5c8] shadow-xs space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-stone-900">
                    Nghệ nhân tiêu biểu & Thế hệ kế nghiệp
                  </h2>
                  <p className="text-xs text-stone-500 mt-1">
                    Gương mặt những người giữ lửa, bảo tồn và thổi luồng sinh khí mới cho làng nghề cổ truyền.
                  </p>
                </div>

                <div className="p-5 bg-[#faf5ef] rounded-2xl border border-[#e8dcd0] flex flex-col md:flex-row items-center gap-5">
                  <img
                    src={village.masterArtisan?.avatarUrl || village.coverImage || ''}
                    alt={village.masterArtisan?.name || 'Nghệ nhân'}
                    className="w-24 h-24 md:w-28 md:h-28 rounded-2xl object-cover border-2 border-[#5e2812] shadow-sm shrink-0"
                  />
                  <div className="space-y-1.5 text-center md:text-left">
                    <span className="px-2.5 py-0.5 bg-[#5e2812] text-white text-[11px] font-bold rounded-md inline-block uppercase">
                      {village.masterArtisan?.title || 'Nghệ Nhân Ưu Tú'}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-stone-900">
                      {village.masterArtisan?.name || 'Bàn tay vàng di sản'}
                    </h3>
                    <p className="text-xs text-stone-500 font-medium">
                      {village.masterArtisan?.experience || '40 năm'} gắn bó với nghề • {village.masterArtisan?.specialty || village.craftType}
                    </p>
                    <p className="text-xs text-stone-600 leading-relaxed font-serif pt-1">
                      {village.masterArtisan?.bio || village.summary}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'travel' && (
              <div className="bg-white rounded-2xl p-6 lg:p-8 border border-[#e2d5c8] shadow-xs space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-stone-900">
                    Cẩm nang du lịch & Trải nghiệm thực tế
                  </h2>
                  <p className="text-xs text-stone-500 mt-1">
                    Thông tin chỉ đường, thời điểm ghé thăm và các gói workshop thực hành.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#fbf8f5] rounded-xl border border-[#ede2d6] space-y-2 text-xs">
                    <div className="flex items-center gap-2 font-bold text-stone-800">
                      <span className="material-symbols-outlined text-base text-[#7a3e26]">directions_car</span>
                      Phương tiện di chuyển
                    </div>
                    <p className="text-stone-600 leading-relaxed">
                      Cách trung tâm Hà Nội khoảng 15km về phía Đông Nam. Có thể di chuyển bằng xe máy, ô tô cá nhân hoặc xe buýt số 47A từ bến xe Long Biên (chuyến cách 15 phút).
                    </p>
                  </div>

                  <div className="p-4 bg-[#fbf8f5] rounded-xl border border-[#ede2d6] space-y-2 text-xs">
                    <div className="flex items-center gap-2 font-bold text-stone-800">
                      <span className="material-symbols-outlined text-base text-[#7a3e26]">wb_sunny</span>
                      Thời điểm lý tưởng
                    </div>
                    <p className="text-stone-600 leading-relaxed">
                      Mùa thu (tháng 9 - 11) và mùa xuân (tháng 1 - 3 âm lịch) khi tiết trời mát mẻ và diễn ra nhiều lễ hội dâng hương thánh sư khai sáng nghề.
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#f0e6dc] pt-5">
                  <h4 className="font-serif font-bold text-stone-900 text-lg mb-3">
                    Gói Workshop "Một Ngày Làm Nghệ Nhân"
                  </h4>
                  <div className="bg-[#f7efe6] border border-[#e8dcd0] rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="px-2.5 py-0.5 bg-[#7a3e26] text-white text-[10px] font-bold rounded-md uppercase">
                        Trải nghiệm được yêu thích nhất
                      </span>
                      <h5 className="font-serif font-bold text-stone-900 text-base">
                        Tự tay vuốt gốm trên bàn xoay & nung men truyền thống
                      </h5>
                      <p className="text-xs text-stone-600">
                        Thời lượng: 3.5 giờ • Có nghệ nhân hướng dẫn 1:1 • Mang thành phẩm về
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-lg font-bold text-[#5e2812] font-mono block">
                        350.000 VNĐ / khách
                      </span>
                      <button
                        onClick={() => setBookingModalOpen(true)}
                        className="mt-2 px-5 py-2 bg-[#5e2812] hover:bg-[#431c0c] text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                      >
                        Đăng ký ngay
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar Column (1 col) */}
          <div className="space-y-6">
            {/* Quick Visiting Information Card */}
            <div className="bg-white rounded-2xl p-5 border border-[#e2d5c8] shadow-xs space-y-4">
              <h3 className="font-serif font-bold text-base text-stone-900 border-b border-[#f0e6dc] pb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-lg text-[#7a3e26]">contact_support</span>
                Thông tin hành chính & Đón khách
              </h3>

              <div className="space-y-2.5 text-xs text-stone-700">
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-stone-400 text-base shrink-0 mt-0.5">location_on</span>
                  <div>
                    <span className="font-bold block text-stone-800">Địa chỉ cụ thể:</span>
                    <span>{village.district}, Tỉnh/Thành phố {village.province}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-stone-400 text-base shrink-0 mt-0.5">schedule</span>
                  <div>
                    <span className="font-bold block text-stone-800">Giờ mở cửa đón khách:</span>
                    <span>{village.visitingHours || '07:30 - 18:00'} (Tất cả các ngày trong tuần)</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-stone-400 text-base shrink-0 mt-0.5">payments</span>
                  <div>
                    <span className="font-bold block text-stone-800">Vé vào làng & Bảo tàng:</span>
                    <span>{village.ticketPrice || 'Miễn phí tham quan'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-stone-400 text-base shrink-0 mt-0.5">call</span>
                  <div>
                    <span className="font-bold block text-stone-800">Đường dây hỗ trợ du khách:</span>
                    <span className="font-mono text-[#5e2812] font-bold">1900 8866 (08:00 - 18:00)</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => onOpenMap(village.id)}
                  className="w-full py-2 px-3 bg-[#5e2812] hover:bg-[#431c0c] text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span className="material-symbols-outlined text-base">near_me</span>
                  Xem trên Bản đồ GIS
                </button>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${village.name}, ${village.district}, ${village.province}, Việt Nam`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 bg-[#faf5ef] hover:bg-[#f0e6dc] border border-[#e2d5c8] text-[#5e2812] text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base text-[#ea4335]">map</span>
                  Mở vị trí trên Google Maps ↗
                </a>
              </div>
            </div>

            {/* Related Heritage Villages */}
            <div className="bg-white rounded-2xl p-5 border border-[#e2d5c8] shadow-xs space-y-3">
              <h3 className="font-serif font-bold text-base text-stone-900 border-b border-[#f0e6dc] pb-2">
                Làng nghề cùng vùng miền
              </h3>

              <div className="space-y-3">
                {relatedVillages.map((rv) => (
                  <div
                    key={rv.id}
                    onClick={() => onNavigateToVillage(rv.id)}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#faf5ef] cursor-pointer transition-colors group border border-transparent hover:border-[#e8dcd0]"
                  >
                    <img
                      src={rv.imageUrl}
                      alt={rv.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-bold text-xs text-stone-900 group-hover:text-[#5e2812] truncate">
                        {rv.name}
                      </h4>
                      <p className="text-[11px] text-stone-500 truncate">{rv.craftType}</p>
                      <span className="text-[10px] text-amber-600 font-bold flex items-center gap-0.5 mt-0.5">
                        <span className="material-symbols-outlined text-xs fill-1">star</span>
                        {rv.rating}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-stone-300 w-10 h-10 flex items-center justify-center rounded-full bg-white/10"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
          <img
            src={selectedImage}
            alt="Enlarged view"
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
          />
        </div>
      )}

      {/* Booking Workshop Modal */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-[#e2d5c8] relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setBookingModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            {bookingSuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl">
                  <span className="material-symbols-outlined text-3xl">check</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Đăng ký trải nghiệm thành công!
                </h3>
                <p className="text-xs text-stone-600">
                  Ban quản lý làng nghề {village.name} sẽ liên hệ xác nhận lịch hẹn qua điện thoại trong vòng 24 giờ.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-[#7a3e26] uppercase tracking-wider block">
                    Đăng ký workshop
                  </span>
                  <h3 className="font-serif text-xl font-bold text-stone-900">
                    Trải nghiệm tại {village.name}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Họ và tên</label>
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={bookingFormData.name}
                      onChange={(e) => setBookingFormData({ ...bookingFormData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-[#e2d5c8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7a3e26]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Số điện thoại</label>
                    <input
                      type="tel"
                      required
                      placeholder="0987 654 321"
                      value={bookingFormData.phone}
                      onChange={(e) => setBookingFormData({ ...bookingFormData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-[#e2d5c8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7a3e26]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Ngày dự kiến</label>
                    <input
                      type="date"
                      required
                      value={bookingFormData.date}
                      onChange={(e) => setBookingFormData({ ...bookingFormData, date: e.target.value })}
                      className="w-full px-3 py-2 border border-[#e2d5c8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7a3e26]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Số lượng khách</label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={bookingFormData.participants}
                      onChange={(e) => setBookingFormData({ ...bookingFormData, participants: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-[#e2d5c8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7a3e26]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1 text-xs">Ghi chú hoặc yêu cầu đặc biệt</label>
                  <textarea
                    rows={2}
                    placeholder="Ví dụ: đoàn có trẻ nhỏ cần hướng dẫn viên chuyên biệt..."
                    value={bookingFormData.notes}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, notes: e.target.value })}
                    className="w-full px-3 py-2 border border-[#e2d5c8] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#7a3e26]"
                  ></textarea>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setBookingModalOpen(false)}
                    className="flex-1 py-2.5 border border-[#e2d5c8] text-stone-700 text-xs font-semibold rounded-xl hover:bg-stone-50"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#5e2812] hover:bg-[#431c0c] text-white text-xs font-bold rounded-xl shadow-md"
                  >
                    Xác nhận đặt lịch
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

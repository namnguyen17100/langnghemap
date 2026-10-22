/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Làng Nghề Map - Main Header Component
 */

import React, { useState } from 'react';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string, villageId?: string) => void;
  bookmarkCount?: number;
  bookmarksCount?: number;
  onOpenBookmarks: () => void;
  onOpenBackendInfo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  bookmarkCount = 0,
  bookmarksCount,
  onOpenBookmarks,
  onOpenBackendInfo,
}) => {
  const count = bookmarksCount !== undefined ? bookmarksCount : bookmarkCount;
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('ban-do');
    }
  };

  return (
    <header className="sticky top-0 left-0 w-full z-50 shrink-0 bg-[#fcf9f4]/95 backdrop-blur-xl border-b border-[#e5e2dd] shadow-[0_8px_24px_-4px_rgba(122,62,38,0.06)]">
      <div className="h-20 w-full px-4 md:px-8 max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-6 flex-shrink-0">
          <button
            onClick={() => onNavigate('trang-chu')}
            className="flex items-center gap-2.5 group text-left transition-transform hover:scale-[1.01]"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5e2812] to-[#ab3427] flex items-center justify-center text-white shadow-md">
              <span className="material-symbols-outlined text-[24px]">explore</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-[20px] font-bold text-[#5e2812] tracking-tight group-hover:text-[#7a3e26] transition-colors leading-tight">
                Làng Nghề Map
              </span>
              <span className="text-[11px] font-semibold text-[#86736d] uppercase tracking-wider">
                Bản Đồ Di Sản Số
              </span>
            </div>
          </button>

          {/* Quick Header Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden xl:flex items-center bg-[#f6f3ee] px-3.5 py-1.5 rounded-full border border-[#d8c2ba]/40 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] w-72 focus-within:ring-2 focus-within:ring-[#5e2812]/20 transition-all"
          >
            <span className="material-symbols-outlined text-[#86736d] text-[20px] mr-2">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm làng nghề, tỉnh thành..."
              className="bg-transparent border-none outline-none text-[13px] text-[#1c1c19] placeholder:text-[#86736d] w-full focus:ring-0"
            />
          </form>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5 flex-shrink-0">
          {[
            { id: 'trang-chu', label: 'Trang chủ', icon: 'home' },
            { id: 'ban-do', label: 'Bản đồ tương tác', icon: 'map' },
            { id: 'chi-tiet-lang-nghe', label: 'Chi tiết làng nghề', icon: 'library_books' },
            { id: 'trac-nghiem', label: 'Trắc nghiệm tri thức', icon: 'psychology' },
            { id: 'dong-gop-de-xuat', label: 'Đóng góp đề xuất', icon: 'add_location_alt' },
          ].map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[14px] font-medium transition-all ${
                  isActive
                    ? 'bg-[#7a3e26] text-white font-semibold shadow-sm'
                    : 'text-[#53433e] hover:text-[#1c1c19] hover:bg-[#f0ede9]'
                }`}
              >
                <span className="material-symbols-outlined text-[17px]">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          {/* Bookmarks Counter Button */}
          <button
            onClick={onOpenBookmarks}
            className="relative p-2 rounded-lg text-[#53433e] hover:text-[#1c1c19] hover:bg-[#f0ede9] transition-all flex items-center justify-center"
            title="Danh sách di sản đã lưu"
          >
            <span className="material-symbols-outlined text-[22px]">bookmark</span>
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#ab3427] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none shadow-sm">
                {count}
              </span>
            )}
          </button>

          {/* Proposal CTA Button */}
          <button
            onClick={() => onNavigate('dong-gop')}
            className="hidden md:inline-flex items-center gap-1.5 bg-[#5e2812] text-white hover:bg-[#7a3e26] px-3.5 py-1.5 rounded-lg text-[13px] font-semibold shadow-[0_4px_12px_rgba(94,40,18,0.15)] transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">add_location_alt</span>
            <span>Đề xuất làng nghề</span>
          </button>

          {/* User Profile Avatar */}
          <div
            className="w-8 h-8 rounded-full bg-[#5e2812] flex items-center justify-center text-white cursor-pointer hover:ring-2 hover:ring-[#ab3427] transition-all shadow-sm"
            title="Đại sứ Di sản (Người dùng)"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#53433e] hover:bg-[#f0ede9]"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fcf9f4] border-t border-[#e5e2dd] px-4 py-3 flex flex-col gap-1 shadow-xl">
          {[
            { id: 'trang-chu', label: 'Trang chủ', icon: 'home' },
            { id: 'ban-do', label: 'Bản đồ tương tác', icon: 'map' },
            { id: 'chi-tiet-lang-nghe', label: 'Chi tiết làng nghề', icon: 'library_books' },
            { id: 'trac-nghiem', label: 'Trắc nghiệm tri thức', icon: 'psychology' },
            { id: 'dong-gop-de-xuat', label: 'Đóng góp đề xuất', icon: 'add_location_alt' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2 p-2.5 rounded-lg text-left text-[14px] ${
                currentTab === item.id
                  ? 'bg-[#7a3e26] text-white font-semibold'
                  : 'text-[#53433e] hover:bg-[#f0ede9]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Làng Nghề Map - Vietnam Heritage Craft Village Digital Map Platform
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HomeView } from './components/home/HomeView';
import { InteractiveMapView } from './components/map/InteractiveMapView';
import { VillageDetailView } from './components/village/VillageDetailView';
import { QuizView } from './components/quiz/QuizView';
import { ContributeView } from './components/contribute/ContributeView';
import { BookmarksDrawer } from './components/bookmarks/BookmarksDrawer';
import { BackendModal } from './components/backend-info/BackendModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('trang-chu');
  const [selectedVillageId, setSelectedVillageId] = useState<string>('bat-trang');
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('langnghe_bookmarks');
      return saved ? JSON.parse(saved) : ['bat-trang', 'van-phuc'];
    } catch {
      return ['bat-trang', 'van-phuc'];
    }
  });
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isBackendModalOpen, setIsBackendModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('langnghe_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.error('Failed to save bookmarks', e);
    }
  }, [bookmarks]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleToggleBookmark = (villageId: string) => {
    setBookmarks((prev) => {
      const exists = prev.includes(villageId);
      if (exists) {
        showToast('Đã bỏ lưu làng nghề khỏi danh sách quan tâm.');
        return prev.filter((id) => id !== villageId);
      } else {
        showToast('Đã lưu làng nghề vào bộ sưu tập di sản yêu thích!');
        return [...prev, villageId];
      }
    });
  };

  const handleNavigate = (tab: string, villageId?: string) => {
    setCurrentTab(tab);
    if (villageId) {
      setSelectedVillageId(villageId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectVillage = (villageId: string) => {
    setSelectedVillageId(villageId);
    setCurrentTab('chi-tiet-lang-nghe');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenMapWithVillage = (villageId: string) => {
    setSelectedVillageId(villageId);
    setCurrentTab('ban-do');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`flex flex-col bg-[#faf6f0] text-stone-800 font-sans selection:bg-[#ffb59a] selection:text-[#370d00] ${
      currentTab === 'ban-do' ? 'h-screen overflow-hidden' : 'min-h-screen'
    }`}>
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        bookmarksCount={bookmarks.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenBackendInfo={() => setIsBackendModalOpen(true)}
      />

      {/* Main View Router */}
      <main className={`flex-1 flex flex-col min-h-0 ${currentTab === 'ban-do' ? 'overflow-hidden' : ''}`}>
        {currentTab === 'trang-chu' && (
          <HomeView
            onNavigate={handleNavigate}
            onSelectVillage={handleSelectVillage}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {currentTab === 'ban-do' && (
          <InteractiveMapView
            onSelectVillage={handleSelectVillage}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {currentTab === 'chi-tiet-lang-nghe' && (
          <VillageDetailView
            villageId={selectedVillageId}
            onBack={() => setCurrentTab('trang-chu')}
            onNavigateToVillage={handleSelectVillage}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            onOpenMap={handleOpenMapWithVillage}
          />
        )}

        {currentTab === 'trac-nghiem' && (
          <QuizView onNavigateToVillage={handleSelectVillage} />
        )}

        {currentTab === 'dong-gop' && (
          <ContributeView onSuccessNavigate={() => setCurrentTab('trang-chu')} />
        )}
      </main>

      {/* Global Footer (shown on all pages except full-screen map mode) */}
      {currentTab !== 'ban-do' && (
        <Footer
          onNavigate={handleNavigate}
          onOpenBackendInfo={() => setIsBackendModalOpen(true)}
        />
      )}

      {/* Bookmarks Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarks={bookmarks}
        onSelectVillage={(id) => {
          setIsBookmarksOpen(false);
          handleSelectVillage(id);
        }}
        onRemoveBookmark={handleToggleBookmark}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#370d00] text-white text-xs md:text-sm px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-bottom duration-300 border border-[#ffb59a]/30">
          <span className="material-symbols-outlined text-amber-400 text-lg">info</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

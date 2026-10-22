/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Làng Nghề Map - Bookmarks Drawer Component
 */

import React from 'react';
import { Village } from '../../types';

import { VillageService } from '../../services/villageService';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedVillages?: Village[];
  bookmarks?: string[];
  onSelectVillage: (villageId: string) => void;
  onToggleBookmark?: (villageId: string) => void;
  onRemoveBookmark?: (villageId: string) => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedVillages,
  bookmarks,
  onSelectVillage,
  onToggleBookmark,
  onRemoveBookmark,
}) => {
  if (!isOpen) return null;

  const villages: Village[] = bookmarkedVillages || (bookmarks
    ? VillageService.getAllVillages().filter((v) => bookmarks.includes(v.id))
    : []);
  const handleToggle = onRemoveBookmark || onToggleBookmark || (() => {});

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fcf9f4] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 bg-[#f6f3ee] border-b border-[#e5e2dd] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ab3427] text-[24px]">bookmark</span>
              <div>
                <h3 className="text-[17px] font-bold text-[#5e2812]">Tủ Lưu Trữ Di Sản</h3>
                <p className="text-[12px] text-[#86736d]">
                  {villages.length} làng nghề đã được lưu vào bộ sưu tập
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#86736d] hover:text-[#1c1c19] hover:bg-[#ebe8e3] transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* List of Bookmarked Villages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {villages.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-[#f0ede9] flex items-center justify-center text-[#86736d]">
                  <span className="material-symbols-outlined text-[32px]">bookmark_border</span>
                </div>
                <h4 className="text-[16px] font-semibold text-[#5e2812]">Chưa có di sản nào được lưu</h4>
                <p className="text-[13px] text-[#53433e] max-w-xs">
                  Nhấn biểu tượng dấu trang ở bất kỳ làng nghề nào trên bản đồ để lưu vào đây.
                </p>
              </div>
            ) : (
              villages.map((village) => (
                <div
                  key={village.id}
                  className="p-3 rounded-xl bg-white border border-[#e5e2dd] hover:border-[#ab3427] shadow-sm transition-all group flex gap-3 relative"
                >
                  <img
                    src={village.coverImage || village.imageUrl || ''}
                    alt={village.name}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0 bg-[#f0ede9]"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#ab3427]">
                          {village.sectorTag || village.craftType}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggle(village.id);
                          }}
                          className="text-[#ab3427] hover:scale-110 transition-transform p-0.5"
                          title="Bỏ lưu"
                        >
                          <span className="material-symbols-outlined text-[18px]">bookmark</span>
                        </button>
                      </div>
                      <h4
                        onClick={() => {
                          onSelectVillage(village.id);
                          onClose();
                        }}
                        className="text-[15px] font-bold text-[#1c1c19] group-hover:text-[#5e2812] cursor-pointer truncate mt-0.5"
                      >
                        {village.name}
                      </h4>
                      <p className="text-[12px] text-[#53433e] truncate">
                        {village.district}, {village.province}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-[11px] text-[#86736d]">
                      <span>{village.ageText}</span>
                      <button
                        onClick={() => {
                          onSelectVillage(village.id);
                          onClose();
                        }}
                        className="text-[#5e2812] font-semibold hover:underline flex items-center gap-0.5"
                      >
                        <span>Xem chi tiết</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer of Drawer */}
          <div className="p-4 bg-[#f6f3ee] border-t border-[#e5e2dd] flex items-center justify-between text-[12px] text-[#86736d]">
            <span>Đồng bộ theo phiên làm việc</span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#5e2812] text-white rounded-lg font-medium hover:bg-[#7a3e26] transition-colors"
            >
              Đóng lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

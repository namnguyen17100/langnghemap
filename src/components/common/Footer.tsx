/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Làng Nghề Map - Main Footer Component
 */

import React from 'react';

interface FooterProps {
  onNavigate: (tab: string, villageId?: string) => void;
  onOpenBackendInfo: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBackendInfo }) => {
  return (
    <footer className="w-full bg-[#f6f3ee] text-[#1c1c19] border-t border-[#e5e2dd]">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-10">
          {/* Col 1: About the Platform */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5e2812] to-[#ab3427] flex items-center justify-center text-white shadow-sm">
                <span className="material-symbols-outlined text-[18px]">explore</span>
              </div>
              <span className="font-headline-sm text-[20px] font-bold text-[#5e2812] tracking-tight">
                LÀNG NGHỀ MAP
              </span>
            </div>
            <p className="text-[14px] leading-relaxed text-[#53433e] max-w-sm">
              Bản đồ số khám phá và gìn giữ giá trị di sản làng nghề thủ công truyền thống Việt Nam. Dự án bảo tồn tư liệu và kết nối cộng đồng nghệ nhân ba miền.
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="material-symbols-outlined text-[#86736d] text-[18px]">captive_portal</span>
              <span className="text-[13px] text-[#53433e] font-medium">langnghemap.ai.studio</span>
            </div>
          </div>

          {/* Col 2: Project Dossier */}
          <div className="lg:col-span-3 flex flex-col gap-2.5">
            <span className="text-[16px] font-bold text-[#5e2812]">Hồ Sơ Đề Tài</span>
            <div className="flex flex-col gap-2 text-[13px] text-[#53433e]">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[#ab3427] text-[16px] mt-0.5">folder_special</span>
                <p>
                  <strong className="text-[#1c1c19]">Đề tài E01:</strong> Bản đồ làng nghề truyền thống
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[#ab3427] text-[16px] mt-0.5">person_edit</span>
                <p>
                  <strong className="text-[#1c1c19]">Thực hiện:</strong> Bùi Trung Nam
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[#ab3427] text-[16px] mt-0.5">lan</span>
                <p>
                  <strong className="text-[#1c1c19]">Mục tiêu:</strong> Lưu trữ di sản và số hóa tọa độ văn hóa
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[#ab3427] text-[16px] mt-0.5">travel_explore</span>
                <p>
                  <strong className="text-[#1c1c19]">Phạm vi:</strong> 34 Tỉnh/Thành phố toàn quốc
                </p>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="lg:col-span-2 flex flex-col gap-2.5">
            <span className="text-[16px] font-bold text-[#5e2812]">Liên Kết Nhanh</span>
            <ul className="flex flex-col gap-2 text-[13px] text-[#53433e]">
              <li>
                <button
                  onClick={() => onNavigate('trang-chu')}
                  className="hover:text-[#ab3427] transition-colors text-left"
                >
                  Trang chủ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ban-do')}
                  className="hover:text-[#ab3427] transition-colors text-left"
                >
                  Bản đồ tương tác GIS
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('chi-tiet-lang-nghe', 'bat-trang')}
                  className="hover:text-[#ab3427] transition-colors text-left"
                >
                  Hồ sơ Làng Gốm Bát Tràng
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('trac-nghiem')}
                  className="hover:text-[#ab3427] transition-colors text-left"
                >
                  Trắc nghiệm tri thức
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dong-gop-de-xuat')}
                  className="hover:text-[#ab3427] transition-colors text-left"
                >
                  Đóng góp & Đề xuất
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Technology & References */}
          <div className="lg:col-span-3 flex flex-col gap-2.5">
            <span className="text-[16px] font-bold text-[#5e2812]">Công Nghệ & Tham Khảo</span>
            <ul className="flex flex-col gap-2 text-[13px] text-[#53433e]">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#86736d] text-[16px]">map</span>
                <span>OpenStreetMap & Leaflet JS Engine</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#86736d] text-[16px]">account_balance</span>
                <span>Viện Văn hóa Nghệ thuật Quốc gia (VICAS)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#86736d] text-[16px]">assured_workload</span>
                <span>Bộ Văn hóa, Thể thao và Du lịch (VHTTDL)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#86736d] text-[16px]">verified</span>
                <span>Cục Di sản Văn hóa Việt Nam</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#86736d] text-[16px]">travel_explore</span>
                <span>Cơ sở Dữ liệu Địa lý Không gian Di sản (GIS)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#e5e2dd] flex flex-col md:flex-row items-center justify-between gap-3 text-[12px] text-[#86736d]">
          <p>© 2025 - 2026 Làng Nghề Map. Dự án nghiên cứu bảo tồn di sản thủ công Việt Nam.</p>
          <div className="flex items-center gap-4 text-[#53433e] font-medium">
            <span>Đề tài E01</span>
            <span>•</span>
            <span>Bùi Trung Nam</span>
            <span>•</span>
            <span className="text-[#5e2812] font-semibold">langnghemap.ai.studio</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

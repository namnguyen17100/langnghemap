/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Làng Nghề Map - Spring Boot & MySQL Backend Architecture Specification Modal
 */

import React, { useState } from 'react';

interface BackendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BackendModal: React.FC<BackendModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'entities' | 'controllers' | 'security' | 'mysql'>('overview');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-[#fcf9f4] w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[#d8c2ba]">
        {/* Modal Header */}
        <div className="p-5 bg-[#5e2812] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[24px]">developer_board</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[18px] font-bold">Kiến Trúc Backend: Spring Boot • Hibernate • MySQL</h3>
                <span className="px-2 py-0.5 rounded-full bg-[#134010] text-[#bcf0ae] text-[11px] font-mono font-bold">
                  v3.2.x + Java 21
                </span>
              </div>
              <p className="text-[12px] text-[#ffdbce] mt-0.5">
                Đề tài E01 • Tài liệu kỹ thuật tích hợp REST API & Bảo mật Spring Security JWT
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#e5e2dd] bg-[#f6f3ee] px-4 overflow-x-auto">
          {[
            { id: 'overview', label: '1. Kiến Trúc & Endpoints', icon: 'account_tree' },
            { id: 'entities', label: '2. JPA Entities', icon: 'database' },
            { id: 'controllers', label: '3. Spring REST Controllers', icon: 'api' },
            { id: 'security', label: '4. Spring Security & JWT', icon: 'shield_person' },
            { id: 'mysql', label: '5. Schema MySQL (DDL)', icon: 'table_chart' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-4 py-3 text-[13px] font-medium border-b-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-[#ab3427] text-[#ab3427] font-bold bg-[#fcf9f4]'
                  : 'border-transparent text-[#53433e] hover:text-[#1c1c19]'
              }`}
            >
              <span className="material-symbols-outlined text-[17px]">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 text-[14px]">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white border border-[#e5e2dd]">
                <h4 className="font-bold text-[#5e2812] text-[15px] mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#ab3427]">hub</span>
                  Sơ Đồ Phân Tầng Dịch Vụ (Service-Oriented Architecture)
                </h4>
                <div className="font-mono text-[12px] bg-[#1c1c19] text-[#a1d494] p-4 rounded-lg overflow-x-auto leading-relaxed">
{`React Frontend (Vite + Tailwind / Bootstrap)
       │
       ▼ (HTTP/HTTPS JSON + Bearer JWT Token)
Spring Boot Backend (Port 8080)
   ├── Security Filter: JwtAuthenticationFilter -> SecurityConfig (Stateless)
   ├── REST Controllers:
   │     ├── VillageController        (/api/v1/villages)
   │     ├── QuizController           (/api/v1/quiz)
   │     ├── ContributionController   (/api/v1/contributions)
   │     └── AuthController           (/api/v1/auth)
   ├── Service Layer:
   │     ├── VillageServiceImpl
   │     ├── QuizServiceImpl
   │     └── ContributionServiceImpl
   ├── Data Access Layer (Spring Data JPA):
   │     ├── VillageRepository (extends JpaRepository<Village, String>)
   │     └── CategoryRepository, QuizRepository, etc.
   └── Database: MySQL 8.0 (InnoDB, utf8mb4) via Hibernate ORM`}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#e5e2dd]">
                <h4 className="font-bold text-[#5e2812] text-[15px] mb-2">Bảng Danh Sách REST Endpoints Chuẩn</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-[13px]">
                    <thead>
                      <tr className="border-b border-[#e5e2dd] bg-[#f6f3ee] text-[#5e2812]">
                        <th className="p-2">Phương thức</th>
                        <th className="p-2">Endpoint</th>
                        <th className="p-2">Mô tả</th>
                        <th className="p-2">Xác thực</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e5e2dd]">
                      <tr>
                        <td className="p-2"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[11px]">GET</span></td>
                        <td className="p-2 font-mono text-[12px]">/api/v1/villages</td>
                        <td className="p-2">Lấy danh sách làng nghề (lọc theo vùng, ngành nghề, tìm kiếm)</td>
                        <td className="p-2 text-[#86736d]">Công khai</td>
                      </tr>
                      <tr>
                        <td className="p-2"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[11px]">GET</span></td>
                        <td className="p-2 font-mono text-[12px]">/api/v1/villages/{'{id}'}</td>
                        <td className="p-2">Hồ sơ chi tiết làng nghề (lịch sử, men, nghệ nhân, cẩm nang)</td>
                        <td className="p-2 text-[#86736d]">Công khai</td>
                      </tr>
                      <tr>
                        <td className="p-2"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[11px]">GET</span></td>
                        <td className="p-2 font-mono text-[12px]">/api/v1/quiz/questions</td>
                        <td className="p-2">Danh sách 15 câu khảo nghiệm văn hóa di sản</td>
                        <td className="p-2 text-[#86736d]">Công khai</td>
                      </tr>
                      <tr>
                        <td className="p-2"><span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[11px]">POST</span></td>
                        <td className="p-2 font-mono text-[12px]">/api/v1/contributions</td>
                        <td className="p-2">Gửi đề xuất làng nghề mới hoặc bổ sung tư liệu</td>
                        <td className="p-2 text-[#86736d]">Công khai / Optional JWT</td>
                      </tr>
                      <tr>
                        <td className="p-2"><span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold text-[11px]">POST</span></td>
                        <td className="p-2 font-mono text-[12px]">/api/v1/auth/login</td>
                        <td className="p-2">Đăng nhập tài khoản nghệ nhân / quản trị viên & cấp JWT Token</td>
                        <td className="p-2 text-[#86736d]">Spring Security</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'entities' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#5e2812]">Entity: Village.java (JPA / Hibernate)</span>
                <button
                  onClick={() => handleCopy(`package com.langnghemap.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "villages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Village {
    @Id
    @Column(length = 64)
    private String id; // e.g. "bat-trang"

    @Column(nullable = false, length = 150)
    private String name;

    @Column(name = "sub_title", length = 255)
    private String subTitle;

    @Column(name = "category_id", length = 64)
    private String categoryId;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private Region region; // BAC, TRUNG, NAM

    private String province;
    private String district;
    private String commune;

    private Double latitude;
    private Double longitude;
    private Integer ageYears;

    @Enumerated(EnumType.STRING)
    private HeritageLevel heritageLevel;

    @Column(columnDefinition = "TEXT")
    private String summary;

    @Column(columnDefinition = "LONGTEXT")
    private String historicalContext;

    private Double rating;
    private Integer activeKilns;
    private String coverImageUrl;
}`)}
                  className="px-3 py-1 bg-white border border-[#d8c2ba] rounded-lg text-[12px] font-semibold text-[#5e2812] hover:bg-[#f0ede9]"
                >
                  {copied ? '✓ Đã sao chép!' : 'Sao chép Java code'}
                </button>
              </div>

              <div className="font-mono text-[12px] bg-[#1c1c19] text-gray-200 p-4 rounded-lg overflow-x-auto">
{`package com.langnghemap.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "villages")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Village {
    @Id
    @Column(length = 64)
    private String id; // "bat-trang", "van-phuc", "dong-ho"

    @Column(nullable = false, length = 150)
    private String name;

    @Column(name = "sub_title", length = 255)
    private String subTitle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @Enumerated(EnumType.STRING)
    private Region region; // BAC, TRUNG, NAM

    private String province;
    private String district;
    private String commune;

    private Double latitude;
    private Double longitude;
    private Integer ageYears;

    @Enumerated(EnumType.STRING)
    private HeritageLevel heritageLevel; // UNESCO, QUOC_GIA, CAP_TINH

    @Column(columnDefinition = "TEXT")
    private String summary;

    private Double rating;
    private Integer activeKilns;
    private String coverImageUrl;
}`}
              </div>
            </div>
          )}

          {activeTab === 'controllers' && (
            <div className="space-y-4">
              <span className="font-semibold text-[#5e2812]">Controller: VillageController.java</span>
              <div className="font-mono text-[12px] bg-[#1c1c19] text-gray-200 p-4 rounded-lg overflow-x-auto">
{`package com.langnghemap.controller;

import com.langnghemap.dto.VillageResponseDTO;
import com.langnghemap.service.VillageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/villages")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "https://*.run.app"})
public class VillageController {

    private final VillageService villageService;

    @GetMapping
    public ResponseEntity<List<VillageResponseDTO>> getAllVillages(
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(villageService.findVillages(region, category, search));
    }

    @GetMapping("/{id}")
    public ResponseEntity<VillageResponseDTO> getVillageById(@PathVariable String id) {
        return ResponseEntity.ok(villageService.getVillageDetails(id));
    }
}`}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4">
              <span className="font-semibold text-[#5e2812]">Spring Security 6 Configuration (SecurityConfig.java)</span>
              <div className="font-mono text-[12px] bg-[#1c1c19] text-gray-200 p-4 rounded-lg overflow-x-auto">
{`package com.langnghemap.config;

import com.langnghemap.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/auth/**").permitAll()
                .requestMatchers("/api/v1/villages/**").permitAll()
                .requestMatchers("/api/v1/quiz/**").permitAll()
                .requestMatchers("/api/v1/contributions/**").permitAll()
                .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }
}`}
              </div>
            </div>
          )}

          {activeTab === 'mysql' && (
            <div className="space-y-4">
              <span className="font-semibold text-[#5e2812]">MySQL 8.0 DDL Schema Script</span>
              <div className="font-mono text-[12px] bg-[#1c1c19] text-gray-200 p-4 rounded-lg overflow-x-auto">
{`CREATE DATABASE IF NOT EXISTS langnghemap_db 
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE langnghemap_db;

CREATE TABLE categories (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon_name VARCHAR(50),
    description TEXT
) ENGINE=InnoDB;

CREATE TABLE villages (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    sub_title VARCHAR(255),
    category_id VARCHAR(64),
    region ENUM('bac', 'trung', 'nam') NOT NULL,
    province VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    commune VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 6) NOT NULL,
    longitude DECIMAL(10, 6) NOT NULL,
    age_years INT DEFAULT 100,
    heritage_level VARCHAR(50) DEFAULT 'QuocGia',
    rating DECIMAL(2,1) DEFAULT 4.8,
    active_kilns INT DEFAULT 0,
    summary TEXT,
    cover_image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_village_category FOREIGN KEY (category_id) REFERENCES categories(id)
) ENGINE=InnoDB;`}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#f6f3ee] border-t border-[#e5e2dd] flex items-center justify-between">
          <div className="text-[12px] text-[#53433e]">
            Đã sẵn sàng cấu hình URL: <code className="bg-white px-2 py-0.5 rounded border border-[#d8c2ba]">VITE_API_BASE_URL</code>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#5e2812] text-white hover:bg-[#7a3e26] font-medium text-[13px] transition-colors"
          >
            Đóng bảng đặc tả
          </button>
        </div>
      </div>
    </div>
  );
};

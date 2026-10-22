/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Làng Nghề Map - Data Transfer Objects (DTO) and Entities
 * Designed to mirror Java Spring Boot Entity Models:
 * - com.langnghemap.entity.Village
 * - com.langnghemap.entity.Category
 * - com.langnghemap.entity.Artisan
 * - com.langnghemap.entity.QuizQuestion
 * - com.langnghemap.entity.ContributionRequest
 */

export type Region = 'all' | 'bac' | 'trung' | 'nam';
export type HeritageLevel = 'UNESCO' | 'QuocGia' | 'CapTinh' | 'All';

export interface Coordinates {
  lat: number;
  lng: number;
  display?: string;
}

export interface HistoryMilestone {
  era: string; // e.g. "1010", "XVI", "XIX", "2025"
  dynastyTag: string; // e.g. "Thời Lý", "Thời Lê - Mạc"
  title: string;
  description: string;
  highlightText: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  badge?: string;
  isKeySecret?: boolean;
}

export interface Masterpiece {
  id?: string;
  name?: string;
  title: string;
  description: string;
  tag?: string;
  age?: string;
  feature?: string;
  imageUrl: string;
  priceRange?: string;
}

export interface MasterArtisan {
  id?: string;
  name: string;
  title: string; // "Nghệ Nhân Nhân Dân", "Nghệ Nhân Ưu Tú"
  awardedYear?: string;
  lineage?: string;
  experience?: string;
  specialty?: string;
  bio: string;
  honors?: string[];
  avatarUrl: string;
}

export type Artisan = MasterArtisan;

export interface TransportRoute {
  type: 'bus' | 'motorcycle' | 'boat';
  title: string;
  description: string;
}

export interface Village {
  id: string;
  slug?: string;
  name: string;
  subTitle?: string;
  categoryId: string;
  categoryName?: string;
  craftType?: string;
  sectorTag?: string; // "Gốm Sứ Triều Lý", "Tơ Lụa Cung Đình", etc.
  region: 'bac' | 'trung' | 'nam';
  province: string;
  district: string;
  commune?: string;
  coords: Coordinates;
  coordinates?: Coordinates;
  ageYears?: number;
  ageText?: string; // "700+ năm", "1000+ năm"
  establishedYear?: string | number;
  establishedCentury?: number;
  heritageLevel?: HeritageLevel;
  heritageLevelText?: string;
  statusText?: string;
  distanceKmText?: string;
  rating: number;
  reviewCount?: number;
  artisansCount?: number;
  activeKilnsOrWorkshops?: number;
  coverImage?: string;
  imageUrl?: string;
  panoramaImage?: string;
  images?: { url: string; caption: string }[];
  gallery?: string[];
  summary?: string;
  shortDescription?: string;
  fullDescription?: string;
  historicalContext?: string;
  inscriptionQuote?: string;
  highlights?: string[];
  milestones?: HistoryMilestone[];
  craftProcess?: ProcessStep[];
  processSteps?: ProcessStep[];
  featuredProducts?: Masterpiece[];
  masterpieces?: Masterpiece[];
  masterArtisan?: MasterArtisan;
  artisans?: MasterArtisan[];
  visitorGuide?: {
    marketInfo: { title: string; desc: string; openHours: string };
    experienceInfo: { title: string; desc: string; price: string };
    museumInfo: { title: string; desc: string; ticket: string };
    specialtyFood: { title: string; desc: string; address: string };
  };
  visitingHours?: string;
  ticketPrice?: string;
  transportRoutes?: TransportRoute[];
  citations?: { institution: string; note: string; refCode: string }[];
  isBookmarked?: boolean;
}

export interface Category {
  id: string;
  slug?: string;
  name: string;
  villageCount?: number;
  count?: number;
  iconName?: string;
  icon?: string;
  sampleVillages?: string;
  description?: string;
}

export interface HeritageStory {
  id: string;
  issueCode: string;
  title: string;
  quote: string;
  summary: string;
  artisanName: string;
  artisanTitle: string;
  artisanInitials: string;
  coverImage: string;
  villageId?: string;
}

export interface TourPackage {
  id: string;
  title: string;
  duration: string;
  description: string;
  coverImage: string;
  villageId: string;
}

export interface QuizOption {
  id: 'A' | 'B' | 'C' | 'D';
  label: string;
  subtext?: string;
  isCorrect?: boolean;
}

export interface QuizQuestion {
  id: number;
  indexText?: string; // "Khảo nghiệm #05"
  question: string;
  topicId?: string;
  topicName?: string;
  category?: string;
  province?: string;
  difficulty?: 'Cơ bản' | 'Trung cấp' | 'Nâng cao' | string;
  imageUrl?: string;
  imageCaption?: string;
  options: string[] | QuizOption[];
  correctAnswer: number;
  explanation: string;
  culturalFact?: string;
  factSheet?: {
    issueNumber: string;
    title: string;
    content: string;
    destinationName: string;
    destinationId: string;
  };
  points: number;
}

export interface QuizTopic {
  id: string;
  name?: string;
  title?: string;
  questionCount?: number;
  questionsCount?: number;
  iconName?: string;
  difficulty?: string;
  sampleVillages?: string;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  title?: string;
  badgeTitle?: string;
  badgeIcon?: string;
  avatar?: string;
  points?: number;
  badge?: string;
  score?: number;
  correctAnswers?: number;
  totalQuestions?: number;
  isCurrentUser?: boolean;
}

export interface ContributionRequest {
  id?: string;
  trackingCode?: string;
  contributionType?: 'new_village' | 'update_data' | 'report_correction' | 'register_artisan';
  purpose?: string;
  villageName?: string;
  categoryId?: string;
  approximateAge?: number;
  patronFounder?: string;
  summary?: string;
  province?: string;
  district?: string;
  commune?: string;
  lat?: number;
  lng?: number;
  images?: string[];
  materials?: string[];
  referenceSource?: string;
  submitterName?: string;
  submitterEmail?: string;
  submitterOrg?: string;
  submittedAt?: string;
  status?: 'PENDING' | 'VERIFIED' | 'REJECTED';
  contributor?: any;
  villageData?: any;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

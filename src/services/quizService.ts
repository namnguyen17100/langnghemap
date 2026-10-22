/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Làng Nghề Map - Cultural Quiz Service
 * Handles interactive tests, leaderboard, topics, and certificate generation
 */

import { QuizQuestion, QuizTopic, LeaderboardUser } from '../types';

const MOCK_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    indexText: 'Khảo nghiệm #01',
    question: 'Chất liệu đặc biệt nào làm nên màu trắng lấp lánh ánh xà cừ trên nền tranh dân gian Đông Hồ?',
    topicId: 'tranh-dan-gian',
    topicName: 'Tranh Tết Dân Gian',
    category: 'Tranh Dân Gian',
    province: 'Bắc Ninh',
    difficulty: 'Trung cấp',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8uXwD9yiqo8dLcgHoURCp87AUKpbdShtle4OYS0Sm2OvCWGzjewIEeLXxm8MQnVUm02VTx9eo7kbQEC8dTQj7KeBv94FJJNHzGnRQL9XmBHsMrRwE4qlsE85vPQfdNj5icmBMVtudmUbs7yqSa3qzhH7uGuJiM2Qm86FkjCAMdHUd5_JRq3Yr2ymrFsd-4pagTjTYNod7ABXVr3XaDDfVQIWK-ME2bvMOMawdX8XW99iq7tksAfBk',
    imageCaption: 'Tư liệu: Mẫu giấy điệp cổ truyền',
    options: [
      'Vỏ sò điệp nghiền mịn trộn hồ nếp',
      'Bột thạch cao trộn sáp ong',
      'Bột đá cẩm thạch trắng mài',
      'Bột vỏ trứng gà ta phơi sấy',
    ],
    correctAnswer: 0,
    explanation: 'Để tạo ra nền tranh lấp lánh như dát bạc, nghệ nhân Đông Hồ (Thuận Thành, Bắc Ninh) sử dụng vỏ sò điệp nghiền nhỏ trộn với hồ nếp quét lên giấy dó bằng chổi lá thông.',
    culturalFact: 'Giấy điệp giúp tranh Đông Hồ bền màu hàng trăm năm mà không bị mối mọt ẩm mốc.',
    points: 100,
  },
  {
    id: 2,
    indexText: 'Khảo nghiệm #02',
    question: 'Làng nghề nào sau đây nổi tiếng với sản phẩm lụa tơ tằm cổ truyền có lịch sử hơn 1.000 năm thuộc quận Hà Đông, Hà Nội?',
    topicId: 'to-lua',
    topicName: 'Con Đường Tơ Lụa',
    category: 'Dệt Lụa Tơ Tằm',
    province: 'Hà Nội',
    difficulty: 'Cơ bản',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB18-b1_d5n8S7zFJ7zSRJ294QsTiJtKOTv82UjAP0Tjt-Skck4PJN70UJ3rtiWM6pmZ9ncO4TSZIHmYq5cF6pbG-J8qg0-h5udDYkmbynIQJlH9gIH2Rs08YorhPu5Rwxoa9GRVCql_5nFbAxxb5pPbT4GnEIc0q21awAQU2D4Nh2DVnWUU5XRCW-y8jKO1t1l5Un3pZFPiSN-IV-X7ZnCdQJe1P151daJL-Y83Gvi8fmt6sqELaWl',
    imageCaption: 'Khung cửi dệt the Vạn Phúc',
    options: [
      'Làng lụa Nha Xá (Hà Nam)',
      'Làng lụa Vạn Phúc (Hà Đông)',
      'Làng lụa Mã Châu (Quảng Nam)',
      'Làng lụa Tân Châu (An Giang)',
    ],
    correctAnswer: 1,
    explanation: 'Làng Lụa Vạn Phúc (Hà Đông) có lịch sử hơn 1.000 năm, tương truyền do bà Lã Thị Nga - vợ tướng quân triều Ngô sáng lập và truyền dạy bí quyết dệt lụa vân tiến vua.',
    culturalFact: 'Lụa Vân Vạn Phúc khi nhìn dưới ánh sáng tự nhiên sẽ ẩn hiện hoa văn chìm nổi tinh vi.',
    points: 100,
  },
  {
    id: 3,
    indexText: 'Khảo nghiệm #03',
    question: 'Kỹ thuật "men rạn" nổi tiếng của Gốm Bát Tràng ra đời vào khoảng thời kỳ nào trong lịch sử gốm Việt Nam?',
    topicId: 'gom-su',
    topicName: 'Gốm Sứ Triều Lý',
    category: 'Gốm Sứ',
    province: 'Hà Nội',
    difficulty: 'Nâng cao',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAodYZK5LQAnaEuCGAJkp-nRgPTNmRA3kM8W8fyvqKY1Yyp0KDgL-DmoKBW2y3xAiVfU9HDL6ImuoTZCPInJZp1hndkYPFTFBTtP6BhoYz8x6_GXJvnWRk1P2nNbAgGa1Hf6s3UYjCLLXPPzIPRwPDyXCxVQwNLj-Teef1EEheeD0xlrkBxWfA7WZ1FiV7d0Bj0YIdTYguLqZ7QjXVdsfx6jhj7ppES1kWnt70qzkZ_-uIJJcoM2LC4',
    imageCaption: 'Bình hút lộc men rạn đắp nổi',
    options: [
      'Thế kỷ 16 (Thời Mạc - Lê Trung Hưng)',
      'Thế kỷ 11 (Thời Lý Thái Tổ)',
      'Thế kỷ 19 (Thời Nguyễn)',
      'Thế kỷ 20 (Thời kỳ cận đại)',
    ],
    correctAnswer: 0,
    explanation: 'Men rạn Bát Tràng được phát minh độc đáo vào cuối thế kỷ 16 dưới triều nhà Mạc, lợi dụng sự co giãn nhiệt độ khác nhau giữa xương gốm và men để tạo mạng lưới rạn hình tam giác, tứ giác huyền bí.',
    culturalFact: 'Sau khi dỡ lò, nghệ nhân bôi nước chè mạn đặc hoặc mực tàu để làm nổi rõ các đường rạn rực rỡ.',
    points: 120,
  },
  {
    id: 4,
    indexText: 'Khảo nghiệm #04',
    question: 'Làng nghề đúc đồng Đại Bái (Gia Bình, Bắc Ninh) tôn thờ ai là vị Tiền hiền sư tổ khai sáng nghề đúc đồng?',
    topicId: 'ren-duc',
    topicName: 'Đồng Mỹ Nghệ',
    category: 'Đúc Đồng',
    province: 'Bắc Ninh',
    difficulty: 'Trung cấp',
    imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80',
    imageCaption: 'Đỉnh đồng tam khí Đại Bái',
    options: [
      'Nguyễn Công Truyền',
      'Khổng Minh Không (Nguyễn Minh Không)',
      'Dương Tự Minh',
      'Trần Quốc Chấn',
    ],
    correctAnswer: 0,
    explanation: 'Vào thế kỷ thứ X, quan Đô úy Nguyễn Công Truyền đã về làng Đại Bái dạy dân làng nghề đúc đồng, gò đồng mỹ nghệ và được phong làm Tiền hiền sư tổ.',
    culturalFact: 'Kỹ thuật nạm bạc, nạm vàng (tam khí, ngũ khí) của Đại Bái đạt đỉnh cao mỹ nghệ Việt Nam.',
    points: 100,
  },
  {
    id: 5,
    indexText: 'Khảo nghiệm #05',
    question: 'Nghệ thuật làm Nón Làng Chuông (Thanh Oai, Hà Nội) sử dụng loại lá nào là nguyên liệu chính để lợp từng lớp nón phẳng mịn?',
    topicId: 'dan-lat',
    topicName: 'Mây Tre Đan & Lá',
    category: 'Mây Tre Lá',
    province: 'Hà Nội',
    difficulty: 'Cơ bản',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80',
    imageCaption: 'Nón lá Làng Chuông phơi nắng',
    options: [
      'Lá cọ non chuyển từ vùng đồi Quảng Bình, Phú Thọ',
      'Lá chuối tiêu phơi sương',
      'Lá dừa nước Nam Bộ',
      'Lá thốt nốt An Giang',
    ],
    correctAnswer: 0,
    explanation: 'Lá cọ non phải được tuyển chọn kỹ từ các vùng rừng gò đồi, đem là (ủi) phẳng bằng lưỡi cày nung nóng trước khi khâu 16 vành tre cật.',
    culturalFact: 'Một chiếc nón Chuông chuẩn mực có đúng 16 vành tre uốn tròn đều tăm tắp.',
    points: 100,
  },
];

const MOCK_LEADERBOARD: LeaderboardUser[] = [
  {
    rank: 1,
    name: 'Nguyễn Hoàng Lan',
    title: 'Bàn Tay Vàng',
    badgeTitle: 'Bàn Tay Vàng',
    badgeIcon: 'award_star',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    points: 1480,
    badge: 'Bàn Tay Vàng • 15/15 câu đúng',
    score: 1480,
    correctAnswers: 15,
    totalQuestions: 15,
  },
  {
    rank: 2,
    name: 'Trần Minh Quân',
    title: 'Nhà Nghiên Cứu Trẻ',
    badgeTitle: 'Nhà Nghiên Cứu Trẻ',
    badgeIcon: 'psychology',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    points: 1420,
    badge: 'Nhà Nghiên Cứu Trẻ • 14/15 câu đúng',
    score: 1420,
    correctAnswers: 14,
    totalQuestions: 15,
  },
  {
    rank: 3,
    name: 'Lê Thu Trang',
    title: 'Học Giả Di Sản',
    badgeTitle: 'Học Giả Di Sản',
    badgeIcon: 'school',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    points: 1350,
    badge: 'Học Giả Di Sản • 13/15 câu đúng',
    score: 1350,
    correctAnswers: 13,
    totalQuestions: 15,
  },
  {
    rank: 4,
    name: 'Võ Đình Trọng',
    title: 'Người Giữ Hồn Văn Hoá',
    badgeTitle: 'Người Giữ Hồn Văn Hoá',
    badgeIcon: 'military_tech',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    points: 1200,
    badge: 'Nghệ Nhân Dự Bị • 12/15 câu đúng',
    score: 1200,
    correctAnswers: 12,
    totalQuestions: 15,
  },
  {
    rank: 5,
    name: 'Đặng Mai Phương',
    title: 'Du Khách Văn Hoá',
    badgeTitle: 'Du Khách Văn Hoá',
    badgeIcon: 'explore',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    points: 980,
    badge: 'Đại Sứ Tiềm Năng • 10/15 câu đúng',
    score: 980,
    correctAnswers: 10,
    totalQuestions: 15,
  },
];

const MOCK_TOPICS: QuizTopic[] = [
  {
    id: 'gom-su',
    name: 'Gốm Sứ Cổ Truyền',
    title: 'Gốm Sứ Cổ Truyền',
    questionCount: 20,
    questionsCount: 20,
    iconName: 'water_drop',
    difficulty: 'Trung cấp',
    sampleVillages: 'Bát Tràng, Chu Đậu, Phù Lãng',
  },
  {
    id: 'to-lua',
    name: 'Con Đường Tơ Lụa Việt',
    title: 'Con Đường Tơ Lụa Việt',
    questionCount: 15,
    questionsCount: 15,
    iconName: 'dry_cleaning',
    difficulty: 'Cơ bản',
    sampleVillages: 'Vạn Phúc, Mã Châu, Tân Châu',
  },
  {
    id: 'tranh-dan-gian',
    name: 'Tranh Dân Gian Việt',
    title: 'Tranh Dân Gian Việt',
    questionCount: 15,
    questionsCount: 15,
    iconName: 'draw',
    difficulty: 'Trung cấp',
    sampleVillages: 'Đông Hồ, Hàng Trống, Kim Hoàng',
  },
  {
    id: 'ren-duc',
    name: 'Nghề Rèn Đúc Kim Khí',
    title: 'Nghề Rèn Đúc Kim Khí',
    questionCount: 12,
    questionsCount: 12,
    iconName: 'hardware',
    difficulty: 'Nâng cao',
    sampleVillages: 'Đúc đồng Đại Bái, Rèn Đa Sỹ',
  },
];

export class QuizService {
  public static getAllQuestions(): QuizQuestion[] {
    return [...MOCK_QUESTIONS];
  }

  public static async getQuestions(): Promise<QuizQuestion[]> {
    return [...MOCK_QUESTIONS];
  }

  public static async getQuestionById(id: number): Promise<QuizQuestion | undefined> {
    return MOCK_QUESTIONS.find(q => q.id === id);
  }

  public static getLeaderboard(): LeaderboardUser[] {
    return [...MOCK_LEADERBOARD];
  }

  public static getTopics(): QuizTopic[] {
    return [...MOCK_TOPICS];
  }

  public static async getQuizTopics(): Promise<QuizTopic[]> {
    return [...MOCK_TOPICS];
  }

  public static async submitResult(score: number, correctCount: number) {
    const certId = `CERT-VN-${Date.now().toString(36).toUpperCase()}`;
    return {
      certificateId: certId,
      score,
      correctCount,
      totalCount: MOCK_QUESTIONS.length,
      awardedAt: new Date().toLocaleDateString('vi-VN'),
      holderTitle: score >= 1200 ? 'Đại Sư Hạng Nhất' : 'Học Giả Di Sản Xuất Sắc',
    };
  }
}

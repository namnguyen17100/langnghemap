/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Làng Nghề Map - Village Service
 * Designed following Service Pattern for easy Spring Boot REST integration (/api/v1/villages)
 */

import { Village, Category, HeritageStory, TourPackage } from '../types';

const MOCK_CATEGORIES: Category[] = [
  {
    id: 'gom-su',
    slug: 'gom-su',
    name: 'Gốm sứ & Đất nung',
    villageCount: 28,
    iconName: 'soup_kitchen',
    sampleVillages: 'Bát Tràng, Chu Đậu, Bàu Trúc, Phù Lãng, Hương Canh',
    description: 'Nghệ thuật nhào nặn đất sét, chế tác men ngọc, men lam và kỹ thuật nung củi truyền thống nghìn năm.',
  },
  {
    id: 'det-may',
    slug: 'det-may',
    name: 'Dệt lụa & May thêu',
    villageCount: 22,
    iconName: 'styler',
    sampleVillages: 'Vạn Phúc, Lãnh Mỹ A Tân Châu, Nha Xá, Chợ Lầu, Quất Động',
    description: 'Khung cửi cổ truyền, tơ tằm óng ả, lụa vân tiến vua và thêu tay cung đình tinh xảo.',
  },
  {
    id: 'dan-lat',
    slug: 'dan-lat',
    name: 'Mây tre đan & Lá',
    villageCount: 31,
    iconName: 'nest_cam_floodlight',
    sampleVillages: 'Phú Vinh, Bao La, Nón Làng Chuông, Canh Hoạch, Thạch Cầu',
    description: 'Chẻ nan chuốt sợi mây tre thanh mảnh, đan bện hoa văn hình học và khâu nón bài thơ.',
  },
  {
    id: 'tranh-giay',
    slug: 'tranh-giay',
    name: 'Tranh khắc & Giấy bản',
    villageCount: 14,
    iconName: 'palette',
    sampleVillages: 'Tranh Đông Hồ, Hàng Trống, Kim Hoàng, Tranh Làng Sình',
    description: 'Khắc mộc bản, quét điệp óng ánh vỏ sò và in màu tự nhiên từ lá chàm, hoa hòe, tro rơm.',
  },
  {
    id: 'dieu-khac',
    slug: 'dieu-khac',
    name: 'Chạm khắc Gỗ & Đá',
    villageCount: 19,
    iconName: 'carpenter',
    sampleVillages: 'Mộc Kim Bồng, Đồng Kỵ, Chàng Sơn, Đá mỹ nghệ Non Nước',
    description: 'Nghệ thuật đục đẽo rường cột đình chùa, 18 vị La Hán và tạc tượng đá cẩm thạch non nước.',
  },
  {
    id: 'kim-hoan',
    slug: 'kim-hoan',
    name: 'Kim khí & Đúc đồng',
    villageCount: 16,
    iconName: 'hardware',
    sampleVillages: 'Đúc đồng Ngũ Xã, Đại Bái, Phước Kiều, Bạc Định Công',
    description: 'Thuật luyện kim gia truyền, đúc đại hồng chung, đỉnh đồng lư hương và chạm bạc thủ công.',
  },
];

const MOCK_VILLAGES: Village[] = [
  {
    id: 'bat-trang',
    slug: 'lang-gom-bat-trang',
    name: 'Làng Gốm Bát Tràng',
    subTitle: 'Men Rạn Nghìn Năm Bên Dòng Sông Hồng',
    categoryId: 'gom-su',
    categoryName: 'Gốm Sứ & Đất Nung',
    sectorTag: 'Gốm Sứ Triều Lý',
    region: 'bac',
    province: 'Thành phố Hà Nội',
    district: 'Huyện Gia Lâm',
    commune: 'Xã Bát Tràng',
    coords: {
      lat: 20.9772,
      lng: 105.9136,
      display: "20°58'38\"N - 105°54'49\"E",
    },
    ageYears: 720,
    ageText: '700+ năm',
    heritageLevel: 'QuocGia',
    heritageLevelText: 'Di sản Văn hóa Phi vật thể Quốc gia',
    statusText: 'Đang mở cửa tham quan',
    distanceKmText: 'Cách 12.4 km',
    rating: 4.9,
    activeKilnsOrWorkshops: 186,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWMIz6Rue6kJG2zP48U2I5ylgWI7ovWW_VKKEkrFGNKhEbzjSKzZqdJiyCAt9gCx3ehR60WBfpJdHQUoRMS0tQJ4LKlOJCHCn9llx4J8jkR3-7KCgO4GUxzGIJ05iJ3trB3hZJCy5AqgcFxvJwbBwimHwUyxH2S5AS3l22ZaYKjKrqmQnJ_ruSoQpIGgGzAQJKFs6-E6toA5Gfp97vtJJVuAMfMjR7C4Pa0uO2WaCPigEeDYDdGckM',
    panoramaImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5w9ZqQndISKa5DVVkGNVMCUZ4ufAN8LsjKnqsrdcDyIEVvG8VOdLzqZ_Tr-gHHLgcklQvmYBoDlTFb7xDesY37wba0RXKkpme_LKtZa0gePMc3LKEm5zQIJm6Zl06iglTgDqqQHEU0ywOkAwqIk2KH4FGMFYfyNHBHUfnu-q90qJdzTLAJplrj2VERoqzZBOZkHXaJDnoCshjiNler_u0wH8OglFEHfz4ETTmpVyejcmCpEnmeKuP',
    images: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoU8X0pZfRRIfqTIZdACWxxgAvSan6hslF3JMZZMsJKflr9IOuhTcW2PdVZWjmW96jiXRcYPrX6E2KBY8i9B4-96A8033rpCJ0z03JFye7pUBZ0a761gVgeaMvvvJ5vaA2fzLcRUk7r9jV65v2P2bO0ObMc98empEK4cqjlktyxecGvF5FJh4R9A5P-9IPpTcqcbjszgpfQmXTqxMw5KNLPnUVhOliOc5062hQ19PA8iWtD9yd21L-',
        caption: 'Lò Bầu Cổ Hơn Một Thế Kỷ - Linh Hồn Men Nung Bát Tràng (VR/360°)',
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEwidIMttEJ9a9GsnfoYmz2E--Q31Q-VCWeO9dvoL5jkdWSnzaTqf5dSQ4SIr8zUGXViG96I3YFg_BbOoa2032mvFXHBJSCskVKIRuMWOFt6HsvoPN4TdQCSuToJB8OyuLRv3UfjEh7U9ss44ElERV4xXsZhr4h4xAbNVBtmzbjChBppghOGDc4OsEJEk3jBnbMd9kZnc9Zds-UeGxYMTCQQBzzPwdaoFwim-2mRYwrjuOIkYbyLGz',
        caption: 'Toàn cảnh làng cổ ven sông Hồng (Flycam 4K HDR)',
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGodXbVluGKM653CMrtk0Zhk9WsYtvhy4a9oKZESENsl_mgpsWV-uyQpCnhHMwEv9QVTLS4bXuYukpi54ic7eLgQR0TiMH9Cyu5xHTYHex3nPaPz4t_JnTb_UPrRQjrlOjvoRykRhnpptDPuA3DOhBfe_bSXztHv5Jv7886QHfuZbkUgrXPVt6MjmEPKPOebgua7SWR8F5YuAiEy9nnRlCkSYIYA-OIGA-Xw0WDtybCsU6WDCQOwiP',
        caption: 'Nghệ thuật vuốt gốm: Đôi bàn tay tài hoa của nghệ nhân',
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeICbbzUzqcMDA6RHa__uy-dlnxA1ccYa6VeCPOxJqNMLcJZVvGAq2R5SL19yLMj08OMFN5_DEe-a5qbvAIZRpqItxGj1klUCRH1s_r-Ba1P5FVkCn_RaZRSdELHeWMsvdXphPB63u87Jd8QsBg3p_dWKLGb0YBvApXfLzE56yZPHctfAF8F99e0wnyc-2aMCMT2H4m6InoVIw8FcL5AAD_PkSQn6mDAgsW6NgdqVB22XAGALs18-n',
        caption: 'Đặc trưng bảo vật: Men rạn & men ngọc độc bản',
      },
    ],
    summary: 'Nổi danh với dòng men rạn cổ, men lam tro trấu và kỹ thuật vuốt tay thủ công từ thời Vua Lý Thái Tổ dời đô về Thăng Long.',
    historicalContext: 'Theo gia phả và văn bia cổ, khi vua Lý Thái Tổ dời đô về Thăng Long (năm 1010), các dòng họ làm gốm tiếng tăm từ làng Bồ Bát (Ninh Bình) gồm Hứa, Nguyễn, Lưu, Lê, Trần đã di cư men theo dòng sông Hồng đến vùng đất sét trắng trù phú này để lập nghiệp.',
    inscriptionQuote: '"Bát Tràng dĩ đào nghiệp vi sinh" - Người Bát Tràng lấy nghề gốm làm sinh kế. Sản phẩm không chỉ phụng sự triều đình Thăng Long mà còn vươn ra giao thương quốc tế tại thương cảng Phố Hiến và Hội An thế kỷ XVI - XVII.',
    milestones: [
      {
        era: '1010',
        dynastyTag: 'Thời Lý',
        title: 'Khởi lập làng Bát Tràng phường',
        description: 'Các nghệ nhân hợp nhất vùng gò đất sét 72 mẫu, khai thác trầm tích phù sa ngàn năm sông Hồng để nung những mẻ gạch ngói và bát đĩa đầu tiên tiến vua.',
        highlightText: 'Sản vật chính: Gạch Bát Tràng, đồ gốm men ngọc ngả vàng',
      },
      {
        era: 'XVI',
        dynastyTag: 'Thời Lê - Mạc',
        title: 'Đỉnh cao kỹ nghệ gốm đắp nổi & Minh văn',
        description: 'Xuất hiện kỹ thuật vẽ hoa lam sắc sảo cùng việc khắc tên nghệ nhân, niên hiệu trực tiếp lên hiện vật cung tiến đình chùa hoàng gia.',
        highlightText: 'Nghệ nhân tiêu biểu: Bùi Huệ, Đỗ Phủ, Hoàng Ngưu',
      },
      {
        era: 'XIX',
        dynastyTag: 'Thời Nguyễn',
        title: 'Hoàn thiện độc bản Men Rạn Tam Thái',
        description: 'Kỹ thuật khống chế độ co ngót của xương đất và men sứ đạt mức tuyệt đối, tạo nên vân rạn mai rùa, rạn lục lăng vô cùng quý phái.',
        highlightText: 'Kỹ thuật: Men rạn phối màu cánh gián, lục bảo',
      },
      {
        era: '2025',
        dynastyTag: 'Đương đại',
        title: 'Chuyển mình Trung tâm Sáng tạo Quốc tế',
        description: 'Hơn 1.000 hộ gia đình gìn giữ nghề, chuyển dịch từ lò than sang lò gas thân thiện môi trường, xây dựng Bảo tàng 7 bàn xoay biểu tượng.',
        highlightText: 'Vị thế: Mạng lưới các thành phố sáng tạo UNESCO',
      },
    ],
    processSteps: [
      {
        step: 1,
        title: 'Chọn & Xử Lý Đất Sét Trắng',
        description: 'Đất sét Trúc Thôn, Hố Sào có độ dẻo cao, chịu lửa trên 1250°C. Đất được ngâm trong hệ thống 4 bể lọc: Bể Đánh, Bể Lắng, Bể Phơi và Bể Ủ loại bỏ tạp chất oxit sắt.',
        badge: 'Thời gian ủ bùn: 3-4 tháng',
      },
      {
        step: 2,
        title: 'Tạo Hình Trên Bàn Xoay',
        description: 'Người thợ dùng tay "vuốt bấc", "nắn cổ", điều khiển tốc độ bàn xoay nhịp nhàng bằng chân. Sản phẩm đòi hỏi độ đồng tâm tuyệt đối và thành gốm mỏng đều như lá lúa.',
        badge: 'Phương pháp: Vuốt tay & Đổ rót khuôn',
      },
      {
        step: 3,
        title: 'Trang Trí & Sửa Hàng Mộc',
        description: 'Phơi sản phẩm trong bóng râm (không phơi nắng gắt tránh nứt cốt). Nghệ nhân vẽ phóng bút hoa văn lam bằng bút lông, đắp nổi hình rồng, phượng, hoa sen tinh xảo.',
        badge: 'Màu vẽ: Oxit coban thiên nhiên',
      },
      {
        step: 4,
        title: 'Tráng Men Rạn Độc Bản',
        description: 'Bí kíp men rạn: Tro trấu nếp cái hoa vàng kết hợp đá trường thạch nghiền mịn và đất sét nâu. Nhúng men chuẩn xác tạo nên hàng triệu vết rạn hình mạng nhện cổ kính.',
        badge: 'Đặc trưng Bát Tràng độc bản',
        isKeySecret: true,
      },
      {
        step: 5,
        title: 'Nung Trong Lò Bầu & Đóng Cửa Lò',
        description: 'Xếp sản phẩm vào bao nung chịu nhiệt. Đốt lò liên tục trong 48 giờ ở ngưỡng nhiệt 1200°C - 1300°C. Để lò nguội tự nhiên 2 ngày trước khi mở vòm đón mẻ gốm hoàn hảo.',
        badge: 'Nhiệt độ nung: 1250°C - 1300°C',
      },
    ],
    masterpieces: [
      {
        title: 'Bình Hút Lộc Men Rạn Đắp Nổi "Thuận Buồm Xuôi Gió"',
        description: 'Thiết kế miệng loe rộng thu tài, cổ thắt nhỏ giữ lộc và thân phình to tích khí. Toàn bộ hình tượng rồng phượng và hải thuyền được nghệ nhân đắp nổi thủ công bằng đất dẻo trước khi phủ lớp men rạn ngà cổ kính.',
        tag: 'Độc Bản Men Rạn',
        age: 'Độ tuổi mẫu: TK XVIII phục chế',
        feature: 'Tích tài phong thủy',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIPuLC3qK1Ctfr-eIQJ0qjJVGH8R6123ahihgv9dp0f1Ov9Ofi-l0ev6fxFMEFrre9yK7dMunfsbf_reJj_Jho6CCbMK9ElPjmgPNvBRZW98hO6v7vB0QrJ9DW3sv_orCs8g_2uraUNW5clG1RLpuwwuoIGirNZS_dSHwKDI58fULGWur6v5ze75Ul4FA8VarL2hD9aZZNjsbLhvUsqeNefBCw6ixzF_xPTEcqGJN1eQ1R6SDLlH2g',
      },
      {
        title: 'Chân Đèn Men Lam Xám Thời Mạc (Niên hiệu Hưng Trị 1588)',
        description: 'Chân đèn tạo hình gồm 2 phần lắp mộng khít khao, trang trí băng cánh sen, rồng yên ngựa và minh văn chữ Hán khắc chìm ghi rõ tên nghệ nhân Bùi Huệ dâng cúng tại chùa Bút Tháp.',
        tag: 'Bảo Vật Triều Mạc',
        age: 'Hiện vật gốc: Bảo tàng Lịch sử QG',
        feature: 'Hiện vật có minh văn',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABCBqz1DRLNn4Vp9Ftw7nt82jBHNzHZE5qYgI_AotY3zb6is83y4YI39CxqAzUMXEJHTjr_CrGTZTxLo5uLLcMwRQ8gZWXimBLkI1oEAzpMTn1LRhJKT9QKOPtviiRfZdEfwoBBRD9biBwbjH8gYsPwsEmUg7Q_LVJqXmgCqYeaLnYDhZKs_JW1CHhHqf7AyG3I4IZWS_1q3jnxGyUntqA9h2_zTB41jQLsioKLfI9ZOCCY2lkPyvy',
      },
      {
        title: 'Bộ Ấm Chén Gốm Tử Sa Bát Tràng (Gốm Đất Đỏ Canh Lửa)',
        description: 'Chế tác từ lớp phù sa sâu không tráng men bóng, để lộ lỗ khí khổng vi mô giữ hương trà thơm ngát hàng giờ. Ấm nung ở 1280°C gõ vào kêu đanh vang tựa chuông đồng.',
        tag: 'Đất Khoáng Sa Sông Hồng',
        age: 'Đặc tính: Dưỡng hương trà đạo',
        feature: '100% khoáng tự nhiên',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCW4XEtffCAkE9K_Ea0_A3MVGvgTADHZLJNRkDD5u_dHi7SI_7godpEXO0Q1cVr3nNzsiQXv4Eh29Ct3LX0Uka9CqYEjoFJj5dXTtfjPZ6NeelxN4AntYP_ZSKSPvffH4pu7v3FEBJkL_W0YhEu3i3FOsYThcY8MCn3kT8ZTblpnjRrRgQ_I_j1P2gFZ9f28I34ycqzIaxbZerJVt6dVVwHiK2T4PHia_fLz9peGBkTPBeosGHaB7xT',
      },
    ],
    artisans: [
      {
        id: 'tran-do',
        name: 'NNND. Trần Độ',
        title: 'Nghệ Nhân Nhân Dân',
        awardedYear: 'Năm phong tặng: 2016',
        bio: 'Người được mệnh danh là "Vua phục chế men cổ Việt Nam". Ông đã thành công giải mã công thức 12 dòng men cổ thời Lý, Trần, Lê, Mạc và chế tác hàng trăm hiện vật ngoại giao quốc gia tặng các nguyên thủ thế giới.',
        honors: ['Giải thưởng Tinh hoa Nghệ thuật Bát Tràng', 'Huân chương Lao động hạng Ba'],
        avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCk0W1uRm3vGoxAVomf6CAYtZjfHzzbsTnSKeXVjK4PS9zRXz7OHRzlBeYim3emCjY-zx40ElAL_8Cmzj1suV0vFChpZXVnGoFipFoNT0TKW7aX_S3W8S_AiPUcdWRb7z5QFTYALIHpxOinHuc3-g4Ma5ajSS-cmsxjDfwthV8DdHYgkl0s9bjNiJc8NC5t0olnUwid_vWGOEQL-W5AQBBrU4In8DftuPuebPZFM3BbqD7VbBUsYemf',
      },
      {
        id: 'to-thanh-son',
        name: 'NNƯT. Tô Thanh Sơn',
        title: 'Nghệ Nhân Ưu Tú',
        lineage: 'Dòng họ Tô truyền thống',
        bio: 'Bậc thầy phục chế dòng men rạn tam thái và gốm vuốt tay siêu kích thước. Tác phẩm của ông kết hợp tinh tế giữa triết lý Phật giáo tĩnh lặng và nét đắp nổi rồng mây uyển chuyển đặc trưng Thăng Long.',
        honors: ['Kỷ lục gia Chiếc cúp gốm lớn nhất VN', 'Bàn tay vàng Hội Làng Nghề'],
        avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqlpW3RZHQc44IR0_CJP4VPhVvX3pk75nTFp6DSRfUhj7Jtfhc9D5egFYreYKHed0O4quD6GOjfTOhtyG1qkObYOR98pne3br9iy7XTCw-IWsmUpfVsUPYPr-tNrNhhYkIX5KlXb_vD4exfkgLJWdDa7GQIvTfoqXqtCLjshB2SYWqjZ_m70jxJYC1R4LgDEGB69HWGzIJ5oV_exfblT-EGMb9MaHWZIMKbYFDUN_IjL-Qkx07nLT_',
      },
    ],
    visitorGuide: {
      marketInfo: {
        title: 'Chợ Gốm Làng Cổ',
        desc: 'Tụ hội hơn 300 gian hàng với hàng ngàn mẫu gốm mỹ nghệ, đồ thờ cúng, đồ gia dụng gia đình và đồ trang trí sân vườn.',
        openHours: '08:00 - 18:00 hàng ngày',
      },
      experienceInfo: {
        title: 'Trải Nghiệm Vuốt Gốm',
        desc: 'Được nghệ nhân hướng dẫn ngồi bàn xoay, tự tay nhào nặn chiếc cốc, bình hoa mang dấu ấn cá nhân và nung sấy mang về.',
        price: '60.000đ - 100.000đ/lượt',
      },
      museumInfo: {
        title: 'Bảo Tàng Gốm Bát Tràng',
        desc: 'Kiến trúc kỳ vĩ mô phỏng 7 bàn xoay gốm khổng lồ lượn sóng, lưu giữ hàng ngàn hiện vật quý hiếm và không gian nghệ thuật đương đại.',
        ticket: '50.000đ/người',
      },
      specialtyFood: {
        title: 'Canh Măng Mực Bát Tràng',
        desc: 'Món cỗ tiến vua trứ danh chỉ có tại lễ hội làng. Mực khô Thanh Hóa tước nhỏ như sợi chỉ xào cùng măng vầu ninh nước dùng tôm ngọt thanh tao.',
        address: 'Nhà cổ làng Bát Tràng',
      },
    },
    transportRoutes: [
      {
        type: 'bus',
        title: 'Xe Buýt Tuyến 47A',
        description: 'Điểm đón: Điểm trung chuyển Long Biên → Bến xe Bát Tràng. Tần suất 15 phút/chuyến. Giá vé 7.000đ.',
      },
      {
        type: 'motorcycle',
        title: 'Xe Máy / Ô Tô Cá Nhân',
        description: 'Qua cầu Vĩnh Tuy hoặc cầu Thanh Trì → Rẽ xuống đường đê tả sông Hồng (ĐT 378) đi thẳng 5km.',
      },
      {
        type: 'boat',
        title: 'Đường Thủy Sông Hồng (Tour Du Khách)',
        description: 'Tàu du lịch xuất phát bến Chương Dương Độ xuôi dòng sông Hồng kết hợp vãn cảnh đền Chử Đồng Tử.',
      },
    ],
    citations: [
      {
        institution: 'Viện Văn Hóa Nghệ Thuật Quốc Gia (VICAS)',
        note: 'Đề tài khoa học cấp bộ: "Bảo tồn và phát huy giá trị di sản văn hóa phi vật thể nghề gốm Bát Tràng trong phát triển công nghiệp văn hóa".',
        refCode: 'Số tham chiếu: VICAS-2023-B04',
      },
      {
        institution: 'Cục Di Sản Văn Hóa Việt Nam',
        note: 'Quyết định ghi danh Nghề làm gốm Bát Tràng vào Danh mục di sản văn hóa phi vật thể quốc gia theo Quyết định số 78/QĐ-BVHTTDL.',
        refCode: 'Lưu trữ số: Cục DSVH-DTQG-2019',
      },
      {
        institution: 'Bảo Tàng Lịch Sử Quốc Gia',
        note: 'Bộ sưu tập Hiện vật khảo cổ học lò gốm cổ Bát Tràng (Khai quật năm 2001 - 2003 tại di chỉ Bát Tràng, Hà Nội).',
        refCode: 'Xuất bản: NXB Văn Hóa Thông Tin',
      },
    ],
    isBookmarked: true,
  },
  {
    id: 'van-phuc',
    slug: 'lang-lua-van-phuc',
    name: 'Làng Lụa Vạn Phúc',
    subTitle: 'Đệ Nhất Lụa Xứ Đoài Tơ Tằm Cung Đình',
    categoryId: 'det-may',
    categoryName: 'Dệt May Tơ Tằm',
    sectorTag: 'Tơ Lụa Cung Đình',
    region: 'bac',
    province: 'Thành phố Hà Nội',
    district: 'Quận Hà Đông',
    commune: 'Phường Vạn Phúc',
    coords: {
      lat: 20.9788,
      lng: 105.7728,
      display: "20°58'45\"N - 105°46'22\"E",
    },
    ageYears: 1050,
    ageText: '1000+ năm',
    heritageLevel: 'QuocGia',
    heritageLevelText: 'Di sản Văn hóa Phi vật thể Quốc gia',
    statusText: 'Mở cửa trải nghiệm dệt',
    distanceKmText: 'Cách 8.5 km',
    rating: 4.8,
    activeKilnsOrWorkshops: 140,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmu8a4kCbbzQA-X74fjJuS5asEXSsBMW2i4dj0fZXQmVNbCrg2mvr3d8dZKZn-5vXUbFe8EfZgOWnWSiNFAZGzpXoytythKHYwdfblPqPPeWRLzVyNDdDr1aoAmzQsdAeV4CjHcfIfzgMxd-wrHthJDhvPRZbTjis8o-wUbWXPAyh_rtBaH2HyK3KRCEaRpcLCXrLSKJWhXkkTmg_yJIzLBDQxDgKInlKhlEngbWCtVWYItqS8W50m',
    summary: 'Thủ phủ lụa tơ tằm cổ truyền xứ Đoài với dòng lụa Vân quý tộc từng dâng tiến triều đình Huế.',
    historicalContext: 'Khởi thủy bởi bà Lã Thị Nga thời vua Ngô Quyền, làng Vạn Phúc bên dòng sông Nhuệ giữ kỹ thuật dệt hoa vân nổi chìm độc nhất vô nhị suốt nghìn năm.',
    inscriptionQuote: '"Nhất tơ Vạn Phúc, nhì the La Khê" - Câu ca tụng sản vật lụa quý phương Bắc từng xuất hiện tại hội chợ Marseille (Pháp) năm 1931.',
    milestones: [],
    processSteps: [],
    masterpieces: [],
    artisans: [],
    visitorGuide: {
      marketInfo: { title: 'Phố Lụa Vạn Phúc', desc: 'Con đường ô sắc màu với hơn 100 cửa hiệu tơ lụa tự nhiên.', openHours: '08:00 - 21:00' },
      experienceInfo: { title: 'Thử Quay Tơ Mắc Cửi', desc: 'Trải nghiệm vận hành khung dệt gỗ truyền thống.', price: '50.000đ/người' },
      museumInfo: { title: 'Đền Thờ Thành Hoàng Lã Thị Nga', desc: 'Không gian thờ cúng Tổ nghề dệt lụa ngàn năm.', ticket: 'Miễn phí' },
      specialtyFood: { title: 'Bánh Gai Làng Giá', desc: 'Món quà quê dẻo thơm hương lá gai và đậu xanh.', address: 'Phố cổ Hà Đông' },
    },
    transportRoutes: [],
    citations: [],
    isBookmarked: true,
  },
  {
    id: 'dong-ho',
    slug: 'tranh-dan-gian-dong-ho',
    name: 'Tranh Dân Gian Đông Hồ',
    subTitle: 'Nghệ Thuật Khắc Gỗ In Màu Tự Nhiên Trên Giấy Điệp',
    categoryId: 'tranh-giay',
    categoryName: 'Tranh Dân Gian',
    sectorTag: 'Tranh Mộc Bản',
    region: 'bac',
    province: 'Bắc Ninh',
    district: 'Thị xã Thuận Thành',
    commune: 'Phường Song Hồ',
    coords: {
      lat: 21.0589,
      lng: 106.0883,
      display: "21°03'32\"N - 106°05'18\"E",
    },
    ageYears: 500,
    ageText: '500+ năm',
    heritageLevel: 'QuocGia',
    heritageLevelText: 'Hồ sơ đệ trình UNESCO Di sản cần bảo vệ khẩn cấp',
    statusText: 'Cần đặt lịch trước',
    distanceKmText: 'Cách 34 km',
    rating: 4.7,
    activeKilnsOrWorkshops: 15,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOSK8drcRDnDcMbLAOQm5HF3kbaRtCcMd9ivyLMjr7ZLqeTvdBdCk8H5oEg1-XJwCOLt4sD03ubnpZL4s9_w1V_8GycEKgSQBgN6pxOVvKhnWZfDqWcq18NSA-aSPC5J6iOqOceu_go9oVTD31metm2EVX0Amis6s6Fq2d3F-koSKdjf0iv7-0kstnvRqFoKTS_LSt8sYmfB45g-43765HahRxisj_dfjtdWLrcjkgvS0B4YcHVXxC',
    summary: 'Nét vẽ mộc mạc in trên giấy điệp lấp lánh vỏ sò, biểu trưng cho lời chúc phúc tài lộc và hồn quê Việt.',
    historicalContext: 'Làng Đông Hồ nằm ven đê sông Đuống, các nghệ nhân qua nhiều đời đã nghiên cứu tận dụng màu sắc tự nhiên: màu vàng từ hoa hòe, màu đen từ than rơm nếp, màu đỏ từ son núi sỏi son, màu trắng từ vỏ sò điệp.',
    inscriptionQuote: '"Tranh Đông Hồ gà lợn nét tươi trong / Màu dân tộc sáng bừng trên giấy điệp" - Thi sĩ Hoàng Cầm.',
    milestones: [],
    processSteps: [],
    masterpieces: [],
    artisans: [],
    visitorGuide: {
      marketInfo: { title: 'Chợ Tranh Tết Đình Đông Hồ', desc: 'Phiên chợ tranh tết cổ truyền họp vào tháng Chạp.', openHours: 'Tháng Chạp âm lịch' },
      experienceInfo: { title: 'Tự Tay In Tranh Mộc Bản', desc: 'Quét mực màu thiên nhiên và dập khuôn bản gỗ lên giấy điệp.', price: '70.000đ/bức' },
      museumInfo: { title: 'Nhà Bảo Tàng Tranh Nguyễn Đăng Chế', desc: 'Lưu giữ hơn 200 bản khắc gỗ cổ từ thời Nguyễn.', ticket: '30.000đ' },
      specialtyFood: { title: 'Bánh Phu Thê Đình Bảng', desc: 'Đặc sản dẻo dai gói lá dong truyền thống Kinh Bắc.', address: 'Bắc Ninh' },
    },
    transportRoutes: [],
    citations: [],
    isBookmarked: true,
  },
  {
    id: 'dai-bai',
    slug: 'lang-duc-dong-dai-bai',
    name: 'Đúc Đồng Đại Bái',
    subTitle: 'Khởi Nguồn Từ Thế Kỷ Thứ 10 Bên Vùng Đất Kinh Bắc',
    categoryId: 'kim-hoan',
    categoryName: 'Kim Khí & Đúc Đồng',
    sectorTag: 'Đúc Đồng Cổ',
    region: 'bac',
    province: 'Bắc Ninh',
    district: 'Huyện Gia Bình',
    commune: 'Xã Đại Bái',
    coords: {
      lat: 21.0867,
      lng: 106.2011,
      display: "21°05'12\"N - 106°12'04\"E",
    },
    ageYears: 900,
    ageText: '900+ năm',
    heritageLevel: 'QuocGia',
    heritageLevelText: 'Di sản Văn hóa Phi vật thể Quốc gia',
    statusText: 'Đang mở cửa',
    distanceKmText: 'Cách 42 km',
    rating: 4.9,
    activeKilnsOrWorkshops: 95,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtwuNVluVhIvin3i0rn9c_2EtIqpFEhSgtw_4dJPDmUrhLbwO3nA5i1rQvyjAnJ63ZfrzW2wlagSM47dmOU1O5mX4V9qvqStMJiov6o30hwjF5ysNtZrS3pMNctvwicgHMk-3KrnzbFspsIhMTyf_ti56qxB_OEgihNl2XXahPjWNTAXCMLa_LDHfDhuXNOswhx8CFtnmr5DoT-kSNf3Vt8NW-O83nTu2XxdoCfUBy5JMpiJbUh3Fx',
    summary: 'Trứ danh với kỹ thuật dát đồng, chạm trổ lư hương, tượng phật và đồ đồng thờ tự tinh xảo bậc nhất.',
    historicalContext: 'Khởi lập từ thời Lý bởi Tiền hiền Nguyễn Công Truyền, Đại Bái nổi tiếng với các nghệ nhân gò đồng, dát vàng bạc và đúc chuông đồng uy nghiêm.',
    inscriptionQuote: '"Đồng Đại Bái, gốm Bát Tràng, lụa Vạn Phúc" - Bộ ba làng nghề huyền thoại phương Bắc.',
    milestones: [],
    processSteps: [],
    masterpieces: [],
    artisans: [],
    visitorGuide: {
      marketInfo: { title: 'Khu Phố Bán Đồ Đồng Đại Bái', desc: 'Trưng bày đồ đồng phong thủy, đỉnh đồng, chuông khánh.', openHours: '08:00 - 18:30' },
      experienceInfo: { title: 'Tham Quan Lò Nung Đồng', desc: 'Tận mắt xem nghệ nhân đổ đồng lỏng rực sáng vào khuôn đất.', price: 'Miễn phí' },
      museumInfo: { title: 'Đền Thờ Tiền Hiền Nguyễn Công Truyền', desc: 'Di tích lịch sử văn hóa cấp quốc gia.', ticket: 'Miễn phí' },
      specialtyFood: { title: 'Bún Chả Cầu Đuống', desc: 'Hương vị đậm đà vùng quê Kinh Bắc.', address: 'Gia Bình, Bắc Ninh' },
    },
    transportRoutes: [],
    citations: [],
    isBookmarked: false,
  },
  {
    id: 'chang-son',
    slug: 'lang-moc-chang-son',
    name: 'Làng Mộc Chàng Sơn',
    subTitle: 'Nơi Tạc Nên 18 Vị La Hán Chùa Tây Phương Kỳ Vĩ',
    categoryId: 'dieu-khac',
    categoryName: 'Chạm Khắc Gỗ & Đá',
    sectorTag: 'Mộc Cổ Truyền',
    region: 'bac',
    province: 'Thành phố Hà Nội',
    district: 'Huyện Thạch Thất',
    commune: 'Xã Chàng Sơn',
    coords: {
      lat: 21.0278,
      lng: 105.5875,
      display: "21°01'40\"N - 105°35'15\"E",
    },
    ageYears: 800,
    ageText: '800+ năm',
    heritageLevel: 'QuocGia',
    heritageLevelText: 'Di sản Văn hóa Phi vật thể Quốc gia',
    statusText: 'Đang mở cửa',
    distanceKmText: 'Cách 30 km',
    rating: 4.8,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdpawyxvQfbeMvhLjDlXXo4YEfbBd32m9Qhk9KUQ6KhTidBcE6Zg5bOIxnKv0SMZ0yAPFr6pkYjJkQbI0USEBUsAq2Jjt7YPO9Gm7xBS71IxO3oVhIYwHJdY5Ca3vvVYCD5KJZ-WZQ96Imia1qoWLVe1XhhLEEEbknFnTNZJfaBpiJ6J51tP21-oSvAhJwMTe4kA9VcV7LD7CD8AXU_l6OnNJVid1jFIEnrMSfoITJRUq6-YqX5xvD',
    summary: 'Tinh hoa chạm khắc gỗ cổ truyền, điêu khắc nhà rường và kiệt tác 18 pho tượng La Hán chùa Tây Phương.',
    historicalContext: 'Nghệ nhân Chàng Sơn có biệt tài chạm trổ không cần bản vẽ mẫu, chỉ bằng con đục và nhát búa đã thổi hồn sống động vào từng thớ gỗ lim, mít.',
    inscriptionQuote: '"Thợ mộc Chàng Sơn khéo tay đục đẽo / Dựng rường nhà cột ngói uy nghi."',
    milestones: [],
    processSteps: [],
    masterpieces: [],
    artisans: [],
    visitorGuide: {
      marketInfo: { title: 'Xưởng Mộc Dân Gian', desc: 'Trưng bày tượng gỗ, nhà gỗ cổ truyền và quạt giấy Chàng Sơn.', openHours: '08:00 - 18:00' },
      experienceInfo: { title: 'Tự Khắc Họa Tiết Hoa Sen', desc: 'Được thợ cả cầm tay chỉ dạy kỹ thuật vạt gỗ.', price: '60.000đ/lượt' },
      museumInfo: { title: 'Chùa Tây Phương', desc: 'Bảo vật quốc gia với bộ tượng La Hán do thợ Chàng Sơn điêu khắc.', ticket: '20.000đ' },
      specialtyFood: { title: 'Chè Lam Thạch Xá', desc: 'Bánh chè dẻo cay nồng vị gừng và bùi thơm lạc rang.', address: 'Chân núi Tây Phương' },
    },
    transportRoutes: [],
    citations: [],
    isBookmarked: false,
  },
  {
    id: 'phu-vinh',
    slug: 'may-tre-dan-phu-vinh',
    name: 'Mây Tre Đan Phú Vinh',
    subTitle: 'Nghệ Thuật Đan Nan Tinh Xảo Mảnh Như Sợi Chỉ',
    categoryId: 'dan-lat',
    categoryName: 'Mây Tre Đan & Lá',
    sectorTag: 'Mây Tre Tinh Hoa',
    region: 'bac',
    province: 'Thành phố Hà Nội',
    district: 'Huyện Chương Mỹ',
    commune: 'Xã Phú Nghĩa',
    coords: {
      lat: 20.9194,
      lng: 105.6889,
      display: "20°55'10\"N - 105°41'20\"E",
    },
    ageYears: 400,
    ageText: '400+ năm',
    heritageLevel: 'QuocGia',
    heritageLevelText: 'Di sản Văn hóa Phi vật thể Quốc gia',
    statusText: 'Đang mở cửa',
    distanceKmText: 'Cách 25 km',
    rating: 4.7,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiY_fhjjUIYsuH4swMDECAwqh4p9WRBKVPR1HORCRyCfLMIkR22DfguhtDo6D068ASE3gBkPGdbOq5Xz3_getSZEdTISa7j5pqudqh8kt3ZrSLwS8i7GDeQ46B3IUzv9MX9P6GfcR5PGcx2GRwCWaGtN0KP4eDUWkWso6EQHj8ageEIUlEHYTfSYih_ardp9Qjroc93sF-GjKNR6mG8vYWkALIfB6K7M9tEXe12Mf17hEpUQ9v33ZY',
    summary: 'Nghệ thuật đan nan mây tre tinh hoa, sáng tạo ra các tác phẩm chân dung và bình hoa có độ mỏng như sợi chỉ.',
    historicalContext: 'Xuất hiện từ thế kỷ XVII, làng Phú Vinh có gần 90% hộ dân làm nghề mây tre đan xuất khẩu sang hơn 50 quốc gia trên toàn cầu.',
    inscriptionQuote: '"Mây chuốt óng ả, nan đan mịn màng."',
    milestones: [],
    processSteps: [],
    masterpieces: [],
    artisans: [],
    visitorGuide: {
      marketInfo: { title: 'Showroom Mây Tre Phú Vinh', desc: 'Trưng bày hàng ngàn mẫu đèn thả mây tre, khay đựng, tranh mây.', openHours: '08:00 - 18:00' },
      experienceInfo: { title: 'Tự Tay Đan Giỏ Mây', desc: 'Tập chẻ nan và đan họa tiết hoa thị truyền thống.', price: '80.000đ/sản phẩm' },
      museumInfo: { title: 'Nhà Lưu Niệm Nghệ Nhân Nguyễn Văn Khiếu', desc: 'Nơi trưng bày bức tranh chân dung Bác Hồ đan bằng mây tre.', ticket: 'Miễn phí' },
      specialtyFood: { title: 'Rau Sắng Chùa Hương', desc: 'Món rau rừng thơm ngọt nấu canh cá quả.', address: 'Chương Mỹ' },
    },
    transportRoutes: [],
    citations: [],
    isBookmarked: false,
  },
  {
    id: 'non-nuoc',
    slug: 'da-my-nghe-non-nuoc',
    name: 'Đá Mỹ Nghệ Non Nước',
    subTitle: 'Dưới Chân Ngũ Hành Sơn Hơn 400 Năm Tạc Tượng Cẩm Thạch',
    categoryId: 'dieu-khac',
    categoryName: 'Chạm Khắc Gỗ & Đá',
    sectorTag: 'Điêu Khắc Đá Cẩm Thạch',
    region: 'trung',
    province: 'Thành phố Đà Nẵng',
    district: 'Quận Ngũ Hành Sơn',
    commune: 'Phường Hòa Hải',
    coords: {
      lat: 16.0042,
      lng: 108.2597,
      display: "16°00'15\"N - 108°15'35\"E",
    },
    ageYears: 400,
    ageText: '400+ năm',
    heritageLevel: 'QuocGia',
    heritageLevelText: 'Di sản Văn hóa Phi vật thể Quốc gia',
    statusText: 'Đang mở cửa',
    distanceKmText: 'Cách 8 km từ trung tâm Đà Nẵng',
    rating: 4.9,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCV5uFYU8hA6wpAJbsA4PS0gUjc_Rq79P5HZrdVaQrQAsrm-8jKXecAFaRe5nHM1F8XOnhlGG9yIGOff6uOyVHygiyzm0MT9dCrmZiylOdXlrUXH6FV57wM5simiOEyVxiu8F4LgBlPafhqMNuSo5vkMniInnJm0govcChNgLpqagdYtJII-jNnzYnw-HjlZPiQo7CU_LjKHj0WA16OqjJrsJxG_PI2wPS4lZmZ2-B84JEIr4SYcNjI',
    summary: 'Dưới chân núi Ngũ Hành Sơn, truyền thống tạc tượng đá cẩm thạch nguyên khối hơn 400 năm văn hiến.',
    historicalContext: 'Khởi xướng bởi cụ Huỳnh Bá Quát từ thế kỷ XVII, Non Nước nổi tiếng với tượng Phật bi mẫn, linh vật tứ linh và các tác phẩm điêu khắc nghệ thuật đương đại.',
    inscriptionQuote: '"Đá mềm dưới tay người thợ Non Nước."',
    milestones: [],
    processSteps: [],
    masterpieces: [],
    artisans: [],
    visitorGuide: {
      marketInfo: { title: 'Làng Đá Non Nước Ven Biển', desc: 'Khu trưng bày tượng đá phong thủy và trang sức cẩm thạch.', openHours: '07:30 - 19:00' },
      experienceInfo: { title: 'Mài Đá Trang Sức Cẩm Thạch', desc: 'Tự mài và đánh bóng mặt dây chuyền đá tự nhiên.', price: '120.000đ/viên' },
      museumInfo: { title: 'Khu Di Tích Danh Thắng Ngũ Hành Sơn', desc: 'Thăm các hang động huyền bí và chùa Linh Ứng non nước.', ticket: '40.000đ' },
      specialtyFood: { title: 'Mì Quảng Ếch', desc: 'Mì Quảng đậm đà nước nhưn ếch đồng và rau thơm Trà Quế.', address: 'Hòa Hải, Đà Nẵng' },
    },
    transportRoutes: [],
    citations: [],
    isBookmarked: false,
  },
  {
    id: 'bau-truc',
    slug: 'gom-cham-bau-truc',
    name: 'Gốm Chăm Bàu Trúc',
    subTitle: 'Nghệ Thuật Gốm Cổ Xoay Thân Người Không Bàn Xoay',
    categoryId: 'gom-su',
    categoryName: 'Gốm Sứ & Đất Nung',
    sectorTag: 'Gốm Đất Nung Chăm',
    region: 'nam',
    province: 'Ninh Thuận',
    district: 'Huyện Ninh Phước',
    commune: 'Thị trấn Phước Dân',
    coords: {
      lat: 11.5167,
      lng: 108.95,
      display: "11°31'00\"N - 108°57'00\"E",
    },
    ageYears: 800,
    ageText: '800+ năm',
    heritageLevel: 'UNESCO',
    heritageLevelText: 'UNESCO Di sản Văn hóa Phi vật thể Cần Bảo Vệ Khẩn Cấp',
    statusText: 'Đang mở cửa',
    distanceKmText: 'Cách 10 km từ Phan Rang',
    rating: 4.9,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAodYZK5LQAnaEuCGAJkp-nRgPTNmRA3kM8W8fyvqKY1Yyp0KDgL-DmoKBW2y3xAiVfU9HDL6ImuoTZCPInJZp1hndkYPFTFBTtP6BhoYz8x6_GXJvnWRk1P2nNbAgGa1Hf6s3UYjCLLXPPzIPRwPDyXCxVQwNLj-Teef1EEheeD0xlrkBxWfA7WZ1FiV7d0Bj0YIdTYguLqZ7QjXVdsfx6jhj7ppES1kWnt70qzkZ_-uIJJcoM2LC4',
    summary: 'Một trong những làng gốm cổ nhất Đông Nam Á, nơi người phụ nữ đi giật lùi quanh cối đất để nặn gốm lộ thiên.',
    historicalContext: 'Được Tổ nghề Poklong Chanh truyền dạy cho phụ nữ Chăm làng Paley Hamu Trok, gốm Bàu Trúc nung bằng củi và rơm lộ thiên, tạo nên sắc màu hỏa biến huyền bí.',
    inscriptionQuote: '"Tay làm tay xoay, chân đi giật lùi."',
    milestones: [],
    processSteps: [],
    masterpieces: [],
    artisans: [],
    visitorGuide: {
      marketInfo: { title: 'Nhà Trưng Bày Gốm Bàu Trúc', desc: 'Trưng bày bình gốm văn hóa Chăm pa độc bản.', openHours: '08:00 - 17:30' },
      experienceInfo: { title: 'Tập Đi Giật Lùi Tạo Dáng Gốm', desc: 'Thử sức tạo dáng chum vại theo nghi thức phụ nữ Chăm.', price: '50.000đ/lần' },
      museumInfo: { title: 'Tháp Poklong Garai', desc: 'Kiến trúc tháp Chăm linh thiêng trên đồi Trầu.', ticket: '20.000đ' },
      specialtyFood: { title: 'Bánh Căn Mực Cơm', desc: 'Bánh căn giòn rụm chấm nước mắm nêm và mỡ hành.', address: 'Phước Dân' },
    },
    transportRoutes: [],
    citations: [],
    isBookmarked: false,
  },
];

const MOCK_HERITAGE_STORIES: HeritageStory[] = [
  {
    id: 'story-04',
    issueCode: 'Ký sự di sản số #04',
    title: 'Giấy điệp óng ánh và bàn tay người giữ lửa cuối cùng bên dòng sông Đuống',
    quote: '"Mỗi nét gốm, sợi tơ, hay thớ gỗ là một mảnh hồn dân tộc được gìn giữ qua nghìn năm bão táp. Mất nghề là mất đi một phần ký ức của cha ông."',
    summary: 'Gặp gỡ Nghệ nhân Ưu tú Nguyễn Đăng Chế — người đã dành trọn hơn nửa thế kỷ sưu tầm, phục dựng lại hàng trăm bản khắc gỗ cổ của dòng tranh dân gian Đông Hồ, đưa vẻ đẹp mộc mạc của làng quê Bắc Bộ vươn tầm di sản thế giới.',
    artisanName: 'NNƯT. Nguyễn Đăng Chế',
    artisanTitle: 'Nghệ nhân Tranh Đông Hồ thế hệ thứ 20',
    artisanInitials: 'NĐ',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCx5Z3TDElrvatni71RMJfFzbJ0Ajvi_Hc2pHWW1bDUtQOuCqrT61kajGgsHEwdxgGygs9olWf_fyGamp5QqDYlvKP-W7efFogf0wrYmVxfkWfMux5JQvYvv5fmvbBpwlToA0T54jBWyQtu33oAAuzkxtmXSTa9e7FhDCERpYujuzjNlL4peFG3aMweCQGuPgE5FT37XsAU0Ym1eofK79I7n0AfGpiBT87kqkw5Rm7q6Himy1YWxshc',
    villageId: 'dong-ho',
  },
];

const MOCK_TOURS: TourPackage[] = [
  {
    id: 'tour-1',
    title: 'Vuốt gốm trên bàn xoay Bát Tràng',
    duration: 'Nửa ngày',
    description: 'Tự tay nhào đất, vuốt bình hoa trên bàn xoay thủ công và nung sấy mang về làm kỷ niệm.',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAodYZK5LQAnaEuCGAJkp-nRgPTNmRA3kM8W8fyvqKY1Yyp0KDgL-DmoKBW2y3xAiVfU9HDL6ImuoTZCPInJZp1hndkYPFTFBTtP6BhoYz8x6_GXJvnWRk1P2nNbAgGa1Hf6s3UYjCLLXPPzIPRwPDyXCxVQwNLj-Teef1EEheeD0xlrkBxWfA7WZ1FiV7d0Bj0YIdTYguLqZ7QjXVdsfx6jhj7ppES1kWnt70qzkZ_-uIJJcoM2LC4',
    villageId: 'bat-trang',
  },
  {
    id: 'tour-2',
    title: 'Thử thoi đưa dệt lụa Vạn Phúc',
    duration: '1 Ngày',
    description: 'Học quay tơ, mắc cửi, trò chuyện cùng nghệ nhân và in hoa văn trên khăn lụa tơ tằm quý.',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB18-b1_d5n8S7zFJ7zSRJ294QsTiJtKOTv82UjAP0Tjt-Skck4PJN70UJ3rtiWM6pmZ9ncO4TSZIHmYq5cF6pbG-J8qg0-h5udDYkmbynIQJlH9gIH2Rs08YorhPu5Rwxoa9GRVCql_5nFbAxxb5pPbT4GnEIc0q21awAQU2D4Nh2DVnWUU5XRCW-y8jKO1t1l5Un3pZFPiSN-IV-X7ZnCdQJe1P151daJL-Y83Gvi8fmt6sqELaWl',
    villageId: 'van-phuc',
  },
  {
    id: 'tour-3',
    title: 'Khâu nón bài thơ Làng Chuông',
    duration: '3 Giờ',
    description: 'Uốn vành tre nứa 16 lớp, xếp lá cọ non và thêu họa tiết câu thơ truyền thống xứ Đoài.',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiY_fhjjUIYsuH4swMDECAwqh4p9WRBKVPR1HORCRyCfLMIkR22DfguhtDo6D068ASE3gBkPGdbOq5Xz3_getSZEdTISa7j5pqudqh8kt3ZrSLwS8i7GDeQ46B3IUzv9MX9P6GfcR5PGcx2GRwCWaGtN0KP4eDUWkWso6EQHj8ageEIUlEHYTfSYih_ardp9Qjroc93sF-GjKNR6mG8vYWkALIfB6K7M9tEXe12Mf17hEpUQ9v33ZY',
    villageId: 'phu-vinh',
  },
];

const normalizeVillage = (v: any): Village => {
  return {
    ...v,
    imageUrl: v.coverImage,
    craftType: v.sectorTag || v.categoryName,
    shortDescription: v.summary,
    fullDescription: v.historicalContext,
    establishedYear: v.ageText || `${v.ageYears} năm`,
    establishedCentury: Math.max(10, Math.floor(21 - (v.ageYears / 100))),
    artisansCount: v.artisans ? v.artisans.length : 12,
    reviewCount: 128,
    highlights: v.processSteps ? v.processSteps.map((p: any) => p.title) : ['Di sản văn hóa', 'Kỹ thuật cổ truyền'],
    gallery: v.masterpieces ? v.masterpieces.map((m: any) => m.imageUrl) : [v.coverImage],
    craftProcess: v.processSteps,
    featuredProducts: v.masterpieces,
    masterArtisan: v.artisans && v.artisans[0] ? v.artisans[0] : {
      name: 'Nghệ nhân',
      title: 'NNND',
      experience: '45 năm',
      specialty: 'Kỹ nghệ cổ truyền',
      bio: 'Bảo tồn di sản cha ông để lại.',
      avatarUrl: v.coverImage,
    },
    visitingHours: v.visitorGuide?.marketInfo?.openHours || '07:30 - 18:00',
    ticketPrice: v.visitorGuide?.museumInfo?.ticket || 'Miễn phí tham quan',
    coordinates: v.coords,
  };
};

export class VillageService {
  private static bookmarks: Set<string> = new Set(
    JSON.parse(localStorage.getItem('langnghe_bookmarks') || '["bat-trang", "van-phuc", "dong-ho"]')
  );

  public static getAllVillages(filters?: {
    region?: string;
    category?: string;
    search?: string;
    heritageLevel?: string;
  }): Village[] {
    let result = [...MOCK_VILLAGES];

    if (filters?.region && filters.region !== 'all') {
      result = result.filter(v => {
        if (filters.region === 'bac-bo' || filters.region === 'bac') return v.region === 'bac';
        if (filters.region === 'trung-bo' || filters.region === 'trung') return v.region === 'trung';
        if (filters.region === 'nam-bo' || filters.region === 'nam') return v.region === 'nam';
        return true;
      });
    }

    if (filters?.category && filters.category !== 'all') {
      result = result.filter(v => v.categoryId === filters.category);
    }

    if (filters?.heritageLevel && filters.heritageLevel !== 'All' && filters.heritageLevel !== 'Tất cả') {
      result = result.filter(v => v.heritageLevel === filters.heritageLevel);
    }

    if (filters?.search && filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(v =>
        v.name.toLowerCase().includes(q) ||
        v.province.toLowerCase().includes(q) ||
        v.district.toLowerCase().includes(q) ||
        (v.categoryName || '').toLowerCase().includes(q)
      );
    }

    // Attach bookmark status & normalized fields
    return result.map(v => ({
      ...normalizeVillage(v),
      isBookmarked: this.bookmarks.has(v.id),
    }));
  }

  public static async getVillages(filters?: any): Promise<Village[]> {
    return this.getAllVillages(filters);
  }

  public static getVillageById(idOrSlug: string): Village | undefined {
    const village = MOCK_VILLAGES.find(v => v.id === idOrSlug || v.slug === idOrSlug);
    if (!village) return undefined;
    return {
      ...normalizeVillage(village),
      isBookmarked: this.bookmarks.has(village.id),
    };
  }

  public static async getVillageByIdAsync(idOrSlug: string): Promise<Village | undefined> {
    return this.getVillageById(idOrSlug);
  }

  public static getFeaturedVillages(): Village[] {
    return MOCK_VILLAGES.slice(0, 4).map(v => ({
      ...normalizeVillage(v),
      isBookmarked: this.bookmarks.has(v.id),
    }));
  }

  public static async getFeaturedVillagesAsync(): Promise<Village[]> {
    return this.getFeaturedVillages();
  }

  public static getCategories(): Category[] {
    return MOCK_CATEGORIES.map(c => ({
      ...c,
      count: c.villageCount,
      icon: c.iconName,
    }));
  }

  public static async getCategoriesAsync(): Promise<Category[]> {
    return this.getCategories();
  }

  public static getHeritageStories(): HeritageStory[] {
    return [...MOCK_HERITAGE_STORIES];
  }

  public static async getHeritageStoriesAsync(): Promise<HeritageStory[]> {
    return this.getHeritageStories();
  }

  public static getTours(): TourPackage[] {
    return [...MOCK_TOURS];
  }

  public static async getToursAsync(): Promise<TourPackage[]> {
    return this.getTours();
  }

  public static toggleBookmark(villageId: string): boolean {
    let nowBookmarked: boolean;
    if (this.bookmarks.has(villageId)) {
      this.bookmarks.delete(villageId);
      nowBookmarked = false;
    } else {
      this.bookmarks.add(villageId);
      nowBookmarked = true;
    }
    localStorage.setItem('langnghe_bookmarks', JSON.stringify(Array.from(this.bookmarks)));
    return nowBookmarked;
  }

  public static getBookmarkedVillages(): Village[] {
    return MOCK_VILLAGES.filter(v => this.bookmarks.has(v.id)).map(v => ({
      ...normalizeVillage(v),
      isBookmarked: true,
    }));
  }

  public static getBookmarkCount(): number {
    return this.bookmarks.size;
  }
}

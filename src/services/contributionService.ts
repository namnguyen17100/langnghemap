/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Làng Nghề Map - Contribution & Proposal Service
 * Handles user submissions, approval pipelines, and heritage FAQs
 */

import { ContributionRequest, FaqItem } from '../types';

const MOCK_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Thế nào là một làng nghề đủ tiêu chí xuất hiện trên Bản đồ Di sản?',
    answer: 'Theo quy chuẩn bảo tồn di sản của đề tài E01, làng nghề cần đáp ứng ít nhất một trong ba tiêu chí: Có lịch sử hình thành tối thiểu từ 50 năm trở lên; Có quy trình kỹ nghệ mang tính đặc thù bản địa không bị cơ giới hóa hoàn toàn; Hoặc được địa phương công nhận là làng nghề truyền thống theo Nghị định 52/2018/NĐ-CP của Chính phủ.',
  },
  {
    id: 'faq-2',
    question: 'Thời gian xét duyệt và công bố hồ sơ đề xuất mất bao lâu?',
    answer: 'Thông thường quy trình đối soát diễn ra từ 5 đến 7 ngày làm việc. Nếu làng nghề thuộc danh mục có di tích lịch sử cấp quốc gia hoặc hồ sơ đầy đủ tài liệu ảnh, tọa độ và trích dẫn nghiên cứu, việc phê chuẩn có thể hoàn thành trong vòng 48 giờ. Bạn sẽ nhận được thông báo phản hồi qua email đã đăng ký.',
  },
  {
    id: 'faq-3',
    question: 'Quyền sở hữu hình ảnh và bản quyền tư liệu được quản lý ra sao?',
    answer: 'Người đóng góp giữ quyền tác giả đối với hình ảnh và video tư liệu. Làng Nghề Map cam kết luôn ghi chú rõ tên tác giả/người cung cấp (Attribution) dưới từng khung hình khi công bố trên bản đồ tương tác và hệ thống bảo tàng số. Dự án không bán hoặc chuyển giao dữ liệu này cho các mục đích thương mại ngoài phạm vi nghiên cứu và quảng bá văn hóa du lịch phi lợi nhuận.',
  },
  {
    id: 'faq-4',
    question: 'Làm sao để nghệ nhân hoặc đại diện làng nghề liên hệ trực tiếp với Ban Chủ Nhiệm đề tài?',
    answer: 'Nghệ nhân, đại diện Hiệp hội làng nghề hoặc phòng Văn hóa huyện có thể gửi thư trực tiếp đến địa chỉ nghiên cứu: di-san@langnghemap.ai.studio hoặc chọn mục "Đăng ký Nghệ nhân" ngay trên biểu mẫu này để chuyên viên văn hóa thực địa đến khảo sát trực tiếp tại xưởng nghề.',
  },
];

const LOCAL_STORAGE_KEY = 'langnghe_user_contributions';

export class ContributionService {
  public static async submitContribution(data: Partial<ContributionRequest>): Promise<ContributionRequest> {
    const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    const trackingCode = `#E01-VN-${new Date().getFullYear()}-${String(existing.length + 89).padStart(3, '0')}`;
    
    const newRecord: ContributionRequest = {
      id: `contrib-${Date.now()}`,
      trackingCode,
      contributionType: data.contributionType || 'new_village',
      villageName: data.villageName || '',
      categoryId: data.categoryId || 'gom-su',
      approximateAge: data.approximateAge || 100,
      patronFounder: data.patronFounder || '',
      summary: data.summary || '',
      province: data.province || 'Hà Nội',
      district: data.district || '',
      commune: data.commune || '',
      lat: data.lat || 21.0543,
      lng: data.lng || 105.9189,
      images: data.images || [],
      referenceSource: data.referenceSource || '',
      submitterName: data.submitterName || '',
      submitterEmail: data.submitterEmail || '',
      submitterOrg: data.submitterOrg || '',
      submittedAt: new Date().toISOString(),
      status: 'PENDING',
    };

    existing.unshift(newRecord);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));

    return newRecord;
  }

  public static async getRecentApprovedMilestone(): Promise<{
    title: string;
    submitter: string;
    description: string;
    imageUrl: string;
  }> {
    return {
      title: 'Làng đúc đồng Tống Xá (Nam Định)',
      submitter: 'TS. Trần Văn Minh',
      description: 'Hơn 900 năm giữ lửa tinh hoa chế tác chuông đồng, tượng phật. Hồ sơ được hoàn thiện sau khi thẩm định 14 sắc phong tại đền thờ Tổ nghề Nguyễn Minh Không.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdpawyxvQfbeMvhLjDlXXo4YEfbBd32m9Qhk9KUQ6KhTidBcE6Zg5bOIxnKv0SMZ0yAPFr6pkYjJkQbI0USEBUsAq2Jjt7YPO9Gm7xBS71IxO3oVhIYwHJdY5Ca3vvVYCD5KJZ-WZQ96Imia1qoWLVe1XhhLEEEbknFnTNZJfaBpiJ6J51tP21-oSvAhJwMTe4kA9VcV7LD7CD8AXU_l6OnNJVid1jFIEnrMSfoITJRUq6-YqX5xvD',
    };
  }

  public static getFaqs(): FaqItem[] {
    return [...MOCK_FAQS];
  }

  public static async getFaqsAsync(): Promise<FaqItem[]> {
    return [...MOCK_FAQS];
  }
}

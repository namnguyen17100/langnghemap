/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Làng Nghề Map - Contribution & Proposal View
 * Corresponds to Image 5 & Image 6 specifications
 */

import React, { useState } from 'react';
import { ContributionService } from '../../services/contributionService';
import { FaqItem } from '../../types';

interface ContributeViewProps {
  onSuccessNavigate?: () => void;
}

export const ContributeView: React.FC<ContributeViewProps> = ({ onSuccessNavigate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  // Form State
  const [purpose, setPurpose] = useState<'new_village' | 'update_info' | 'correct_data'>('new_village');
  const [contributor, setContributor] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Nghiên cứu / Học thuật',
  });
  const [villageData, setVillageData] = useState({
    name: '',
    province: 'Hà Nội',
    district: '',
    category: 'Gốm sứ & Đất nung',
    establishedYear: '',
    description: '',
    lat: 21.0285,
    lng: 105.8542,
  });
  const [attachedFiles, setAttachedFiles] = useState<string[]>([
    'hoso_thuyetminh_ditich.pdf',
    'hinhanh_nghenhan_vuotgom.jpg',
  ]);
  const [faqs] = useState<FaqItem[]>(ContributionService.getFaqs());
  const [expandedFaq, setExpandedFaq] = useState<string | null>('faq-1');

  const handleCoordinateClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Approximate mapping for demo map
    const newLat = Number((21.5 - (y / rect.height) * 2).toFixed(4));
    const newLng = Number((105.0 + (x / rect.width) * 2).toFixed(4));

    setVillageData({ ...villageData, lat: newLat, lng: newLng });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await ContributionService.submitContribution({
        purpose,
        contributor,
        villageData,
        materials: attachedFiles,
      });
      setSubmittedId(res.trackingCode || res.id || 'HERITAGE-VN-2025-08912');
    } catch (err) {
      alert('Đã có lỗi xảy ra khi gửi đề xuất!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setSubmittedId(null);
    setVillageData({
      name: '',
      province: 'Hà Nội',
      district: '',
      category: 'Gốm sứ & Đất nung',
      establishedYear: '',
      description: '',
      lat: 21.0285,
      lng: 105.8542,
    });
  };

  return (
    <div className="min-h-screen bg-[#faf6f0] text-stone-800 pb-16">
      {/* Header Banner */}
      <div className="bg-[#5e2812] text-white py-10 px-4 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left max-w-2xl">
            <span className="px-3 py-1 bg-[#ffdbce] text-[#370d00] font-bold text-xs rounded-full inline-block">
              Hệ Tri Thức Cộng Đồng
            </span>
            <h1 className="font-serif text-2xl md:text-4xl font-bold tracking-tight">
              Đóng Góp & Đề Xuất Dữ Liệu Làng Nghề
            </h1>
            <p className="text-xs md:text-sm text-stone-200 leading-relaxed font-sans">
              Chung tay cùng các chuyên gia bảo tồn, số hoá và ghi danh những làng nghề thủ công truyền thống đang dần mai một trên khắp dải đất hình chữ S.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center shrink-0">
            <span className="text-[11px] text-stone-300 block uppercase font-medium">Hồ sơ đã tiếp nhận</span>
            <span className="font-serif text-3xl font-bold text-amber-300">1.284</span>
            <p className="text-[10px] text-stone-300">Từ 63 tỉnh thành trên toàn quốc</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form (2 cols) */}
          <div className="lg:col-span-2">
            {submittedId ? (
              /* Success Confirmation Card */
              <div className="bg-white rounded-3xl p-8 lg:p-12 border border-[#e2d5c8] shadow-sm text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-4xl">
                  <span className="material-symbols-outlined text-4xl">check_circle</span>
                </div>

                <div className="space-y-2">
                  <span className="px-3 py-1 bg-[#f4ebe1] text-[#7a3e26] font-bold text-xs rounded-full uppercase">
                    Gửi hồ sơ thành công
                  </span>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900">
                    Cảm ơn bạn đã đóng góp tư liệu di sản!
                  </h2>
                  <p className="text-xs md:text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
                    Hồ sơ đóng góp của bạn đã được chuyển đến <strong>Hội đồng Giám định Làng Nghề Việt Nam</strong> để thẩm định thực địa và đối chiếu gia phả làng nghề.
                  </p>
                </div>

                {/* Tracking ID Badge */}
                <div className="p-4 bg-[#faf5ef] rounded-2xl border border-[#ede2d6] max-w-md mx-auto space-y-1">
                  <span className="text-[10px] text-stone-500 uppercase font-bold block">
                    Mã hồ sơ tra cứu trực tuyến (Tracking ID)
                  </span>
                  <span className="font-mono text-xl font-bold text-[#5e2812]">
                    {submittedId}
                  </span>
                  <p className="text-[11px] text-stone-500">
                    Thông báo tiến độ sẽ được gửi đến hòm thư: <strong>{contributor.email || 'namb8217@gmail.com'}</strong>
                  </p>
                </div>

                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={resetForm}
                    className="py-2.5 px-6 bg-[#5e2812] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#431c0c]"
                  >
                    Gửi thêm đề xuất khác
                  </button>
                  {onSuccessNavigate && (
                    <button
                      onClick={onSuccessNavigate}
                      className="py-2.5 px-5 bg-white border border-[#e2d5c8] text-stone-700 text-xs font-semibold rounded-xl hover:bg-stone-50"
                    >
                      Quay về trang chủ
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* Step-by-Step Form Terminal */
              <div className="bg-white rounded-3xl p-6 lg:p-8 border border-[#e2d5c8] shadow-sm space-y-6">
                {/* Step indicator */}
                <div className="flex items-center justify-between border-b border-[#f0e6dc] pb-4 overflow-x-auto">
                  {[
                    { num: 1, title: 'Mục đích' },
                    { num: 2, title: 'Người gửi' },
                    { num: 3, title: 'Thông tin làng' },
                    { num: 4, title: 'Tọa độ GIS' },
                    { num: 5, title: 'Tư liệu ảnh' },
                  ].map((s) => (
                    <div
                      key={s.num}
                      onClick={() => setCurrentStep(s.num)}
                      className={`flex items-center gap-2 cursor-pointer transition-all shrink-0 px-2 ${
                        currentStep === s.num
                          ? 'text-[#5e2812] font-bold'
                          : currentStep > s.num
                          ? 'text-stone-700'
                          : 'text-stone-400'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                          currentStep === s.num
                            ? 'bg-[#5e2812] text-white'
                            : currentStep > s.num
                            ? 'bg-[#ffdbce] text-[#5e2812]'
                            : 'bg-stone-100 text-stone-400'
                        }`}
                      >
                        {currentStep > s.num ? '✓' : s.num}
                      </div>
                      <span className="text-xs hidden sm:inline">{s.title}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Step 1: Purpose */}
                  {currentStep === 1 && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <div>
                        <span className="text-xs font-bold text-[#7a3e26] uppercase tracking-wider block">
                          Bước 1 trên 5
                        </span>
                        <h3 className="font-serif text-xl font-bold text-stone-900 mt-1">
                          Bạn muốn đóng góp nội dung gì?
                        </h3>
                        <p className="text-xs text-stone-500 mt-0.5">
                          Chọn hình thức phù hợp nhất để chúng tôi chuẩn bị biểu mẫu kiểm chứng.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        {[
                          {
                            id: 'new_village',
                            icon: 'add_location_alt',
                            title: 'Đề xuất làng nghề mới chưa có trên bản đồ',
                            desc: 'Dành cho các cụm nghề truyền thống địa phương chưa được ghi nhận trên hệ thống số.',
                          },
                          {
                            id: 'update_info',
                            icon: 'edit_document',
                            title: 'Bổ sung danh sách nghệ nhân & sản phẩm tinh hoa',
                            desc: 'Cập nhật thêm thông tin về Nghệ nhân Ưu tú mới, xưởng chế tác hoặc sự kiện lễ hội.',
                          },
                          {
                            id: 'correct_data',
                            icon: 'published_with_changes',
                            title: 'Đính chính tọa độ GIS hoặc tư liệu lịch sử',
                            desc: 'Báo cáo điểm sai lệch về niên đại, nguồn gốc thần tích hoặc vị trí định vị trên bản đồ vệ tinh.',
                          },
                        ].map((item) => (
                          <label
                            key={item.id}
                            className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                              purpose === item.id
                                ? 'border-[#7a3e26] bg-[#faf5f0] shadow-xs'
                                : 'border-[#e8dcd0] hover:bg-[#fbf9f6]'
                            }`}
                          >
                            <input
                              type="radio"
                              name="purpose"
                              checked={purpose === item.id}
                              onChange={() => setPurpose(item.id as any)}
                              className="mt-1 accent-[#7a3e26]"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#5e2812] text-xl">
                                  {item.icon}
                                </span>
                                <h4 className="font-serif font-bold text-sm text-stone-900">
                                  {item.title}
                                </h4>
                              </div>
                              <p className="text-xs text-stone-600 mt-1 pl-7 leading-relaxed">
                                {item.desc}
                              </p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Contributor Details */}
                  {currentStep === 2 && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <div>
                        <span className="text-xs font-bold text-[#7a3e26] uppercase tracking-wider block">
                          Bước 2 trên 5
                        </span>
                        <h3 className="font-serif text-xl font-bold text-stone-900 mt-1">
                          Thông tin người liên hệ đóng góp
                        </h3>
                        <p className="text-xs text-stone-500 mt-0.5">
                          Thông tin này được bảo mật và chỉ dùng khi ban thẩm định cần liên hệ xác minh.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="font-bold text-stone-700 block mb-1">Họ và tên của bạn</label>
                          <input
                            type="text"
                            required
                            placeholder="Ví dụ: Nguyễn Thế Nam"
                            value={contributor.name}
                            onChange={(e) => setContributor({ ...contributor, name: e.target.value })}
                            className="w-full px-3.5 py-2.5 border border-[#e2d5c8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7a3e26]"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-stone-700 block mb-1">Địa chỉ Email</label>
                          <input
                            type="email"
                            required
                            placeholder="email@vidu.com"
                            value={contributor.email}
                            onChange={(e) => setContributor({ ...contributor, email: e.target.value })}
                            className="w-full px-3.5 py-2.5 border border-[#e2d5c8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7a3e26]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="font-bold text-stone-700 block mb-1">Số điện thoại liên lạc</label>
                          <input
                            type="tel"
                            placeholder="0912 345 678"
                            value={contributor.phone}
                            onChange={(e) => setContributor({ ...contributor, phone: e.target.value })}
                            className="w-full px-3.5 py-2.5 border border-[#e2d5c8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7a3e26]"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-stone-700 block mb-1">Vai trò của bạn đối với di sản</label>
                          <select
                            value={contributor.role}
                            onChange={(e) => setContributor({ ...contributor, role: e.target.value })}
                            className="w-full px-3.5 py-2.5 border border-[#e2d5c8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7a3e26] bg-white"
                          >
                            <option value="Nghiên cứu / Học thuật">Nhà nghiên cứu / Giảng viên Văn hoá</option>
                            <option value="Nghệ nhân địa phương">Nghệ nhân / Thợ lành nghề tại làng</option>
                            <option value="Cư dân địa phương">Người dân sinh sống tại khu vực</option>
                            <option value="Du khách đam mê di sản">Du khách / Nhiếp ảnh gia độc lập</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Village Data */}
                  {currentStep === 3 && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <div>
                        <span className="text-xs font-bold text-[#7a3e26] uppercase tracking-wider block">
                          Bước 3 trên 5
                        </span>
                        <h3 className="font-serif text-xl font-bold text-stone-900 mt-1">
                          Hồ sơ chi tiết làng nghề đề xuất
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="font-bold text-stone-700 block mb-1">Tên làng nghề</label>
                          <input
                            type="text"
                            required
                            placeholder="Ví dụ: Làng gốm Phù Lãng"
                            value={villageData.name}
                            onChange={(e) => setVillageData({ ...villageData, name: e.target.value })}
                            className="w-full px-3.5 py-2.5 border border-[#e2d5c8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7a3e26]"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-stone-700 block mb-1">Phân loại ngành nghề</label>
                          <select
                            value={villageData.category}
                            onChange={(e) => setVillageData({ ...villageData, category: e.target.value })}
                            className="w-full px-3.5 py-2.5 border border-[#e2d5c8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7a3e26] bg-white"
                          >
                            <option value="Gốm sứ & Đất nung">Gốm sứ & Đất nung</option>
                            <option value="Dệt vải & Tơ lụa">Dệt vải & Tơ lụa</option>
                            <option value="Tranh dân gian & Khắc gỗ">Tranh dân gian & Khắc gỗ</option>
                            <option value="Đúc kim khí & Mỹ nghệ đồng">Đúc kim khí & Mỹ nghệ đồng</option>
                            <option value="Mây tre đan & Sơn mài">Mây tre đan & Sơn mài</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="font-bold text-stone-700 block mb-1">Tỉnh / Thành phố</label>
                          <input
                            type="text"
                            required
                            placeholder="Ví dụ: Bắc Ninh"
                            value={villageData.province}
                            onChange={(e) => setVillageData({ ...villageData, province: e.target.value })}
                            className="w-full px-3.5 py-2.5 border border-[#e2d5c8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7a3e26]"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-stone-700 block mb-1">Năm hoặc thế kỷ khởi lập ước tính</label>
                          <input
                            type="text"
                            placeholder="Ví dụ: Thế kỷ 13 (Thời Trần)"
                            value={villageData.establishedYear}
                            onChange={(e) => setVillageData({ ...villageData, establishedYear: e.target.value })}
                            className="w-full px-3.5 py-2.5 border border-[#e2d5c8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7a3e26]"
                          />
                        </div>
                      </div>

                      <div className="text-xs">
                        <label className="font-bold text-stone-700 block mb-1">Tóm tắt lịch sử & Kỹ nghệ đặc trưng</label>
                        <textarea
                          rows={3}
                          placeholder="Mô tả kỹ thuật độc đáo, câu chuyện cụ tổ nghề, thần tích đền miếu..."
                          value={villageData.description}
                          onChange={(e) => setVillageData({ ...villageData, description: e.target.value })}
                          className="w-full px-3.5 py-2.5 border border-[#e2d5c8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7a3e26]"
                        ></textarea>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Coordinates GIS */}
                  {currentStep === 4 && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <div>
                        <span className="text-xs font-bold text-[#7a3e26] uppercase tracking-wider block">
                          Bước 4 trên 5
                        </span>
                        <h3 className="font-serif text-xl font-bold text-stone-900 mt-1">
                          Xác định vị trí địa lý (Tọa độ GIS)
                        </h3>
                        <p className="text-xs text-stone-500 mt-0.5">
                          Nhấp trực tiếp lên bản đồ mô phỏng để ghim điểm hoặc nhập vĩ độ/kinh độ chính xác.
                        </p>
                      </div>

                      {/* Mini Map Picker */}
                      <div
                        onClick={handleCoordinateClick}
                        className="relative h-60 bg-[#e7ded2] rounded-2xl border-2 border-dashed border-[#c5b49e] overflow-hidden cursor-crosshair flex items-center justify-center"
                      >
                        <div className="absolute inset-0 bg-[radial-gradient(#c5b49e_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
                        <div className="text-center p-4 z-10 pointer-events-none">
                          <span className="material-symbols-outlined text-4xl text-[#7a3e26]">pin_drop</span>
                          <p className="text-xs font-bold text-[#5e2812] mt-1">
                            Nhấp vào khu vực để ghim tọa độ
                          </p>
                          <p className="text-[11px] text-stone-600 font-mono mt-0.5">
                            Lat: {villageData.lat} • Lng: {villageData.lng}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="font-bold text-stone-700 block mb-1">Vĩ độ (Latitude)</label>
                          <input
                            type="number"
                            step="0.0001"
                            value={villageData.lat}
                            onChange={(e) => setVillageData({ ...villageData, lat: Number(e.target.value) })}
                            className="w-full px-3 py-2 border border-[#e2d5c8] rounded-xl font-mono"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-stone-700 block mb-1">Kinh độ (Longitude)</label>
                          <input
                            type="number"
                            step="0.0001"
                            value={villageData.lng}
                            onChange={(e) => setVillageData({ ...villageData, lng: Number(e.target.value) })}
                            className="w-full px-3 py-2 border border-[#e2d5c8] rounded-xl font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 5: Media & Attachment */}
                  {currentStep === 5 && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <div>
                        <span className="text-xs font-bold text-[#7a3e26] uppercase tracking-wider block">
                          Bước 5 trên 5
                        </span>
                        <h3 className="font-serif text-xl font-bold text-stone-900 mt-1">
                          Tư liệu ảnh & Minh chứng lịch sử
                        </h3>
                        <p className="text-xs text-stone-500 mt-0.5">
                          Tải lên ảnh chụp thực tế hoặc tài liệu PDF thuyết minh để tăng độ tin cậy của đề xuất.
                        </p>
                      </div>

                      {/* Dropzone mockup */}
                      <div className="border-2 border-dashed border-[#e2d5c8] hover:border-[#7a3e26] transition-colors rounded-2xl p-6 text-center bg-[#faf7f2] cursor-pointer">
                        <span className="material-symbols-outlined text-4xl text-[#7a3e26]">cloud_upload</span>
                        <h4 className="font-bold text-stone-800 text-xs mt-1">Kéo thả tệp hoặc bấm để chọn ảnh</h4>
                        <p className="text-[11px] text-stone-500 mt-0.5">PNG, JPG, PDF tối đa 25MB</p>
                      </div>

                      {/* Attached files list */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-bold text-stone-600 block uppercase">
                          Tệp đính kèm ({attachedFiles.length})
                        </span>
                        {attachedFiles.map((f, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                          >
                            <span className="flex items-center gap-2 text-stone-700">
                              <span className="material-symbols-outlined text-sm text-[#7a3e26]">attachment</span>
                              {f}
                            </span>
                            <button
                              type="button"
                              onClick={() => setAttachedFiles(attachedFiles.filter((_, idx) => idx !== i))}
                              className="text-stone-400 hover:text-rose-600"
                            >
                              <span className="material-symbols-outlined text-sm">delete</span>
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="p-3 bg-[#faf5ef] rounded-xl border border-[#ede2d6] text-[11px] text-stone-600 space-y-1">
                        <label className="flex items-start gap-2 cursor-pointer font-medium">
                          <input type="checkbox" required defaultChecked className="mt-0.5 accent-[#7a3e26]" />
                          <span>
                            Tôi cam kết thông tin cung cấp là chính xác, không vi phạm bản quyền và cho phép Dự án Bản Đồ Làng Nghề sử dụng vì mục đích bảo tồn văn hoá phi lợi nhuận.
                          </span>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#f0e6dc]">
                    {currentStep > 1 ? (
                      <button
                        type="button"
                        onClick={() => setCurrentStep((prev) => prev - 1)}
                        className="py-2.5 px-5 border border-[#e2d5c8] text-stone-700 text-xs font-semibold rounded-xl hover:bg-stone-50 flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-base">arrow_back</span>
                        Quay lại
                      </button>
                    ) : (
                      <div></div>
                    )}

                    {currentStep < 5 ? (
                      <button
                        type="button"
                        onClick={() => setCurrentStep((prev) => prev + 1)}
                        className="py-2.5 px-6 bg-[#5e2812] hover:bg-[#431c0c] text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 transition-all"
                      >
                        Tiếp theo
                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="py-2.5 px-7 bg-[#a34720] hover:bg-[#8c3a16] text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-2 transition-all disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Đang mã hoá & gửi hồ sơ...
                          </>
                        ) : (
                          <>
                            <span className="material-symbols-outlined text-base">send</span>
                            Gửi hồ sơ thẩm định di sản
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}

            {/* Heritage FAQ Accordion */}
            <div className="bg-white rounded-3xl p-6 lg:p-8 border border-[#e2d5c8] shadow-sm space-y-4 mt-8">
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Câu hỏi thường gặp về đóng góp di sản
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Giải đáp các thắc mắc về quy trình xét duyệt và chính sách vinh danh.
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="border border-[#e8dcd0] rounded-2xl overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                      className="w-full p-4 text-left flex items-center justify-between text-xs md:text-sm font-bold text-stone-800 hover:bg-[#faf5ef] transition-colors"
                    >
                      <span className="font-serif">{faq.question}</span>
                      <span className="material-symbols-outlined text-stone-400">
                        {expandedFaq === faq.id ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                    {expandedFaq === faq.id && (
                      <div className="p-4 pt-0 text-xs text-stone-600 leading-relaxed border-t border-[#f0e6dc] bg-[#fdfcf9]">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar Column (1 col) */}
          <div className="space-y-6">
            {/* 4-Step Approval Pipeline */}
            <div className="bg-white rounded-3xl p-5 border border-[#e2d5c8] shadow-xs space-y-4">
              <h3 className="font-serif font-bold text-base text-stone-900 border-b border-[#f0e6dc] pb-2">
                Quy trình thẩm định 4 bước
              </h3>

              <div className="space-y-3.5">
                {[
                  { step: '01', title: 'Tiếp nhận & Mã hóa', desc: 'Hệ thống tự động cấp mã tra cứu và gửi email xác nhận.' },
                  { step: '02', title: 'Hội đồng chuyên gia đối chiếu', desc: 'Kiểm tra tài liệu lịch sử, văn bia và thần tích địa phương.' },
                  { step: '03', title: 'Xác minh thực địa', desc: 'Liên hệ UBND xã/phường và hội nghệ nhân tại địa bàn.' },
                  { step: '04', title: 'Công bố lên bản đồ số', desc: 'Ghi danh đóng góp và mở hồ sơ trên hệ thống công khai.' },
                ].map((p) => (
                  <div key={p.step} className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-lg bg-[#ffe8dc] text-[#5e2812] flex items-center justify-center text-xs font-mono font-bold shrink-0">
                      {p.step}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-stone-800">{p.title}</h4>
                      <p className="text-[11px] text-stone-500 leading-tight mt-0.5">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Advisory Board Card */}
            <div className="bg-white rounded-3xl p-5 border border-[#e2d5c8] shadow-xs space-y-3">
              <h3 className="font-serif font-bold text-base text-stone-900 border-b border-[#f0e6dc] pb-2">
                Hội đồng Cố vấn Di sản
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 bg-[#faf6f2] rounded-xl border border-[#ede2d6]">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
                    alt="PGS.TS"
                    className="w-10 h-10 rounded-full object-cover border border-[#c4a482]"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">PGS.TS Nguyễn Văn Huy</h4>
                    <p className="text-[10px] text-stone-500">Nguyên Giám đốc Bảo tàng Dân tộc học VN</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2 bg-[#faf6f2] rounded-xl border border-[#ede2d6]">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                    alt="NNND"
                    className="w-10 h-10 rounded-full object-cover border border-[#c4a482]"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">NNND Nguyễn Đăng Chế</h4>
                    <p className="text-[10px] text-stone-500">Trưởng ban Cố vấn Dòng tranh Dân gian</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recently Approved Milestone */}
            <div className="bg-gradient-to-br from-[#7a3e26] to-[#5e2812] text-white rounded-3xl p-5 shadow-md space-y-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-300 text-lg">verified</span>
                <span className="text-[11px] font-bold text-[#ffb59a] uppercase tracking-wider">
                  Vừa phê duyệt thành công
                </span>
              </div>
              <h4 className="font-serif font-bold text-sm">
                Làng Gốm Bàu Trúc (Ninh Thuận)
              </h4>
              <p className="text-xs text-stone-200 leading-relaxed font-serif">
                Được UNESCO ghi danh vào Danh sách Di sản Văn hóa phi vật thể cần bảo vệ khẩn cấp năm 2022. Đã bổ sung 18 nghệ nhân Chăm tiêu biểu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

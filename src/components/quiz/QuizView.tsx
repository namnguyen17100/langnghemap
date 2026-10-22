/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Làng Nghề Map - Cultural Heritage Quiz View
 * Corresponds to Image 3 & Image 4 specifications
 */

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { QuizService } from '../../services/quizService';
import { QuizQuestion, LeaderboardUser, QuizTopic } from '../../types';

interface QuizViewProps {
  onNavigateToVillage?: (villageId: string) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ onNavigateToVillage }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [xp, setXp] = useState(0);
  const [eliminatedOptions, setEliminatedOptions] = useState<number[]>([]);
  const [usedFiftyFifty, setUsedFiftyFifty] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [topics, setTopics] = useState<QuizTopic[]>([]);
  const [showCertificate, setShowCertificate] = useState(false);
  const [activeLeaderboardTab, setActiveLeaderboardTab] = useState<'weekly' | 'allTime'>('weekly');

  useEffect(() => {
    setQuestions(QuizService.getAllQuestions());
    setLeaderboard(QuizService.getLeaderboard());
    setTopics(QuizService.getTopics());
  }, []);

  // Timer effect
  useEffect(() => {
    if (!timerActive || isAnswered || isFinished || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up -> auto reveal answer as incorrect
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timerActive, isAnswered, isFinished, timeLeft]);

  const handleTimeUp = () => {
    setIsAnswered(true);
    setSelectedOption(-1); // No option chosen
  };

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const currentQ = questions[currentIndex];
    if (index === currentQ.correctAnswer) {
      setScore((prev) => prev + 1);
      setXp((prev) => prev + currentQ.points);
    }
  };

  const handleFiftyFifty = () => {
    if (usedFiftyFifty || isAnswered) return;
    const currentQ = questions[currentIndex];
    const wrongOptions = [0, 1, 2, 3].filter((i) => i !== currentQ.correctAnswer);
    // Shuffle and pick 2 wrong options to eliminate
    const toEliminate = wrongOptions.sort(() => 0.5 - Math.random()).slice(0, 2);
    setEliminatedOptions(toEliminate);
    setUsedFiftyFifty(true);
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setEliminatedOptions([]);
      setTimeLeft(30);
    } else {
      setIsFinished(true);
      // Trigger festive confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setXp(0);
    setEliminatedOptions([]);
    setUsedFiftyFifty(false);
    setTimeLeft(30);
    setIsFinished(false);
    setShowCertificate(false);
  };

  const currentQ = questions[currentIndex];

  const getRankTitle = (pts: number) => {
    if (pts >= 1200) return 'Đại Sư Tinh Hoa Di Sản';
    if (pts >= 800) return 'Nhà Khảo Cứu Di Sản';
    if (pts >= 500) return 'Người Giữ Hồn Văn Hoá';
    return 'Tập Sự Di Sản';
  };

  return (
    <div className="min-h-screen bg-[#faf6f0] text-stone-800 pb-16">
      {/* Header Banner */}
      <div className="bg-[#5e2812] text-white py-8 px-4 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="px-3 py-1 bg-[#ffdbce] text-[#370d00] font-bold text-xs rounded-full inline-block">
              Đấu Trường Tri Thức
            </span>
            <h1 className="font-serif text-2xl md:text-4xl font-bold tracking-tight">
              Thử Thách Tri Thức Di Sản Làng Nghề
            </h1>
            <p className="text-xs md:text-sm text-stone-200">
              Kiểm tra vốn hiểu biết về lịch sử, nghệ nhân và kỹ thuật thủ công cổ truyền Việt Nam
            </p>
          </div>

          {/* Quick Stats Chips */}
          <div className="flex items-center gap-2">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 text-center">
              <span className="text-[10px] text-stone-300 block uppercase">Tổng câu hỏi</span>
              <span className="text-sm md:text-base font-bold font-mono text-white">15 Thử thách</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 text-center">
              <span className="text-[10px] text-stone-300 block uppercase">Điểm thưởng</span>
              <span className="text-sm md:text-base font-bold font-mono text-amber-300">+1500 XP</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Quiz Terminal (2 cols) */}
          <div className="lg:col-span-2">
            {!isFinished ? (
              currentQ ? (
                <div className="bg-white rounded-3xl p-6 lg:p-8 border border-[#e2d5c8] shadow-sm space-y-6">
                  {/* Progress & Tools Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f0e6dc] pb-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-[#f4ebe1] text-[#7a3e26] font-bold text-xs rounded-xl">
                        Câu {currentIndex + 1} / {questions.length}
                      </span>
                      <span className="px-2.5 py-1 bg-stone-100 text-stone-600 text-xs rounded-lg font-medium">
                        {currentQ.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Timer */}
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 font-mono text-xs font-bold">
                        <span className="material-symbols-outlined text-sm">timer</span>
                        <span>00:{String(timeLeft).padStart(2, '0')}</span>
                      </div>

                      {/* 50:50 Lifeline */}
                      <button
                        onClick={handleFiftyFifty}
                        disabled={usedFiftyFifty || isAnswered}
                        className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                          usedFiftyFifty || isAnswered
                            ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                            : 'bg-[#ffe8dc] text-[#5e2812] hover:bg-[#ffd2be]'
                        }`}
                        title="Ẩn 2 phương án sai"
                      >
                        <span className="material-symbols-outlined text-sm">magic_button</span>
                        Trợ giúp 50:50 {usedFiftyFifty && '(Đã dùng)'}
                      </button>
                    </div>
                  </div>

                  {/* Question Image (If available) */}
                  {currentQ.imageUrl && (
                    <div className="h-52 w-full rounded-2xl overflow-hidden border border-[#e2d5c8] relative">
                      <img
                        src={currentQ.imageUrl}
                        alt="Hình ảnh gợi ý"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 text-white text-[10px] rounded backdrop-blur-md">
                        Hình ảnh tư liệu gợi ý
                      </span>
                    </div>
                  )}

                  {/* Question Text */}
                  <div>
                    <h2 className="font-serif text-xl md:text-2xl font-bold text-stone-900 leading-snug">
                      {currentQ.question}
                    </h2>
                  </div>

                  {/* Options List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentQ.options.map((opt, idx) => {
                      const isEliminated = eliminatedOptions.includes(idx);
                      const isCorrect = idx === currentQ.correctAnswer;
                      const isUserChoice = idx === selectedOption;

                      let btnStyle = 'border-[#e2d5c8] bg-[#fbf9f6] text-stone-800 hover:border-[#7a3e26] hover:bg-white';

                      if (isEliminated) {
                        btnStyle = 'opacity-30 border-stone-200 bg-stone-50 cursor-not-allowed line-through text-stone-400';
                      } else if (isAnswered) {
                        if (isCorrect) {
                          btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold shadow-xs';
                        } else if (isUserChoice) {
                          btnStyle = 'border-rose-500 bg-rose-50 text-rose-900 font-bold';
                        } else {
                          btnStyle = 'opacity-50 border-stone-200 bg-stone-50';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={isAnswered || isEliminated}
                          onClick={() => handleOptionSelect(idx)}
                          className={`p-4 rounded-2xl border text-left text-xs md:text-sm transition-all flex items-start gap-3 relative ${btnStyle}`}
                        >
                          <span
                            className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                              isAnswered && isCorrect
                                ? 'bg-emerald-600 text-white'
                                : isAnswered && isUserChoice
                                ? 'bg-rose-600 text-white'
                                : 'bg-stone-200 text-stone-700'
                            }`}
                          >
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="flex-1 font-medium">{typeof opt === 'string' ? opt : (opt as any).label}</span>

                          {isAnswered && isCorrect && (
                            <span className="material-symbols-outlined text-emerald-600 text-lg">check_circle</span>
                          )}
                          {isAnswered && isUserChoice && !isCorrect && (
                            <span className="material-symbols-outlined text-rose-600 text-lg">cancel</span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation Fact Box (Shown after answering) */}
                  {isAnswered && (
                    <div className="bg-[#faf5ef] border border-[#e8dcd0] rounded-2xl p-4 md:p-5 space-y-2 animate-in fade-in duration-300">
                      <div className="flex items-center gap-2 text-[#7a3e26] font-bold text-xs uppercase tracking-wider">
                        <span className="material-symbols-outlined text-base">auto_awesome</span>
                        Tư liệu lịch sử & Giải thích chuyên sâu
                      </div>
                      <p className="text-xs md:text-sm text-stone-700 leading-relaxed font-serif">
                        {currentQ.explanation}
                      </p>
                      {currentQ.culturalFact && (
                        <div className="mt-2 pt-2 border-t border-[#ede2d6] text-xs text-stone-600 italic">
                          💡 <strong>Góc mở rộng:</strong> {currentQ.culturalFact}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Bottom Navigation */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#f0e6dc]">
                    <div className="text-xs text-stone-500 font-medium">
                      Điểm hiện tại: <strong className="text-[#5e2812]">{score}/{currentIndex + (isAnswered ? 1 : 0)} đúng</strong> ({xp} XP)
                    </div>

                    {isAnswered && (
                      <button
                        onClick={handleNextQuestion}
                        className="py-2.5 px-6 bg-[#5e2812] hover:bg-[#431c0c] text-white text-xs md:text-sm font-bold rounded-xl shadow-md flex items-center gap-1.5 transition-all"
                      >
                        {currentIndex + 1 < questions.length ? 'Câu tiếp theo' : 'Xem kết quả tổng kết'}
                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                      </button>
                    )}
                  </div>
                </div>
              ) : null
            ) : (
              /* Finish Screen & Certificate */
              <div className="bg-white rounded-3xl p-6 lg:p-10 border border-[#e2d5c8] shadow-sm text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-[#ffe8dc] text-[#5e2812] flex items-center justify-center mx-auto text-4xl shadow-inner">
                  <span className="material-symbols-outlined text-4xl">emoji_events</span>
                </div>

                <div className="space-y-2">
                  <span className="px-3 py-1 bg-[#f4ebe1] text-[#7a3e26] font-bold text-xs rounded-full uppercase">
                    Hoàn thành bài khảo thí
                  </span>
                  <h2 className="font-serif text-3xl font-bold text-stone-900">
                    Chúc mừng bạn đã chinh phục thử thách!
                  </h2>
                  <p className="text-stone-600 text-sm max-w-md mx-auto">
                    Bạn đạt danh hiệu: <strong className="text-[#5e2812]">{getRankTitle(xp)}</strong>
                  </p>
                </div>

                {/* Score Summary Card */}
                <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto p-4 bg-[#faf5ef] rounded-2xl border border-[#ede2d6]">
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase font-medium block">Số câu đúng</span>
                    <span className="font-serif text-2xl font-bold text-[#5e2812]">
                      {score} / {questions.length}
                    </span>
                  </div>
                  <div className="border-x border-[#ede2d6]">
                    <span className="text-[10px] text-stone-500 uppercase font-medium block">Tỷ lệ chính xác</span>
                    <span className="font-serif text-2xl font-bold text-emerald-600">
                      {Math.round((score / questions.length) * 100)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase font-medium block">Tổng XP nhận được</span>
                    <span className="font-serif text-2xl font-bold text-amber-600 font-mono">
                      +{xp} XP
                    </span>
                  </div>
                </div>

                {/* Certificate Showcase Option */}
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => setShowCertificate(true)}
                    className="py-3 px-6 bg-[#7a3e26] hover:bg-[#5e2812] text-white text-xs md:text-sm font-bold rounded-xl shadow-md flex items-center gap-2 transition-all"
                  >
                    <span className="material-symbols-outlined text-base">card_membership</span>
                    Xem Chứng Nhận Tri Thức Di Sản
                  </button>
                  <button
                    onClick={handleRestartQuiz}
                    className="py-3 px-5 bg-white border border-[#e2d5c8] hover:bg-stone-50 text-stone-700 text-xs md:text-sm font-semibold rounded-xl flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-base">replay</span>
                    Làm lại bài thi
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Leaderboard & Topics (1 col) */}
          <div className="space-y-6">
            {/* Leaderboard Card */}
            <div className="bg-white rounded-3xl p-5 border border-[#e2d5c8] shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#f0e6dc] pb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-600 text-xl">workspace_premium</span>
                  <h3 className="font-serif font-bold text-base text-stone-900">
                    Bảng Vàng Tuần Này
                  </h3>
                </div>
                <span className="text-[11px] text-stone-500">Mới cập nhật</span>
              </div>

              <div className="space-y-3">
                {leaderboard.map((user) => (
                  <div
                    key={`${user.rank}-${user.name}`}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-[#faf6f2] border border-[#ede2d6]"
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
                        user.rank === 1
                          ? 'bg-amber-400 text-amber-950'
                          : user.rank === 2
                          ? 'bg-stone-300 text-stone-800'
                          : user.rank === 3
                          ? 'bg-amber-700 text-white'
                          : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {user.rank}
                    </span>

                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-9 h-9 rounded-full object-cover border border-[#e2d5c8]"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-stone-900 truncate">{user.name}</h4>
                        <span className="text-xs font-bold font-mono text-[#5e2812]">
                          {user.points} XP
                        </span>
                      </div>
                      <span className="text-[10px] text-stone-500 truncate block">
                        {user.badge}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Curated Heritage Topics */}
            <div className="bg-white rounded-3xl p-5 border border-[#e2d5c8] shadow-xs space-y-3">
              <h3 className="font-serif font-bold text-base text-stone-900 border-b border-[#f0e6dc] pb-2">
                Chủ Đề Khảo Thí Theo Làng
              </h3>

              <div className="space-y-2.5">
                {topics.map((t) => (
                  <div
                    key={t.id}
                    className="p-3 bg-[#fbf9f6] rounded-xl border border-[#ede2d6] hover:border-[#7a3e26] transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <h4 className="font-serif font-bold text-xs text-stone-900 group-hover:text-[#5e2812]">
                        {t.title || t.name}
                      </h4>
                      <p className="text-[10px] text-stone-500">{t.questionsCount || t.questionCount || 15} câu hỏi • Mức độ {t.difficulty || 'Trung cấp'}</p>
                    </div>
                    <span className="material-symbols-outlined text-stone-400 group-hover:text-[#5e2812] text-sm">
                      chevron_right
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Heritage Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#fffdf9] rounded-3xl max-w-2xl w-full p-8 shadow-2xl border-4 border-[#7a3e26] relative text-center space-y-4">
            <button
              onClick={() => setShowCertificate(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            {/* Certificate Header */}
            <div className="border-b-2 border-[#7a3e26] pb-4">
              <span className="text-xs font-mono tracking-widest text-[#7a3e26] uppercase font-bold block">
                CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
              </span>
              <span className="text-[10px] text-stone-500 block">Độc lập - Tự do - Hạnh phúc</span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#5e2812] mt-3">
                CHỨNG NHẬN TRI THỨC DI SẢN LÀNG NGHỀ
              </h2>
              <p className="text-xs text-stone-600 italic">Dự án số hóa Bản Đồ Làng Nghề Việt Nam</p>
            </div>

            {/* Body */}
            <div className="py-4 space-y-2">
              <p className="text-xs text-stone-600">Trân trọng chứng nhận công dân văn hóa:</p>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Nhà Nghiên Cứu Di Sản Trẻ
              </h3>
              <p className="text-xs text-stone-700 max-w-md mx-auto leading-relaxed">
                Đã xuất sắc hoàn thành bộ 15 câu hỏi khảo thí chuyên sâu về các làng nghề truyền thống Bát Tràng, Đông Hồ, Vạn Phúc, Đại Bái với tổng điểm {score}/{questions.length} ({xp} XP).
              </p>
              <div className="inline-block px-4 py-1.5 bg-[#f4ebe1] text-[#7a3e26] font-bold text-xs rounded-full mt-2">
                Danh hiệu: {getRankTitle(xp)}
              </div>
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-2 pt-6 text-xs text-stone-600 border-t border-[#ede2d6]">
              <div>
                <span className="font-bold block text-stone-800">Hội đồng Cố vấn Di sản</span>
                <span className="italic text-[10px]">Đã xác thực chữ ký số</span>
              </div>
              <div>
                <span className="font-bold block text-stone-800">Ban Dự Án Làng Nghề Map</span>
                <span className="font-mono text-[#5e2812] font-bold text-[11px]">CERT-{Date.now().toString().slice(-6)}</span>
              </div>
            </div>

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => {
                  alert('Đang xuất tệp chứng nhận PDF độ phân giải cao...');
                  setShowCertificate(false);
                }}
                className="py-2.5 px-6 bg-[#5e2812] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#431c0c]"
              >
                Tải ảnh chứng nhận về máy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

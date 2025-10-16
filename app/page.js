'use client';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [universities, setUniversities] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'universities'));
      const universitiesData = [];
      querySnapshot.forEach((doc) => {
        universitiesData.push({ id: doc.id, ...doc.data() });
      });
      // 정렬 순서대로 표시
      universitiesData.sort((a, b) => (a.order || 0) - (b.order || 0));
      setUniversities(universitiesData);
    } catch (error) {
      console.error('대학 정보를 불러오는데 실패했습니다:', error);
    }
  };

  const handleUniversityClick = (university) => {
    router.push(`/map?university=${encodeURIComponent(university.name)}`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 검은색 그라데이션 배경 */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-gradient-radial from-gray-800/20 via-transparent to-transparent"></div>
      </div>

      {/* 움직이는 그라데이션 효과 */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-slow-delay"></div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-start pt-24 px-4 pb-12">
        {/* 회사명 - 토스 스타일 */}
        <div className="mb-8 animate-fade-in-down">
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-white mb-4 text-center tracking-tight">
            UniPart
          </h1>
          <div className="h-1 w-32 bg-white mx-auto rounded-full"></div>
        </div>
        
        {/* 소개 문구 - 토스 스타일 */}
        <div className="animate-fade-in-up mb-20">
          <p className="text-xl md:text-2xl lg:text-3xl text-white text-center max-w-4xl mb-6 leading-relaxed font-medium">
            대학과 지역을 연결하는
          </p>
          <p className="text-xl md:text-2xl lg:text-3xl text-white text-center max-w-4xl leading-relaxed font-medium">
            <span className="text-white/70">새로운 파트너십</span>
          </p>
          <p className="text-base md:text-lg text-white/60 text-center max-w-2xl mt-8 leading-relaxed">
            학생들이 더 많은 혜택과 경험을 누리며<br className="hidden md:block" />
            지역 사회와 함께 성장할 수 있도록 지원합니다
          </p>
        </div>

        {/* 대학 버튼 리스트 - 토스 스타일 */}
        <div className="w-full max-w-xl space-y-5 animate-fade-in">
          {universities.length === 0 ? (
            <p className="text-white/50 text-center text-lg">등록된 대학이 없습니다.</p>
          ) : (
            universities.map((university, index) => (
              <button
                key={university.id}
                onClick={() => handleUniversityClick(university)}
                className="university-button group w-full py-6 px-8 bg-white/5 backdrop-blur-sm border border-white/20 text-white text-xl font-bold rounded-2xl transition-all duration-500 ease-out hover:bg-white hover:text-black hover:border-white hover:shadow-2xl hover:shadow-white/20"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <span className="inline-block transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-y-360">
                  {university.name}
                </span>
              </button>
            ))
          )}
        </div>

        {/* 하단 텍스트 */}
        <div className="mt-auto pt-20">
          <p className="text-white/40 text-sm text-center mb-4">
            지역 상권과 캠퍼스를 잇는 가교
          </p>
          <a
            href="/admin"
            className="text-white/30 hover:text-white/60 text-xs transition-all duration-300 block text-center"
          >
            관리자 페이지
          </a>
        </div>
      </div>
    </div>
  );
}

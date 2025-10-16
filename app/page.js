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
    <div className="min-h-screen bg-black flex flex-col items-center justify-start pt-20 px-4">
      {/* 회사명 */}
      <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 text-center">
        UniPart
      </h1>
      
      {/* 소개 문구 */}
      <p className="text-lg md:text-xl text-white text-center max-w-3xl mb-16 leading-relaxed opacity-90">
        대학과의 파트너십을 통해 지역 상권과 캠퍼스를 잇는 가교 역할을 합니다.<br />
        학생들이 더 많은 혜택과 경험을 누리며 지역 사회와 함께 성장할 수 있도록 지원합니다.
      </p>

      {/* 대학 버튼 리스트 */}
      <div className="w-full max-w-md space-y-4">
        {universities.length === 0 ? (
          <p className="text-white text-center opacity-60">등록된 대학이 없습니다.</p>
        ) : (
          universities.map((university) => (
            <button
              key={university.id}
              onClick={() => handleUniversityClick(university)}
              className="w-full py-4 px-6 bg-transparent border-2 border-sky-400 text-white text-lg font-medium rounded-lg hover:bg-sky-400 hover:bg-opacity-20 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              {university.name}
            </button>
          ))
        )}
      </div>

      {/* 관리자 페이지 링크 */}
      <div className="mt-16">
        <a
          href="/admin"
          className="text-gray-400 hover:text-gray-300 text-sm transition-colors"
        >
          관리자 페이지
        </a>
      </div>
    </div>
  );
}

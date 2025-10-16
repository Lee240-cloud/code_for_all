'use client';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useState, useEffect, useCallback } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const KakaoMap = ({ university }) => {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);

  // 기본 위치 (인천광역시 연수구 송도과학로16번길 33-1)
  const [center, setCenter] = useState({
    lat: 37.3789,
    lng: 126.6620
  });

  const fetchStores = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'stores'));
      const storesData = [];
      querySnapshot.forEach((doc) => {
        const data = { id: doc.id, ...doc.data() };
        // 대학이 선택된 경우 해당 대학 가게만 필터링
        if (!university || data.university === university) {
          storesData.push(data);
        }
      });
      setStores(storesData);
    } catch (error) {
      console.error('가게 정보를 불러오는데 실패했습니다:', error);
    }
  }, [university]);

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  const handleMarkerClick = (store) => {
    setSelectedStore(store);
  };

  return (
    <div className="relative w-full h-full">
      <Map
        center={center}
        style={{ width: '100%', height: '100%' }}
        level={4}
      >
        {stores.map((store) => (
          <MapMarker
            key={store.id}
            position={{ lat: store.lat, lng: store.lng }}
            onClick={() => handleMarkerClick(store)}
          />
        ))}
      </Map>

      {selectedStore && (
        <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg max-w-sm z-10">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg">{selectedStore.name}</h3>
            <button
              onClick={() => setSelectedStore(null)}
              className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
            >
              ×
            </button>
          </div>
          <p className="text-gray-600 mb-2">카테고리: {selectedStore.category}</p>
          {selectedStore.university && (
            <p className="text-sm text-gray-600 mb-2">🎓 {selectedStore.university}</p>
          )}
          {selectedStore.coupon && (
            <p className="text-blue-600 mb-2">🎫 {selectedStore.coupon}</p>
          )}
          <p className="text-sm text-gray-500 mb-2">{selectedStore.address}</p>
          {selectedStore.phone && (
            <p className="text-sm text-gray-600 mb-2">📞 {selectedStore.phone}</p>
          )}
          {selectedStore.rating && (
            <div className="flex items-center mb-2">
              <span className="text-yellow-500">⭐</span>
              <span className="ml-1 text-sm">{selectedStore.rating}</span>
              {selectedStore.reviewCount && (
                <span className="ml-1 text-sm text-gray-500">
                  ({selectedStore.reviewCount}개 리뷰)
                </span>
              )}
            </div>
          )}
          {selectedStore.description && (
            <p className="text-sm text-gray-600 mb-2">{selectedStore.description}</p>
          )}
          {selectedStore.link && (
            <a
              href={selectedStore.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
            >
              링크 방문하기 →
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default KakaoMap;
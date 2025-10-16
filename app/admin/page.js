'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  addStore, getStores, updateStore, deleteStore,
  addUniversity, getUniversities, updateUniversity, deleteUniversity 
} from '@/lib/storeService';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('stores');
  
  const [storeFormData, setStoreFormData] = useState({
    name: '', category: '', address: '', lat: '', lng: '',
    coupon: '', rating: '', reviewCount: '', phone: '',
    description: '', university: '', link: ''
  });
  const [stores, setStores] = useState([]);
  const [editingStore, setEditingStore] = useState(null);
  const [showStoreList, setShowStoreList] = useState(false);
  const [storeLoading, setStoreLoading] = useState(false);
  const [storeSuccess, setStoreSuccess] = useState(false);

  const [universityFormData, setUniversityFormData] = useState({
    name: '', lat: '', lng: '', order: ''
  });
  const [universities, setUniversities] = useState([]);
  const [editingUniversity, setEditingUniversity] = useState(null);
  const [showUniversityList, setShowUniversityList] = useState(false);
  const [universityLoading, setUniversityLoading] = useState(false);
  const [universitySuccess, setUniversitySuccess] = useState(false);

  const categories = [
    '한식', '중식', '일식', '양식', '분식', '치킨', '피자', '카페', 
    '베이커리', '편의점', '문구점', '서점', '미용실', '세탁소', '기타'
  ];

  useEffect(() => {
    loadStores();
    loadUniversities();
  }, []);

  const loadStores = async () => {
    try {
      const storesData = await getStores();
      setStores(storesData);
    } catch (error) {
      console.error('가게 목록 로드 실패:', error);
    }
  };

  const handleStoreChange = (e) => {
    setStoreFormData({ ...storeFormData, [e.target.name]: e.target.value });
  };

  const handleStoreSubmit = async (e) => {
    e.preventDefault();
    setStoreLoading(true);
    try {
      const storeData = {
        ...storeFormData,
        lat: parseFloat(storeFormData.lat),
        lng: parseFloat(storeFormData.lng),
        rating: storeFormData.rating ? parseFloat(storeFormData.rating) : null,
        reviewCount: storeFormData.reviewCount ? parseInt(storeFormData.reviewCount) : null
      };
      if (editingStore) {
        await updateStore(editingStore.id, storeData);
        setEditingStore(null);
      } else {
        await addStore(storeData);
      }
      setStoreSuccess(true);
      setStoreFormData({
        name: '', category: '', address: '', lat: '', lng: '',
        coupon: '', rating: '', reviewCount: '', phone: '',
        description: '', university: '', link: ''
      });
      await loadStores();
      setTimeout(() => setStoreSuccess(false), 3000);
    } catch (error) {
      console.error('가게 처리 실패:', error);
      alert('가게 처리에 실패했습니다.');
    }
    setStoreLoading(false);
  };

  const handleStoreEdit = (store) => {
    setEditingStore(store);
    setStoreFormData({
      name: store.name || '', category: store.category || '',
      address: store.address || '', lat: store.lat || '', lng: store.lng || '',
      coupon: store.coupon || '', rating: store.rating || '',
      reviewCount: store.reviewCount || '', phone: store.phone || '',
      description: store.description || '', university: store.university || '',
      link: store.link || ''
    });
    setShowStoreList(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStoreDelete = async (storeId) => {
    if (!confirm('정말 이 가게를 삭제하시겠습니까?')) return;
    try {
      await deleteStore(storeId);
      await loadStores();
      alert('가게가 삭제되었습니다.');
    } catch (error) {
      console.error('가게 삭제 실패:', error);
      alert('가게 삭제에 실패했습니다.');
    }
  };

  const handleStoreCancelEdit = () => {
    setEditingStore(null);
    setStoreFormData({
      name: '', category: '', address: '', lat: '', lng: '',
      coupon: '', rating: '', reviewCount: '', phone: '',
      description: '', university: '', link: ''
    });
  };

  const loadUniversities = async () => {
    try {
      const universitiesData = await getUniversities();
      setUniversities(universitiesData.sort((a, b) => (a.order || 0) - (b.order || 0)));
    } catch (error) {
      console.error('대학 목록 로드 실패:', error);
    }
  };

  const handleUniversityChange = (e) => {
    setUniversityFormData({ ...universityFormData, [e.target.name]: e.target.value });
  };

  const handleUniversitySubmit = async (e) => {
    e.preventDefault();
    setUniversityLoading(true);
    try {
      const universityData = {
        name: universityFormData.name,
        lat: parseFloat(universityFormData.lat),
        lng: parseFloat(universityFormData.lng),
        order: universityFormData.order ? parseInt(universityFormData.order) : 0
      };
      if (editingUniversity) {
        await updateUniversity(editingUniversity.id, universityData);
        setEditingUniversity(null);
      } else {
        await addUniversity(universityData);
      }
      setUniversitySuccess(true);
      setUniversityFormData({ name: '', lat: '', lng: '', order: '' });
      await loadUniversities();
      setTimeout(() => setUniversitySuccess(false), 3000);
    } catch (error) {
      console.error('대학 처리 실패:', error);
      alert('대학 처리에 실패했습니다.');
    }
    setUniversityLoading(false);
  };

  const handleUniversityEdit = (university) => {
    setEditingUniversity(university);
    setUniversityFormData({
      name: university.name || '', lat: university.lat || '',
      lng: university.lng || '', order: university.order || ''
    });
    setShowUniversityList(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUniversityDelete = async (universityId) => {
    if (!confirm('정말 이 대학을 삭제하시겠습니까?')) return;
    try {
      await deleteUniversity(universityId);
      await loadUniversities();
      alert('대학이 삭제되었습니다.');
    } catch (error) {
      console.error('대학 삭제 실패:', error);
      alert('대학 삭제에 실패했습니다.');
    }
  };

  const handleUniversityCancelEdit = () => {
    setEditingUniversity(null);
    setUniversityFormData({ name: '', lat: '', lng: '', order: '' });
  };

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4 text-white">관리자 페이지</h1>
          <Link href="/" className="text-white/60 hover:text-white transition-colors">← 메인 페이지로 돌아가기</Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b">
            <button onClick={() => setActiveTab('stores')} className={`flex-1 px-6 py-4 font-semibold transition-colors ${activeTab === 'stores' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
              가게 관리
            </button>
            <button onClick={() => setActiveTab('universities')} className={`flex-1 px-6 py-4 font-semibold transition-colors ${activeTab === 'universities' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
              대학 관리
            </button>
          </div>
        </div>

        {activeTab === 'stores' && (
          <>
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold">파트너십 가게 관리</h2>
              <button onClick={() => setShowStoreList(!showStoreList)} className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">
                {showStoreList ? '가게 추가 폼 보기' : '등록된 가게 목록 보기'}
              </button>
            </div>

            {showStoreList ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">등록된 가게 목록</h3>
                {stores.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">등록된 가게가 없습니다.</p>
                ) : (
                  <div className="space-y-4">
                    {stores.map((store) => (
                      <div key={store.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-gray-900">{store.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">
                              <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mr-2">{store.category}</span>
                              {store.university && <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs mr-2">🎓 {store.university}</span>}
                              {store.address}
                            </p>
                            {store.coupon && <p className="text-sm text-blue-600 mt-1">🎫 {store.coupon}</p>}
                            {store.link && <p className="text-sm text-blue-600 mt-1 truncate">🔗 {store.link}</p>}
                            <div className="text-xs text-gray-500 mt-2">
                              위치: {store.lat}, {store.lng}
                              {store.rating && ` | 평점: ⭐ ${store.rating}`}
                              {store.phone && ` | 📞 ${store.phone}`}
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <button onClick={() => handleStoreEdit(store)} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm">수정</button>
                            <button onClick={() => handleStoreDelete(store.id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm">삭제</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-6 text-center">{editingStore ? '가게 정보 수정' : '파트너십 가게 추가'}</h3>
                {editingStore && (
                  <div className="mb-4 p-4 bg-yellow-100 text-yellow-800 rounded-md flex justify-between items-center">
                    <span>&apos;{editingStore.name}&apos; 가게를 수정하고 있습니다.</span>
                    <button onClick={handleStoreCancelEdit} className="text-sm underline hover:no-underline">취소</button>
                  </div>
                )}
                {storeSuccess && (<div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">가게가 성공적으로 {editingStore ? '수정' : '추가'}되었습니다!</div>)}

                <form onSubmit={handleStoreSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">가게명 *</label>
                      <input type="text" name="name" value={storeFormData.name} onChange={handleStoreChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">카테고리 *</label>
                      <select name="category" value={storeFormData.category} onChange={handleStoreChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">카테고리 선택</option>
                        {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">대학명 *</label>
                      <select name="university" value={storeFormData.university} onChange={handleStoreChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">대학 선택</option>
                        {universities.map((uni) => <option key={uni.id} value={uni.name}>{uni.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">전화번호</label>
                      <input type="tel" name="phone" value={storeFormData.phone} onChange={handleStoreChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">주소 *</label>
                    <input type="text" name="address" value={storeFormData.address} onChange={handleStoreChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">위도 *</label>
                      <input type="number" step="any" name="lat" value={storeFormData.lat} onChange={handleStoreChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">경도 *</label>
                      <input type="number" step="any" name="lng" value={storeFormData.lng} onChange={handleStoreChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">가게 링크 (URL)</label>
                    <input type="url" name="link" value={storeFormData.link} onChange={handleStoreChange} placeholder="https://example.com" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">쿠폰 정보</label>
                    <input type="text" name="coupon" value={storeFormData.coupon} onChange={handleStoreChange} placeholder="예: 10% 할인" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">평점</label>
                      <input type="number" step="0.1" min="0" max="5" name="rating" value={storeFormData.rating} onChange={handleStoreChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">리뷰 개수</label>
                      <input type="number" min="0" name="reviewCount" value={storeFormData.reviewCount} onChange={handleStoreChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
                    <textarea name="description" value={storeFormData.description} onChange={handleStoreChange} rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>

                  <button type="submit" disabled={storeLoading} className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50">
                    {storeLoading ? (editingStore ? '수정 중...' : '추가 중...') : (editingStore ? '가게 수정' : '가게 추가')}
                  </button>
                </form>
              </div>
            )}
          </>
        )}

        {activeTab === 'universities' && (
          <>
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold">대학 관리</h2>
              <button onClick={() => setShowUniversityList(!showUniversityList)} className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">
                {showUniversityList ? '대학 추가 폼 보기' : '등록된 대학 목록 보기'}
              </button>
            </div>

            {showUniversityList ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">등록된 대학 목록</h3>
                {universities.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">등록된 대학이 없습니다.</p>
                ) : (
                  <div className="space-y-4">
                    {universities.map((university) => (
                      <div key={university.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-gray-900">{university.name}</h4>
                            <div className="text-xs text-gray-500 mt-2">위치: {university.lat}, {university.lng} | 순서: {university.order || 0}</div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <button onClick={() => handleUniversityEdit(university)} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm">수정</button>
                            <button onClick={() => handleUniversityDelete(university.id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm">삭제</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-6 text-center">{editingUniversity ? '대학 정보 수정' : '대학 추가'}</h3>
                {editingUniversity && (
                  <div className="mb-4 p-4 bg-yellow-100 text-yellow-800 rounded-md flex justify-between items-center">
                    <span>&apos;{editingUniversity.name}&apos; 대학을 수정하고 있습니다.</span>
                    <button onClick={handleUniversityCancelEdit} className="text-sm underline hover:no-underline">취소</button>
                  </div>
                )}
                {universitySuccess && (<div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">대학이 성공적으로 {editingUniversity ? '수정' : '추가'}되었습니다!</div>)}

                <form onSubmit={handleUniversitySubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">대학명 *</label>
                    <input type="text" name="name" value={universityFormData.name} onChange={handleUniversityChange} required placeholder="예: 한국대학교" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">위도 *</label>
                      <input type="number" step="any" name="lat" value={universityFormData.lat} onChange={handleUniversityChange} required placeholder="37.5665" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">경도 *</label>
                      <input type="number" step="any" name="lng" value={universityFormData.lng} onChange={handleUniversityChange} required placeholder="126.9780" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">표시 순서</label>
                    <input type="number" name="order" value={universityFormData.order} onChange={handleUniversityChange} placeholder="0 (작을수록 먼저 표시)" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <p className="text-xs text-gray-500 mt-1">숫자가 작을수록 메인 페이지에서 위쪽에 표시됩니다.</p>
                  </div>

                  <button type="submit" disabled={universityLoading} className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50">
                    {universityLoading ? (editingUniversity ? '수정 중...' : '추가 중...') : (editingUniversity ? '대학 수정' : '대학 추가')}
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
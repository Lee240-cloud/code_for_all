import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// ============================================
// 가게 관련 함수들
// ============================================

export const addStore = async (storeData) => {
  try {
    const docRef = await addDoc(collection(db, 'stores'), {
      ...storeData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('가게 정보 추가 실패:', error);
    throw error;
  }
};

export const getStores = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'stores'));
    const stores = [];
    querySnapshot.forEach((doc) => {
      stores.push({ id: doc.id, ...doc.data() });
    });
    return stores;
  } catch (error) {
    console.error('가게 정보 조회 실패:', error);
    throw error;
  }
};

export const updateStore = async (storeId, storeData) => {
  try {
    const storeRef = doc(db, 'stores', storeId);
    await updateDoc(storeRef, {
      ...storeData,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('가게 정보 수정 실패:', error);
    throw error;
  }
};

export const deleteStore = async (storeId) => {
  try {
    const storeRef = doc(db, 'stores', storeId);
    await deleteDoc(storeRef);
  } catch (error) {
    console.error('가게 정보 삭제 실패:', error);
    throw error;
  }
};

// ============================================
// 대학 관련 함수들
// ============================================

export const addUniversity = async (universityData) => {
  try {
    const docRef = await addDoc(collection(db, 'universities'), {
      ...universityData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('대학 정보 추가 실패:', error);
    throw error;
  }
};

export const getUniversities = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'universities'));
    const universities = [];
    querySnapshot.forEach((doc) => {
      universities.push({ id: doc.id, ...doc.data() });
    });
    return universities;
  } catch (error) {
    console.error('대학 정보 조회 실패:', error);
    throw error;
  }
};

export const updateUniversity = async (universityId, universityData) => {
  try {
    const universityRef = doc(db, 'universities', universityId);
    await updateDoc(universityRef, {
      ...universityData,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('대학 정보 수정 실패:', error);
    throw error;
  }
};

export const deleteUniversity = async (universityId) => {
  try {
    const universityRef = doc(db, 'universities', universityId);
    await deleteDoc(universityRef);
  } catch (error) {
    console.error('대학 정보 삭제 실패:', error);
    throw error;
  }
};

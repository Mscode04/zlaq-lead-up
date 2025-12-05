// src/firebase/userService.ts
import { db } from './config';
import { TestResult } from '@/types/test';
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore';

export interface UserData {
  id?: string;
  name: string;
  whatsapp: string;
  email?: string;
  result: TestResult;
  answers: Record<string, unknown>[];
  createdAt?: string;
  updatedAt?: string;
}

const usersCol = () => collection(db, 'users');

// Save user data to Firestore (auto-generates ID)
export async function saveUserData(userData: UserData): Promise<string> {
  const now = new Date().toISOString();

  const payload: DocumentData = {
    name: userData.name,
    whatsapp: userData.whatsapp,
    email: userData.email || null,
    result: userData.result,
    answers: userData.answers,
    createdAt: userData.createdAt || now,
    updatedAt: now,
  };

  console.log('[Firestore] Attempting to save user:', payload);

  try {
    console.log('[Firestore] DB instance:', db);
    console.log('[Firestore] Collection ref:', usersCol());
    
    const docRef = await addDoc(usersCol(), payload);
    console.log('[Firestore] ✅ User saved successfully with id:', docRef.id);
    
    // Also save to localStorage as backup
    const allUsers = JSON.parse(localStorage.getItem('firestore_users') || '[]');
    allUsers.push({ id: docRef.id, ...payload });
    localStorage.setItem('firestore_users', JSON.stringify(allUsers));
    console.log('[localStorage] Backup saved');
    
    return docRef.id;
  } catch (error: any) {
    console.error('[Firestore] ❌ Error saving user:');
    console.error('  - Code:', error?.code);
    console.error('  - Message:', error?.message);
    console.error('  - Full error:', error);
    
    // Save to localStorage as fallback
    try {
      const fallbackId = `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const allUsers = JSON.parse(localStorage.getItem('firestore_users') || '[]');
      allUsers.push({ id: fallbackId, ...payload });
      localStorage.setItem('firestore_users', JSON.stringify(allUsers));
      console.log('[localStorage] Fallback saved with id:', fallbackId);
      return fallbackId;
    } catch (localErr) {
      console.error('[localStorage] Fallback also failed:', localErr);
      throw error;
    }
  }
}

// Get user data by ID
export async function getUserData(userId: string): Promise<UserData | null> {
  try {
    const docRef = doc(db, 'users', userId);
    const snap = await getDoc(docRef);
    if (!snap.exists()) return null;
    return snap.data() as UserData;
  } catch (error: any) {
    console.error('[Firestore] Error fetching user:', error?.code, error?.message);
    throw error;
  }
}

// Get all users
export async function getAllUsers(): Promise<UserData[]> {
  try {
    const snap = await getDocs(usersCol());
    return snap.docs.map((d: QueryDocumentSnapshot<DocumentData>) => d.data() as UserData);
  } catch (error: any) {
    console.error('[Firestore] Error fetching users:', error?.code, error?.message);
    throw error;
  }
}

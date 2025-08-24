import { collection, getDocs, doc, getDoc, query, where, orderBy, limit as firestoreLimit } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import type { LabDesign, CaseStudy, PaginatedResponse, PaginationParams } from '@/types';

export class DesignService {
  private static readonly COLLECTION_NAME = 'labDesigns';
  private static readonly CASE_STUDIES_COLLECTION = 'caseStudies';

  static async getDesigns(params?: PaginationParams): Promise<PaginatedResponse<LabDesign>> {
    try {
      const designsRef = collection(db, this.COLLECTION_NAME);
      let q = query(designsRef, where('published', '==', true));

      if (params?.sortBy) {
        q = query(q, orderBy(params.sortBy, params.sortOrder || 'asc'));
      }

      if (params?.limit) {
        q = query(q, firestoreLimit(params.limit));
      }

      const snapshot = await getDocs(q);
      const designs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as LabDesign[];

      return {
        data: designs,
        pagination: {
          page: params?.page || 1,
          limit: params?.limit || 10,
          total: designs.length,
          totalPages: Math.ceil(designs.length / (params?.limit || 10)),
          hasNext: false,
          hasPrev: false
        }
      };
    } catch (error) {
      console.error('Error fetching designs:', error);
      throw new Error('Failed to fetch designs');
    }
  }

  static async getDesignById(id: string): Promise<LabDesign | null> {
    try {
      const docRef = doc(db, this.COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        } as LabDesign;
      }

      return null;
    } catch (error) {
      console.error('Error fetching design:', error);
      throw new Error('Failed to fetch design');
    }
  }

  static async getDesignsByCategory(category: string): Promise<LabDesign[]> {
    try {
      const designsRef = collection(db, this.COLLECTION_NAME);
      const q = query(
        designsRef,
        where('category', '==', category),
        where('published', '==', true)
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as LabDesign[];
    } catch (error) {
      console.error('Error fetching designs by category:', error);
      throw new Error('Failed to fetch designs by category');
    }
  }

  static async getFeaturedDesigns(limitCount: number = 6): Promise<LabDesign[]> {
    try {
      const designsRef = collection(db, this.COLLECTION_NAME);
      const q = query(
        designsRef,
        where('featured', '==', true),
        where('published', '==', true),
        orderBy('createdAt', 'desc'),
        firestoreLimit(limitCount)
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as LabDesign[];
    } catch (error) {
      console.error('Error fetching featured designs:', error);
      throw new Error('Failed to fetch featured designs');
    }
  }

  static async getCaseStudies(): Promise<CaseStudy[]> {
    try {
      const caseStudiesRef = collection(db, this.CASE_STUDIES_COLLECTION);
      const q = query(caseStudiesRef, orderBy('createdAt', 'desc'));

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as CaseStudy[];
    } catch (error) {
      console.error('Error fetching case studies:', error);
      throw new Error('Failed to fetch case studies');
    }
  }
}

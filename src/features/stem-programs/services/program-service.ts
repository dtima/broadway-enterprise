import { collection, getDocs, doc, getDoc, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import type { StemProgram, PaginatedResponse, PaginationParams } from '@/types';

export class ProgramService {
  private static readonly COLLECTION_NAME = 'stemPrograms';

  static async getPrograms(params?: PaginationParams): Promise<PaginatedResponse<StemProgram>> {
    try {
      const programsRef = collection(db, this.COLLECTION_NAME);
      let q = query(programsRef, where('published', '==', true));

      if (params?.sortBy) {
        q = query(q, orderBy(params.sortBy, params.sortOrder || 'asc'));
      }

      if (params?.limit) {
        q = query(q, limit(params.limit));
      }

      const snapshot = await getDocs(q);
      const programs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as StemProgram[];

      return {
        data: programs,
        pagination: {
          page: params?.page || 1,
          limit: params?.limit || 10,
          total: programs.length,
          totalPages: Math.ceil(programs.length / (params?.limit || 10)),
          hasNext: false,
          hasPrev: false
        }
      };
    } catch (error) {
      console.error('Error fetching programs:', error);
      throw new Error('Failed to fetch programs');
    }
  }

  static async getProgramById(id: string): Promise<StemProgram | null> {
    try {
      const docRef = doc(db, this.COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        } as StemProgram;
      }

      return null;
    } catch (error) {
      console.error('Error fetching program:', error);
      throw new Error('Failed to fetch program');
    }
  }

  static async getProgramsByAgeGroup(ageGroup: string): Promise<StemProgram[]> {
    try {
      const programsRef = collection(db, this.COLLECTION_NAME);
      const q = query(
        programsRef,
        where('ageGroup', '==', ageGroup),
        where('published', '==', true)
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as StemProgram[];
    } catch (error) {
      console.error('Error fetching programs by age group:', error);
      throw new Error('Failed to fetch programs by age group');
    }
  }

  static async getFeaturedPrograms(limit: number = 6): Promise<StemProgram[]> {
    try {
      const programsRef = collection(db, this.COLLECTION_NAME);
      const q = query(
        programsRef,
        where('featured', '==', true),
        where('published', '==', true),
        orderBy('createdAt', 'desc'),
        limit(limit)
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as StemProgram[];
    } catch (error) {
      console.error('Error fetching featured programs:', error);
      throw new Error('Failed to fetch featured programs');
    }
  }

  static async getAvailablePrograms(): Promise<StemProgram[]> {
    try {
      const programsRef = collection(db, this.COLLECTION_NAME);
      const q = query(
        programsRef,
        where('published', '==', true),
        orderBy('createdAt', 'desc')
      );

      const snapshot = await getDocs(q);
      const programs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as StemProgram[];

      // Filter programs with available spots
      return programs.filter(program => program.enrolled < program.capacity);
    } catch (error) {
      console.error('Error fetching available programs:', error);
      throw new Error('Failed to fetch available programs');
    }
  }
}

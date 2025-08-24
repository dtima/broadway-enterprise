import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc,
  query, 
  where, 
  orderBy, 
  limit as firestoreLimit,
  DocumentData, 
  QueryDocumentSnapshot 
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import type { Product, ProductCategory, PaginatedResponse, PaginationParams } from '@/types';

export class EquipmentService {
  private static readonly COLLECTION_NAME = 'products';
  private static readonly CATEGORIES_COLLECTION = 'productCategories';

  static async getProducts(params?: PaginationParams): Promise<PaginatedResponse<Product>> {
    // Return mock data if Firebase is not available
    if (!db) {
      return {
        data: [],
        pagination: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
          hasNext: false,
          hasPrev: false
        }
      };
    }
    try {
      const productsRef = collection(db, this.COLLECTION_NAME);
      let q = query(productsRef, where('published', '==', true));

      if (params?.sortBy) {
        q = query(q, orderBy(params.sortBy, params.sortOrder || 'asc'));
      }

      if (params?.limit) {
        q = query(q, firestoreLimit(params.limit));
      }

      const snapshot = await getDocs(q);
      const products = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];

      return {
        data: products,
        pagination: {
          page: params?.page || 1,
          limit: params?.limit || 10,
          total: products.length,
          totalPages: Math.ceil(products.length / (params?.limit || 10)),
          hasNext: false, // TODO: Implement proper pagination
          hasPrev: false
        }
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }
  }

  static async getProductById(id: string): Promise<Product | null> {
    try {
      const docRef = doc(db, this.COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        } as Product;
      }

      return null;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Failed to fetch product');
    }
  }

  static async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const productsRef = collection(db, this.COLLECTION_NAME);
      const q = query(
        productsRef,
        where('category', '==', category),
        where('published', '==', true)
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw new Error('Failed to fetch products by category');
    }
  }

  static async getCategories(): Promise<ProductCategory[]> {
    try {
      const categoriesRef = collection(db, this.CATEGORIES_COLLECTION);
      const snapshot = await getDocs(categoriesRef);

      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ProductCategory[];
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Failed to fetch categories');
    }
  }

  static async getFeaturedProducts(limitCount: number = 6): Promise<Product[]> {
    try {
      const productsRef = collection(db, this.COLLECTION_NAME);
      const q = query(
        productsRef,
        where('featured', '==', true),
        where('published', '==', true),
        orderBy('createdAt', 'desc'),
        firestoreLimit(limitCount)
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
    } catch (error) {
      console.error('Error fetching featured products:', error);
      throw new Error('Failed to fetch featured products');
    }
  }

  // Admin methods
  static async getAllProducts(params?: any): Promise<PaginatedResponse<Product>> {
    try {
      const productsRef = collection(db, this.COLLECTION_NAME);
      let q = query(productsRef); // Admin can see all products including unpublished

      if (params?.sortBy) {
        q = query(q, orderBy(params.sortBy, params.sortOrder || 'asc'));
      }

      if (params?.limit) {
        q = query(q, firestoreLimit(parseInt(params.limit, 10)));
      }

      const snapshot = await getDocs(q);
      const products = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];

      return {
        data: products,
        pagination: {
          page: params?.page ? parseInt(params.page, 10) : 1,
          limit: params?.limit ? parseInt(params.limit, 10) : 10,
          total: products.length,
          totalPages: Math.ceil(products.length / (params?.limit ? parseInt(params.limit, 10) : 10)),
          hasNext: false,
          hasPrev: false
        },
      };
    } catch (error) {
      console.error('Error fetching all products:', error);
      throw new Error('Failed to fetch products');
    }
  }

  static async createProduct(productData: any): Promise<Product> {
    if (!db) {
      throw new Error('Firebase not initialized');
    }
    
    try {
      const productsRef = collection(db, this.COLLECTION_NAME);
      const docRef = await addDoc(productsRef, productData);
      
      const newProductDoc = await getDoc(docRef);
      const data = newProductDoc.data();
      if (!data) {
        throw new Error('Failed to retrieve created product');
      }
      
      return {
        id: newProductDoc.id,
        ...data
      } as Product;
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error('Failed to create product');
    }
  }
}

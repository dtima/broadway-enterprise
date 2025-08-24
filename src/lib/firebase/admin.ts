import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const firebaseAdminConfig = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

// Initialize Firebase Admin only if credentials are available
let app: any = null;
let adminAuth: any = null;
let adminDb: any = null;

if (firebaseAdminConfig.projectId && firebaseAdminConfig.clientEmail && firebaseAdminConfig.privateKey) {
  try {
    app = getApps().length === 0 
      ? initializeApp({
          credential: cert(firebaseAdminConfig),
          projectId: firebaseAdminConfig.projectId,
        })
      : getApps()[0];

    // Initialize Firebase Admin services
    adminAuth = getAuth(app);
    adminDb = getFirestore(app);
  } catch (error) {
    console.warn('Failed to initialize Firebase Admin:', error);
  }
}

export { adminAuth, adminDb };

export default app;

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import type { ContactFormData, EquipmentInquiryData, StemRegistrationData, LabAccessData } from '@/lib/validations/schemas';

export class ContactService {
  private static readonly CONTACT_COLLECTION = 'contactSubmissions';
  private static readonly EQUIPMENT_INQUIRY_COLLECTION = 'equipmentInquiries';
  private static readonly STEM_REGISTRATION_COLLECTION = 'stemRegistrations';
  private static readonly LAB_ACCESS_COLLECTION = 'labAccessRequests';

  static async submitContactForm(data: ContactFormData) {
    try {
      const docRef = await addDoc(collection(db, this.CONTACT_COLLECTION), {
        ...data,
        status: 'new',
        createdAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw new Error('Failed to submit contact form');
    }
  }

  static async submitEquipmentInquiry(data: EquipmentInquiryData) {
    try {
      const docRef = await addDoc(collection(db, this.EQUIPMENT_INQUIRY_COLLECTION), {
        ...data,
        status: 'new',
        createdAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error submitting equipment inquiry:', error);
      throw new Error('Failed to submit equipment inquiry');
    }
  }

  static async submitStemRegistration(data: StemRegistrationData) {
    try {
      const docRef = await addDoc(collection(db, this.STEM_REGISTRATION_COLLECTION), {
        ...data,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error submitting STEM registration:', error);
      throw new Error('Failed to submit STEM registration');
    }
  }

  static async submitLabAccessRequest(data: LabAccessData) {
    try {
      const docRef = await addDoc(collection(db, this.LAB_ACCESS_COLLECTION), {
        ...data,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error submitting lab access request:', error);
      throw new Error('Failed to submit lab access request');
    }
  }
}

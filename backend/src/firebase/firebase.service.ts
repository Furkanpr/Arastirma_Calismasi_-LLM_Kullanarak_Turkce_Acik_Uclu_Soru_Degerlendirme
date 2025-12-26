import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as path from 'path';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private db: admin.firestore.Firestore | null = null;
  private useMockMode = false;
  
  // Mock storage for development without Firebase
  private mockEvaluations: Map<string, any> = new Map();
  private mockIdCounter = 1;

  async onModuleInit() {
    try {
      // Firebase Admin SDK'yı başlat
      const serviceAccountPath = path.join(__dirname, '../../../../firebase-config/serviceAccountKey.json');
      const serviceAccount = require(serviceAccountPath);
      
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });

      this.db = admin.firestore();
      this.useMockMode = false;
      console.log('✅ Firebase initialized successfully');
    } catch (error) {
      console.error('❌ Firebase initialization error:', error.message);
      console.log('⚠️  Using mock Firebase for development (in-memory storage)');
      this.useMockMode = true;
    }
  }

  getFirestore(): admin.firestore.Firestore | null {
    return this.db;
  }

  async saveEvaluation(evaluationData: any): Promise<string> {
    if (this.useMockMode) {
      // Mock mode: in-memory storage
      const id = `mock_eval_${this.mockIdCounter++}`;
      const data = {
        ...evaluationData,
        id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.mockEvaluations.set(id, data);
      console.log(`📝 [Mock] Saved evaluation: ${id}`);
      return id;
    }

    try {
      const docRef = await this.db!.collection('evaluations').add({
        ...evaluationData,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error saving evaluation:', error);
      throw error;
    }
  }

  async getEvaluation(evaluationId: string): Promise<any> {
    if (this.useMockMode) {
      // Mock mode: in-memory storage
      const data = this.mockEvaluations.get(evaluationId);
      if (!data) {
        return null;
      }
      return data;
    }

    try {
      const doc = await this.db!.collection('evaluations').doc(evaluationId).get();
      if (!doc.exists) {
        return null;
      }
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      console.error('Error getting evaluation:', error);
      throw error;
    }
  }

  async updateEvaluation(evaluationId: string, data: any): Promise<void> {
    if (this.useMockMode) {
      // Mock mode: in-memory storage
      const existing = this.mockEvaluations.get(evaluationId);
      if (existing) {
        this.mockEvaluations.set(evaluationId, {
          ...existing,
          ...data,
          updatedAt: new Date(),
        });
        console.log(`📝 [Mock] Updated evaluation: ${evaluationId}`);
      }
      return;
    }

    try {
      await this.db!.collection('evaluations').doc(evaluationId).update({
        ...data,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating evaluation:', error);
      throw error;
    }
  }

  async getAllEvaluations(): Promise<any[]> {
    if (this.useMockMode) {
      // Mock mode: in-memory storage
      const evaluations = Array.from(this.mockEvaluations.values());
      console.log(`📝 [Mock] Retrieved ${evaluations.length} evaluations`);
      return evaluations.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    try {
      const snapshot = await this.db!.collection('evaluations').get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting all evaluations:', error);
      throw error;
    }
  }
}

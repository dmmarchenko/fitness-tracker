import { firestore } from 'firebase';

export interface Exercise {
  id: string;
  name: string;
  duration: number;
  calories: number;
  date?: Date | firestore.Timestamp;
  state?: 'completed' | 'cancelled' | null;
}

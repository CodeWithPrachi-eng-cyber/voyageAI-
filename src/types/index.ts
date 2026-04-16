export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface Trip {
  id?: string;
  userId: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  interests: string[];
  itinerary: DayPlan[];
  createdAt: any;
}

export interface DayPlan {
  day: number;
  activities: Activity[];
}

export interface Activity {
  time: string;
  activity: string;
  location?: string;
  cost?: number;
  category: 'sightseeing' | 'food' | 'transport' | 'accommodation' | 'other';
}

export interface Expense {
  id?: string;
  tripId: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

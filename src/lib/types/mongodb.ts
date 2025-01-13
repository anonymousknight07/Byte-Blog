import { ObjectId } from 'mongodb';

export interface Subscriber {
  email: string;
  createdAt: Date;
  subscribed: boolean;
}

export interface SubscriberDocument extends Subscriber {
  _id: ObjectId;  
}

export interface Visit {
  timestamp: Date;
  country: string;
  city: string;
  path: string;
  postId?: string;
  postTitle?: string;
  userAgent: string;
}

export interface VisitDocument extends Visit {
  _id: ObjectId;
}

export interface PostStats {
  postId: string;
  postTitle: string;
  totalVisits: number;
  countries: {
    country: string;
    count: number;
    percentage: number;
  }[];
}
export interface Subscriber {
    email: string;
    createdAt: Date;
    subscribed: boolean;
  }
  
  export interface SubscriberDocument extends Subscriber {
    _id: string;
  }
import { Subscriber, SubscriberDocument } from '@/lib/types/mongodb';
import clientPromise from './mongodb';
import { WithId, Document } from 'mongodb';

export async function getAllSubscribers(): Promise<{ email: string }[]> {
  try {
    const client = await clientPromise;
    const db = client.db("blog");
    const subscribersCollection = db.collection<WithId<SubscriberDocument>>("subscribers");
    
    const subscribers = await subscribersCollection
      .find({ subscribed: true })
      .project<{ email: string }>({ email: 1, _id: 0 })
      .toArray();
    
    return subscribers;
  } catch (error) {
    console.error('Error getting subscribers:', error);
    return [];
  }
}

export async function addSubscriber(email: string): Promise<boolean> {
  try {
    const client = await clientPromise;
    const db = client.db("blog");
    const subscribersCollection = db.collection<WithId<SubscriberDocument>>("subscribers");

    // Check if subscriber already exists
    const existingSubscriber = await subscribersCollection.findOne({ email });
    if (existingSubscriber) {
      if (!existingSubscriber.subscribed) {
        // Re-activate subscription if previously unsubscribed
        await subscribersCollection.updateOne(
          { email },
          { $set: { subscribed: true } }
        );
        return true;
      }
      return false; // Already subscribed
    }

  
    const newSubscriber: Subscriber = {
      email,
      createdAt: new Date(),
      subscribed: true
    };

    await subscribersCollection.insertOne(newSubscriber as WithId<SubscriberDocument>);
    return true;
  } catch (error) {
    console.error('Error adding subscriber:', error);
    return false;
  }
}

export async function unsubscribe(email: string): Promise<boolean> {
  try {
    const client = await clientPromise;
    const db = client.db("blog");
    const subscribersCollection = db.collection<WithId<SubscriberDocument>>("subscribers");

    const result = await subscribersCollection.updateOne(
      { email },
      { $set: { subscribed: false } }
    );

    return result.modifiedCount > 0;
  } catch (error) {
    console.error('Error unsubscribing:', error);
    return false;
  }
}

export async function getSubscriberByEmail(email: string): Promise<SubscriberDocument | null> {
  try {
    const client = await clientPromise;
    const db = client.db("blog");
    const subscribersCollection = db.collection<WithId<SubscriberDocument>>("subscribers");
    
    const subscriber = await subscribersCollection.findOne({ email });
    return subscriber;
  } catch (error) {
    console.error('Error getting subscriber:', error);
    return null;
  }
}
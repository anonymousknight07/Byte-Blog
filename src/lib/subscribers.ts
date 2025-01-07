import clientPromise from './mongodb';
import { Subscriber, SubscriberDocument } from './types/mongodb';

export async function getAllSubscribers(): Promise<Pick<SubscriberDocument, 'email'>[]> {
  const client = await clientPromise;
  const db = client.db("blog");
  return db.collection<Subscriber>("subscribers")
    .find({ subscribed: true })
    .project<Pick<SubscriberDocument, 'email'>>({ email: 1, _id: 0 })
    .toArray();
}

export async function unsubscribe(email: string) {
  const client = await clientPromise;
  const db = client.db("blog");
  return db.collection<Subscriber>("subscribers")
    .updateOne(
      { email },
      { $set: { subscribed: false, unsubscribedAt: new Date() } }
    );
}

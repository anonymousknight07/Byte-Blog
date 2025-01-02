import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { sendWelcomeEmail } from '@/lib/email';
import { Subscriber } from '@/lib/types/mongodb';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("blog");
    const subscribersCollection = db.collection<Subscriber>("subscribers");

    const existingSubscriber = await subscribersCollection.findOne({ email });
    if (existingSubscriber) {
      return NextResponse.json(
        { message: 'You are already subscribed!' },
        { status: 400 }
      );
    }

    const newSubscriber: Subscriber = {
      email,
      createdAt: new Date(),
      subscribed: true
    };

    await subscribersCollection.insertOne(newSubscriber);

    // Send welcome email
    await sendWelcomeEmail(email);

    return NextResponse.json(
      { message: 'Successfully subscribed!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { message: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    );
  }
}
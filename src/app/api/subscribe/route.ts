import { NextResponse } from 'next/server';
import { addSubscriber } from '@/lib/subscribers';
import { sendWelcomeEmail } from '@/lib/email';

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

    const success = await addSubscriber(email);
    if (!success) {
      return NextResponse.json(
        { message: 'Failed to subscribe' },
        { status: 500 }
      );
    }

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
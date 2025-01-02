import { NextResponse } from 'next/server';
import { getAllSubscribers } from '@/lib/subscribers';
import { sendNewPostEmail } from '@/lib/email';

interface NotifyRequestBody {
  title: string;
  description: string;
  slug: {
    current: string;
  };
}

export async function POST(request: Request) {
  try {
    // Get authorization header
    const authHeader = request.headers.get('authorization');
    
    // Verify secret token
    if (authHeader !== `Bearer ${process.env.NOTIFICATION_SECRET}`) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const post = await request.json() as NotifyRequestBody;
    const subscribers = await getAllSubscribers();
    
    if (subscribers.length === 0) {
      return NextResponse.json(
        { message: 'No subscribers to notify' },
        { status: 200 }
      );
    }

    await sendNewPostEmail(subscribers, post);

    return NextResponse.json(
      { message: `Notified ${subscribers.length} subscribers` },
      { status: 200 }
    );
  } catch (error) {
    console.error('Notification error:', error);
    return NextResponse.json(
      { message: 'Failed to send notifications' },
      { status: 500 }
    );
  }
}
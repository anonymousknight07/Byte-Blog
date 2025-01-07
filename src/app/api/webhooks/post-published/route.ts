import { NextResponse } from 'next/server';
import { getAllSubscribers } from '@/lib/subscribers';
import { sendNewPostEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    // Verify webhook secret
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.WEBHOOK_SECRET}`) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const post = await request.json();
    
    // Validate post data
    if (!post.title || !post.description || !post.slug?.current) {
      return NextResponse.json(
        { message: 'Invalid post data' },
        { status: 400 }
      );
    }

    // Get active subscribers
    const subscribers = await getAllSubscribers();
    if (subscribers.length === 0) {
      return NextResponse.json(
        { message: 'No subscribers to notify' },
        { status: 200 }
      );
    }

    // Send notification emails
    const success = await sendNewPostEmail(subscribers, post);
    if (!success) {
      return NextResponse.json(
        { message: 'Failed to send notifications' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: `Notified ${subscribers.length} subscribers` },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { message: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}
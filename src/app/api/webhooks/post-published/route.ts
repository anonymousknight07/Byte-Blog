import { NextResponse } from 'next/server';
import { handlePostPublish } from '@/sanity/webhooks';

export async function POST(request: Request) {
  try {
    // Verify webhook secret
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.WEBHOOK_SECRET}`) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    // Handle post publish event
    if (body._type === 'post') {
      await handlePostPublish(body._id);
      return NextResponse.json({ message: 'Notification sent successfully' });
    }

    return NextResponse.json({ message: 'Ignored non-post document' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { message: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}
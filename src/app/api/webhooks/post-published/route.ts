import { NextResponse } from 'next/server';
import { handlePostPublish } from '@/sanity/webhooks';

export async function POST(request: Request) {
  try {
    // Verify webhook secret
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.WEBHOOK_SECRET}`) {
      console.error('Unauthorized webhook attempt');
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    console.log('Received webhook payload:', body);
    
    // Handle post publish event
    if (body._type === 'post') {
      try {
        await handlePostPublish(body._id);
        console.log('Successfully sent notifications for post:', body._id);
        return NextResponse.json({ message: 'Notification sent successfully' });
      } catch (error) {
        console.error('Failed to send notifications:', error);
        throw error;
      }
    }

    return NextResponse.json({ message: 'Ignored non-post document' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { message: 'Failed to process webhook', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
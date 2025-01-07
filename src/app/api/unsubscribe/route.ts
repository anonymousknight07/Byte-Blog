import { NextResponse } from 'next/server';
import { unsubscribe } from '@/lib/subscribers';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    const success = await unsubscribe(email);
    if (!success) {
      return NextResponse.json(
        { message: 'Failed to unsubscribe' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Successfully unsubscribed!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      { message: 'Failed to unsubscribe. Please try again later.' },
      { status: 500 }
    );
  }
}

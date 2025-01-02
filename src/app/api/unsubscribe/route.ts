import { NextResponse } from 'next/server';
import { unsubscribe } from '@/lib/subscribers';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    await unsubscribe(email);

    return NextResponse.json(
      { message: 'Successfully unsubscribed' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      { message: 'Failed to unsubscribe' },
      { status: 500 }
    );
  }
}
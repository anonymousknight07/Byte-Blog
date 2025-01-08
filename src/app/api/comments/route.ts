import { NextResponse } from 'next/server';
import { client } from '@/lib/createClient';

export async function POST(request: Request) {
  try {
    const { name, comment, postId, commentId } = await request.json();

    await client.create({
      _type: 'comment',
      name,
      comment,
      commentId,
      post: {
        _type: 'reference',
        _ref: postId
      }
    });

    return NextResponse.json({ message: 'Comment created' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error creating comment' },
      { status: 500 }
    );
  }
}
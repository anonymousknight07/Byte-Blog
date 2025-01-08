import { NextResponse } from 'next/server';
import { client } from '@/lib/createClient';

// Get comments for a post
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const postId = params.id;
    const comments = await client.fetch(`
      *[_type == "comment" && post._ref == $postId] | order(_createdAt desc) {
        _id,
        name,
        comment,
        commentId,
        _createdAt
      }
    `, { postId });

    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching comments' },
      { status: 500 }
    );
  }
}

// Update a comment
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const commentId = params.id;
    const { comment } = await request.json();

    await client
      .patch(`*[_type == "comment" && commentId == $commentId][0]._id`)
      .set({ comment })
      .commit();

    return NextResponse.json({ message: 'Comment updated' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error updating comment' },
      { status: 500 }
    );
  }
}

// Delete a comment
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const commentId = params.id;
    
    // First, fetch the comment's _id
    const result = await client.fetch(
      `*[_type == "comment" && commentId == $commentId][0]._id`,
      { commentId }
    );

    if (!result) {
      return NextResponse.json(
        { message: 'Comment not found' },
        { status: 404 }
      );
    }

    // Delete the comment using the _id
    await client.delete(result);

    return NextResponse.json({ message: 'Comment deleted' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json(
      { message: 'Error deleting comment' },
      { status: 500 }
    );
  }
}
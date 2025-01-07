import { createClient } from "next-sanity";
import { getAllSubscribers } from "@/lib/subscribers";
import { sendNewPostEmail } from "@/lib/email";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const token = process.env.SANITY_API_TOKEN;

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
});

export async function handlePostPublish(postId: string) {
  try {
    // Fetch the published post
    const post = await client.fetch(
      `*[_type == "post" && _id == $postId][0]{
        title,
        description,
        slug
      }`,
      { postId }
    );

    if (!post) {
      throw new Error('Post not found');
    }

    // Get all subscribers
    const subscribers = await getAllSubscribers();
    
    if (subscribers.length === 0) {
      return { message: 'No subscribers to notify' };
    }

    // Send email to all subscribers
    await sendNewPostEmail(subscribers, post);

    return { message: `Notified ${subscribers.length} subscribers about new post` };
  } catch (error) {
    console.error('Error handling post publish:', error);
    throw error;
  }
}

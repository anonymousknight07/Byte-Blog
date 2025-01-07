import nodemailer from 'nodemailer';
import { getAllSubscribers } from './subscribers';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_PORT === '465',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});


export const sendWelcomeEmail = async (email: string) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Welcome to Our Newsletter!',
      html: `
        <h1>Welcome to Our Newsletter!</h1>
        <p>Thank you for subscribing to our blog newsletter. You'll receive updates whenever we publish new content.</p>
        <p>Best regards,<br>By8 Team</p>
      `,
    });
    console.log(`Welcome email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
};

export const sendNewPostEmail = async (
  subscribers: { email: string }[],
  post: {
    title: string;
    description: string;
    slug: { current: string };
  }
) => {
  if (!subscribers || subscribers.length === 0) {
    console.warn('No subscribers to notify.');
    return false;
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const postUrl = `${baseUrl}/post/${post.slug.current}`;

  const emailPromises = subscribers.map((subscriber) =>
    transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: subscriber.email,
      subject: `New Blog Post: ${post.title}`,
      html: `
        <h1>${post.title}</h1>
        <p>${post.description}</p>
        <p><a href="${postUrl}">Read more</a></p>
        <p>If you wish to unsubscribe, <a href="${baseUrl}/unsubscribe?email=${subscriber.email}">click here</a></p>
      `,
    })
  );



  try {
    await Promise.all(emailPromises);
    console.log('New blog post emails sent successfully.');
    return true;
  } catch (error) {
    console.error('Error sending new blog post emails:', error);
    return false;
  }
};

export const onNewBlogPost = async (post: {
  title: string;
  description: string;
  slug: { current: string };
}) => {
  try {
    const subscribers = await getAllSubscribers();
    if (!subscribers || subscribers.length === 0) {
      console.warn('No subscribers found.');
      return false;
    }

    return await sendNewPostEmail(subscribers, post);
  } catch (error) {
    console.error('Error in onNewBlogPost:', error);
    return false;
  }
};

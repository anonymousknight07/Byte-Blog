import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_PORT === '465', // Secure if port is 465
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
        <p>Best regards,<br>By8 Blog </p>
      `,
    });
    console.log(`Welcome email sent to ${email}`);
  } catch (error) {
    console.error('Error sending welcome email:', error);
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
    return;
  }

  console.log('Subscribers:', subscribers);

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
  } catch (error) {
    console.error('Error sending new blog post emails:', error);
  }
};


export const onNewBlogPost = async (post: {
  title: string;
  description: string;
  slug: { current: string };
}) => {
  try {
    
    const subscribers = await getSubscribersFromDB(); 
    if (!subscribers || subscribers.length === 0) {
      console.warn('No subscribers found.');
      return;
    }

    await sendNewPostEmail(subscribers, post);
  } catch (error) {
    console.error('Error in onNewBlogPost:', error);
  }
};


const getSubscribersFromDB = async (): Promise<{ email: string }[]> => {
  
  return [
    { email: 'subscriber1@example.com' },
    { email: 'subscriber2@example.com' },
  ];
};


(async () => {
  
  await sendWelcomeEmail('test@example.com');

  
  await sendNewPostEmail(
    await getSubscribersFromDB(),
    {
      title: 'Test Blog Post',
      description: 'This is a test email for a new blog post.',
      slug: { current: 'test-post' },
    }
  );
})();

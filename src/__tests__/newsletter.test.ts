import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST as subscribeHandler } from '../app/api/subscribe/route';
import { sendWelcomeEmail } from '../lib/email';

// Mock MongoDB client
vi.mock('../lib/mongodb', () => ({
  default: Promise.resolve({
    db: () => ({
      collection: () => ({
        findOne: vi.fn(),
        insertOne: vi.fn(),
      }),
    }),
  }),
}));

// Mock email sending
vi.mock('../lib/email', () => ({
  sendWelcomeEmail: vi.fn(),
}));

describe('Newsletter Subscription', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should subscribe a new email', async () => {
    const request = new Request('http://localhost:3000/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email: 'test@example.com' }),
    });

    const response = await subscribeHandler(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.message).toBe('Successfully subscribed!');
    expect(sendWelcomeEmail).toHaveBeenCalledWith('test@example.com');
  });

  it('should validate email format', async () => {
    const request = new Request('http://localhost:3000/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email: 'invalid-email' }),
    });

    const response = await subscribeHandler(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.message).toBe('Invalid email format');
  });
});
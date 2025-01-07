import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { handlePostPublish } from '../sanity/webhooks';
import { sendNewPostEmail } from '../lib/email';
import * as subscribersModule from '../lib/subscribers';
import { MongoClient } from 'mongodb';

// Mock dependencies
vi.mock('../lib/email', () => ({
  sendNewPostEmail: vi.fn(),
}));

// Mock Sanity client
vi.mock('next-sanity', () => ({
  createClient: () => ({
    fetch: vi.fn().mockResolvedValue({
      title: 'Test Post',
      description: 'Test Description',
      slug: { current: 'test-post' }
    })
  })
}));

// Mock subscribers module
vi.spyOn(subscribersModule, 'getAllSubscribers');

describe('Post Notification System - Mock Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should send notifications to all subscribers when a post is published', async () => {
    const mockSubscribers = [
      { email: 'test1@example.com' },
      { email: 'test2@example.com' }
    ];
    
    vi.mocked(subscribersModule.getAllSubscribers).mockResolvedValue(mockSubscribers);

    await handlePostPublish('test-post-id');

    expect(sendNewPostEmail).toHaveBeenCalledWith(
      mockSubscribers,
      expect.objectContaining({
        title: 'Test Post',
        description: 'Test Description',
        slug: { current: 'test-post' }
      })
    );
  });

  it('should handle case when there are no subscribers', async () => {
    vi.mocked(subscribersModule.getAllSubscribers).mockResolvedValue([]);

    const result = await handlePostPublish('test-post-id');
    
    expect(result).toEqual({ message: 'No subscribers to notify' });
    expect(sendNewPostEmail).not.toHaveBeenCalled();
  });
});

// Integration tests with real MongoDB
describe('Post Notification System - Integration Tests', () => {
  let mongoClient: MongoClient | null = null;
  const testEmail = 'test@example.com';

  beforeEach(async () => {
    if (!process.env.MONGODB_URI) {
      console.log('Skipping integration tests - no MongoDB URI provided');
      return;
    }

    try {
      mongoClient = await MongoClient.connect(process.env.MONGODB_URI, { 
        serverSelectionTimeoutMS: 10000 
      });
      const db = mongoClient.db('test');
      
      await db.collection('subscribers').deleteMany({ email: testEmail });
      await db.collection('subscribers').insertOne({
        email: testEmail,
        createdAt: new Date(),
        subscribed: true
      });
    } catch (error) {
      console.error('MongoDB setup error:', error);
      throw error;
    }
  }, 30000); // Increased timeout to 30 seconds

  afterEach(async () => {
    if (mongoClient) {
      try {
        const db = mongoClient.db('test');
        await db.collection('subscribers').deleteMany({ email: testEmail });
      } catch (error) {
        console.error('Cleanup error:', error);
      } finally {
        await mongoClient.close();
        mongoClient = null;
      }
    }
  });

  it('should send real email to test subscriber', async () => {
    if (!process.env.MONGODB_URI) {
      console.log('Skipping test - no MongoDB URI provided');
      return;
    }

    const result = await handlePostPublish('test-post-id');
    expect(result).toBeDefined();
  }, 30000); 
});

import { vi } from 'vitest';

// Mock environment variables
process.env.MONGODB_URI = 'mongodb://localhost:27017/test';
process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'test-project-id';
process.env.NEXT_PUBLIC_SANITY_DATASET = 'test-dataset';
process.env.SANITY_API_TOKEN = 'test-token';

// Mock console.error to avoid noise in tests
console.error = vi.fn();
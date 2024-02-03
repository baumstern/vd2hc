import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchReports } from './apiHandler';

describe('fetchReports', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  it('fetches reports successfully from an API', async () => {
    const reports = await fetchReports();
    console.log(reports);
    // expect(reports).toEqual({ data: [] });
    
  });

 
});
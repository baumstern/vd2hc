import { ApiResponse } from '../types/report';

export async function fetchReports(endpoint: string): Promise<ApiResponse | undefined> {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}
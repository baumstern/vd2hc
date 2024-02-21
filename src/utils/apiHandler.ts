import { createDirectus, rest, readItems } from '@directus/sdk';

import { ApiResponse, Report } from "../types/report";

// "status": "published",
export async function fetchReports(
	endpoint: string,
): Promise<ApiResponse | undefined> {
	try {
		const client = createDirectus(endpoint).with(rest());

		const response = await client.request(
			readItems('reports', {
				filter: {
					status: {
						_eq: 'published',
					},
					hypercert_id: {
						_null: true,
					}
				},
			})
		);

		return {
			data: response as Report[],
		};
	} catch (error) {
		console.error(`failed to fetch reports from CMS: ${error}`);
	}
}

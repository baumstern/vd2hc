import { describe, it, expect } from "vitest";
import { fetchReports } from "./apiHandler";

describe("fetchReports", () => {
	it("should transform report data to Hypercert data", async () => {
		const VD_REPORTS_ENDPOINT = "https://directus.vd-dev.org/items/reports";

		const response = await fetchReports(VD_REPORTS_ENDPOINT);
		expect(response).toBeDefined();
		console.log(JSON.stringify(response, null, 2));
	});
});

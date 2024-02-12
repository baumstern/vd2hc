import { Report } from "../types/report";
import { HypercertMetadata } from "@hypercerts-org/sdk";
import { validateMetaData, validateClaimData } from "@hypercerts-org/sdk";

const CMS_URL = "https://directus.vd-dev.org";

export function transformToHypercertData(report: Report): HypercertMetadata {
	const imageUrl = report.image
		? `${CMS_URL}/assets/${report.image}`
		: undefined;

	// Convert work_timeframe and impact_timeframe from readable dates to UNIX timestamps
	const workTimeframeStart = report.work_timeframe
		? new Date(report.work_timeframe).getTime() / 1000
		: undefined;

	const impactTimeframeStart = report.impact_timeframe
		? new Date(report.impact_timeframe).getTime() / 1000
		: undefined;

	// Default end time for impact is set to '0' to represent indefinite
	const impactTimeframeEnd = 0;
	const workTimeframeEnd = 0;

	const claimData = {
		work_scope: {
			value: [report.category || ""],
		},
		work_timeframe: {
			value: [workTimeframeStart || 0, workTimeframeEnd],
		},
		impact_scope: {
			value: report.impact_scope ? [report.impact_scope] : ["all"],
		},
		impact_timeframe: {
			value: [impactTimeframeStart || 0, impactTimeframeEnd],
			// value: [],
		},
		contributors: {
			value: report.contributor
				? report.contributor.split(",").map((contributor) => contributor.trim())
				: [],
		},
		rights: {
			value: [],
		},
	};

	// Validate claimData
	const isClaimDataValid = validateClaimData(claimData);
	if (!isClaimDataValid) {
		throw new Error("Invalid claim data");
	}

	const metadata: HypercertMetadata = {
		name: report.title || "",
		description: report.summary || "",
		image: imageUrl || "",
		external_url: report.original_report_url || "",
		properties: report.states
			? report.states.map((state) => ({ trait_type: "State", value: state }))
			: [],
		hypercert: claimData,
	};

	// Validate metadata
	const isMetadataValid = validateMetaData(metadata);
	if (!isMetadataValid) {
		throw new Error("Invalid metadata");
	}

	return metadata;
}

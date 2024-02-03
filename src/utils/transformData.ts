import { Report } from '../types/report';
import { HypercertClaimdata, HypercertMetadata } from '@hypercerts-org/sdk';
import { validateMetaData, validateClaimData } from "@hypercerts-org/sdk";

export function transformToHypercertData(report: Report): HypercertMetadata {
  // Assuming the image URL is stored as an IPFS CID in the report
  const imageUrl = report.image ? `ipfs://${report.image}` : undefined;

  // Convert work_timeframe and impact_timeframe from readable dates to UNIX timestamps
  const workTimeframeStart = report.work_timeframe ? new Date(report.work_timeframe).getTime() / 1000 : undefined;
  const impactTimeframeStart = report.impact_timeframe ? new Date(report.impact_timeframe).getTime() / 1000 : undefined;

  // Default end time for impact is set to '0' to represent indefinite
  const impactTimeframeEnd = 0;

  // Map the Report fields to HypercertClaimdata and HypercertMetadata
  const claimData: HypercertClaimdata = {
    work_scope: {
      name: "Work Scope",
      value: [report.category || ''],
      excludes: [],
      display_value: report.category || 'Unknown'
    },
    work_timeframe: {
      name: "Work Timeframe",
      value: [workTimeframeStart || 0],
      display_value: report.work_timeframe || 'Unknown'
    },
    impact_scope: {
      name: "Impact Scope",
      value: report.impact_scope ? [report.impact_scope] : ["All"],
      excludes: [],
      display_value: report.impact_scope || "All"
    },
    impact_timeframe: {
      name: "Impact Timeframe",
      value: [impactTimeframeStart || 0, impactTimeframeEnd],
      display_value: report.impact_timeframe || "Indefinite"
    },
    contributors: {
      name: "Contributors",
      value: report.contributor ? report.contributor.split(',').map(contributor => contributor.trim()) : [],
      display_value: report.contributor || "Unknown"
    },
  };

  // Validate claimData
  const isClaimDataValid = validateClaimData(claimData);
  if (!isClaimDataValid) {
    throw new Error('Invalid claim data');
  }

  const metadata: HypercertMetadata = {
    name: report.title || '',
    description: report.summary || '',
    // TODO: fix to conform the spec
    image: imageUrl || '',
    external_url: report.original_report_url || '',
    properties: report.states ? report.states.map(state => ({ trait_type: "State", value: state })) : [],
    hypercert: claimData,
  };

  // Validate metadata
  const isMetadataValid = validateMetaData(metadata);
  if (!isMetadataValid) {
    throw new Error('Invalid metadata');
  }

  return metadata;
}
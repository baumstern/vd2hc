import { fetchReports, transformToHypercertData } from 'vd2hc';
import { validateMetaData, validateClaimData } from "@hypercerts-org/sdk";

const VD_REPORTS_ENDPOINT = 'https://directus.vd-dev.org/items/reports';

const response = await fetchReports(VD_REPORTS_ENDPOINT);

const hypercerts = response.data.map(report => {
  const metadata = transformToHypercertData(report);
  // Validate metadata
  const isMetadataValid = validateMetaData(metadata);
  if (!isMetadataValid) {
    throw new Error('Invalid metadata');
  }

  // Validate claimData
  const isClaimDataValid = validateClaimData(metadata.hypercert);
  if (!isClaimDataValid) {
    throw new Error('Invalid claim data');
  }

  return metadata;
});

console.log(JSON.stringify(hypercerts, null, 2));


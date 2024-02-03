# vd2hc Library

The `vd2hc` library provides functionality to fetch Impact Reports from VoiceDeck's CMS and transform them into Hypercert data types suitable for use with the Hypercerts protocol.

## Installation

To install the library, run the following command:
```
npm install vd2hc@0.0.1
```

## Usage

To use the library, you need to import the `fetchReports` and `transformToHypercertData` functions. Here's a basic example:
```
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
```
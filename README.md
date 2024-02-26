# vd2hc

![npm](https://img.shields.io/npm/v/vd2hc)

`vd2hc` is designed to interact with VoiceDeck's CMS and transform them into `HypercertMetadata`. It includes two primary functions:

- `fetchReports`: Retrieves all reports from VoiceDeck CMS that have a `published` status and where the `hypercert_id` field is null.
- `transformToHypercertData`: Takes a `Report` object, as defined in `src/types/report.ts`, and converts it into a [`HypercertMetadata`](https://hypercerts.org/docs/developer/api/sdk/interfaces/HypercertMetadata) object compatible with the Hypercerts.

## Prerequisites

Before installing `vd2hc`, make sure you are using Node.js version 18 or higher.

## Installation

To install the library, run the following command:
```
npm install vd2hc@0.0.7
```

## Usage

To use the library, you need to import the `fetchReports` and `transformToHypercertData` functions. Here's a basic example:
```
import { fetchReports, transformToHypercertData } from 'vd2hc';
import { validateMetaData, validateClaimData } from "@hypercerts-org/sdk";

const VD_REPORTS_ENDPOINT = 'https://directus.vd-dev.org/';

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

## Build

```
pnpm install
pnpm build
```

## Test

```
pnpm test
```
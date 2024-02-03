import { describe, it, expect } from 'vitest';
import { transformToHypercertData } from './transformData';

import { validateMetaData, validateClaimData } from "@hypercerts-org/sdk";



// Mock data similar to the provided JSON structure
const reports = [
  {
    id: "04c188e7-ebdf-4321-babf-24a792f8532c",
    status: "published",
    date_created: "2024-01-31T23:55:45.417Z",
    title: "Teachers return to the classes of Sarvodaya Kanya Vidyalaya",
    slug: "teachers-return-classes-sarvodaya-kanya-vidyalaya",
    story: "<p>...</p>",
    bc_ratio: 15,
    villages_impacted: null,
    people_impacted: null,
    verified_by: ["MV"],
    original_report_url: "http://voice.gramvaani.org/vapp/mnews/1129/show/detail/3433262/",
    date_updated: null,
    image: "1c2f94ec-69a2-4315-9ba9-ead912f6d9ae",
    summary: "The return of teachers to the classrooms...",
    category: "Opportunity",
    states: ["DL"],
    work_timeframe: "May 9, 2023",
    impact_timeframe: "May 9, 2023",
    contributor: "Mobile Vaani, Reena Parveen",
    byline: "Devansh",
    total_cost: "1000",
    impact_scope: null
  },
  {
    id: "dde50c4e-59b2-4307-863c-374dd0d81afd",
    status: "published",
    date_created: "2024-02-03T03:55:48.525Z",
    title: "second",
    slug: "second",
    story: null,
    bc_ratio: null,
    villages_impacted: null,
    people_impacted: null,
    verified_by: null,
    original_report_url: null,
    date_updated: null,
    image: null,
    summary: "summary",
    category: "Hunger",
    states: ["AN"],
    work_timeframe: "Jan 1, 2024",
    impact_timeframe: "Jan 1, 2024",
    contributor: null,
    byline: "Devansh",
    total_cost: null,
    impact_scope: null
  }
];

describe('transformToHypercertData', () => {
  it('should transform report data to Hypercert data', () => {
    reports.forEach(report => {
      const HypercertMetadata = transformToHypercertData(report);
      expect(HypercertMetadata).toBeDefined();
      
      const metaDataValidationResult = validateMetaData(HypercertMetadata);
      expect(metaDataValidationResult.valid).toBeTruthy();
      expect(metaDataValidationResult.errors).toEqual({});

      const claimDataValidationResult = validateClaimData(HypercertMetadata.hypercert);
      expect(claimDataValidationResult.valid).toBeTruthy();
      expect(claimDataValidationResult.errors).toEqual({});
    });
  });

});
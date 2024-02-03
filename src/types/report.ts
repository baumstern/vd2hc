// type definition for the report object that is returned from VoiceDeck CMS
export interface Report {
  // properties for hypercert minting
  title: string | null; 
  summary: string | null;
  image: string | null;
  original_report_url: string | null;
  states: string[] | null;
  category: string | null;
  work_timeframe: string | null;
  impact_scope: string | null;
  impact_timeframe: string | null;
  // NOTE: it's actually comma separated string
  contributor: string | null;

  //non hypercert propoerties
  id: string;
    status: string;
    date_created: string | null;
    slug: string;
    story: string | null;
    bc_ratio: number | null;
    villages_impacted: number | null;
    people_impacted: number | null;
    verified_by: string[] | null;
    date_updated: string | null;
    byline: string | null;
    total_cost: string | null;
    
  }
  
export  interface ApiResponse {
    data: Report[];
  }
  
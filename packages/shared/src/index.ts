export type BusinessRecord = {
  id: string;
  name: string;
  industry: string;
  contact: string;
  services: string[];
};

export type CampaignDraft = {
  id: string;
  name: string;
  channel: 'Instagram' | 'Google' | 'Email';
  reach: string;
  status: 'Ready for review' | 'Draft' | 'Approved';
};

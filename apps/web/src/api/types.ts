export type Business = {
  id: string;
  name: string;
  industry: string;
  location: string;
  contact: string;
  services: string[];
  image: string;
};

export type Campaign = {
  id: string;
  name: string;
  channel: 'Instagram' | 'Google' | 'Email';
  reach: string;
  status: 'Ready for review' | 'Draft' | 'Approved';
  summary: string;
};

export type Lead = {
  id: string;
  customer: string;
  source: 'Instagram' | 'Google' | 'Email';
  value: string;
  status: 'New' | 'Qualified' | 'Booked';
};

export type User = {
  id: string;
  name: string;
  role: string;
  avatar: string;
};

export type ApiClient = {
  getCurrentUser(): Promise<User>;
  getBusiness(): Promise<Business>;
  listCampaigns(): Promise<Campaign[]>;
  listLeads(): Promise<Lead[]>;
  createAccount(input: { name: string; email: string; password: string }): Promise<User>;
  updateBusiness(input: Partial<Business>): Promise<Business>;
};

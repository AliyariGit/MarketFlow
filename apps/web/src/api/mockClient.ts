import { business, campaigns, currentUser, leads } from '../mocks/data';
import type { ApiClient, Business, Campaign, Lead, User } from './types';
import { getPreviewState } from './previewState';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockClient: ApiClient = {
  async getCurrentUser(): Promise<User> {
    await wait(120);
    return currentUser;
  },
  async getBusiness(): Promise<Business> {
    const state = getPreviewState();
    if (state === 'loading') {
      await wait(600);
      return business;
    }
    if (state === 'error') {
      throw new Error('Unable to load business profile.');
    }
    if (state === 'empty') {
      throw new Error('No business found');
    }
    await wait(180);
    return business;
  },
  async listCampaigns(): Promise<Campaign[]> {
    const state = getPreviewState();
    if (state === 'loading') {
      await wait(700);
      return campaigns;
    }
    if (state === 'error') {
      throw new Error('Campaigns could not be loaded.');
    }
    if (state === 'empty') {
      return [];
    }
    await wait(180);
    return campaigns;
  },
  async listLeads(): Promise<Lead[]> {
    const state = getPreviewState();
    if (state === 'loading') {
      await wait(450);
      return leads;
    }
    if (state === 'error') {
      throw new Error('Leads service is temporarily unavailable.');
    }
    if (state === 'empty') {
      return [];
    }
    await wait(160);
    return leads;
  },
  async createAccount(input): Promise<User> {
    await wait(250);
    return {
      id: 'new-user',
      name: input.name,
      role: 'Manager',
      avatar: 'https://i.pravatar.cc/120?u=' + encodeURIComponent(input.email),
    };
  },
  async updateBusiness(input): Promise<Business> {
    await wait(180);
    return { ...business, ...input };
  },
};

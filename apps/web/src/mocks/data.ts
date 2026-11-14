import type { Business, Campaign, Lead, User } from '../api/types';

export const currentUser: User = {
  id: 'u1',
  name: 'Lena Park',
  role: 'Owner',
  avatar: 'https://i.pravatar.cc/120?u=lena',
};

export const business: Business = {
  id: 'b1',
  name: 'Luna Spa Studio',
  industry: 'Beauty & Wellness',
  location: 'Downtown',
  contact: 'hello@lunaspa.studio',
  services: ['Facials', 'Brow sculpting', 'Lash lift'],
  image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=80',
};

export const campaigns: Campaign[] = [
  {
    id: 'c1',
    name: 'Summer Glow Facial Offer',
    channel: 'Instagram',
    reach: '8.4K',
    status: 'Ready for review',
    summary: 'Promote glow-focused facial packages with before-and-after testimonials.',
  },
  {
    id: 'c2',
    name: 'Lash Lift Rebooking Push',
    channel: 'Google',
    reach: '5.1K',
    status: 'Draft',
    summary: 'Win back repeat clients with a limited autumn booking campaign.',
  },
  {
    id: 'c3',
    name: 'Bridal Glow Package',
    channel: 'Email',
    reach: '2.9K',
    status: 'Approved',
    summary: 'Build a polished wedding-ready treatment bundle for seasonal bookings.',
  },
];

export const leads: Lead[] = [
  { id: 'l1', customer: 'Amy Collins', source: 'Instagram', value: '$280', status: 'New' },
  { id: 'l2', customer: 'Maya Chen', source: 'Google', value: '$640', status: 'Qualified' },
  { id: 'l3', customer: 'Rachel James', source: 'Email', value: '$420', status: 'Booked' },
];

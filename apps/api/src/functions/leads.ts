import { app } from '@azure/functions';

const leads = [
  { id: 'l1', customer: 'Amy Collins', source: 'Instagram', value: '$280', status: 'New' },
  { id: 'l2', customer: 'Maya Chen', source: 'Google', value: '$640', status: 'Qualified' },
  { id: 'l3', customer: 'Rachel James', source: 'Email', value: '$420', status: 'Booked' },
];

app.http('listLeads', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'leads',
  handler: async () => ({
    status: 200,
    jsonBody: { leads },
  }),
});

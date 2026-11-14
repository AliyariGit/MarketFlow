import { app } from '@azure/functions';
import { z } from 'zod';

const campaigns = [
  {
    id: 'c1',
    name: 'Summer Glow Facial Offer',
    channel: 'Instagram',
    reach: '8.4K',
    status: 'Ready for review',
    summary: 'Promote seasonal glow treatments with client before and after visuals.',
  },
  {
    id: 'c2',
    name: 'Lash Lift Rebooking Push',
    channel: 'Google',
    reach: '5.1K',
    status: 'Draft',
    summary: 'Target prior customers with a limited-time rebooking offer.',
  },
  {
    id: 'c3',
    name: 'Bridal Glow Package',
    channel: 'Email',
    reach: '2.9K',
    status: 'Approved',
    summary: 'Build a polished package for bridal portrait and event bookings.',
  },
];

const draftSchema = z.object({
  objective: z.string().min(5),
  tone: z.string().min(2),
  channel: z.enum(['Instagram', 'Google', 'Email']),
  offer: z.string().min(3),
});

app.http('listCampaigns', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'campaigns',
  handler: async () => ({
    status: 200,
    jsonBody: { campaigns },
  }),
});

app.http('createDraft', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'campaigns/drafts',
  handler: async (request) => {
    const payload = await request.json();
    const result = draftSchema.safeParse(payload);

    if (!result.success) {
      return {
        status: 400,
        jsonBody: {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Campaign draft payload is invalid.',
            details: result.error.flatten(),
          },
        },
      };
    }

    const draftId = `draft-${Date.now()}`;
    return {
      status: 201,
      jsonBody: {
        draftId,
        status: 'Draft',
        summary: `${result.data.objective} for ${result.data.channel} with a ${result.data.tone.toLowerCase()} tone.`,
      },
    };
  },
});

import { app } from '@azure/functions';
import { z } from 'zod';

const businessProfile = {
  id: 'b1',
  name: 'Luna Spa Studio',
  industry: 'Beauty & Wellness',
  contact: 'hello@lunaspa.studio',
  services: ['Facials', 'Brow sculpting', 'Lash lift'],
  hours: 'Mon-Sat 9:00am-6:00pm',
};

const updateBusinessSchema = z.object({
  name: z.string().min(2).max(120).optional(),
  contact: z.string().email().optional(),
  services: z.array(z.string()).optional(),
  hours: z.string().optional(),
});

app.http('getBusiness', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'business',
  handler: async () => ({
    status: 200,
    jsonBody: businessProfile,
  }),
});

app.http('updateBusiness', {
  methods: ['PUT'],
  authLevel: 'anonymous',
  route: 'business/profile',
  handler: async (request) => {
    const payload = await request.json();
    const result = updateBusinessSchema.safeParse(payload);

    if (!result.success) {
      return {
        status: 400,
        jsonBody: {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Business profile update is invalid.',
            details: result.error.flatten(),
          },
        },
      };
    }

    Object.assign(businessProfile, result.data);

    return {
      status: 200,
      jsonBody: {
        id: businessProfile.id,
        updatedAt: new Date().toISOString(),
      },
    };
  },
});

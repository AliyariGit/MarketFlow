import { app } from '@azure/functions';

export function buildHealthResponse() {
  return {
    status: 200,
    jsonBody: {
      status: 'ok',
      services: {
        database: 'ready',
        storage: 'ready',
      },
    },
  };
}

app.http('health', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'health',
  handler: async () => buildHealthResponse(),
});

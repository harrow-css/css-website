const { app } = require('@azure/functions');

app.http('httpTrigger1', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {

        return { body: `Hello, ${process.env.MONGODB_URI}!` };
    }
});


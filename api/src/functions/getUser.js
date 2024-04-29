const { app } = require('@azure/functions');
const MongoClient = require("mongodb").MongoClient;

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'test';

app.http('getUser', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: async (event, context) => {
    // otherwise the connection will never complete, since
    // we keep the DB connection alive
    context.callbackWaitsForEmptyEventLoop = false;

    const client = await MongoClient.connect(uri, {
      useUnifiedTopology: true,
    });

    db = await client.db(DB_NAME);

    // query the database for hackathons
    const user = await db.collection("users").find({_id: event.queryStringParameters.id}).toArray();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
  }
});
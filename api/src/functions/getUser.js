const { app } = require('@azure/functions');
const { MongoClient } = require("mongodb");

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'test';

let cachedDb = null;

const connectToDatabase = async (uri) => {
  // we can cache the access to our database to speed things up a bit
  // (this is the only thing that is safe to cache here)
  if (cachedDb) return cachedDb;

  const client = await MongoClient.connect(uri, {
    useUnifiedTopology: true,
  });

  cachedDb = client.db(DB_NAME);

  return cachedDb;
};

const queryDatabase = async (db, id) => {
  // query the database for hackathons
  const user = await db.collection("users").find({ _id: id }).toArray();

  return {
    status: 200,
    body: user,
    headers: {
      "Content-Type": "application/json",
    },
  };
};

app.http('getUser', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: async (context, req) => {
    // otherwise the connection will never complete, since
    // we keep the DB connection alive
    context.res = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
      },
    };

    if (req.method === "OPTIONS") {
      context.res.status = 200;
      return;
    }

    const db = await connectToDatabase(MONGODB_URI);
    const id = req.query.id;
    const result = await queryDatabase(db, id);

    context.res = {
      ...context.res,
      ...result,
    };
  }
});

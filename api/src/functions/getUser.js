const MongoClient = require("mongodb").MongoClient;
const { app } = require('@azure/functions');
const jwt = require('jsonwebtoken');

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'test';

let cachedDb = null;

const connectToDatabase = async (uri) => {
  if (cachedDb) return cachedDb;

  const client = await MongoClient.connect(uri, {
    useUnifiedTopology: true,
  });

  cachedDb = client.db(DB_NAME);

  return cachedDb;
};

const queryDatabase = async (db, id) => {
  const user = await db.collection("users").find({ _id: id }).toArray();
  console.log("Database query result: ", user); // Add logging here

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };
};

app.http('getUser', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
  
    const db = await connectToDatabase(MONGODB_URI);

    const token = request.headers.get('Authorization');
    if (!token) {
      return {
        statusCode: 401,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ error: "Authorization header is missing" }),
      };
    }

    const decoded = jwt.decode(token.replace("Bearer ", ""), { complete: true });
    if (!decoded || !decoded.payload) {
      return {
        statusCode: 401,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ error: "Invalid token" }),
      };
    }

    const user = decoded.payload;
    console.log("Decoded user from token: ", user); // Add logging here

    return queryDatabase(db, request.query.get('id'));
  }
});

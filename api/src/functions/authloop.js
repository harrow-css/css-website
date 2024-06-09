const { app } = require('@azure/functions');
const MongoClient = require("mongodb").MongoClient;
const jwt = require('jsonwebtoken');

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

const queryDatabase = async (db) => {
  // query the database for hackathons
  const user = await db.collection("users").find({}).toArray();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };
};


app.http('authLoop', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: async (event, context) => {
    // otherwise the connection will never complete, since
    // we keep the DB connection alive
    context.callbackWaitsForEmptyEventLoop = false;
  
    const db = await connectToDatabase(MONGODB_URI);
    
    // get user id from the request
    const userId = event.query.get('id')

    // get auth._token.aad cookie
    const token = event.headers.get('Cookie');

    // select the token from the cookie
    const tokenArray = token.split(';');
    const tokenString = tokenArray.find((element) => element.includes('auth._token.aad'));
    const tokenValue = tokenString.split('=')[1];


    

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ tokenValue }),
    }
  }
});

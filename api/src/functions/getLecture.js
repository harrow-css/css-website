const { app } = require('@azure/functions');
const MongoClient = require("mongodb").MongoClient;

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'test';

let cachedDb = null;

var ObjectId = require('mongodb').ObjectId;

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
  // query the database for lecture
  const lecture = await db.collection("lectures").find({_id: ObjectId(id)}).toArray();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lecture),
  };
};

app.http('getLecture', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: async (event, context) => {
    // otherwise the connection will never complete, since
    // we keep the DB connection alive
    context.callbackWaitsForEmptyEventLoop = false;
  
    const db = await connectToDatabase(MONGODB_URI);
  
    id = event.queryStringParameters.id
    return queryDatabase(db,id);
  }
});


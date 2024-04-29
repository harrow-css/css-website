const { app } = require('@azure/functions');

const MongoClient = require("mongodb").MongoClient;
// require dotenv
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'test';

let cachedDb = null;

var ObjectId = require('mongodb').ObjectId;

const connectToDatabase = async (uri) => {
  // we can cache the access to our database to speed things up a bit
  // (this is the only thing that is safe to cache here)
  if (cachedDb) return cachedDb

  const client = await MongoClient.connect(uri, {
    useUnifiedTopology: true,
  })

  cachedDb = client.db(DB_NAME)

  return cachedDb
}

const postDatabase = async (db, memeid) => {

   // add banned:true to the data object of the meme with memeid in the database
   db.collection("memes").updateOne(
    { "_id": ObjectId(memeid) },
    { $set: { banned: true } }
    )

  return {
    statusCode: 201,
  }
}


app.http('postBanMeme', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: async (event, context) => {
    // otherwise the connection will never complete, since
    // we keep the DB connection alive
    context.callbackWaitsForEmptyEventLoop = false
  
    const db = await connectToDatabase(MONGODB_URI)
  
    // get query string parameter called 'data'
    const memeid = event.queryStringParameters.memeid
  
    return postDatabase(db,memeid)
  }
});


const { app } = require('@azure/functions');
const MongoClient = require("mongodb").MongoClient;
// require dotenv
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'test';

let cachedDb = null;

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

const postDatabase = async (db,data) => {

  // add the meme data to the database in the memes collection
    db.collection("memes").insertOne(
    {
        meme: data.meme,
        round: data.round,
        user: data.user,
        timestamp: new Date(),
        votes: []
    })

  return {
    statusCode: 201,
  }
}

app.http('postMeme', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: async (event, context) => {
    // otherwise the connection will never complete, since
    // we keep the DB connection alive
    context.callbackWaitsForEmptyEventLoop = false
  
    const db = await connectToDatabase(MONGODB_URI)
  
    // get query string parameter called 'data'
    const data = JSON.parse(event.body)
  
    console.log(data)
  
    return postDatabase(db,data)
  }
  
});

const MongoClient = require("mongodb").MongoClient;
// require dotenv
require('dotenv').config()

var ObjectId = require('mongodb').ObjectId;

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
  // if the user has already voted, don't let them vote again
  // get the meme with id of data.id
  const meme = await db.collection("memes").findOne({ "_id": ObjectId(data.memeId) })
  // check if the user's id is in the votes array
  if (meme.votes.includes(data.userVoting.id)) {
    return {
      statusCode: 304,
    }
  }

  console.log(data)
  console.log(data.userVoting.id)
  console.log(data.memeId)
  // add a the voters id to an array called votes to the meme with collection memes and id of data.id
    db.collection("memes").updateOne(
    {
        "_id": ObjectId(data.memeId),
    },
    {
        $push: { votes: data.userVoting.id }
    })

  return {
    statusCode: 201,
  }
}

module.exports.handler = async (event, context) => {
  // otherwise the connection will never complete, since
  // we keep the DB connection alive
  context.callbackWaitsForEmptyEventLoop = false

  

  const db = await connectToDatabase(MONGODB_URI)

  // get query string parameter called 'data'
  const data = JSON.parse(event.body)

  return postDatabase(db,data)
}

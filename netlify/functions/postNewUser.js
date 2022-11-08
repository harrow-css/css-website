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

    console.log(data)

    // check if the user already exists
    const user = await db.collection('users').findOne({ _id: data.oid })

    // if the user does not exist, create it
    if (!user) {

        // create the user
        db.collection("users").insertOne(
        {
            family_name: data.family_name,
            given_name: data.given_name,
            _id: data.oid,
            email: data.upn,
        },
        (err, result) => {}
        )
    }

    else {
        return { statusCode: 200, body: JSON.stringify({ message: 'User already exists' }) }
    }

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
  const data = JSON.parse(event.body).data

  console.log(data)

  return postDatabase(db,data)
}

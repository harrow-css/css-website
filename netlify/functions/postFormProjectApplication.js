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

    // post the data to the database under the collection 'forms' with type: 'projectApplication'
    db.collection("forms").insertOne(
    {
        type: 'projectApplication',
        data: data,
    },
    (err, result) => {}
    )
    
    
}

module.exports.handler = async (event, context) => {
  // otherwise the connection will never complete, since
  // we keep the DB connection alive
  context.callbackWaitsForEmptyEventLoop = false

  const db = await connectToDatabase(MONGODB_URI)

  // get query string parameter called 'data'
  
  console.log(data)

  return postDatabase(db,data)
}

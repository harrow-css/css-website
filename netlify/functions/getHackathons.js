const MongoClient = require("mongodb").MongoClient;

const MONGODB_URI = 'mongodb+srv://dbuser:dbpass@cluster0.9ctff.mongodb.net/?retryWrites=true&w=majority';
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
  const hackathons = await db.collection("hackathons").find({}, 'hackathonName hackathonStartDate hackathonEndDate hackathonImage hackathonHost').sort([['date', -1]]).toArray();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(hackathons),
  };
};

module.exports.handler = async (event, context) => {
  // otherwise the connection will never complete, since
  // we keep the DB connection alive
  context.callbackWaitsForEmptyEventLoop = false;

  const db = await connectToDatabase(MONGODB_URI);
  return queryDatabase(db);
};
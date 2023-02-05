const MongoClient = require("mongodb").MongoClient;

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

const queryDatabase = async (db,id ) => {
  // query the database for memes with the given id in user.id
  const memescreated = await db
    .collection("memes")
    .find({ "user._id": id })
    .toArray();

  const userVotingstatus = {};
  
  let lastMonday = new Date()
  lastMonday.setDate(
    lastMonday.getDate() - ((lastMonday.getDay() + 6) % 7)
  )

  let lastlastMonday = new Date()
    lastlastMonday.setDate(
    lastlastMonday.getDate() - ((lastlastMonday.getDay() + 6) % 7) - 7
  )

  // get the date in yyyy-mm-dd
  let lastlastMondayString = lastlastMonday.toISOString().split('T')[0]

  const lastWeeksWinners = await db
    .collection("memes")
    .find({ "round.startday":  lastlastMondayString, "banned": {$ne: true}, "place": { $exists: true } })
    .toArray();

  // get the date in yyyy-mm-dd
  let lastMondayString = lastMonday.toISOString().split('T')[0]

  // query the database for memes from this week's round
  const compVoting = await db
    .collection("memes")
    .find({ "round.startday":  lastMondayString, "banned": {$ne: true} })
    .project({ "round" : 0, "user" : 0, "timestamp" : 0 })
    .toArray();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      usermemes: memescreated,
      userVotingstatus: userVotingstatus,
      compVoting: compVoting,
      lastWeeksWinners: lastWeeksWinners,
    }), 
  };
};

module.exports.handler = async (event, context) => {
  // otherwise the connection will never complete, since
  // we keep the DB connection alive
  context.callbackWaitsForEmptyEventLoop = false;

  const db = await connectToDatabase(MONGODB_URI);
  return queryDatabase(db);
};
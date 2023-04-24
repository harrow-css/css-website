// const MongoClient = require("mongodb").MongoClient;

// const MONGODB_URI = process.env.MONGODB_URI;
// const DB_NAME = 'test';

// let cachedDb = null;

// const connectToDatabase = async (uri) => {
//   // we can cache the access to our database to speed things up a bit
//   // (this is the only thing that is safe to cache here)
//   if (cachedDb) return cachedDb;

//   const client = await MongoClient.connect(uri, {
//     useUnifiedTopology: true,
//   });

//   cachedDb = client.db(DB_NAME);

//   return cachedDb;
// };

// const queryDatabase = async (db,id ) => {
//   // query the database for hackathons
//   const user = await db.collection("users").find({_id: id}).toArray();

//   return {
//     statusCode: 200,
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(user),
//   };
// };

module.exports.handler = async (event, context) => {
  // otherwise the connection will never complete, since
  // we keep the DB connection alive
  context.callbackWaitsForEmptyEventLoop = false

  //   const db = await connectToDatabase(MONGODB_URI);
  //   return queryDatabase(db, event.queryStringParameters.id);

  return {
    statusCode: 200,
    body: JSON.stringify({
      calendar: {
        '2023-01-23': 'Programming', 
        '2023-01-30': 'Programming',
        '2023-02-06': 'Video Games',
        '2023-02-13': 'Sports',
        '2023-02-13': 'Harrow',
        '2023-02-20': 'World Politics 2023',
        '2023-02-27': 'Any Memes (no topic)',
        '2023-03-06': 'Video Games',
        '2023-03-13': 'Sports',
        '2023-03-20': 'Science',
        '2023-04-24': 'Movies'
        
      },
    }),
  }
}

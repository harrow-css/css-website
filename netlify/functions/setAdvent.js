// YOUR_BASE_DIRECTORY/netlify/functions/test-scheduled-function.js

const { schedule } = require("@netlify/functions");

// import axios
const axios = require("axios");

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

const handler = async function(event, context) {
    console.log("Received event:", event);

    // write this get request in axios
    const response = await axios.get("https://adventofcode.com/2022/leaderboard/private/view/1521149.json", {
        headers: {
            "Cookie": "session=53616c7465645f5f92309e24572bf8476ab67c247c784eb66c2029b1058d2318a1f29677efa7049c7ed32d772157c297add634e49c501c5243a187c9c9cb4550"
        }
    });

    // set that to the advent collection in the database
    const db = await connectToDatabase(MONGODB_URI)

    // clear the collection
    db.collection("advent").deleteMany({})

    // insert the new data with a timestamp
    db.collection("advent").insertOne({
        timestamp: new Date(),
        data: response.data
    })


    console.log(response)
    return {
        statusCode: 200,
    };
};

exports.handler = schedule("*/4 * * * *", handler);

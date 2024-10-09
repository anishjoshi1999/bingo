import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cachedClient = global._mongoClient;
let cachedDb = global._mongoDb;

async function dbConnect() {
  if (cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await mongoose.connect(MONGODB_URI);
  const db = client.connection.db;

  global._mongoClient = client;
  global._mongoDb = db;

  return { client, db };
}

export default dbConnect;

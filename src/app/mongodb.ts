import { Db, MongoClient } from "mongodb";

// Create cached connection variable
let cachedDB: Db | null = null;

// A function for connecting to MongoDB,
export default async function connectToDatabase(): Promise<Db> {
  // If the database connection is cached, use it instead of creating a new connection
  if (cachedDB) {
    console.info("Using cached client!");
    return cachedDB;
  }

  console.info("No client found! Creating a new one.");
  // If no connection is cached, create a new one
  const client = new MongoClient(
    encodeURIComponent(process.env.ATLAS_URI_PROD as string)
  );
  await client.connect();
  const db: Db = client.db(process.env.DB_NAME);
  cachedDB = db;
  return cachedDB;
}

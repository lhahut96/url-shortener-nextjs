import { Db, MongoClient } from "mongodb";

let cachedDB: Db | null = null;

export default async function connectToDatabase(): Promise<Db> {
  if (cachedDB) {
    console.info("Using cached client!");
    return cachedDB;
  }
  console.info("No client found! Creating a new one.");
  // If no connection is cached, create a new one
  const client = new MongoClient(process.env.ATLAS_URI_PROD as string);
  await client.connect();
  const db: Db = client.db(process.env.DB_NAME);
  cachedDB = db;
  return cachedDB;
}

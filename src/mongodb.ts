import { Db, MongoClient } from "mongodb";

class MongoURLShortener {
  private static cachedDB: Db | null = null;

  private constrcutor() {}

  public static async connectToDatabase() {
    if (MongoURLShortener.cachedDB) {
      console.info("Using cached client!");
      return MongoURLShortener.cachedDB;
    }
    console.info("No client found! Creating a new one.");
    // If no connection is cached, create a new one
    const client = new MongoClient(process.env.ATLAS_URI_PROD as string);
    await client.connect();
    const db: Db = client.db(process.env.DB_NAME);
    MongoURLShortener.cachedDB = db;
    return MongoURLShortener.cachedDB;
  }
}

export default MongoURLShortener;

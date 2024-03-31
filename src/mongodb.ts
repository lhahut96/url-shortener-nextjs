import { Db, MongoClient } from "mongodb";

class MongoDB {
  public cachedDB: Db | null = null;

  constrcutor() {
    this.cachedDB = null;
  }

  async connectToDatabase() {
    if (this.cachedDB) {
      console.info("Using cached client!");
      return this.cachedDB;
    }
    console.info("No client found! Creating a new one.");
    // If no connection is cached, create a new one
    const client = new MongoClient(process.env.ATLAS_URI_PROD as string);
    await client.connect();
    const db: Db = client.db(process.env.DB_NAME);
    this.cachedDB = db;
    return this.cachedDB;
  }
}

const MongoDbInstance = Object.freeze(new MongoDB());

module.exports = MongoDbInstance;

import { COLLECTION_NAMES } from "@/app/types";
import MongoDbInstance from "@/mongodb";

export const getService = async (hash: string) => {
  const database = await MongoDbInstance.connectToDatabase();
  const campaign = await database
    .collection(COLLECTION_NAMES["url-info"])
    .findOne({ uid: hash });
  if (campaign) {
    return campaign;
  }
};

export const createShortLink = async (link: string, hash: string) => {
  const database = await MongoDbInstance.connectToDatabase();
  const urlInfoCollection = database.collection(COLLECTION_NAMES["url-info"]);
  const linkExists = await urlInfoCollection.findOne({
    link,
  });

  if (linkExists) {
    return { ...linkExists, created: true };
  } else {
    await urlInfoCollection.insertOne({
      link,
      uid: hash,
    });
    return { link, uid: hash, created: false };
  }
};

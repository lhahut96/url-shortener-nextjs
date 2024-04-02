import { COLLECTION_NAMES } from "@/app/types";
import MongoDbInstance from "@/mongodb";
import { customAlphabet } from "nanoid";

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const getHash = customAlphabet(characters, 4);

export const getService = async (hash: string) => {
  const database = await MongoDbInstance.connectToDatabase();
  const campaign = await database
    .collection(COLLECTION_NAMES["url-info"])
    .findOne({ uid: hash });
  if (campaign) {
    return campaign;
  }
};

export const createShortLink = async (link: string, hash?: string) => {
  if (!hash) hash = getHash();
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

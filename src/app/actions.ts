"use server";

import { createShortLink } from "./services/url-shortener";

export const callCreateShortLInk = async (url: string) => {
  try {
    const data = await createShortLink(url);
    const shortLink = `link/${data.uid}`;
    return shortLink;
  } catch (error) {
    console.error(error);
  }
};

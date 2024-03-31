export const dynamic = "auto";
export const dynamicParams = true;
export const revalidate = false;
export const fetchCache = "auto";
export const runtime = "nodejs";
export const preferredRegion = "auto";

import { COLLECTION_NAMES } from "@/app/types";
import connectToDatabase from "@/mongodb";
import { customAlphabet } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const getHash = customAlphabet(characters, 4);

export const POST = async (request: NextRequest) => {
  const apiKey = request.headers.get("api-key");
  const newHeaders = new Headers(request.headers);
  if (request.method !== "POST" || apiKey !== process.env.API_KEY) {
    newHeaders.set("code", "405");
    return NextResponse.json(
      {
        type: "Error",
        code: 405,
        message: "Only POST method is accepted on this route",
      },
      { status: 405 }
    );
  }

  const requestJSON = await request.json();
  const { link } = requestJSON;
  if (!link || typeof link !== "string") {
    return NextResponse.json(
      {
        type: "Error",
        code: 400,
        message: "Expected {link: string}",
      },
      { status: 400 }
    );
  }

  try {
    const database = await connectToDatabase();
    const urlInfoCollection = database.collection(COLLECTION_NAMES["url-info"]);
    const hash = getHash();
    const linkExists = await urlInfoCollection.findOne({
      link,
    });
    const shortUrl = `${process.env.HOST}/link/${hash}`;
    if (linkExists) {
      return NextResponse.json(
        {
          type: "Success",
          message: "Link already exists",
          shortUrl: `${process.env.HOST}/link/${linkExists.uid}`,
        },
        { status: 200 }
      );
    } else {
      await urlInfoCollection.insertOne({
        link,
        uid: hash,
      });
      return NextResponse.json(
        {
          type: "Success",
          message: "Link created successfully",
          shortUrl,
        },
        { status: 201 }
      );
    }
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      {
        type: "Error",
        code: 500,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
};

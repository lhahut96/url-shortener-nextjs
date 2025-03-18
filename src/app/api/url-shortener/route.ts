import { createShortLink, getService } from "@/app/services/url-shortener";
import { customAlphabet } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const getHash = customAlphabet(characters, 4);

export const GET = async (request: NextRequest) => {
  // Add more console.info statements for other environment variables if needed
  const hash = request.nextUrl.searchParams.get("hash") as string;
  const campaign = await getService(hash);
  if (campaign) {
    return NextResponse.json(
      {
        type: "Success",
        message: "Link found",
        link: campaign.link,
      },
      { status: 200 }
    );
  }
};

export const POST = async (request: NextRequest) => {
  const apiKey = request.headers.get("api-key");
  const newHeaders = new Headers(request.headers);
  if (apiKey !== process.env.API_KEY) {
    newHeaders.set("code", "405");
    return NextResponse.json(
      {
        type: "Error",
        code: 405,
        message: "API Key is invalid",
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
    const hash = getHash();
    const linkExists = await createShortLink(link, hash);
    const shortUrl = `${window.location.origin}/link/${hash}`;
    if (linkExists.created) {
      return NextResponse.json(
        {
          type: "Success",
          message: "Link already exists",
          shortUrl: `${window.location.origin}/link/${linkExists.uid}`,
        },
        { status: 200 }
      );
    } else {
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

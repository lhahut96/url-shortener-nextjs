import { NextRequest, NextResponse } from "next/server";
import { getService } from "../services/url-shortener";

export const GET = async (request: NextRequest) => {
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

export async function HEAD(request: NextRequest) {}

export async function POST(request: NextRequest) {}

export async function PUT(request: NextRequest) {}

export async function DELETE(request: NextRequest) {}

export async function PATCH(request: NextRequest) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: NextRequest) {}

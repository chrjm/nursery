import { type NextRequest, NextResponse } from "next/server";

import { getSoldStatus, setSold } from "@/lib/sold-status";

const NO_STORE_HEADERS = {
  "Cache-Control": "private, no-store, max-age=0, must-revalidate",
  "CDN-Cache-Control": "no-store",
  "Vercel-CDN-Cache-Control": "no-store",
} as const;

export async function GET(req: NextRequest) {
  req.nextUrl.searchParams.get("t");
  const status = await getSoldStatus();
  return NextResponse.json(status, { headers: NO_STORE_HEADERS });
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { plantId?: unknown; sold?: unknown };

  if (typeof body.plantId !== "string" || typeof body.sold !== "boolean") {
    return NextResponse.json(
      { error: "Invalid sold status payload." },
      { headers: NO_STORE_HEADERS, status: 400 }
    );
  }

  const soldStatus = await setSold(body.plantId, body.sold);
  return NextResponse.json(
    { ok: true, soldStatus },
    { headers: NO_STORE_HEADERS }
  );
}

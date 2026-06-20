import { type NextRequest, NextResponse } from "next/server";

import { getSoldStatus, setSold } from "@/lib/sold-status";

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, max-age=0",
} as const;

export async function GET() {
  const status = await getSoldStatus();
  return NextResponse.json(status, { headers: NO_STORE_HEADERS });
}

export async function POST(req: NextRequest) {
  const { plantId, sold } = (await req.json()) as {
    plantId: string;
    sold: boolean;
  };
  await setSold(plantId, sold);
  return NextResponse.json({ ok: true }, { headers: NO_STORE_HEADERS });
}

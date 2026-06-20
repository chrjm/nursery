import { getSoldStatus, setSold } from "@/lib/sold-status";
import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const status = await getSoldStatus();
  return NextResponse.json(status);
}

export async function POST(req: NextRequest) {
  const { plantId, sold } = (await req.json()) as {
    plantId: string;
    sold: boolean;
  };
  await setSold(plantId, sold);
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}

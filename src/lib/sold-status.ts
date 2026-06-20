import { list, put } from "@vercel/blob";

export type SoldStatus = Record<string, boolean>;

const KEY = "nursery/sold-status.json";

export async function getSoldStatus(): Promise<SoldStatus> {
  try {
    const { blobs } = await list({ prefix: KEY });
    if (!blobs[0]) return {};
    const res = await fetch(blobs[0].url, { cache: "no-store" });
    return (await res.json()) as SoldStatus;
  } catch {
    return {};
  }
}

export async function setSold(plantId: string, sold: boolean): Promise<void> {
  const current = await getSoldStatus();
  await put(KEY, JSON.stringify({ ...current, [plantId]: sold }), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
  });
}

import type { SoldStatus } from "@/lib/sold-status";

interface SoldStatusPostResponse {
  soldStatus: SoldStatus;
}

function soldStatusUrl(): string {
  return `/api/sold?t=${Date.now()}`;
}

export async function fetchSoldStatus(): Promise<SoldStatus> {
  const response = await fetch(soldStatusUrl(), { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Could not load sold status.");
  }

  return (await response.json()) as SoldStatus;
}

export async function saveSoldStatus(
  plantId: string,
  sold: boolean
): Promise<SoldStatus> {
  const response = await fetch(soldStatusUrl(), {
    body: JSON.stringify({ plantId, sold }),
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Could not save sold status.");
  }

  const data = (await response.json()) as SoldStatusPostResponse;
  return data.soldStatus;
}

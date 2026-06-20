import { get, list, put } from "@vercel/blob";

export type SoldStatus = Record<string, boolean>;

const LEGACY_KEY = "nursery/sold-status.json";
const STATUS_PREFIX = "nursery/sold-status/";
const STATUS_BLOB_LIMIT = 1000;
const MINIMUM_BLOB_CACHE_SECONDS = 60;

interface SoldStatusBlob {
  pathname: string;
  uploadedAt: Date;
  url: string;
}

function isSoldStatus(value: unknown): value is SoldStatus {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.values(value).every((entry) => typeof entry === "boolean")
  );
}

function newestFirst(left: SoldStatusBlob, right: SoldStatusBlob): number {
  return (
    right.uploadedAt.getTime() - left.uploadedAt.getTime() ||
    right.pathname.localeCompare(left.pathname)
  );
}

function snapshotPath(plantId: string): string {
  const safePlantId = plantId.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  return `${STATUS_PREFIX}${Date.now()}-${safePlantId}.json`;
}

async function readSoldStatusBlob(urlOrPathname: string): Promise<SoldStatus> {
  const result = await get(urlOrPathname, {
    access: "public",
    useCache: false,
  });

  if (result?.statusCode !== 200) {
    return {};
  }

  const value = (await new Response(result.stream).json()) as unknown;

  if (!isSoldStatus(value)) {
    throw new Error("Sold status blob has an invalid shape.");
  }

  return value;
}

async function readSoldStatus(): Promise<SoldStatus> {
  const { blobs } = await list({
    limit: STATUS_BLOB_LIMIT,
    prefix: STATUS_PREFIX,
  });
  const latest = [...blobs].sort(newestFirst)[0];

  if (latest) {
    return readSoldStatusBlob(latest.url);
  }

  const legacy = await list({ limit: 1, prefix: LEGACY_KEY });
  const legacyBlob = legacy.blobs[0];

  if (legacyBlob) {
    return readSoldStatusBlob(legacyBlob.url);
  }

  return {};
}

export async function getSoldStatus(): Promise<SoldStatus> {
  try {
    return await readSoldStatus();
  } catch {
    return {};
  }
}

export async function setSold(
  plantId: string,
  sold: boolean
): Promise<SoldStatus> {
  const nextStatus = { ...(await readSoldStatus()), [plantId]: sold };

  await put(snapshotPath(plantId), JSON.stringify(nextStatus), {
    access: "public",
    addRandomSuffix: true,
    allowOverwrite: false,
    cacheControlMaxAge: MINIMUM_BLOB_CACHE_SECONDS,
    contentType: "application/json",
  });

  return nextStatus;
}

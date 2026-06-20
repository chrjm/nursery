"use client";

import { useCallback, useEffect, useState } from "react";
import { flairFor } from "@/data/plant-flair";
import { plantProducts } from "@/data/plants";
import type { SoldStatus } from "@/lib/sold-status";
import { fetchSoldStatus, saveSoldStatus } from "@/lib/sold-status-client";
import { cn } from "@/lib/utils";

export default function EditPage() {
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const [soldStatus, setSoldStatus] = useState<SoldStatus>({});

  const refreshStatus = useCallback(async () => {
    try {
      setSoldStatus(await fetchSoldStatus());
      setError(null);
    } catch {
      setError("Could not load sold status.");
    }
  }, []);

  useEffect(() => {
    refreshStatus().catch(() => undefined);
  }, [refreshStatus]);

  const toggle = async (plantId: string) => {
    const next = !(soldStatus[plantId] ?? false);
    const previousStatus = soldStatus;

    setError(null);
    setSaving(plantId);
    setSoldStatus({ ...previousStatus, [plantId]: next });

    try {
      setSoldStatus(await saveSoldStatus(plantId, next));
    } catch {
      setSoldStatus(previousStatus);
      setError("Could not save sold status. Please try again.");
    } finally {
      setSaving(null);
    }
  };

  return (
    <div className="min-h-svh bg-background p-6">
      <h1 className="mb-8 text-center font-black font-futura text-3xl text-ink uppercase">
        Edit sold status
      </h1>
      {error && (
        <p
          className="mx-auto mb-4 max-w-lg rounded-lg bg-white px-4 py-3 text-center font-bold text-guava text-sm"
          role="alert"
        >
          {error}
        </p>
      )}
      <ul className="mx-auto flex max-w-lg flex-col gap-3">
        {plantProducts.map((product) => {
          const sold = soldStatus[product.id] ?? false;
          return (
            <li
              className="flex items-center justify-between rounded-2xl bg-card px-5 py-4 shadow-sm"
              key={product.id}
            >
              <span
                className={cn(
                  "font-bold font-futura text-ink uppercase",
                  sold && "line-through opacity-40"
                )}
              >
                {flairFor(product.id).nickname}
              </span>
              <button
                className={cn(
                  "rounded-full px-4 py-2 font-black font-futura text-xs uppercase transition-colors",
                  sold ? "bg-sunshine text-ink" : "bg-leaf text-white",
                  saving !== null && "opacity-50"
                )}
                disabled={saving !== null}
                onClick={() => toggle(product.id)}
                type="button"
              >
                {sold ? "SOLD" : "Available"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

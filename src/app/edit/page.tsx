"use client";

import { cn } from "@/lib/utils";
import { plantProducts } from "@/data/plants";
import { flairFor } from "@/data/plant-flair";
import { useEffect, useState } from "react";

export default function EditPage() {
  const [soldStatus, setSoldStatus] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/sold")
      .then((r) => r.json())
      .then(setSoldStatus);
  }, []);

  const toggle = async (plantId: string) => {
    const next = !soldStatus[plantId];
    setSoldStatus((prev) => ({ ...prev, [plantId]: next }));
    setSaving(plantId);
    await fetch("/api/sold", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plantId, sold: next }),
    });
    setSaving(null);
  };

  return (
    <div className="min-h-svh bg-background p-6">
      <h1 className="font-futura font-black text-ink text-3xl uppercase mb-8 text-center">
        Edit sold status
      </h1>
      <ul className="mx-auto max-w-lg flex flex-col gap-3">
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
                  saving === product.id && "opacity-50"
                )}
                disabled={saving === product.id}
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

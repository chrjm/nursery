"use client";

import { Leaf } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";
import { flairFor, VENUE_EMOJI } from "@/data/plant-flair";
import type { PlantProduct } from "@/data/plants";
import type { SoldStatus } from "@/lib/sold-status";
import { cn } from "@/lib/utils";

// Vivid scrapbook-paper colors + playful tilts, cycled across the sheet.
const HALOS = [
  "#ee5a6f",
  "#f5953a",
  "#7d68ec",
  "#2ba9bf",
  "#57b06a",
  "#5390df",
] as const;
// Mixed paper finishes (plain / dotted / striped), cycled independently of color.
const CHIP_PATTERNS = ["", "chip-dots", "chip-stripes"] as const;
const TILTS = [
  "-2.5deg",
  "1.7deg",
  "-1.6deg",
  "2.4deg",
  "-2deg",
  "1.4deg",
] as const;

const currencyFormatter = new Intl.NumberFormat("es-MX", {
  currency: "MXN",
  maximumFractionDigits: 0,
  style: "currency",
});

function formatPrice(priceCents: number): string {
  return currencyFormatter.format(priceCents / 100);
}

interface PlantCardProps {
  index: number;
  initialSold: boolean;
  product: PlantProduct;
}

function PlantCard({ product, index, initialSold }: PlantCardProps) {
  const { nickname, venue } = flairFor(product.id);
  const halo = HALOS[index % HALOS.length];
  const tilt = TILTS[index % TILTS.length];
  const pattern = CHIP_PATTERNS[index % CHIP_PATTERNS.length];
  const sold = initialSold;

  return (
    <li
      className="sticker relative list-none rounded-[28px]"
      style={{ "--tilt": tilt, "--halo": halo } as CSSProperties}
    >
      <article className="flex h-full flex-col overflow-hidden rounded-[28px] border-2 border-ink/15 border-dashed bg-card">
        <div className={cn("chip-bg relative aspect-[3/4]", pattern)}>
          <Image
            alt={product.image.alt}
            className="object-contain"
            fill
            loading={index === 0 ? "eager" : "lazy"}
            priority={index === 0}
            sizes="(min-width: 640px) 45vw, 92vw"
            src={product.image.src}
          />
          <div className="absolute top-2 left-3 flex -rotate-3 flex-col items-center">
            <Image
              alt=""
              aria-hidden="true"
              className="relative z-0 object-contain drop-shadow-md"
              height={56}
              src={sold ? "/happychris.webp" : "/sadchris.webp"}
              width={56}
            />
            <div
              className={cn(
                "relative z-10 -mt-2 rounded-full px-3 py-1.5 font-black font-futura text-xs uppercase shadow-md",
                sold ? "bg-sunshine text-ink" : "bg-leaf text-white"
              )}
            >
              {sold ? "SOLD!" : "Not sold yet!"}
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 px-5 pt-3 pb-5">
          <h2
            className={cn(
              "font-bold font-futura text-2xl text-ink uppercase leading-tight tracking-tight",
              sold && "line-through opacity-40"
            )}
          >
            {nickname}
          </h2>
          {sold && (
            <p className="comic-headline -mt-1 font-black font-futura text-3xl text-guava uppercase">
              SOLD
            </p>
          )}
          <p className="font-futura font-semibold text-2xl text-ink">
            {formatPrice(product.priceCents)}
          </p>
          {product.note && (
            <p className="font-semibold text-muted-foreground text-sm">
              {product.note}
            </p>
          )}
          <div className="mt-auto flex flex-wrap items-center gap-2">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 font-bold text-ink text-xs">
              <span aria-hidden="true">{VENUE_EMOJI[venue]}</span>
              {venue}
            </span>
            {product.heightMeters !== undefined && (
              <span className="inline-flex w-fit items-center rounded-full bg-secondary px-3 py-1.5 font-bold text-ink text-xs">
                {`Big · ${product.heightMeters} m`}
              </span>
            )}
          </div>
        </div>
      </article>
    </li>
  );
}

interface PlantShopProps {
  products: PlantProduct[];
  soldStatus: SoldStatus;
}

export function PlantShop({ products, soldStatus }: PlantShopProps) {
  return (
    <div className="min-h-svh">
      <header className="sticky top-0 z-40 border-ink/10 border-b bg-paper/95">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-center gap-2 px-4 py-3 sm:px-6">
          <h1 className="font-bold font-pop text-ink text-lg uppercase sm:text-xl">
            🌱🌿🪴 Chris's Cool Plants 🪴🌿🌱
          </h1>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <section className="pt-8 pb-2 sm:pt-10">
          <h2 className="comic-headline mx-auto mb-6 max-w-xl text-balance text-center font-bold font-futura text-4xl uppercase leading-[0.95] tracking-tight sm:text-5xl">
            Get these plants{" "}
            <em className="block font-black text-6xl italic sm:text-8xl">
              out of my house!
            </em>
          </h2>
          <div className="mx-auto max-w-2xl rounded-lg border-2 border-ink/15 bg-white px-6 py-5 shadow-md sm:px-8 sm:py-6">
            <p className="text-balance text-center font-semibold text-ink text-lg leading-7 sm:text-xl">
              I’m selling my plants, and all the money goes to the Marsden
              Hospice, where Katie&apos;s dad is currently being treated.
            </p>
          </div>
        </section>

        <section className="py-8 sm:py-10">
          {(() => {
            const parts = ["+61", "413", "567", "350"];
            const number = parts.join("");
            const href = `https://wa.me/${number.replace("+", "")}`;
            return (
              <>
                <a
                  className="comic-headline mb-4 block text-center font-black font-futura text-2xl text-ink uppercase leading-tight underline decoration-2 underline-offset-4 sm:text-3xl"
                  href={href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Message me on WhatsApp at {number} to buy a plant!
                </a>
                <div className="mb-8 flex justify-center">
                  <span className="inline-block -rotate-2 rounded-full bg-sunshine px-4 py-2 font-black font-futura text-ink text-sm uppercase shadow-md ring-2 ring-ink/10">
                    🚚 Free delivery!
                  </span>
                </div>
              </>
            );
          })()}
          <ul className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2">
            {products.map((product, index) => (
              <PlantCard
                index={index}
                initialSold={soldStatus[product.id] ?? false}
                key={product.id}
                product={product}
              />
            ))}
          </ul>
        </section>
      </main>

      <footer className="mx-auto mt-6 w-full max-w-6xl px-4 pb-12 sm:px-6">
        <div className="flex flex-col items-center gap-2 border-ink/10 border-t pt-8 text-center">
          <p className="flex items-center gap-2 font-pop font-semibold text-ink text-lg">
            <Leaf aria-hidden="true" className="size-5 text-leaf" />
            Chris's Cool Plants
          </p>
        </div>
      </footer>
    </div>
  );
}

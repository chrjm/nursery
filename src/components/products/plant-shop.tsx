import { Leaf } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";

import type { PlantProduct } from "@/data/plants";
import { cn } from "@/lib/utils";

type Venue = "Indoors" | "Outdoors" | "Indoor & outdoor";

interface Flair {
  nickname: string;
  venue: Venue;
}

/** Fun first-name nicknames + where each one likes to live. Keyed by product id. */
const PLANT_FLAIR: Record<string, Flair> = {
  "staircase-variegated-snake-plant-white-pot": {
    nickname: "Stevie the Snake Plant",
    venue: "Indoors",
  },
  "upright-variegated-snake-plant-marble-pot": {
    nickname: "Iggy the Snake Plant",
    venue: "Indoors",
  },
  "variegated-snake-plant-ceramic-saucer-pot": {
    nickname: "Vivi the Snake Plant",
    venue: "Indoors",
  },
  "tall-snake-plant-window-white-pot": {
    nickname: "Tilda the Snake Plant",
    venue: "Indoors",
  },
  "green-snake-plant-rounded-white-pot": {
    nickname: "Greta the Snake Plant",
    venue: "Indoors",
  },
  "young-snake-plant-white-cylinder-pot": {
    nickname: "Junior the Snake Plant",
    venue: "Indoors",
  },
  "mistletoe-cactus-terracotta-pot": {
    nickname: "Marty the Mistletoe Cactus",
    venue: "Indoors",
  },
  "peace-lily-black-tabletop-pot": {
    nickname: "Penny the Peace Lily",
    venue: "Indoors",
  },
  "elephant-ear-alocasia-white-pot": {
    nickname: "Ellie the Elephant Ear",
    venue: "Indoors",
  },
  "red-ti-plant-gray-stone-pot": {
    nickname: "Rosie the Ti Plant",
    venue: "Indoor & outdoor",
  },
  "fiddle-leaf-fig-window-white-pot": {
    nickname: "Fred the Fiddle Leaf Fig",
    venue: "Indoors",
  },
  "dwarf-pomegranate-tree-black-planter": {
    nickname: "Cleo the Calamondin",
    venue: "Indoor & outdoor",
  },
  "sculpted-topiary-tree-black-nursery-pot": {
    nickname: "Toby the Topiary",
    venue: "Indoor & outdoor",
  },
};

const FALLBACK_FLAIR: Flair = { nickname: "A Mystery Plant", venue: "Indoors" };

function flairFor(id: string): Flair {
  return PLANT_FLAIR[id] ?? FALLBACK_FLAIR;
}

const VENUE_EMOJI: Record<Venue, string> = {
  Indoors: "🏠",
  Outdoors: "☀️",
  "Indoor & outdoor": "🏡",
};

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

function FlowerMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <g fill="currentColor">
        <circle cx="12" cy="5" r="3.4" />
        <circle cx="19" cy="10" r="3.4" />
        <circle cx="16.3" cy="18" r="3.4" />
        <circle cx="7.7" cy="18" r="3.4" />
        <circle cx="5" cy="10" r="3.4" />
      </g>
      <circle cx="12" cy="12.4" fill="#ffd43b" r="3.1" />
    </svg>
  );
}

interface PlantCardProps {
  index: number;
  product: PlantProduct;
}

function PlantCard({ product, index }: PlantCardProps) {
  const { nickname, venue } = flairFor(product.id);
  const halo = HALOS[index % HALOS.length];
  const tilt = TILTS[index % TILTS.length];
  const pattern = CHIP_PATTERNS[index % CHIP_PATTERNS.length];

  return (
    <li
      className="sticker relative list-none rounded-[28px]"
      style={{ "--tilt": tilt, "--halo": halo } as CSSProperties}
    >
      <article className="flex h-full flex-col overflow-hidden rounded-[28px] border-2 border-ink/15 border-dashed bg-card">
        <div className={cn("chip-bg relative aspect-square", pattern)}>
          <Image
            alt={product.image.alt}
            className="object-contain"
            fill
            loading={index === 0 ? "eager" : "lazy"}
            priority={index === 0}
            sizes="(min-width: 640px) 45vw, 92vw"
            src={product.image.src}
          />
        </div>

        <div className="flex flex-1 flex-col gap-3 px-5 pt-3 pb-5">
          <h2 className="font-bold font-futura text-2xl text-ink uppercase leading-tight tracking-tight">
            {nickname}
          </h2>
          <p className="font-black font-futura text-2xl text-ink">
            {formatPrice(product.priceCents)}
          </p>
          <div className="mt-auto flex flex-wrap gap-2">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 font-semibold text-ink text-xs">
              <span aria-hidden="true">{VENUE_EMOJI[venue]}</span>
              {venue}
            </span>
            <span className="inline-flex w-fit items-center rounded-full bg-secondary px-3 py-1.5 font-semibold text-ink text-xs">
              {product.heightMeters === undefined
                ? "Small"
                : `Big · ${product.heightMeters} m`}
            </span>
          </div>
        </div>
      </article>
    </li>
  );
}

interface PlantShopProps {
  products: PlantProduct[];
}

export function PlantShop({ products }: PlantShopProps) {
  return (
    <div className="min-h-svh">
      <header className="sticky top-0 z-40 border-ink/10 border-b bg-paper/95">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-2 px-4 py-3 sm:px-6">
          <FlowerMark className="size-6 rotate-12 text-leaf" />
          <h1 className="font-pop font-semibold text-ink text-lg sm:text-xl">
            Chris's Cool Plants
          </h1>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <section className="pt-8 pb-2 sm:pt-10">
          <h2 className="comic-headline mx-auto mb-6 max-w-xl text-balance text-center font-bold font-futura text-4xl uppercase leading-[0.95] tracking-tight sm:text-5xl">
            Get these plants{" "}
            <em className="font-black italic">out of my house!</em>
          </h2>

          <div className="cloud-card mx-auto max-w-2xl px-9 py-8 sm:px-12 sm:py-9">
            <p className="text-balance text-center font-semibold text-ink text-lg leading-7 sm:text-xl">
              I'm selling my plants, and all of the money will go to the
              Marsden Cancer Hospice, where Katie's dad is currently being
              treated.
            </p>
          </div>
        </section>

        <section className="py-8 sm:py-10">
          <p className="comic-headline mb-8 text-center font-black font-futura text-2xl uppercase leading-tight sm:text-3xl">
            I am over 60% confident in the species names I listed here!
          </p>
          <ul className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2">
            {products.map((product, index) => (
              <PlantCard index={index} key={product.id} product={product} />
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

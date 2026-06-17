"use client";

import { Leaf, ShoppingBasket } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

interface Plant {
  description: string;
  id: string;
  name: string;
  photoClassName: string;
  priceCents: number;
}

const plants: Plant[] = [
  {
    id: "monstera-deliciosa",
    name: "Monstera Deliciosa",
    priceCents: 4200,
    description:
      "A bold, easygoing houseplant with split leaves that makes a room feel instantly alive.",
    photoClassName: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "snake-plant",
    name: "Snake Plant",
    priceCents: 2800,
    description:
      "Low-maintenance, sculptural leaves that handle bright corners and forgetful watering.",
    photoClassName: "bg-lime-100 text-lime-800",
  },
  {
    id: "pilea-peperomioides",
    name: "Pilea Peperomioides",
    priceCents: 2400,
    description:
      "A cheerful tabletop plant with coin-shaped leaves and a tidy, compact habit.",
    photoClassName: "bg-cyan-100 text-cyan-800",
  },
  {
    id: "fiddle-leaf-fig",
    name: "Fiddle Leaf Fig",
    priceCents: 5800,
    description:
      "Glossy, statement foliage for a bright spot with enough room to stretch upward.",
    photoClassName: "bg-rose-100 text-rose-800",
  },
];

const currencyFormatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  maximumFractionDigits: 0,
  style: "currency",
});

function formatPrice(priceCents: number) {
  return currencyFormatter.format(priceCents / 100);
}

export default function Home() {
  const [cartCount, setCartCount] = useState(0);
  const cartLabel = cartCount === 1 ? "1 item" : `${cartCount} items`;

  return (
    <main className="min-h-svh bg-background">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-4 sm:gap-6 sm:px-6 sm:py-8 lg:px-8">
        <header className="flex flex-col gap-4 border-b pb-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Leaf aria-hidden="true" className="size-4" />
              <p className="font-medium text-sm uppercase tracking-[0.08em]">
                Nursery
              </p>
            </div>
            <p
              aria-live="polite"
              className="inline-flex h-9 shrink-0 items-center gap-2 rounded-[8px] border px-3 font-medium text-foreground text-sm"
            >
              <ShoppingBasket aria-hidden="true" className="size-4" />
              {cartLabel}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h1 className="text-balance font-semibold text-3xl text-foreground tracking-tight sm:text-4xl">
              Plants for sale
            </h1>
            <p className="max-w-md text-muted-foreground text-sm leading-6 sm:text-right">
              Leafy favorites selected for bright corners, shelves, and easy
              care.
            </p>
          </div>
        </header>

        <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {plants.map((plant) => (
            <li
              className="flex h-full flex-col overflow-hidden rounded-[8px] border bg-card text-card-foreground shadow-sm"
              key={plant.id}
            >
              <article className="flex h-full flex-col">
                <div
                  aria-label={`${plant.name} photo placeholder`}
                  className={`flex aspect-[4/3] items-center justify-center ${plant.photoClassName}`}
                  role="img"
                >
                  <Leaf aria-hidden="true" className="size-12 stroke-[1.5]" />
                </div>

                <div className="flex flex-1 flex-col gap-4 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-semibold text-base leading-6">
                      {plant.name}
                    </h2>
                    <p className="shrink-0 font-semibold text-base text-foreground">
                      <span className="sr-only">Price: </span>
                      {formatPrice(plant.priceCents)}
                    </p>
                  </div>

                  <p className="text-muted-foreground text-sm leading-6">
                    {plant.description}
                  </p>

                  <Button
                    className="mt-auto h-11 w-full rounded-[8px]"
                    onClick={() => setCartCount((count) => count + 1)}
                    size="lg"
                    type="button"
                  >
                    <ShoppingBasket aria-hidden="true" />
                    Add to cart
                  </Button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

import { connection } from "next/server";

import { PlantShop } from "@/components/products/plant-shop";
import { plantProducts } from "@/data/plants";
import { getSoldStatus } from "@/lib/sold-status";

export default async function Home() {
  await connection();
  const soldStatus = await getSoldStatus();
  return <PlantShop products={plantProducts} soldStatus={soldStatus} />;
}

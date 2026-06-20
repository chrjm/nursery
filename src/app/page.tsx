import { PlantShop } from "@/components/products/plant-shop";
import { plantProducts } from "@/data/plants";
import { getSoldStatus } from "@/lib/sold-status";

export const dynamic = "force-dynamic";

export default async function Home() {
  const soldStatus = await getSoldStatus();
  return <PlantShop products={plantProducts} soldStatus={soldStatus} />;
}

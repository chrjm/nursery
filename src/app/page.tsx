import { PlantShop } from "@/components/products/plant-shop";
import { plantProducts } from "@/data/plants";

export default function Home() {
  return <PlantShop products={plantProducts} />;
}

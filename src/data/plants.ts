import dwarfPomegranateTreeBlackPlanter from "@/data/plants/dwarf-pomegranate-tree-black-planter.json";
import elephantEarAlocasiaWhitePot from "@/data/plants/elephant-ear-alocasia-white-pot.json";
import fiddleLeafFigWindowWhitePot from "@/data/plants/fiddle-leaf-fig-window-white-pot.json";
import greenSnakePlantRoundedWhitePot from "@/data/plants/green-snake-plant-rounded-white-pot.json";
import mistletoeCactusTerracottaPot from "@/data/plants/mistletoe-cactus-terracotta-pot.json";
import peaceLilyBlackTabletopPot from "@/data/plants/peace-lily-black-tabletop-pot.json";
import redTiPlantGrayStonePot from "@/data/plants/red-ti-plant-gray-stone-pot.json";
import sculptedTopiaryTreeBlackNurseryPot from "@/data/plants/sculpted-topiary-tree-black-nursery-pot.json";
import staircaseVariegatedSnakePlantWhitePot from "@/data/plants/staircase-variegated-snake-plant-white-pot.json";
import tallSnakePlantWindowWhitePot from "@/data/plants/tall-snake-plant-window-white-pot.json";
import uprightVariegatedSnakePlantMarblePot from "@/data/plants/upright-variegated-snake-plant-marble-pot.json";
import variegatedSnakePlantCeramicSaucerPot from "@/data/plants/variegated-snake-plant-ceramic-saucer-pot.json";
import youngSnakePlantWhiteCylinderPot from "@/data/plants/young-snake-plant-white-cylinder-pot.json";

export interface PlantProduct {
  description: string;
  id: string;
  image: {
    alt: string;
    src: string;
  };
  inventory: number;
  light: string;
  name: string;
  plantType: string;
  pot: string;
  priceCents: number;
  scientificName: string;
  size: string;
  water: string;
}

export const plantProducts = [
  staircaseVariegatedSnakePlantWhitePot,
  uprightVariegatedSnakePlantMarblePot,
  variegatedSnakePlantCeramicSaucerPot,
  tallSnakePlantWindowWhitePot,
  greenSnakePlantRoundedWhitePot,
  youngSnakePlantWhiteCylinderPot,
  mistletoeCactusTerracottaPot,
  peaceLilyBlackTabletopPot,
  elephantEarAlocasiaWhitePot,
  redTiPlantGrayStonePot,
  fiddleLeafFigWindowWhitePot,
  dwarfPomegranateTreeBlackPlanter,
  sculptedTopiaryTreeBlackNurseryPot,
] satisfies PlantProduct[];

export type Venue = "Indoors" | "Outdoors" | "Indoor & outdoor";

export interface Flair {
  nickname: string;
  venue: Venue;
}

export const PLANT_FLAIR: Record<string, Flair> = {
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

export function flairFor(id: string): Flair {
  return PLANT_FLAIR[id] ?? FALLBACK_FLAIR;
}

export const VENUE_EMOJI: Record<Venue, string> = {
  Indoors: "🏠",
  Outdoors: "☀️",
  "Indoor & outdoor": "🏡",
};

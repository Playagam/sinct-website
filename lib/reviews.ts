export type Review = {
  id: string;
  name: string;
  handle: string;
  comment: string;
  rating: number;
  drop: string;
};

export const reviews: Review[] = [
  {
    id: "r1",
    name: "MIRA DEVILLE",
    handle: "@miradeville",
    comment: "Fits like armor. The UV print hits under club lights—instant attention.",
    rating: 5,
    drop: "PRIDE"
  },
  {
    id: "r2",
    name: "NOAH VOID",
    handle: "@noahvoid",
    comment: "Cargos feel bulletproof but move soft. Hardware feels premium, no rattles.",
    rating: 5,
    drop: "WRATH"
  },
  {
    id: "r3",
    name: "SAI VEIL",
    handle: "@saiveil",
    comment: "Framing is insane—corset cinches without pinching. Packaging was a flex.",
    rating: 4,
    drop: "LUST"
  }
];





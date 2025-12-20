export type Product = {
  sin: string;
  name: string;
  slug: string;
  price: number;
  colors: string[];
  images: {
    front: string;
    back: string;
  };
};

const BASE = "/mockups";

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRclz2hbPhNCTPTNzmcHgxis3rSY0xsMvrztUcTidsRNSkq1xJra-3_SdEQjfLfEXy0n23To4cuhdQv/pub?output=csv",
    { cache: "no-store" }
  );

  const text = await res.text();
  const rows = text.split("\n").slice(1);

  return rows
    .filter(Boolean)
    .map((row) => {
      const [sin, name, price, colorsRaw] = row.split(",");

      const colors = colorsRaw
        .split("|")
        .map(c => c.trim().toLowerCase());

      const defaultColor = colors[0];

      const slug = `${sin}-${name}`
        .toLowerCase()
        .replace(/\s+/g, "-");

      return {
        sin: sin.trim().toLowerCase(),
        name: name.trim(),
        slug,
        price: Number(price),
        colors,
        images: {
          front: `${BASE}/${sin}/hoodie/${defaultColor}/front.png`,
          back: `${BASE}/${sin}/hoodie/${defaultColor}/back.png`
        }
      };
    });
}

export const sins = [
  "pride",
  "greed",
  "lust",
  "envy",
  "gluttony",
  "wrath",
  "sloth"
];

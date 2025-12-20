export const fetchHoodies = async () => {
  const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRclz2hbPhNCTPTNzmcHgxis3rSY0xsMvrztUcTidsRNSkq1xJra-3_SdEQjfLfEXy0n23To4cuhdQv/pub?output=csv";

  const res = await fetch(sheetUrl);
  if (!res.ok) throw new Error("Failed to fetch hoodies from Google Sheet");

  const text = await res.text();
  const lines = text.split("\n");

  // Skip header
  return lines.slice(1).map(line => {
    const [sin, hoodie, price, color] = line.split(",");
    const image = `${sin.toLowerCase()}/${hoodie.toLowerCase()}/${color.toLowerCase()}/front.png`;
    return { sin, hoodie, price, color, image };
  });
};

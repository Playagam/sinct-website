// lib/sheets.ts

const APPS_SCRIPT_BASE =
  process.env.NEXT_PUBLIC_APPS_SCRIPT_URL ||
  "https://script.google.com/macros/s/AKfycbzJKYB26JhOn1IiFuplOuSrYCkzI5jRDGYs-Ckf-yptWFOoYhiXcUnFBLbvxpLW6PsT/exec";

export async function forwardToAppsScript(
  path: string,
  options?: {
    method?: string;
    body?: any;
  }
) {
  const res = await fetch(`${APPS_SCRIPT_BASE}${path}`, {
    method: options?.method || "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}

export async function fetchHoodies() {
  const res = await fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRclz2hbPhNCTPTNzmcHgxis3rSY0xsMvrztUcTidsRNSkq1xJra-3_SdEQjfLfEXy0n23To4cuhdQv/pub?output=csv",
    { cache: "no-store" }
  );

  const text = await res.text();
  const rows = text.split("\n").slice(1);

  return rows
    .filter(Boolean)
    .map((row) => {
      const [sin, name, price, colors] = row.split(",");

      return {
        sin: sin.trim().toLowerCase(),
        name: name.trim(),
        price: Number(price),
        colors: colors.split("|").map(c => c.trim().toLowerCase()),
      };
    });
}

export async function forwardToAppsScript(
  path: string,
  body: any
) {
  const baseUrl = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;

  if (!baseUrl) {
    throw new Error("Missing NEXT_PUBLIC_APPS_SCRIPT_URL");
  }

  const res = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return res.json();
}

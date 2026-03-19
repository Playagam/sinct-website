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

  const contentType = res.headers.get("content-type") || "";
  const text = await res.text();

  if (!res.ok) {
    throw new Error(
      `Apps Script request failed (${res.status}). ${
        text ? `Response: ${text.slice(0, 220)}` : ""
      }`
    );
  }

  try {
    return text ? JSON.parse(text) : {};
  } catch {
    // Common case: Apps Script returns an HTML page (permissions, wrong URL, etc.)
    throw new Error(
      `Apps Script did not return JSON (content-type: ${contentType}). ` +
        `Got: ${text.slice(0, 220)}`
    );
  }
}

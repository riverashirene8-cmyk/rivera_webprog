// API base URL (safe for Vite + Vercel)

const rawApiUrl = import.meta.env.VITE_API_URL?.trim();

// ❌ No fallback to "/api" in production anymore
if (!rawApiUrl) {
  throw new Error("VITE_API_URL is missing in environment variables");
}

// normalize URL (remove trailing slash)
export const API_ROOT = rawApiUrl.replace(/\/$/, "");

// helper for endpoints
export const apiUrl = (path = "") => {
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${API_ROOT}${suffix}`;
};

// parse JSON safely
export const parseJsonResponse = async (response) => {
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    const preview = (await response.text()).slice(0, 80);

    if (preview.toLowerCase().startsWith("<!doctype")) {
      throw new Error(
        "API returned HTML instead of JSON. Check backend deployment or API URL."
      );
    }

    throw new Error(preview || `Unexpected response (${response.status})`);
  }

  return response.json();
};

// handle API response errors
export const handleResponse = async (response) => {
  const data = await parseJsonResponse(response);

  if (!response.ok) {
    throw new Error(data.message || "Server error");
  }

  return data;
};
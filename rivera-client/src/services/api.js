// ================================
// API BASE URL (VITE + VERCEL SAFE)
// ================================

const rawApiUrl = import.meta.env.VITE_API_URL?.trim();

// ⚠️ Hard stop if missing env
if (!rawApiUrl) {
  throw new Error("VITE_API_URL is missing in environment variables");
}

// Normalize base URL
export const API_ROOT = rawApiUrl.replace(/\/$/, "");

// ================================
// BUILD API URL HELPER
// ================================
export const apiUrl = (path = "") => {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_ROOT}${cleanPath}`;
};

// ================================
// SAFE JSON PARSER
// ================================
export const parseJsonResponse = async (response) => {
  const contentType = response.headers.get("content-type") || "";

  // If NOT JSON → probably backend error or wrong URL
  if (!contentType.includes("application/json")) {
    const preview = (await response.text()).slice(0, 120);

    // Detect HTML error page (very common in wrong API URL)
    if (preview.toLowerCase().includes("<!doctype")) {
      throw new Error(
        "Backend not reachable or wrong API URL. Check VITE_API_URL in Vercel."
      );
    }

    throw new Error(preview || `Unexpected response (${response.status})`);
  }

  return response.json();
};

// ================================
// RESPONSE HANDLER
// ================================
export const handleResponse = async (response) => {
  const data = await parseJsonResponse(response);

  if (!response.ok) {
    throw new Error(data.message || "Server error");
  }

  return data;
};

// ================================
// FETCH WITH NETWORK ERROR HANDLING
// ================================
export const apiRequest = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    return handleResponse(response);
  } catch (error) {
    if (error.message.includes("Failed to fetch")) {
      throw new Error("Unable to connect to server. Check your internet connection and API URL.");
    }
    throw error;
  }
};
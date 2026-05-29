const rawApiUrl = import.meta.env.VITE_API_URL?.trim();

const resolveApiRoot = () => {
  if (!rawApiUrl) {
    return "/api";
  }

  if (rawApiUrl === "http://localhost:8000/api") {
    return "http://localhost:5000/api";
  }

  return rawApiUrl.replace(/\/$/, "");
};

export const API_ROOT = resolveApiRoot();

export const apiUrl = (path = "") => {
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${API_ROOT}${suffix}`;
};

export const parseJsonResponse = async (response) => {
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    const preview = (await response.text()).slice(0, 80);

    if (preview.toLowerCase().startsWith("<!doctype")) {
      throw new Error(
        "API returned HTML instead of JSON. Start the backend with npm start in rivera-server (index.js on port 5000), then restart the Vite dev server."
      );
    }

    throw new Error(
      preview || `Unexpected response (${response.status})`
    );
  }

  return response.json();
};

export const handleResponse = async (response) => {
  const data = await parseJsonResponse(response);

  if (!response.ok) {
    throw new Error(data.message || "Server error");
  }

  return data;
};

const API_URL =
  import.meta.env.VITE_API_URL || "https://ravss-international.onrender.com/api";

async function request(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const res = await fetch(url, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) throw new Error(data.message || "Request failed");

  return data;
}

export const api = {
  get: (path) => request(path),
  post: (path, body) =>
    request(path, { method: "POST", body: JSON.stringify(body) }),
  put: (path, body) =>
    request(path, { method: "PUT", body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: "DELETE" }),
};

export const categoriesApi = {
  getAll: () => api.get("/categories"),
};

export const productsApi = {
  getAll: () => api.get("/products"),
};

export const slidesApi = {
  getAll: () => api.get("/slides"),
};

export const contactApi = {
  getAll: () => api.get("/contact"),
};
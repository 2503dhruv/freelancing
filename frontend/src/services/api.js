const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

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
  post: (path, body) => request(path, { method: "POST", body: JSON.stringify(body) }),
  put: (path, body) => request(path, { method: "PUT", body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: "DELETE" }),
};

export const categoriesApi = {
  getAll: () => api.get("/categories"),
  getBySlug: (slug) => api.get(`/categories/${slug}`),
};

export const productsApi = {
  getAll: (categoryId) =>
    api.get(categoryId ? `/products?category=${categoryId}` : "/products"),
  getByCategorySlug: (slug) => api.get(`/products/category/${slug}`),
  getById: (id) => api.get(`/products/${id}`),
};

export const slidesApi = {
  getAll: () => api.get("/slides"),
};

export const contactApi = {
  submit: (data) => api.post("/contact", data),
  getAll: () => api.get("/contact"),
};


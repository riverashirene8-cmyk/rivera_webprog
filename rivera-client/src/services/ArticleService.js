import { apiUrl, apiRequest } from "./api";

const API_BASE = apiUrl("/articles");

const normalizeArticle = (article) => ({
  id: article.id ?? article._id,
  name: String(article.name ?? "").trim().toLowerCase(),
  title: String(article.title ?? "").trim(),
  image: String(article.image ?? "").trim(),
  content: Array.isArray(article.content) ? article.content : [],
});

export const fetchArticles = async () => {
  const data = await apiRequest(API_BASE);
  return Array.isArray(data.articles)
    ? data.articles.map(normalizeArticle)
    : [];
};

export const fetchArticleByName = async (name) => {
  const data = await apiRequest(
    `${API_BASE}/name/${encodeURIComponent(name)}`
  );
  return normalizeArticle(data);
};

export const createArticle = async (article) => {
  const data = await apiRequest(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(article),
  });
  return normalizeArticle(data);
};

export const updateArticle = async (id, article) => {
  const data = await apiRequest(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(article),
  });
  return normalizeArticle(data);
};

export const deleteArticle = async (id) => {
  const data = await apiRequest(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
  return data;
};

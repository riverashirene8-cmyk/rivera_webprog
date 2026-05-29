import { apiUrl, handleResponse } from "./api";

const API_BASE = apiUrl("/articles");

const normalizeArticle = (article) => ({
  id: article.id ?? article._id,
  name: String(article.name ?? "").trim().toLowerCase(),
  title: String(article.title ?? "").trim(),
  image: String(article.image ?? "").trim(),
  content: Array.isArray(article.content) ? article.content : [],
});

export const fetchArticles = async () => {
  const response = await fetch(API_BASE);
  const data = await handleResponse(response);
  return Array.isArray(data.articles)
    ? data.articles.map(normalizeArticle)
    : [];
};

export const fetchArticleByName = async (name) => {
  const response = await fetch(
    `${API_BASE}/name/${encodeURIComponent(name)}`
  );
  const data = await handleResponse(response);
  return normalizeArticle(data);
};

export const createArticle = async (article) => {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(article),
  });

  const data = await handleResponse(response);
  return normalizeArticle(data);
};

export const updateArticle = async (id, article) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(article),
  });

  const data = await handleResponse(response);
  return normalizeArticle(data);
};

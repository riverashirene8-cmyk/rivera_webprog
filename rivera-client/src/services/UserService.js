import { apiUrl, handleResponse } from "./api";

const API_BASE = apiUrl("/users");

const normalize = (value) => String(value ?? "").trim().toLowerCase();

const normalizeUser = (user) => ({
  id: user.id ?? user._id,
  firstName: String(user.firstName ?? "").trim(),
  lastName: String(user.lastName ?? "").trim(),
  age: String(user.age ?? "").trim(),
  gender: normalize(user.gender) || "",
  contactNumber: String(user.contactNumber ?? "").trim(),
  email: normalize(user.email),
  role: user.role ?? user.type ?? "viewer",
  username: normalize(user.username),
  password: String(user.password ?? ""),
  address: String(user.address ?? "").trim(),
  isActive: typeof user.isActive === "boolean" ? user.isActive : true,
});

export const fetchUsers = async () => {
  const response = await fetch(API_BASE);
  const data = await handleResponse(response);
  return Array.isArray(data.users)
    ? data.users.map(normalizeUser)
    : [];
};

export const createUser = async (user) => {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await handleResponse(response);
  return normalizeUser(data);
};

export const updateUser = async (id, user) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await handleResponse(response);
  return normalizeUser(data);
};

export const registerUser = async ({ firstName, lastName, email, password }) => {
  const username = email.split('@')[0];
  
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      username,
      type: "viewer",
      age: "",
      gender: "",
      contactNumber: "",
      address: "",
    }),
  });

  const data = await handleResponse(response);
  return normalizeUser(data);
};

export const loginUser = async ({ email, password }) => {
  const response = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await handleResponse(response);
  return data;
};

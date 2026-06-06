import { apiUrl, apiRequest } from "./api";

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
  const data = await apiRequest(API_BASE);
  return Array.isArray(data.users)
    ? data.users.map(normalizeUser)
    : [];
};

export const createUser = async (user) => {
  const data = await apiRequest(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return normalizeUser(data);
};

export const updateUser = async (id, user) => {
  const data = await apiRequest(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return normalizeUser(data);
};

export const registerUser = async ({ firstName, lastName, email, password }) => {
  const username = email.split('@')[0];

  const data = await apiRequest(API_BASE, {
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

  return normalizeUser(data);
};

export const loginUser = async ({ email, password }) => {
  const data = await apiRequest(`${API_BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return data;
};

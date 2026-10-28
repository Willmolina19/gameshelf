
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Autenticación
export async function loginUser(credentials) {
  const response = await api.post("/auth/login", credentials);
  return response.data;
}

export async function registerUser(userData) {
  const response = await api.post("/auth/register", userData);
  return response.data;
}

// Videojuegos
export async function getGames() {
  const response = await api.get("/games");
  return response.data;
}

export async function getGameById(id) {
  const response = await api.get(`/games/${id}`);
  return response.data;
}

export async function createGame(gameData) {
  const response = await api.post("/games", gameData);
  return response.data;
}

export async function updateGame({ id, gameData }) {
  const response = await api.put(`/games/${id}`, gameData);
  return response.data;
}

export async function deleteGame(id) {
  await api.delete(`/games/${id}`);
}

// Reseñas
export async function getReviews(gameId) {
  const response = await api.get(`/reviews/${gameId}`);
  return response.data;
}

export async function createReview({ gameId, comment }) {
  const response = await api.post(`/reviews/${gameId}`, {
    comment,
  });

  return response.data;
}

export default api;


export const GAME_STATUSES = [
  "pendiente",
  "jugando",
  "completado",
];

export function validateGame(game) {
  if (!game || typeof game !== "object" || Array.isArray(game)) {
    const error = new Error("Datos del videojuego inválidos");
    error.status = 400;
    throw error;
  }

  const { title, genre, platform, status, rating, imageUrl } = game;

  if (
    typeof title !== "string" ||
    !title.trim() ||
    title.trim().length > 150
  ) {
    const error = new Error("El título debe tener entre 1 y 150 caracteres");
    error.status = 400;
    throw error;
  }

  for (const [field, value] of [
    ["genre", genre],
    ["platform", platform],
  ]) {
    if (
      value !== undefined &&
      value !== null &&
      (typeof value !== "string" || value.trim().length > 100)
    ) {
      const error = new Error(
        `${field} debe ser un texto de máximo 100 caracteres`
      );
      error.status = 400;
      throw error;
    }
  }

  const gameStatus = status ?? "pendiente";

  if (!GAME_STATUSES.includes(gameStatus)) {
    const error = new Error("Estado de videojuego inválido");
    error.status = 400;
    throw error;
  }

  if (
    rating !== null &&
    rating !== undefined &&
    (!Number.isInteger(rating) || rating < 0 || rating > 10)
  ) {
    const error = new Error(
      "La calificación debe ser un entero entre 0 y 10"
    );
    error.status = 400;
    throw error;
  }

  // La portada es opcional, pero debe ser una URL HTTP o HTTPS válida.
  let normalizedImageUrl = null;

  if (imageUrl !== undefined && imageUrl !== null && imageUrl !== "") {
    if (typeof imageUrl !== "string" || imageUrl.trim().length > 1000) {
      const error = new Error("La URL de la portada no es válida");
      error.status = 400;
      throw error;
    }

    try {
      const parsedUrl = new URL(imageUrl.trim());

      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        throw new Error("Protocolo no permitido");
      }

      normalizedImageUrl = imageUrl.trim();
    } catch {
      const error = new Error(
        "La portada debe tener una URL HTTP o HTTPS válida"
      );
      error.status = 400;
      throw error;
    }
  }

  return {
    title: title.trim(),
    genre: genre?.trim() || null,
    platform: platform?.trim() || null,
    status: gameStatus,
    rating: rating ?? null,
    imageUrl: normalizedImageUrl,
  };
}

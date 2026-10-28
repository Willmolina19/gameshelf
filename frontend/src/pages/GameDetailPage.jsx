import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getGameById,
  updateGame,
  getReviews,
  createReview,
} from "../services/api";

import GameForm from "../components/GameForm";

export default function GameDetailPage() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [editing, setEditing] = useState(false);
  const [comment, setComment] = useState("");

  const {
    data: game,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["game", id],
    queryFn: () => getGameById(id),
  });

  const {
    data: reviews = [],
    isLoading: reviewsLoading,
    isError: reviewsError,
  } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => getReviews(id),
  });

  const updateMutation = useMutation({
    mutationFn: updateGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["game", id] });
      queryClient.invalidateQueries({ queryKey: ["games"] });
      setEditing(false);
    },
  });

  const reviewMutation = useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", id] });
      setComment("");
    },
  });

  function handleUpdate(gameData) {
    updateMutation.mutate({ id, gameData });
  }

  function handleReview(event) {
    event.preventDefault();

    if (comment.trim().length < 3) return;

    reviewMutation.mutate({
      gameId: id,
      comment: comment.trim(),
    });
  }

  if (isLoading) {
    return (
      <main className="detail-page">
        <p>Cargando videojuego...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="detail-page">
        <p role="alert">Error: {error.message}</p>
        <Link to="/games">Volver a mi biblioteca</Link>
      </main>
    );
  }

  return (
    <main className="detail-page">
      <Link to="/games" className="detail-back">
        ← Volver a mi biblioteca
      </Link>

      <section className="detail-hero">
        <div className="detail-cover">
          {game.imageUrl ? (
            <img
              src={game.imageUrl}
              alt={`Portada de ${game.title}`}
            />
          ) : (
            <div className="detail-cover-placeholder">
              <span>🎮</span>
              <p>Sin portada</p>
            </div>
          )}
        </div>

        <div className="detail-info">
          <span className={`game-status status-${game.status}`}>
            {game.status}
          </span>

          <h1>{game.title}</h1>

          <div className="detail-meta">
            <p><strong>Género:</strong> {game.genre || "Sin género"}</p>
            <p>
              <strong>Plataforma:</strong>{" "}
              {game.platform || "No especificada"}
            </p>
            <p>
              <strong>Calificación:</strong>{" "}
              {game.rating ?? "Sin calificar"}
            </p>
          </div>

          <button
            type="button"
            className="primary-button"
            onClick={() => setEditing(!editing)}
          >
            {editing ? "Cancelar edición" : "Editar videojuego"}
          </button>
        </div>
      </section>

      {editing && (
        <section className="detail-panel detail-edit">
          <h2>Editar videojuego</h2>

          <GameForm
            initialData={game}
            onSubmit={handleUpdate}
            isSubmitting={updateMutation.isPending}
          />

          {updateMutation.isError && (
            <p role="alert">
              {updateMutation.error.response?.data?.message ||
                "No se pudo actualizar el videojuego"}
            </p>
          )}
        </section>
      )}

      <section className="detail-panel">
        <div className="detail-section-heading">
          <h2>Reseñas</h2>
          <span className="collection-count">
            {reviews.length} comentarios
          </span>
        </div>

        {reviewsLoading ? (
          <p>Cargando reseñas...</p>
        ) : reviewsError ? (
          <p role="alert">No se pudieron cargar las reseñas.</p>
        ) : reviews.length === 0 ? (
          <p className="detail-muted">
            Este videojuego todavía no tiene reseñas.
          </p>
        ) : (
          <ul className="reviews-list">
            {reviews.map((review) => (
              <li key={review._id} className="review-item">
                <p>{review.comment}</p>
                <small>
                  {new Date(review.createdAt).toLocaleDateString("es-ES")}
                </small>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="detail-panel">
        <h2>Agregar reseña</h2>

        <p className="detail-muted">
          Comparte tu opinión sobre este videojuego.
        </p>

        <form className="review-form" onSubmit={handleReview}>
          <label htmlFor="comment">Tu opinión</label>

          <textarea
            id="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="¿Qué te pareció este videojuego?"
            minLength={3}
            maxLength={1000}
            rows={4}
            required
          />

          <button
            type="submit"
            className="primary-button"
            disabled={reviewMutation.isPending}
          >
            {reviewMutation.isPending
              ? "Publicando..."
              : "Publicar reseña"}
          </button>
        </form>

        {reviewMutation.isError && (
          <p role="alert">
            {reviewMutation.error.response?.data?.message ||
              "No se pudo publicar la reseña"}
          </p>
        )}
      </section>
    </main>
  );
}

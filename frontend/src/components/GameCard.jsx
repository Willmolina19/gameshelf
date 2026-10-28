import { useState } from "react";
import { Link } from "react-router-dom";

export default function GameCard({ game, onDelete }) {
  const [imageError, setImageError] = useState(false);

  const hasCover = Boolean(game.imageUrl) && !imageError;

  const statusLabels = {
    pendiente: "Pendiente",
    jugando: "Jugando",
    completado: "Completado",
  };

  return (
    <article className="game-card">
      <div className="game-cover">
        {hasCover ? (
          <img
            src={game.imageUrl}
            alt={`Portada de ${game.title}`}
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="game-cover-placeholder">
            <span>🎮</span>
            <p>Sin portada</p>
          </div>
        )}
      </div>

      <div className="game-card-content">
        <span className={`game-status status-${game.status}`}>
          {statusLabels[game.status] ?? game.status}
        </span>

        <h3>{game.title}</h3>

        <p>
          <strong>Género:</strong> {game.genre || "Sin género"}
        </p>

        <p>
          <strong>Plataforma:</strong> {game.platform || "No especificada"}
        </p>

        <p>
          <strong>Calificación:</strong>{" "}
          {game.rating !== null && game.rating !== undefined
            ? `⭐ ${game.rating}/10`
            : "Sin calificar"}
        </p>

        <div className="game-card-actions">
          <Link to={`/games/${game.id}`} className="btn-details">
            Ver detalles
          </Link>

          <button
            type="button"
            className="btn-delete"
            onClick={() => onDelete(game.id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
}

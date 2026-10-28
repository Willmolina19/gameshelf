import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getGames,
  createGame,
  deleteGame,
} from "../services/api";

import GameCard from "../components/GameCard";
import GameForm from "../components/GameForm";

export default function GamesPage() {
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: games = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["games"],
    queryFn: getGames,
  });

  const createMutation = useMutation({
    mutationFn: createGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
      setShowForm(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
    },
  });

  function handleCreate(gameData) {
    createMutation.mutate(gameData);
  }

  function handleDelete(id) {
    const confirmed = window.confirm(
      "¿Seguro que deseas eliminar este videojuego?"
    );

    if (confirmed) {
      deleteMutation.mutate(id);
    }
  }

  const totalGames = games.length;
  const playingGames = games.filter(
    (game) => game.status === "jugando"
  ).length;
  const completedGames = games.filter(
    (game) => game.status === "completado"
  ).length;

  return (
    <main className="library-page">
      <section className="library-hero">
        <div>
          <span className="hero-eyebrow">
            TU BIBLIOTECA PERSONAL
          </span>

          <h1>Tus juegos, tu aventura.</h1>

          <p>
            Organiza tu colección, registra tus partidas
            y lleva un seguimiento de tus videojuegos.
          </p>

          <button
            type="button"
            className="primary-button"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancelar" : "+ Agregar videojuego"}
          </button>
        </div>
      </section>

      {showForm && (
        <section className="game-form-section">
          <h2>Nuevo videojuego</h2>
          <p>Completa los datos de tu videojuego.</p>

          <GameForm
            onSubmit={handleCreate}
            isSubmitting={createMutation.isPending}
          />

          {createMutation.isError && (
            <p role="alert" className="error-message">
              {createMutation.error.response?.data?.message ||
                "No se pudo crear el videojuego"}
            </p>
          )}
        </section>
      )}

      {isLoading ? (
        <p className="library-message">
          Cargando videojuegos...
        </p>
      ) : isError ? (
        <p role="alert" className="error-message">
          Error: {error.message}
        </p>
      ) : (
        <>
          <section className="library-stats">
            <div className="stat-card">
              <span>Total de juegos</span>
              <strong>{totalGames}</strong>
              <small>En tu colección</small>
            </div>

            <div className="stat-card">
              <span>Jugando</span>
              <strong>{playingGames}</strong>
              <small>Aventuras en progreso</small>
            </div>

            <div className="stat-card">
              <span>Completados</span>
              <strong>{completedGames}</strong>
              <small>Aventuras terminadas</small>
            </div>
          </section>

          {deleteMutation.isError && (
            <p role="alert" className="error-message">
              {deleteMutation.error.response?.data?.message ||
                "No se pudo eliminar el videojuego"}
            </p>
          )}

          <section className="library-collection">
            <div className="collection-header">
              <div>
                <h2>Mi colección</h2>
                <p>Todos tus videojuegos en un solo lugar.</p>
              </div>

              <span className="collection-count">
                {totalGames} juegos
              </span>
            </div>

            {games.length === 0 ? (
              <div className="library-empty">
                <span>🎮</span>
                <h3>Tu biblioteca está vacía</h3>
                <p>
                  Agrega tu primer videojuego para comenzar.
                </p>
              </div>
            ) : (
              <div className="games-grid">
                {games.map((game) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
}

import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import GameCard from "./GameCard";

describe("GameCard", () => {
  const game = {
    id: 1,
    title: "The Legend of Zelda",
    genre: "Aventura",
    platform: "Nintendo Switch",
    status: "jugando",
    rating: 9,
    imageUrl: "",
  };

  test("muestra el titulo y estado del videojuego", () => {
    render(
      <MemoryRouter>
        <GameCard game={game} onDelete={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText("The Legend of Zelda")).toBeInTheDocument();
    expect(screen.getByText("Jugando")).toBeInTheDocument();
  });

  test("muestra Sin portada cuando no hay imagen", () => {
    render(
      <MemoryRouter>
        <GameCard game={game} onDelete={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText("Sin portada")).toBeInTheDocument();
  });
});

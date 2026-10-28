import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

import { loginUser } from "../services/api";
import { useAuth } from "../hooks/useAuth";

const loginSchema = z.object({
  email: z.email("Introduce un correo válido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const { saveToken } = useAuth();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      saveToken(data.token);
      navigate("/games", { replace: true });
    },
    onError: (error) => {
      setServerError(
        error.response?.data?.message ||
        "No se pudo iniciar sesión"
      );
    },
  });

  function onSubmit(data) {
    setServerError("");
    loginMutation.mutate(data);
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-heading">
          <div className="auth-icon">🎮</div>

          <h1>Bienvenido de nuevo</h1>

          <p>
            Inicia sesión para continuar tu aventura
            y gestionar tu colección.
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-field">
            <label htmlFor="email">Correo electrónico</label>

            <input
              id="email"
              type="email"
              placeholder="tu@email.com"
              autoComplete="email"
              {...register("email")}
            />

            {errors.email && (
              <p role="alert">{errors.email.message}</p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="password">Contraseña</label>

            <input
              id="password"
              type="password"
              placeholder="Introduce tu contraseña"
              autoComplete="current-password"
              {...register("password")}
            />

            {errors.password && (
              <p role="alert">{errors.password.message}</p>
            )}
          </div>

          {serverError && (
            <p role="alert">{serverError}</p>
          )}

          <button
            className="auth-submit"
            type="submit"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending
              ? "Iniciando sesión..."
              : "Iniciar sesión"}
          </button>
        </form>

        <p className="auth-footer">
          ¿Todavía no tienes cuenta?{" "}
          <Link to="/register">Regístrate gratis</Link>
        </p>
      </section>
    </main>
  );
}

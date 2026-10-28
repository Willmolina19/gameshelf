import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

import { registerUser } from "../services/api";

const registerSchema = z.object({
  username: z.string().trim().min(3, "Mínimo 3 caracteres").max(100),
  email: z.email("Introduce un correo válido"),
  password: z.string().min(8, "Mínimo 8 caracteres").max(72),
});

export default function RegisterPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      navigate("/login", {
        replace: true,
        state: {
          message: "Registro exitoso. Ahora inicia sesión.",
        },
      });
    },
    onError: (error) => {
      setServerError(
        error.response?.data?.message ||
          "No se pudo registrar el usuario"
      );
    },
  });

  function onSubmit(data) {
    setServerError("");
    registerMutation.mutate(data);
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-heading">
          <div className="auth-icon">🎮</div>
          <h1>Únete a GameShelf</h1>
          <p>
            Crea tu cuenta y empieza a organizar
            tu colección de videojuegos.
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-field">
            <label htmlFor="username">Nombre de usuario</label>
            <input
              id="username"
              placeholder="Tu nombre de usuario"
              autoComplete="username"
              {...register("username")}
            />
            {errors.username && (
              <p role="alert">{errors.username.message}</p>
            )}
          </div>

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
              placeholder="Mínimo 8 caracteres"
              autoComplete="new-password"
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
            type="submit"
            className="auth-submit"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending
              ? "Registrando..."
              : "Crear cuenta"}
          </button>
        </form>

        <p className="auth-footer">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login">Inicia sesión</Link>
        </p>
      </section>
    </main>
  );
}

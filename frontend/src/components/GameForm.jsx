import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const gameSchema = z.object({
  title: z.string().trim().min(1, "El título es obligatorio").max(150),
  genre: z.string().trim().max(100),
  platform: z.string().trim().max(100),
  status: z.enum(["pendiente", "jugando", "completado"]),
  rating: z.union([
    z.literal(""),
    z.coerce.number().int().min(0).max(10),
  ]),
  imageUrl: z.union([
    z.literal(""),
    z.url("Introduce una URL válida")
      .refine(
        (url) => url.startsWith("http://") || url.startsWith("https://"),
        "La URL debe comenzar con http:// o https://"
      )
      .max(1000, "La URL es demasiado larga"),
  ]),
});

export default function GameForm({
  initialData,
  onSubmit,
  isSubmitting = false,
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(gameSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      genre: initialData?.genre ?? "",
      platform: initialData?.platform ?? "",
      status: initialData?.status ?? "pendiente",
      rating: initialData?.rating ?? "",
      imageUrl: initialData?.imageUrl ?? "",
    },
  });

  const imageUrl = watch("imageUrl");

  function submitForm(data) {
    onSubmit({
      ...data,
      rating: data.rating === "" ? null : Number(data.rating),
      imageUrl: data.imageUrl.trim() || null,
    });
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div>
        <label htmlFor="title">Título</label>
        <input id="title" {...register("title")} />
        {errors.title && <p role="alert">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="genre">Género</label>
        <input id="genre" {...register("genre")} />
        {errors.genre && <p role="alert">{errors.genre.message}</p>}
      </div>

      <div>
        <label htmlFor="platform">Plataforma</label>
        <input id="platform" {...register("platform")} />
        {errors.platform && <p role="alert">{errors.platform.message}</p>}
      </div>

      <div>
        <label htmlFor="status">Estado</label>
        <select id="status" {...register("status")}>
          <option value="pendiente">Pendiente</option>
          <option value="jugando">Jugando</option>
          <option value="completado">Completado</option>
        </select>
        {errors.status && <p role="alert">{errors.status.message}</p>}
      </div>

      <div>
        <label htmlFor="rating">Calificación (0–10)</label>
        <input
          id="rating"
          type="number"
          min="0"
          max="10"
          step="1"
          {...register("rating")}
        />
        {errors.rating && <p role="alert">{errors.rating.message}</p>}
      </div>

      <div>
        <label htmlFor="imageUrl">URL de la portada (opcional)</label>
        <input
          id="imageUrl"
          type="url"
          placeholder="https://ejemplo.com/portada.jpg"
          {...register("imageUrl")}
        />
        {errors.imageUrl && (
          <p role="alert">{errors.imageUrl.message}</p>
        )}
      </div>

      {imageUrl && !errors.imageUrl && (
        <div>
          <p>Vista previa de la portada:</p>
          <img
            src={imageUrl}
            alt="Vista previa de la portada"
            style={{
              width: "140px",
              height: "190px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </div>
      )}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? "Guardando..."
          : initialData
            ? "Actualizar videojuego"
            : "Agregar videojuego"}
      </button>
    </form>
  );
}

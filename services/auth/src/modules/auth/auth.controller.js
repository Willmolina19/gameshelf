import { publishUserCreated } from "../../messaging/publisher.js";
import { z } from "zod";
import { registerUser, loginUser } from "./auth.service.js";

const registerSchema = z.object({
  username: z.string().trim().min(3).max(100),
  email: z.email().max(150),
  password: z.string().min(8).max(72),
});

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export async function register(req, res, next) {
  try {
    const validation = registerSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: "Datos de registro inválidos",
        errors: validation.error.flatten(),
      });
    }

    const user = await registerUser(validation.data);
    await publishUserCreated(user);

    return res.status(201).json({
      message: "Usuario registrado correctamente",
      user,
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const validation = loginSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: "Datos de login inválidos",
        errors: validation.error.flatten(),
      });
    }

    const result = await loginUser(validation.data);

    return res.status(200).json({
      message: "Inicio de sesión correcto",
      ...result,
    });
  } catch (error) {
    next(error);
  }
}

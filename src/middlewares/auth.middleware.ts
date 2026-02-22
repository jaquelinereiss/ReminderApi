import { Request, Response, NextFunction } from "express";
import { supabase } from "../lib/supabase.js";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Autenticação não informada" });
  }

  const token = authHeader.replace("Bearer ", "");

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return res.status(401).json({ error: "Autenticação inválida" });
  }

  req.user = {
    id: data.user.id,
    email: data.user.email!,
  };

  next();
}

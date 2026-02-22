import { Router } from "express";
import { supabase } from "../lib/supabase.js";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return res.status(401).json({ error: error.message });
  }

  return res.json({
    access_token: data.session?.access_token,
    user: data.user
  });
});

export default router;

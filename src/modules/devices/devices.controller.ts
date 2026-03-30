import { Request, Response } from "express";
import { supabase } from "../../lib/supabase.js";

export async function registerDevice(req: Request, res: Response) {
  const user_id = req.user?.id;
  const { device_token } = req.body;

  if (!device_token) {
    return res.status(400).json({ error: "device_token obrigatório" });
  }

  const { data, error } = await supabase
    .from("devices")
    .insert({
      user_id,
      device_token
    })
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(201).json(data);
}
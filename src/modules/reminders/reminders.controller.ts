import { Request, Response } from "express";
import {
  createReminder,
  listReminders,
  updateReminder,
  toggleReminder,
  deleteReminder,
} from "./reminders.service.js";

export async function create(req: Request, res: Response) {
  try {
    const user_id = req.user?.id;
  if (!user_id) return res.status(401).json({ error: "Usuário não autenticado" });

    const { title, description, date, time, repeatType, interval } = req.body;

    if (!title || !date || !time) {
      return res.status(400).json({
        error: "title, date e time são obrigatórios",
      });
    }

    const reminder = await createReminder({
      user_id,
      title,
      description,
      date,
      time,
      repeatType,
      interval,
      enabled: true,
    });

    return res.status(201).json(reminder);
  } catch (err: any) {
    return res.status(500).json({
      error: err.message ?? "Erro ao criar lembrete",
    });
  }
}

export async function list(req: Request, res: Response) {
  try {
    const user_id = req.user!.id;
    const reminders = await listReminders(user_id);
    return res.json(reminders);
  } catch (err: any) {
    return res.status(500).json({
      error: err.message ?? "Erro ao listar lembretes",
    });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const user_id = req.user!.id;
    const id = req.params.id as string;
    const { title, description, date, time, repeatType, interval, enabled } =
      req.body;

    const reminder = await updateReminder(id, user_id, {
      title,
      description,
      date,
      time,
      repeatType,
      interval,
      enabled,
    });

    return res.json(reminder);
  } catch (err: any) {
    return res.status(500).json({
      error: err.message ?? "Erro ao atualizar lembrete",
    });
  }
}


export async function toggle(req: Request, res: Response) {
  try {
    const user_id = req.user!.id;
    const id = req.params.id as string;
    const { is_active } = req.body;

    if (typeof is_active !== "boolean") {
      return res.status(400).json({
        error: "is_active deve ser boolean",
      });
    }

    const reminder = await toggleReminder(id, user_id, is_active);
    return res.json(reminder);
  } catch (err: any) {
    return res.status(500).json({
      error: err.message ?? "Erro ao alterar status",
    });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const user_id = req.user!.id;
    const id = req.params.id as string;

    await deleteReminder(id, user_id);
    return res.status(204).send();
  } catch (err: any) {
    return res.status(500).json({
      error: err.message ?? "Erro ao excluir lembrete",
    });
  }
}

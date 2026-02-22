import { supabase } from "../../lib/supabase.js";

type ReminderInput = {
  user_id: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  repeatType?: "once" | "daily" | "interval";
  interval?: number;
  enabled?: boolean;
};

function buildTriggerAt(date: string, time: string) {
  return `${date}T${time}:00`;
}

export async function createReminder(data: ReminderInput) {
  const recurrence =
    data.repeatType === "interval"
      ? `every ${data.interval}h`
      : data.repeatType === "once"
      ? null
      : data.repeatType;

  const trigger_at = buildTriggerAt(data.date, data.time);

  const { data: reminder, error } = await supabase
    .from("reminders")
    .insert({
      user_id: data.user_id,
      title: data.title,
      description: data.description ?? "",
      trigger_at,
      recurrence: recurrence ?? undefined,
      is_active: data.enabled ?? true,
    })
    .select()
    .single();

  if (error) throw error;
  return reminder;
}

export async function listReminders(user_id: string) {
  const { data, error } = await supabase
    .from("reminders")
    .select("*")
    .eq("user_id", user_id)
    .order("trigger_at", { ascending: true });

  if (error) throw error;
  return data;
}

export async function updateReminder(
  id: string,
  user_id: string,
  data: Partial<ReminderInput>
) {
  const fieldsToUpdate: any = {};

  if (data.title !== undefined) fieldsToUpdate.title = data.title;
  if (data.description !== undefined) fieldsToUpdate.description = data.description;
  if (data.date && data.time) fieldsToUpdate.trigger_at = buildTriggerAt(data.date, data.time);

  if (data.repeatType) {
    fieldsToUpdate.recurrence =
      data.repeatType === "interval"
        ? `every ${data.interval}h`
        : data.repeatType === "once"
        ? null
        : data.repeatType;
  }

  if (data.enabled !== undefined) fieldsToUpdate.is_active = data.enabled;

  const { data: reminder, error } = await supabase
    .from("reminders")
    .update(fieldsToUpdate)
    .eq("id", id)
    .eq("user_id", user_id)
    .select()
    .single();

  if (error) throw error;
  return reminder;
}

export async function toggleReminder(
  id: string,
  user_id: string,
  is_active: boolean
) {
  const { data, error } = await supabase
    .from("reminders")
    .update({ is_active })
    .eq("id", id)
    .eq("user_id", user_id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteReminder(id: string, user_id: string) {
  const { error } = await supabase
    .from("reminders")
    .delete()
    .eq("id", id)
    .eq("user_id", user_id);

  if (error) throw error;
}

import cron from "node-cron";
import { supabase } from "../../lib/supabase.js";
import { sendPush } from "../../services/firebase.js";

export function startNotificationScheduler() {
  cron.schedule("* * * * *", async () => {
    console.log("Verificando lembretes...");

    const now = new Date().toISOString();

    const { data: reminders, error } = await supabase
      .from("reminders")
      .select("*")
      .lte("trigger_at", now)
      .eq("is_active", true)
      .is("last_triggered_at", null);

    if (error) {
      console.error("Erro ao buscar lembretes:", error.message);
      return;
    }

    for (const reminder of reminders) {
      try {
        const { data: devices } = await supabase
          .from("devices")
          .select("device_token")
          .eq("user_id", reminder.user_id);

        if (!devices?.length) continue;

        for (const device of devices) {
          await sendPush(
            device.device_token,
            "Lembrete",
            reminder.title
          );
        }

        await supabase
          .from("reminders")
          .update({
            last_triggered_at: new Date().toISOString(),
          })
          .eq("id", reminder.id);

        const recurrence = reminder.recurrence;

        if (recurrence === "daily") {
          const next = new Date(reminder.trigger_at);
          next.setDate(next.getDate() + 1);

          await supabase
            .from("reminders")
            .update({
              trigger_at: next.toISOString(),
              last_triggered_at: null,
            })
            .eq("id", reminder.id);

        } else if (recurrence?.startsWith("every")) {
          const hours = Number(recurrence.replace(/\D/g, ""));
          const next = new Date(reminder.trigger_at);
          next.setHours(next.getHours() + hours);

          await supabase
            .from("reminders")
            .update({
              trigger_at: next.toISOString(),
              last_triggered_at: null,
            })
            .eq("id", reminder.id);

        } else {
          await supabase
            .from("reminders")
            .update({ is_active: false })
            .eq("id", reminder.id);
        }

      } catch (err) {
        console.error("Erro ao processar lembrete:", err);
      }
    }
  });
}
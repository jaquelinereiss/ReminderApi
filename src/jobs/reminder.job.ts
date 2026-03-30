import cron from "node-cron";
import { supabase } from "../lib/supabase.js";
import { sendPush } from "../services/push.service.js";

export function startReminderJob() {

  cron.schedule("* * * * *", async () => {

    const now = new Date().toISOString();

    const { data: reminders } = await supabase
      .from("reminders")
      .select("*")
      .lte("trigger_at", now)
      .eq("is_active", true);

    if (!reminders) return;

    for (const reminder of reminders) {

      const { data: devices } = await supabase
        .from("devices")
        .select("device_token")
        .eq("user_id", reminder.user_id);

      if (!devices) continue;

      for (const device of devices) {

        await sendPush(
          device.device_token,
          reminder.title,
          reminder.description || "Hora do seu lembrete"
        );

      }

    }

  });

}
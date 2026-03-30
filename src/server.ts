import "./env.js";
import app from "./app.js";
import { startReminderJob } from "./jobs/reminder.job.js";
import { initFirebase } from "./services/push.service.js";

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API rodando na porta ${PORT}`);
});

startReminderJob();
initFirebase();
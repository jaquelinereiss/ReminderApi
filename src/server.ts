import "./env.js";
import app from "./app.js";
import { initFirebase } from "./services/firebase.js";
import { startNotificationScheduler } from "./modules/notifications/notification.scheduler.js";

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

initFirebase();

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API rodando na porta ${PORT}`);

  startNotificationScheduler();
});

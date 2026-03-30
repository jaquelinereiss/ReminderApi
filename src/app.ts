import express from "express";
import remindersRoutes from "./modules/reminders/reminders.routes.js";
import authRoutes from "./routes/auth.routes.js";
import devicesRoutes from "./routes/devices/devices.routes.js";

const app = express();

app.use(express.json());
app.use("/devices", devicesRoutes);

app.use((req, res, next) => {
  console.log("REQ:", req.method, req.url);
  next();
});

app.use("/auth", authRoutes);
app.use("/reminders", remindersRoutes);

app.get("/health", (_, res) => {
  res.json({ ok: true });
});

export default app;

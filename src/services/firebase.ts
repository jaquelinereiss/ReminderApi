import admin from "firebase-admin";
import serviceAccount from "../config/firebase-service-account.json" with { type: "json" };

let initialized = false;

export function initFirebase() {
  if (initialized) return;

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });

  initialized = true;

  console.log("Firebase inicializado...");
}

export async function sendPush(
  token: string,
  title: string,
  body: string
) {
  try {
    const message: admin.messaging.Message = {
      token,
      notification: {
        title,
        body,
      },
      android: {
        priority: "high",
        notification: {
          sound: "default",
        },
      },
    };

    const response = await admin.messaging().send(message);

    console.log("Push enviado:", response);
    return response;

  } catch (error: any) {
    console.error("Erro ao enviar push:", error.message);

    if (
      error.code === "messaging/invalid-registration-token" ||
      error.code === "messaging/registration-token-not-registered"
    ) {
      console.warn("Token inválido, remover do banco:", token);
    }

    throw error;
  }
}
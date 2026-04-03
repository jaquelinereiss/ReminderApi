import admin from "firebase-admin";

let initialized = false;

export function initFirebase() {
  if (initialized) return;

  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!privateKey) {
    throw new Error("FIREBASE_PRIVATE_KEY não definida");
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey,
    }),
  });

  console.log("Firebase inicializado...");

  initialized = true;
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
      console.warn("Token inválido:", token);
    }

    throw error;
  }
}
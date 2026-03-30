import admin from "firebase-admin";
import serviceAccount from "../config/firebase-service-account.json" with { type: "json" };

let initialized = false;

export function initFirebase() {

  if (initialized) return;

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
  });

  initialized = true;
}

export async function sendPush(
  token: string,
  title: string,
  body: string
) {

  await admin.messaging().send({
    token,
    notification: {
      title,
      body
    }
  });
}
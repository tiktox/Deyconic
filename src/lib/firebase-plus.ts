import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const PLUS_APP_NAME = "deyconic-plus";

let plusApp: FirebaseApp | undefined;

function getPlusApp(): FirebaseApp {
  if (typeof window === "undefined") {
    throw new Error("Deyconic Plus Firebase can only be initialized in the browser.");
  }

  if (!plusApp) {
    plusApp =
      getApps().find((app) => app.name === PLUS_APP_NAME) ??
      initializeApp(firebaseConfig, PLUS_APP_NAME);
  }

  return plusApp;
}

export function getPlusAuth(): Auth {
  return getAuth(getPlusApp());
}

export function getPlusDb(): Firestore {
  return getFirestore(getPlusApp());
}

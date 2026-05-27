import { type Analytics, initializeAnalytics, isSupported } from "firebase/analytics";
import { type FirebaseApp, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

let firebaseApp: FirebaseApp | null = null;
let analyticsPromise: Promise<Analytics | null> | null = null;

function getOrInitApp(): FirebaseApp {
  if (firebaseApp) return firebaseApp;
  firebaseApp = initializeApp(firebaseConfig);
  return firebaseApp;
}

/**
 * Analytics インスタンスを取得する。初回呼び出し時に初めて Firebase App と
 * Analytics を初期化する(遅延初期化)。
 *
 * 重要: この関数を呼ぶと gtag.js のスクリプト注入と IndexedDB アクセスが発生する。
 * 同意取得前は絶対にこの関数を呼んではいけない。
 */
export function getAnalyticsInstance(): Promise<Analytics | null> {
  if (analyticsPromise) return analyticsPromise;

  analyticsPromise = isSupported().then((supported) => {
    if (!supported) return null;
    const app = getOrInitApp();
    // send_page_view: false で SDK 自動の page_view を抑止し、
    // useRoute 経由の自前 page_view を単一源泉とする
    return initializeAnalytics(app, {
      config: {
        send_page_view: false,
      },
    });
  });

  return analyticsPromise;
}

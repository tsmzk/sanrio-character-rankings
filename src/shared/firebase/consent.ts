import { getAnalyticsInstance } from "./firebase";
import { initializeConsentMode, updateConsent } from "./gtag";

const CONSENT_STORAGE_KEY = "sanrio_analytics_consent";

export type ConsentStatus = "granted" | "denied" | "unset";

export function getConsentStatus(): ConsentStatus {
  if (typeof window === "undefined") return "unset";
  const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  if (value === "granted" || value === "denied") return value;
  return "unset";
}

/**
 * アプリ起動時に呼ぶ。Consent Mode の default を宣言する。
 *
 * 重要: この関数は Analytics の初期化はトリガーしない。
 * 同意済みの場合のみ、別途 getAnalyticsInstance() を呼んで初期化を進める。
 */
export function bootstrapConsentMode(): void {
  const status = getConsentStatus();
  const defaultValue = status === "granted" ? "granted" : "denied";

  initializeConsentMode(defaultValue);

  // 既に granted なら Analytics 初期化を発火させる(リロード時の動線)
  if (status === "granted") {
    getAnalyticsInstance().catch(() => {});
  }
}

/**
 * 同意状態を保存し、Consent Mode と Analytics を更新する。
 * granted の場合は Analytics 初期化が始まる。
 *
 * @returns Analytics 初期化の完了を表す Promise(granted のときのみ意味を持つ)
 */
export function setConsentStatus(status: "granted" | "denied"): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  window.localStorage.setItem(CONSENT_STORAGE_KEY, status);

  updateConsent(status);

  if (status !== "granted") return Promise.resolve();

  // 許可時のみ Analytics 初期化を発火し、完了を待てるよう Promise を返す
  return getAnalyticsInstance()
    .then(() => undefined)
    .catch(() => undefined);
}

/**
 * Google Consent Mode v2 用の gtag スタブ。
 * Firebase Analytics SDK をロードするより前に dataLayer と gtag を初期化し、
 * 同意状態の default を宣言する。
 *
 * Firebase SDK は内部で同じ window.dataLayer を共有するため、
 * SDK 初期化時に既存の consent default が読まれる(これが Consent Mode v2 の標準動線)。
 */

// @types/gtag.js は Gtag 名前空間と global な gtag 変数を提供するが、
// Window.dataLayer の型拡張は含まないため、ここで最小限の augmentation を行う。
// dataLayer は gtag.js 仕様で IArguments を格納する配列。
declare global {
  interface Window {
    dataLayer: IArguments[];
    gtag?: Gtag.Gtag;
  }
}

type ConsentValue = "granted" | "denied";
type ConsentParams = {
  analytics_storage: ConsentValue;
  ad_storage: ConsentValue;
  ad_user_data: ConsentValue;
  ad_personalization: ConsentValue;
};

// gtag 関数は IArguments オブジェクトを dataLayer に push する。
// Firebase 内部の wrapOrCreateGtag は "Must push IArguments object, not an array." と
// 明記しており、Array を push すると将来の gtag.js 実装で consent が読まれない恐れがある。
// そのためアロー関数(arguments 不可)は使わず、body では rest 配列ではなく
// arguments(IArguments)を push する。_args は呼び出しシグネチャを成立させるためだけの
// 宣言で、push には用いない(配列を push しないことで本修正の意図を保つ)。
function gtagStub(..._args: unknown[]): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  // biome-ignore lint/complexity/noArguments: IArguments を push するのが gtag.js 公式仕様(rest 配列では不可)
  window.dataLayer.push(arguments);
}

let initialized = false;

/**
 * Consent Mode の default 状態を宣言する。アプリ起動時に必ず一度だけ呼ぶ。
 * Firebase Analytics SDK の initializeApp / getAnalytics を呼ぶ前に実行すること。
 */
export function initializeConsentMode(defaultStatus: ConsentValue): void {
  if (typeof window === "undefined") return;
  if (initialized) return;
  initialized = true;

  const params: ConsentParams = {
    analytics_storage: defaultStatus,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  };

  gtagStub("consent", "default", params);
}

/**
 * 同意状態を update する。許可ボタン押下時に呼ぶ。
 */
export function updateConsent(status: ConsentValue): void {
  if (typeof window === "undefined") return;
  gtagStub("consent", "update", { analytics_storage: status });
}

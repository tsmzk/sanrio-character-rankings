import { type Analytics, logEvent, setUserProperties } from "firebase/analytics";
import { getConsentStatus } from "./consent";
import { getAnalyticsInstance } from "./firebase";

// Firebase の logEvent は GA4 標準イベントと任意イベントで overload が分かれており、
// 判別共用体をそのまま渡すと型推論が破綻する。共通シグネチャに揃えるために再キャストする。
const logAnyEvent = logEvent as (
  analytics: Analytics,
  eventName: string,
  eventParams?: Record<string, unknown>,
) => void;

/**
 * アプリ全体で送信するイベント名の集約。
 * 計測項目の追加は必ずここに型を足してから行う。
 */
export type AnalyticsEvent =
  | { name: "page_view"; params: { page_path: string; page_title: string } }
  | { name: "search"; params: { search_term: string } }
  | { name: "character_select"; params: { character_id: string; selected_count: number } }
  | { name: "character_deselect"; params: { character_id: string; selected_count: number } }
  | { name: "character_deselect_all"; params: { previous_count: number } }
  | { name: "character_detail_open"; params: { character_id: string } }
  | { name: "year_range_change"; params: { start_year: number; end_year: number } }
  | { name: "intro_modal_dismiss"; params: Record<string, never> }
  | { name: "theme_change"; params: { theme: string } };

export function trackEvent<E extends AnalyticsEvent>(event: E): void {
  if (getConsentStatus() !== "granted") return;
  getAnalyticsInstance()
    .then((analytics) => {
      if (!analytics) return;
      logAnyEvent(analytics, event.name, event.params);
    })
    .catch(() => {});
}

export function setAnalyticsUserProperties(properties: Record<string, string>): void {
  if (getConsentStatus() !== "granted") return;
  getAnalyticsInstance()
    .then((analytics) => {
      if (!analytics) return;
      setUserProperties(analytics, properties);
    })
    .catch(() => {});
}

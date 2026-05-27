import { useCallback, useEffect, useState } from "react";
import { trackEvent } from "../shared/firebase";
import { getCurrentPath, type RoutePath } from "./routePath";

export type { RoutePath } from "./routePath";

const ROUTE_TITLES: Record<RoutePath, string> = {
  "/": "サンリオキャラクターランキング",
  "/privacy": "プライバシーポリシー",
  "/disclaimer": "免責事項",
};

export function useRoute() {
  const [path, setPath] = useState<RoutePath>(getCurrentPath);

  useEffect(() => {
    const handler = () => setPath(getCurrentPath());
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  useEffect(() => {
    trackEvent({
      name: "page_view",
      params: {
        page_path: path,
        page_title: ROUTE_TITLES[path],
      },
    });
  }, [path]);

  const navigate = useCallback((to: RoutePath) => {
    if (typeof window === "undefined") return;
    if (window.location.pathname !== to) {
      window.history.pushState({}, "", to);
    }
    window.scrollTo({ top: 0, behavior: "auto" });
    setPath(to);
  }, []);

  return { path, navigate };
}

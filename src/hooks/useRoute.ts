import { useCallback, useEffect, useState } from "react";

export type RoutePath = "/" | "/privacy" | "/disclaimer";

const KNOWN_ROUTES: RoutePath[] = ["/", "/privacy", "/disclaimer"];

function normalizePath(pathname: string): RoutePath {
  const trimmed = pathname.replace(/\/+$/, "") || "/";
  return (KNOWN_ROUTES as string[]).includes(trimmed) ? (trimmed as RoutePath) : "/";
}

function getCurrentPath(): RoutePath {
  if (typeof window === "undefined") return "/";
  return normalizePath(window.location.pathname);
}

export function useRoute() {
  const [path, setPath] = useState<RoutePath>(getCurrentPath);

  useEffect(() => {
    const handler = () => setPath(getCurrentPath());
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

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

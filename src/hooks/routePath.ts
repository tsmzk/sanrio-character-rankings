export type RoutePath = "/" | "/privacy" | "/disclaimer";

export const KNOWN_ROUTES: RoutePath[] = ["/", "/privacy", "/disclaimer"];

export function normalizePath(pathname: string): RoutePath {
  const trimmed = pathname.replace(/\/+$/, "") || "/";
  return (KNOWN_ROUTES as string[]).includes(trimmed) ? (trimmed as RoutePath) : "/";
}

export function getCurrentPath(): RoutePath {
  if (typeof window === "undefined") return "/";
  return normalizePath(window.location.pathname);
}

import { type ReactNode, useEffect } from "react";
import type { RoutePath } from "../../../hooks";

const NOINDEX_META_ID = "legal-noindex-meta";

type LegalPageLayoutProps = {
  title: string;
  description: string;
  onNavigate: (to: RoutePath) => void;
  children: ReactNode;
};

export function LegalPageLayout({
  title,
  description,
  onNavigate,
  children,
}: LegalPageLayoutProps) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    const descriptionMeta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = descriptionMeta?.getAttribute("content") ?? null;
    descriptionMeta?.setAttribute("content", description);

    const robotsMeta = ensureRobotsMeta();
    robotsMeta.setAttribute("content", "noindex, nofollow");

    return () => {
      document.title = previousTitle;
      if (previousDescription !== null) {
        descriptionMeta?.setAttribute("content", previousDescription);
      }
      robotsMeta.remove();
    };
  }, [title, description]);

  return (
    <main className="flex-1 max-w-3xl mx-auto w-full px-5 pb-12">
      <button
        type="button"
        onClick={() => onNavigate("/")}
        className="inline-flex items-center gap-1 text-sm text-primary hover:underline mb-6"
      >
        ← トップに戻る
      </button>
      <article className="prose prose-sm sm:prose-base dark:prose-invert max-w-none break-words prose-headings:text-balance prose-h1:text-2xl sm:prose-h1:text-3xl prose-h2:text-lg sm:prose-h2:text-2xl bg-base-100/80 backdrop-blur-sm rounded-2xl shadow-lg p-5 sm:p-8">
        {children}
      </article>
    </main>
  );
}

function ensureRobotsMeta(): HTMLMetaElement {
  const existing = document.getElementById(NOINDEX_META_ID);
  if (existing instanceof HTMLMetaElement) return existing;
  const meta = document.createElement("meta");
  meta.id = NOINDEX_META_ID;
  meta.setAttribute("name", "robots");
  document.head.appendChild(meta);
  return meta;
}

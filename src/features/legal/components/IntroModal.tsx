import { useEffect, useId, useRef } from "react";
import type { RoutePath } from "../../../hooks";

type IntroModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (to: RoutePath) => void;
};

export function IntroModal({ isOpen, onClose, onNavigate }: IntroModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  // Body scroll lock while open
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  // Escape to close + simple focus trap
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const root = dialogRef.current;
      if (!root) return;
      const focusable = root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Focus management: focus close button on open, restore previous focus on close
  useEffect(() => {
    if (!isOpen) return;
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const id = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);
    return () => {
      window.clearTimeout(id);
      previouslyFocusedRef.current?.focus?.();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLinkClick = (to: RoutePath) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClose();
    onNavigate(to);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      // Overlay click intentionally does nothing — the user must press 閉じる.
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-[min(480px,90vw)] max-h-[85vh] overflow-y-auto px-6 py-7 sm:px-8 sm:py-8"
      >
        <h2
          id={titleId}
          className="text-lg sm:text-xl font-bold text-pink-600 dark:text-pink-400 mb-2"
        >
          はじめにお読みください
        </h2>

        <div className="text-gray-700 dark:text-gray-200 text-sm sm:text-base leading-relaxed space-y-5">
          <section>
            <h3 className="text-base sm:text-lg font-semibold text-pink-600 dark:text-pink-400 mb-1">
              🌸 サンリオキャラ歴代順位ウォッチへようこそ
            </h3>
            <p>ご利用前に以下の点をご確認ください。</p>
          </section>

          <section className="rounded-xl bg-pink-50 dark:bg-pink-950/30 px-4 py-3">
            <h3 className="text-sm sm:text-base font-semibold text-pink-700 dark:text-pink-300 mb-1">
              ⚠️ 非公式アプリです
            </h3>
            <p>
              本アプリは、サンリオキャラクターのファンによって個人的に制作・運営されている
              <strong className="font-semibold">非公式のファンアプリ</strong>です。
              <strong className="font-semibold">
                株式会社サンリオ様および関係各社とは一切関係ありません。
              </strong>
            </p>
          </section>

          <section className="rounded-xl bg-pink-50 dark:bg-pink-950/30 px-4 py-3">
            <h3 className="text-sm sm:text-base font-semibold text-pink-700 dark:text-pink-300 mb-1">
              📊 データの正確性について
            </h3>
            <p>
              <strong className="font-semibold">
                2015年以前のランキングデータについては、公式サイト以外の情報源を参照しているため、正確性を保証できません。
              </strong>
              誤りが含まれる可能性があることをご了承ください。
              2016年以降のデータは、株式会社サンリオの公式ページに基づいています。
            </p>
          </section>

          <section>
            <h3 className="text-sm sm:text-base font-semibold text-pink-700 dark:text-pink-300 mb-1">
              🔗 詳細について
            </h3>
            <p>
              <a
                href="/privacy"
                onClick={handleLinkClick("/privacy")}
                className="text-pink-600 dark:text-pink-400 underline hover:text-pink-700 dark:hover:text-pink-300"
              >
                プライバシーポリシー
              </a>
              <span className="mx-1 text-gray-400">・</span>
              <a
                href="/disclaimer"
                onClick={handleLinkClick("/disclaimer")}
                className="text-pink-600 dark:text-pink-400 underline hover:text-pink-700 dark:hover:text-pink-300"
              >
                免責事項
              </a>
              もあわせてご確認ください。
            </p>
          </section>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-semibold text-sm sm:text-base shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800 transition-colors"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}

import type React from "react";
import type { RoutePath } from "../../../hooks";
import { useConsentBanner } from "../hooks/useConsentBanner";

type AnalyticsConsentBannerProps = {
  onNavigate: (to: RoutePath) => void;
};

export function AnalyticsConsentBanner({ onNavigate }: AnalyticsConsentBannerProps) {
  const { isVisible, grant, deny } = useConsentBanner();

  if (!isVisible) return null;

  const handlePrivacyClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigate("/privacy");
  };

  return (
    <section
      aria-label="アクセス解析の同意"
      className="fixed bottom-0 inset-x-0 z-[60] p-3 sm:p-4 pointer-events-none"
    >
      <div className="pointer-events-auto mx-auto w-full max-w-3xl rounded-2xl bg-white dark:bg-gray-800 shadow-xl ring-1 ring-pink-100 dark:ring-pink-900/40 px-5 py-4 sm:px-6 sm:py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5">
          <div className="flex-1 text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
            <h2 className="text-sm sm:text-base font-semibold text-pink-600 dark:text-pink-400 mb-1">
              🍓 アクセス解析にご協力ください
            </h2>
            <p>
              サービス改善のため Google Analytics
              を利用しています。収集データは匿名化されており、個人を特定するものではありません。詳しくは
              <a
                href="/privacy"
                onClick={handlePrivacyClick}
                className="text-pink-600 dark:text-pink-400 underline hover:text-pink-700 dark:hover:text-pink-300 mx-0.5"
              >
                プライバシーポリシー
              </a>
              をご覧ください。
            </p>
          </div>

          <div className="mt-4 sm:mt-0 flex flex-row-reverse sm:flex-row gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                void grant().catch(() => {});
              }}
              className="flex-1 sm:flex-none px-5 py-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-semibold text-sm shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800 transition-colors"
            >
              許可する
            </button>
            <button
              type="button"
              onClick={deny}
              className="flex-1 sm:flex-none px-5 py-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800 transition-colors"
            >
              拒否する
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

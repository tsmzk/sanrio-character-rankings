import type { RoutePath } from "../../../../hooks";

type AppFooterProps = {
  currentPath: RoutePath;
  onNavigate: (to: RoutePath) => void;
};

export function AppFooter({ currentPath, onNavigate }: AppFooterProps) {
  return (
    <footer className="mt-auto border-t border-base-300/60 bg-base-100/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto w-full px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm opacity-80">
        <p>© サンリオキャラ歴代順位ウォッチ（非公式ファンアプリ）</p>
        <nav className="flex items-center gap-4">
          <FooterLink path="/privacy" currentPath={currentPath} onNavigate={onNavigate}>
            プライバシーポリシー
          </FooterLink>
          <FooterLink path="/disclaimer" currentPath={currentPath} onNavigate={onNavigate}>
            免責事項
          </FooterLink>
        </nav>
      </div>
    </footer>
  );
}

type FooterLinkProps = {
  path: RoutePath;
  currentPath: RoutePath;
  onNavigate: (to: RoutePath) => void;
  children: React.ReactNode;
};

function FooterLink({ path, currentPath, onNavigate, children }: FooterLinkProps) {
  const isActive = currentPath === path;
  return (
    <a
      href={path}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
        event.preventDefault();
        onNavigate(path);
      }}
      className={`hover:underline transition-colors ${
        isActive ? "text-primary font-medium" : "text-base-content"
      }`}
    >
      {children}
    </a>
  );
}

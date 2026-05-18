import type { RoutePath } from "../../../hooks";
import { LegalPageLayout } from "./LegalPageLayout";

type PrivacyPolicyPageProps = {
  onNavigate: (to: RoutePath) => void;
};

export function PrivacyPolicyPage({ onNavigate }: PrivacyPolicyPageProps) {
  return (
    <LegalPageLayout
      title="プライバシーポリシー | サンリオキャラ歴代順位ウォッチ"
      description="サンリオキャラ歴代順位ウォッチ（非公式ファンアプリ）のプライバシーポリシーです。"
      onNavigate={onNavigate}
    >
      <h1>プライバシーポリシー</h1>
      <p>
        本ポリシーは、「サンリオキャラ歴代順位ウォッチ」（以下「本アプリ」といいます）における利用者の個人情報の取り扱いについて定めるものです。
      </p>

      <h2>1. 取得する情報</h2>
      <p>
        本アプリは、利用者の氏名・メールアドレス等の個人を特定できる情報を取得することはありません。
      </p>
      <p>
        ただし、本アプリはGoogle社が提供するホスティングサービス「Firebase
        Hosting」を利用しており、同サービスにおいて、サーバーアクセスログ（IPアドレス、ブラウザの種類、アクセス日時等）が自動的に記録される場合があります。これらの情報の取り扱いについては、Google社のプライバシーポリシーに準じます。
      </p>
      <ul>
        <li>
          Firebaseのプライバシー情報:{" "}
          <a
            href="https://firebase.google.com/support/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://firebase.google.com/support/privacy
          </a>
        </li>
        <li>
          Googleプライバシーポリシー:{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            https://policies.google.com/privacy
          </a>
        </li>
      </ul>

      <h2>2. Cookieについて</h2>
      <p>本アプリでは、利用者を識別するためのCookieは使用していません。</p>

      <h2>3. アクセス解析ツール</h2>
      <p>
        本アプリでは、現時点でアクセス解析ツール（Google
        Analytics等）は使用していません。今後導入する場合は、本ポリシーを改定のうえお知らせします。
      </p>

      <h2>4. 第三者提供</h2>
      <p>法令に基づく場合を除き、利用者の情報を本人の同意なく第三者に提供することはありません。</p>

      <h2>5. お問い合わせ</h2>
      <p>
        本ポリシーに関するお問い合わせは、X（旧Twitter）の公式アカウントのDMよりお願いいたします。
      </p>
      <ul>
        <li>X アカウント：https://x.com/SanrioRankFun</li>
      </ul>

      <h2>6. 改定</h2>
      <p>
        本ポリシーは、必要に応じて改定することがあります。改定後の内容は本ページに掲載した時点から効力を生じるものとします。
      </p>

      <p>最終更新日：2026年5月18日</p>
    </LegalPageLayout>
  );
}

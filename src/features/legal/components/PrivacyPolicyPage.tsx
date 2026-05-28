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

      <h2>2. Cookie・ブラウザストレージについて</h2>
      <p>
        本アプリでは、後述のアクセス解析ツール（Google Analytics for
        Firebase）が利用状況の計測のために匿名の識別子をCookieまたはブラウザストレージに保存することがあります。これらは利用者個人を特定するものではありません。
      </p>
      <p>
        また、ご利用環境の改善のため、ブラウザのlocalStorageに以下の情報を保存することがあります。
      </p>
      <ul>
        <li>初回アクセス時のお知らせ表示の既読状態</li>
        <li>選択中のキャラクターおよび表示年範囲などのアプリ設定</li>
        <li>テーマ（ライト／ダーク）の選択状態</li>
      </ul>
      <p>
        これらの情報はお使いのブラウザ内にのみ保存され、運営者やその他第三者に送信されることはありません。ブラウザの設定からいつでも削除できます。
      </p>

      <h2>3. アクセス解析ツール</h2>
      <p>
        本アプリでは、サービス改善および利用状況の分析を目的として、Google社が提供するアクセス解析ツール「Google
        Analytics for Firebase」を利用しています。
      </p>
      <p>当ツールにより、以下のような情報が自動的に収集される場合があります。</p>
      <ul>
        <li>
          イベント情報（ページの閲覧、キャラクターの選択／詳細表示、年範囲の変更、検索、テーマ切り替え等の操作）
        </li>
        <li>デバイス情報（OS、ブラウザの種類、画面サイズ、言語設定など）</li>
        <li>おおまかな地域情報（IPアドレスから推定される国・都市レベル）</li>
        <li>計測用のCookie、ブラウザ識別子、モバイル端末識別子（IDFV等）</li>
      </ul>
      <p>
        収集された情報はGoogle社のプライバシーポリシーに基づいて管理され、本アプリの改善以外の目的では使用しません。詳細および無効化の方法については、以下をご参照ください。
      </p>
      <ul>
        <li>
          Google Analyticsの利用規約:{" "}
          <a
            href="https://marketingplatform.google.com/about/analytics/terms/jp/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://marketingplatform.google.com/about/analytics/terms/jp/
          </a>
        </li>
        <li>
          Googleによるデータ使用について:{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://policies.google.com/technologies/partner-sites
          </a>
        </li>
        <li>
          Google アナリティクス オプトアウト アドオン:{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout?hl=ja"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://tools.google.com/dlpage/gaoptout?hl=ja
          </a>
        </li>
      </ul>
      <p>
        計測を望まれない場合は、ブラウザの設定でCookieを無効にする、もしくは上記のオプトアウトアドオンをインストールすることで無効化できます。
      </p>

      <h2>4. アクセス解析の同意について</h2>
      <p>
        本アプリでは、はじめてアクセスされた際に画面下部に同意バナーを表示し、アクセス解析の利用について「許可する／拒否する」のいずれかをお選びいただけます。
      </p>
      <ul>
        <li>
          <strong>許可する</strong>を選んだ場合のみ、Google Analytics
          への計測データの送信を行います。
        </li>
        <li>
          <strong>拒否する</strong>
          を選んだ場合、または同意の選択前は、計測データは一切送信されません。
        </li>
      </ul>
      <p>
        さらに本アプリでは、<strong>同意していただくまでの間は</strong>、Google
        Analyticsの計測スクリプト（gtag.js）の読み込み自体を行いません。同意前はCookieの発行やブラウザ内のデータベース（IndexedDB）へのアクセスも行わず、計測のための仕組みが一切起動しない設計になっています。
      </p>
      <p>
        また、Googleの「同意モード（Consent
        Mode）」に対応しており、お選びいただいた同意状態がGoogleへ適切に伝達されます。
      </p>
      <p>
        選択結果はお使いのブラウザのlocalStorage（キー名：
        <code>sanrio_analytics_consent</code>
        ）に保存されます。一度ご選択いただいた後は同意バナーは表示されません。
      </p>
      <p>
        後から選択を変更されたい場合は、お手数ですがブラウザの設定から本サイトのlocalStorageを削除してください。次回アクセス時に同意バナーが再表示され、改めて選択いただけます。設定画面からの変更機能は今後対応予定です。
      </p>

      <h2>5. 第三者提供</h2>
      <p>法令に基づく場合を除き、利用者の情報を本人の同意なく第三者に提供することはありません。</p>

      <h2>6. お問い合わせ</h2>
      <p>
        本ポリシーに関するお問い合わせは、X（旧Twitter）の公式アカウントのDMよりお願いいたします。
      </p>
      <ul>
        <li>X アカウント：https://x.com/SanrioRankFun</li>
      </ul>

      <h2>7. 改定</h2>
      <p>
        本ポリシーは、必要に応じて改定することがあります。改定後の内容は本ページに掲載した時点から効力を生じるものとします。
      </p>

      <p>最終更新日：2026年5月27日</p>
    </LegalPageLayout>
  );
}

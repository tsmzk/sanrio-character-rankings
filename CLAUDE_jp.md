# サンリオキャラクターランキング

React 19 + TypeScript + Vite のアプリで、サンリオキャラクターのランキング推移を可視化します。スタイリングは Tailwind CSS + daisyUI。

プロジェクト概要は @README.md、スクリプト一覧は @package.json を参照。

## コマンド

- `npm run dev` — 開発サーバー起動
- `npm run build` — 型チェック（`tsc -b`）とビルド
- `npm run lint` — ESLint
- `npm run check` — Biome のチェック + 自動修正（Prettier は使わない）
- `npm run test` / `npm run test:run` — Vitest（watch / 単発）
- `npm run storybook` — Storybook（ポート 6006）

## コード規約

- **呼び出し側での `try`/`catch` 禁止。** エラーは戻り値、フックのエラー状態（`{ data, loading, error }`）、Promise の `.catch` で表現する。例外を投げる API（例: `JSON.parse`）は、`src/shared/utils/safeJsonParse.ts` のような共通ヘルパー内に閉じ込める。新しく `try`/`catch` を書く前に、既存ヘルパーの再利用・拡張を検討する。
- **スタイリングは Tailwind + daisyUI。** CSS Modules は使っていない。`*.module.css` を新設しない。
- **テーマ切り替え**は `<html>` の `data-theme` 属性と CSS カスタムプロパティで行う。コンポーネント内で `matchMedia` を直接叩かず、既存の `ThemeContext` からテーマを取得する。

## ワークフロー

- タスク完了宣言の前に `npm run check` と `npm run build` を通す（型チェックは build 側で行われる）。
- UI 変更は `npm run dev` で実際にブラウザ確認する。型チェックやスナップショットだけでは不十分。
- 反復中はフルスイートよりも単一テストを流す（`npm run test:run -- path/to/file`）。

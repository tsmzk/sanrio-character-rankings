# サンリオキャラクター人気ランキング

サンリオキャラクターの人気ランキングを可視化するインタラクティブなWebアプリケーションです。

## 🌟 主な機能

- 📊 **インタラクティブチャート**: Chart.jsを使用したランキングデータの可視化
- 🎨 **デュアルテーマ**: ライトモード・ダークモード対応
- ✨ **キャラクター選択**: 複数キャラクターの比較表示
- 🔍 **年代フィルタ**: 特定年代のデータに絞り込み表示
- 📱 **レスポンシブデザイン**: PC・スマートフォン両対応
- 🎭 **キャラクター詳細**: 各キャラクターの詳細情報表示

## 🛠 使用技術

- **React 19** + **TypeScript** - モダンなUI開発
- **Vite** - 高速な開発・ビルド環境
- **Chart.js** + **react-chartjs-2** - データ可視化
- **CSS Modules** - コンポーネントスコープのスタイリング
- **ESLint** - コード品質管理

## 🚀 セットアップ・実行

### 必要な環境
- Node.js 18.0.0 以上
- npm または yarn

### インストール・実行手順

```bash
# リポジトリをクローン
git clone [このリポジトリのURL]
cd sanrio-character-rankings

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

### 利用可能なコマンド

```bash
# 開発サーバー起動（ホットリロード付き）
npm run dev

# プロダクションビルド
npm run build

# コードリント実行
npm run lint

# プロダクションビルドのプレビュー
npm run preview
```

## 📁 プロジェクト構成

```
src/
├── components/          # UIコンポーネント
│   ├── CharacterSelector/   # キャラクター選択UI
│   ├── RankingChart/       # ランキングチャート
│   ├── FilterControls/     # フィルタコントロール
│   ├── CharacterDetail/    # キャラクター詳細
│   └── ThemeToggle/        # テーマ切替ボタン
├── hooks/              # カスタムフック
│   ├── useRankingData.ts   # データ取得・管理
│   ├── useCharacterSelection.ts # キャラクター選択状態
│   ├── useChartConfig.ts   # チャート設定
│   └── useTheme.ts        # テーマ管理
├── contexts/           # Reactコンテキスト
│   └── ThemeContext.tsx   # テーマ状態管理
├── services/           # データサービス層
│   └── dataService.ts     # データ取得・キャッシュ
├── data/              # 静的データ
│   ├── characters.json    # キャラクター情報
│   └── rankings.json     # ランキングデータ
├── utils/             # ユーティリティ関数
├── types/             # TypeScript型定義
└── styles/            # グローバルスタイル
```

## 📊 データについて

- データ収集中

## 🎨 テーマシステム

- **自動検出**: システムの`prefers-color-scheme`設定を自動認識
- **手動切替**: ヘッダーのトグルボタンで任意に切替可能
- **永続化**: ローカルストレージに設定を保存

## 🔧 開発者向け情報

### アーキテクチャパターン
- **カスタムフック**: ビジネスロジックの分離
- **コンテキストAPI**: グローバル状態管理
- **サービス層**: データアクセスの抽象化
- **CSS Modules**: スタイルのスコープ化

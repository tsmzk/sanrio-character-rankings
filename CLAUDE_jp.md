# サンリオキャラクターランキング - 開発ガイド

デュアルテーマシステム（ライト・ダークモード）を備えたサンリオキャラクターのランキング動向を視覚化するインタラクティブなReact TypeScriptアプリケーション。

## クイックスタートコマンド

```bash
# 開発サーバー
npm run dev

# TypeScriptコンパイルを含むプロダクションビルド
npm run build

# コードリンティング
npm run lint

# プロダクションビルドのプレビュー
npm run preview
```

## コーディング規約

### エラーハンドリングルール
- **禁止事項**: このコードベースではtry-catch文を使用してはいけません
- **理由**: クリーンコードアーキテクチャは明示的なエラーハンドリングパターンに依存します
- **代替手段**: 関数の戻り値、エラー状態管理、Promiseチェーンを使用してください
- **強制**: 既存のコードからすべてのtry-catchブロックを削除する必要があります

## アーキテクチャ概要

### コア技術スタック
- **React 19** with TypeScript - モダンなコンポーネントアーキテクチャ用
- **Vite** - 高速開発と最適化されたビルド用
- **Chart.js + react-chartjs-2** - インタラクティブなデータ視覚化用
- **CSS Modules** - コンポーネントスコープのスタイリング用
- **ESLint** with TypeScript統合 - コード品質管理用

### 主要なアーキテクチャパターン

#### 1. カスタムフックによるビジネスロジック抽出
すべてのステートフルロジックは、コンポーネントから専用フックに抽出されています：

```typescript
// エラーハンドリングとキャッシングを備えたデータ読み込み
const { characters, rankings, loading, error } = useRankingData();

// 複数キャラクター選択状態管理
const { selectedCharacters, toggleCharacter, isSelected } = useCharacterSelection();

// テーマ・データに基づく動的チャート設定
const chartConfig = useChartConfig(selectedCharacters, theme);

// localStorageの永続化とシステム設定検出を備えたテーマ切り替え
const { theme, setTheme, toggleTheme } = useTheme();
```

#### 2. 静的クラスキャッシングを使用したサービス層パターン
`DataService`は、組み込みメモリキャッシングを備えた効率的なデータ読み込みを実装：

```typescript
// 静的メソッドとプライベートキャッシュを使ったシングルトンパターン
export class DataService {
  private static charactersCache: Character[] | null = null;
  private static rankingsCache: RankingEntry[] | null = null;
  
  static async loadCharacters(): Promise<Character[]> {
    if (this.charactersCache) return this.charactersCache;
    // データの読み込みとキャッシュ...
  }
}
```

#### 3. コンテキストベースのテーマアーキテクチャ
テーマシステムは、CSSカスタムプロパティを使用したReact Contextを使用：

- **コンテキスト層**: `ThemeContext`がテーマ状態とlocalStorageの永続化を管理
- **CSS層**: `themes.css`が包括的なCSSカスタムプロパティシステムを定義
- **自動検出**: 初期テーマ選択で`prefers-color-scheme`を尊重
- **リアルタイム切り替え**: DOM属性`data-theme`が即座の視覚的更新をトリガー

```typescript
// システム設定検出を備えたテーマプロバイダー
const [theme, setTheme] = useState<ThemeType>(() => {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme) return savedTheme;
  
  // システム設定へのフォールバック
  return window.matchMedia('(prefers-color-scheme: dark)').matches 
    ? 'dark' : 'light';
});
```

#### 4. ユーティリティファーストデータ処理
データ操作のための純粋関数の分離：

- **DataProcessor**: 年フィルタリング、ランキング計算、トレンド分析
- **ChartHelpers**: Chart.js設定生成、カラー管理
- **ThemeUtils**: テーマ対応スタイリングユーティリティ

#### 5. バレルエクスポートパターン
`index.ts`ファイルを通じた整理されたモジュールエクスポート：

```typescript
// src/components/index.ts
export { CharacterSelector } from './CharacterSelector';
export { RankingChart } from './RankingChart';
// ... クリーンなコンポーネントインポート

// src/hooks/index.ts  
export { useRankingData } from './useRankingData';
export { useCharacterSelection } from './useCharacterSelection';
// ... 整理されたフックエクスポート
```

## データフローアーキテクチャ

### プライマリデータフロー
1. **App.tsx** が`useRankingData()`を通じてすべてのデータ読み込みを統制
2. **サービス層** (`DataService`) がキャッシュされたデータアクセスを提供
3. **コンポーネント** がpropsを通じてフィルタされたデータを受信
4. **カスタムフック** がコンポーネント固有の状態変換を管理

### キャラクター選択フロー
```
ユーザーがキャラクター選択 → useCharacterSelection フックが状態更新 → 
App.tsx が更新された選択を受信 → コンポーネントが新しいデータで再レンダリング
```

### テーマ切り替えフロー
```
ユーザーがテーマ切り替え → ThemeContext 更新 → document.documentElement.setAttribute() → 
CSSカスタムプロパティ切り替え → すべてのコンポーネントが即座に再スタイル
```

### チャートデータ変換
```
生ランキングデータ → DataProcessor.filterByYearRange() → 
ChartHelpers.generateDatasets() → Chart.js設定 → RankingChartレンダリング
```

## コンポーネントアーキテクチャパターン

### CSS Modules統合
各コンポーネントは一貫したCSS Moduleパターンに従います：

```typescript
import styles from './ComponentName.module.css';

export function ComponentName() {
  return <div className={styles.container}>...</div>;
}
```

### テーマ対応コンポーネント
コンポーネントはコンテキストを通じてテーマにアクセスし、条件付きスタイリングを適用：

```typescript
const { theme } = useTheme();

<button 
  className={`${styles.button} ${theme === 'dark' ? styles.dark : styles.light}`}
>
```

### レスポンシブデザインパターン
CSSカスタムプロパティを使用したモバイルファーストレスポンシブデザイン：

```css
.component {
  /* モバイルスタイル */
  width: 100%;
  
  /* デスクトップブレークポイント */
  @media (min-width: 768px) {
    width: 50%;
  }
}
```

## テーマシステムアーキテクチャ

### CSSカスタムプロパティ戦略
CSSカスタムプロパティを使用した2つの完全なテーマ定義：

```css
/* ライトテーマ */
:root,
html[data-theme="light"] {
  --color-primary: #ffffff;
  --color-accent: #ff6b9d;
  --color-bg-body: #fef7ff;
}

/* ダークテーマ */
html[data-theme="dark"] {
  --color-primary: #000000;
  --color-accent: #9b51e0;
  --color-bg-body: #000000;
}
```

### テーマコンテキスト実装
- **状態管理**: localStorageの永続化を備えたReact Context
- **システム統合**: `prefers-color-scheme`の自動検出
- **DOM操作**: 直接的な`data-theme`属性更新
- **トランジション効果**: スムーズなテーマ切り替えのためのCSSトランジション

### テーマ固有の視覚効果
ダークテーマには特別な視覚的拡張が含まれます：
- グロー効果: `--dark-glow`, `--dark-border-glow`
- 拡張されたシャドウと境界線
- 異なるスクロールバースタイリング

## 開発パターン

### TypeScript統合
集中化された型定義を持つ包括的な型システム：

```typescript
// src/types/character.ts
export interface Character {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  debutYear: number;
  color: string;
}

// src/types/ranking.ts
export interface RankingEntry {
  characterId: string;
  year: number;
  rank: number;
  votes?: number;
}
```

### エラーハンドリング戦略
- サービス層がtry-catchブロックでデータ読み込みをラップ
- カスタムフックがコンポーネントにエラー状態を提供
- 未処理エラー用のアプリレベルエラーバウンダリ
- スケルトンUIを使用した優雅な読み込み状態

### パフォーマンス最適化
- **データキャッシング**: サービス層が静的キャッシングを実装
- **コンポーネントメモ化**: 高コストな計算に対する`useMemo`の戦略的使用
- **遅延読み込み**: 適用可能な場合の動的インポート
- **バンドル最適化**: Viteの組み込みツリーシェイキングとコード分割

## ファイル組織原則

### 機能ベースのコンポーネント構造
```
components/
├── CharacterDetail/     # 機能完全なコンポーネントモジュール
│   ├── CharacterDetail.tsx
│   ├── CharacterDetail.module.css
│   └── index.ts        # バレルエクスポート
```

### 関心の分離
- **`/components`**: CSS modulesを使用した純粋なUIコンポーネント
- **`/hooks`**: ビジネスロジックと状態管理
- **`/services`**: データ取得とキャッシング層
- **`/utils`**: 純粋関数とヘルパー
- **`/contexts`**: グローバル状態管理
- **`/types`**: TypeScript型定義
- **`/styles`**: グローバルCSSとテーマ定義
- **`/data`**: 静的JSONデータファイル

### インポート組織
すべてのファイルで一貫したインポート順序：
1. Reactインポート
2. 外部ライブラリインポート  
3. 内部コンポーネント/フックインポート
4. 型インポート（`type`キーワードを使用）
5. CSSインポート

## 重要な開発ノート

### Chart.js統合の詳細
- React統合用の`react-chartjs-2`ラッパーを使用
- `useChartConfig`フックを通じたカスタムチャート設定
- キャラクターデータに基づく動的カラー生成
- コンテナクエリを使用したレスポンシブチャートサイジング

### 日本語サポート
- 日本語キャラクター名と説明用のUTF-8エンコーディング
- 日本語テキストレンダリング用の適切なフォント読み込み
- 一貫した日本語/英語デュアル命名規則

### テーマシステムデバッグ
視覚的インジケータを備えた組み込みテーマデバッグ：
- 角のバッジが開発中のアクティブテーマを表示
- テーマ変更用のコンソールログ
- トラブルシューティング用のDOM属性検査

### Vite固有の設定
- ビルドプロセス前のTypeScriptコンパイル
- 最適パフォーマンス用のモダンJavaScript出力
- 高速開発サイクル用のホットモジュールリプレースメント（HMR）
- 最適化されたアセット処理とバンドリング

### データ構造の前提
- キャラクターIDは年間を通して安定
- ランキングデータはすべての年で完全
- カラーコードは有効なCSSカラー値
- キャラクター名はUnicode（日本語）文字をサポート

このアーキテクチャは、明確な関心の分離、型安全性、一貫したパターンを通じて保守性を促進し、効率的なデータ管理とレスポンシブデザインを通じてスムーズなユーザーエクスペリエンスを提供します。
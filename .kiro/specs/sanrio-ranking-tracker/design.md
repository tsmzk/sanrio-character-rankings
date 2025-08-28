# Design Document

## Overview

サンリオキャラクターランキング推移比較サイトは、future-basedアーキテクチャを採用したReact + TypeScriptベースのSPA（Single Page Application）として構築します。Chart.jsを使用してインタラクティブなグラフを実装し、レスポンシブデザインでモバイル対応も行います。データは静的JSONファイルで管理し、高速なレスポンスを実現します。コンポーネント開発にはStorybookを活用します。

## Architecture

### Future-based Architecture
```
Frontend (React + TypeScript)
├── src/
│   ├── components/
│   │   ├── CharacterSelector/
│   │   │   ├── CharacterSelector.tsx
│   │   │   ├── CharacterSelector.stories.tsx
│   │   │   └── CharacterSelector.module.css
│   │   ├── RankingChart/
│   │   ├── CharacterDetail/
│   │   └── FilterControls/
│   ├── hooks/
│   │   ├── useRankingData.ts
│   │   ├── useCharacterSelection.ts
│   │   └── useChartConfig.ts
│   ├── services/
│   │   ├── dataService.ts
│   │   └── chartService.ts
│   ├── types/
│   │   ├── character.ts
│   │   └── ranking.ts
│   ├── utils/
│   │   ├── dataProcessor.ts
│   │   └── chartHelpers.ts
│   └── data/
│       ├── characters.json
│       └── rankings.json
├── .storybook/
└── stories/
```

### 技術スタック
- **Frontend Framework**: React 18 + TypeScript
- **Chart Library**: Chart.js + react-chartjs-2
- **Styling**: CSS Modules + Responsive Design
- **State Management**: Custom Hooks + Context API
- **Build Tool**: Vite
- **Component Development**: Storybook
- **Data Format**: Static JSON Files
- **Architecture Pattern**: Future-based Architecture

## Components and Interfaces

### Core Data Types
```typescript
interface Character {
  id: string;
  name: string;
  nameEn?: string;
  description: string;
  imageUrl?: string; // オプショナル（著作権対応）
  debutYear: number;
  category: string;
  color: string; // グラフ表示用の代表色
}

interface RankingEntry {
  year: number;
  rank: number;
  characterId: string;
}

interface RankingData {
  characters: Character[];
  rankings: RankingEntry[];
}
```

### Main Components

#### CharacterSelector
- キャラクター一覧の表示
- 検索・フィルタリング機能
- 複数選択機能
- 選択状態の管理

#### RankingChart
- Chart.jsを使用した線グラフ表示
- 複数キャラクターの同時表示
- インタラクティブな操作（ホバー、ズーム）
- 年度範囲フィルター

#### CharacterDetail
- 個別キャラクター情報の詳細表示
- モーダルまたはサイドパネル形式
- キャラクター名、説明、デビュー年、カテゴリ情報
- 画像の代わりに代表色でキャラクターを識別

#### FilterControls
- 年度範囲選択
- ランキング範囲フィルター
- 検索ボックス

### Custom Hooks (Future-based Architecture)

#### useRankingData
```typescript
const useRankingData = () => {
  const [data, setData] = useState<RankingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // JSONファイルからデータを読み込み
  // キャッシュ機能付き
}
```

#### useCharacterSelection
```typescript
const useCharacterSelection = () => {
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
  
  // キャラクター選択状態の管理
  // 複数選択・解除機能
}
```

### Data Service (Static JSON)
```typescript
class DataService {
  private static charactersCache: Character[] | null = null;
  private static rankingsCache: RankingEntry[] | null = null;
  
  static async loadCharacters(): Promise<Character[]>
  static async loadRankings(): Promise<RankingEntry[]>
  static getCharacterById(id: string): Character | undefined
  static getRankingsByCharacter(characterId: string): RankingEntry[]
  static getRankingsByYear(year: number): RankingEntry[]
  static filterCharactersByRankRange(minRank: number, maxRank: number): Character[]
}
```

## Data Models

### 静的JSONファイル構造

#### characters.json
```json
[
  {
    "id": "hello-kitty",
    "name": "ハローキティ",
    "nameEn": "Hello Kitty",
    "description": "1974年に誕生した白い子猫のキャラクター",
    "debutYear": 1974,
    "category": "classic",
    "color": "#FF69B4"
  },
  {
    "id": "my-melody",
    "name": "マイメロディ",
    "nameEn": "My Melody",
    "description": "1975年に誕生した白いうさぎのキャラクター",
    "debutYear": 1975,
    "category": "classic",
    "color": "#FFB6C1"
  },
  {
    "id": "pompompurin",
    "name": "ポムポムプリン",
    "nameEn": "Pompompurin",
    "description": "1996年に誕生した黄色い犬のキャラクター",
    "debutYear": 1996,
    "category": "modern",
    "color": "#FFD700"
  }
]
```

**著作権対応**: 画像は使用せず、代表色とテキスト情報のみでキャラクターを識別・表示します。

#### rankings.json
```json
[
  {
    "year": 2023,
    "rank": 1,
    "characterId": "hello-kitty"
  },
  {
    "year": 2023,
    "rank": 2,
    "characterId": "my-melody"
  },
  {
    "year": 2022,
    "rank": 1,
    "characterId": "hello-kitty"
  }
]
```

### Chart Configuration
- X軸: 年度（時系列）
- Y軸: ランキング順位（逆順表示：1位が上）
- 線の色: キャラクターの代表色を使用
- ポイントマーカー: 各年のデータポイント
- ツールチップ: 年度、キャラクター名、順位
- 凡例: キャラクター名と代表色で表示

## Error Handling

### データ読み込みエラー
- ネットワークエラー時の再試行機能
- データ形式エラーの検出と通知
- 部分的なデータ欠損への対応

### ユーザー操作エラー
- 無効な年度範囲選択の検証
- キャラクター未選択時の案内表示
- 検索結果なしの適切な表示

### パフォーマンス対策
- 大量データの仮想化
- グラフ描画の最適化
- 画像の遅延読み込み

## Testing Strategy

### Storybook Integration
- 各コンポーネントのストーリー作成
- インタラクティブなプロパティ設定
- デザインシステムの文書化
- アクセシビリティテストの統合

### Unit Tests
- Custom Hooksのテスト（React Testing Library）
- データ処理ロジックのテスト
- コンポーネントの単体テスト
- ユーティリティ関数のテスト

### Integration Tests
- コンポーネント間の連携テスト
- データフローのテスト
- Chart.jsとの統合テスト
- JSONデータ読み込みのテスト

### E2E Tests
- キャラクター選択からグラフ表示までの流れ
- フィルタリング機能の動作確認
- レスポンシブデザインの確認

### Test Data
- サンプルランキングデータの作成（characters.json, rankings.json）
- エッジケース用のテストデータ
- Storybook用のモックデータ
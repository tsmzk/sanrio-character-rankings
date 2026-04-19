export interface Character {
  id: string;
  name: string;
  nameEn?: string;
  imageUrl?: string; // オプショナル（著作権対応）
  debutYear: number;
  color: string; // グラフ表示用の代表色
}

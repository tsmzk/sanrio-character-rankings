/**
 * 日本語テキスト正規化ユーティリティ
 * 検索時のひらがな・カタカナ、全角・半角の違いを吸収する
 */

/**
 * ひらがなをカタカナに変換
 */
export function hiraganaToKatakana(text: string): string {
  return text.replace(/[\u3041-\u3096]/g, (match) => {
    return String.fromCharCode(match.charCodeAt(0) + 0x60);
  });
}

/**
 * カタカナをひらがなに変換
 */
export function katakanaToHiragana(text: string): string {
  return text.replace(/[\u30A1-\u30F6]/g, (match) => {
    return String.fromCharCode(match.charCodeAt(0) - 0x60);
  });
}

/**
 * 全角英数字・記号を半角に変換
 */
export function fullWidthToHalfWidth(text: string): string {
  return (
    text
      .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (match) => {
        return String.fromCharCode(match.charCodeAt(0) - 0xfee0);
      })
      // 主要な記号の変換
      .replace(/＆/g, "&")
      .replace(/\u3000/g, " ") // 全角スペースを半角スペースに
      .replace(/！/g, "!")
      .replace(/？/g, "?")
      .replace(/（/g, "(")
      .replace(/）/g, ")")
      .replace(/＋/g, "+")
      .replace(/－/g, "-")
      .replace(/＝/g, "=")
      .replace(/％/g, "%")
  );
}

/**
 * 半角英数字・記号を全角に変換
 */
export function halfWidthToFullWidth(text: string): string {
  return (
    text
      .replace(/[A-Za-z0-9]/g, (match) => {
        return String.fromCharCode(match.charCodeAt(0) + 0xfee0);
      })
      // 主要な記号の変換
      .replace(/&/g, "＆")
      .replace(/ /g, "　") // 半角スペースを全角スペースに
      .replace(/!/g, "！")
      .replace(/\?/g, "？")
      .replace(/\(/g, "（")
      .replace(/\)/g, "）")
      .replace(/\+/g, "＋")
      .replace(/-/g, "－")
      .replace(/=/g, "＝")
      .replace(/%/g, "％")
  );
}

/**
 * 検索用テキスト正規化
 * - 小文字に統一
 * - 全スペース除去
 * - ひらがな・カタカナの統一（ひらがなに統一）
 * - 全角英数字を半角に統一
 */
export function normalizeForSearch(text: string): string {
  return katakanaToHiragana(fullWidthToHalfWidth(text.toLowerCase().replace(/\s+/g, "")));
}

/**
 * 柔軟な日本語検索マッチング
 * クエリとターゲットテキストの両方を正規化してマッチング
 */
export function flexibleJapaneseMatch(targetText: string, searchQuery: string): boolean {
  if (!searchQuery || !targetText) return false;

  const normalizedTarget = normalizeForSearch(targetText);
  const normalizedQuery = normalizeForSearch(searchQuery);

  return normalizedTarget.includes(normalizedQuery);
}

/**
 * 複数の検索候補に対する柔軟マッチング
 * name, nameEn, description などの複数フィールドに対応
 */
export function multiFieldJapaneseMatch(
  searchFields: (string | undefined | null)[],
  searchQuery: string,
): boolean {
  if (!searchQuery) return false;

  return searchFields.some((field) => field && flexibleJapaneseMatch(field, searchQuery));
}

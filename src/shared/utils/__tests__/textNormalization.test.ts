/**
 * 日本語テキスト正規化のテスト
 */

import {
  hiraganaToKatakana,
  katakanaToHiragana,
  fullWidthToHalfWidth,
  halfWidthToFullWidth,
  normalizeForSearch,
  flexibleJapaneseMatch,
  multiFieldJapaneseMatch,
} from '../textNormalization';

describe('textNormalization', () => {
  describe('hiraganaToKatakana', () => {
    it('should convert hiragana to katakana', () => {
      expect(hiraganaToKatakana('きき')).toBe('キキ');
      expect(hiraganaToKatakana('はなまる')).toBe('ハナマル');
      expect(hiraganaToKatakana('ぐでたま')).toBe('グデタマ');
    });

    it('should keep non-hiragana characters unchanged', () => {
      expect(hiraganaToKatakana('Hello きき')).toBe('Hello キキ');
      expect(hiraganaToKatakana('123 あいう')).toBe('123 アイウ');
    });
  });

  describe('katakanaToHiragana', () => {
    it('should convert katakana to hiragana', () => {
      expect(katakanaToHiragana('キキ')).toBe('きき');
      expect(katakanaToHiragana('ハナマル')).toBe('はなまる');
      expect(katakanaToHiragana('グデタマ')).toBe('ぐでたま');
    });

    it('should keep non-katakana characters unchanged', () => {
      expect(katakanaToHiragana('Hello キキ')).toBe('Hello きき');
      expect(katakanaToHiragana('123 アイウ')).toBe('123 あいう');
    });
  });

  describe('fullWidthToHalfWidth', () => {
    it('should convert full-width characters to half-width', () => {
      expect(fullWidthToHalfWidth('ＡＢＣ')).toBe('ABC');
      expect(fullWidthToHalfWidth('１２３')).toBe('123');
      expect(fullWidthToHalfWidth('ａｂｃ')).toBe('abc');
    });
  });

  describe('halfWidthToFullWidth', () => {
    it('should convert half-width characters to full-width', () => {
      expect(halfWidthToFullWidth('ABC')).toBe('ＡＢＣ');
      expect(halfWidthToFullWidth('123')).toBe('１２３');
      expect(halfWidthToFullWidth('abc')).toBe('ａｂｃ');
    });
  });

  describe('normalizeForSearch', () => {
    it('should normalize text for search', () => {
      expect(normalizeForSearch('キキ＆ララ')).toBe('きき&らら');
      expect(normalizeForSearch('ハロー キティ')).toBe('はろーきてぃ');
      expect(normalizeForSearch('HELLO KITTY')).toBe('hellokitty');
    });

    it('should remove spaces', () => {
      expect(normalizeForSearch('キキ & ララ')).toBe('きき&らら');
      expect(normalizeForSearch('Hello  World')).toBe('helloworld');
    });
  });

  describe('flexibleJapaneseMatch', () => {
    it('should match hiragana query against katakana target', () => {
      expect(flexibleJapaneseMatch('キキ&ララ', 'きき')).toBe(true);
      expect(flexibleJapaneseMatch('ハローキティ', 'はろー')).toBe(true);
    });

    it('should match katakana query against hiragana target', () => {
      expect(flexibleJapaneseMatch('きき&らら', 'キキ')).toBe(true);
      expect(flexibleJapaneseMatch('はろーきてぃ', 'ハロー')).toBe(true);
    });

    it('should match with spaces ignored', () => {
      expect(flexibleJapaneseMatch('キキ & ララ', 'きき')).toBe(true);
      expect(flexibleJapaneseMatch('ハロー キティ', 'はろー')).toBe(true);
    });

    it('should match full-width and half-width characters', () => {
      expect(flexibleJapaneseMatch('ＡＢＣＤ', 'abc')).toBe(true);
      expect(flexibleJapaneseMatch('１２３', '12')).toBe(true);
    });

    it('should be case insensitive', () => {
      expect(flexibleJapaneseMatch('Hello Kitty', 'hello')).toBe(true);
      expect(flexibleJapaneseMatch('My Melody', 'MELODY')).toBe(true);
    });

    it('should return false for non-matches', () => {
      expect(flexibleJapaneseMatch('キキ&ララ', 'ぽむぽむ')).toBe(false);
      expect(flexibleJapaneseMatch('ハローキティ', 'マイメロ')).toBe(false);
    });

    it('should handle empty strings', () => {
      expect(flexibleJapaneseMatch('キキ&ララ', '')).toBe(false);
      expect(flexibleJapaneseMatch('', 'きき')).toBe(false);
      expect(flexibleJapaneseMatch('', '')).toBe(false);
    });
  });

  describe('multiFieldJapaneseMatch', () => {
    it('should match against multiple fields', () => {
      const fields = ['キキ&ララ', 'Little Twin Stars', '双子の星の子'];
      
      expect(multiFieldJapaneseMatch(fields, 'きき')).toBe(true);
      expect(multiFieldJapaneseMatch(fields, 'little')).toBe(true);
      expect(multiFieldJapaneseMatch(fields, '双子')).toBe(true);
      expect(multiFieldJapaneseMatch(fields, 'twin')).toBe(true);
    });

    it('should handle null and undefined fields', () => {
      const fields = ['キキ&ララ', null, undefined, 'Little Twin Stars'];
      
      expect(multiFieldJapaneseMatch(fields, 'きき')).toBe(true);
      expect(multiFieldJapaneseMatch(fields, 'little')).toBe(true);
    });

    it('should return false when no fields match', () => {
      const fields = ['キキ&ララ', 'Little Twin Stars', '双子の星の子'];
      
      expect(multiFieldJapaneseMatch(fields, 'ぽむぽむ')).toBe(false);
      expect(multiFieldJapaneseMatch(fields, 'batman')).toBe(false);
    });

    it('should handle empty query', () => {
      const fields = ['キキ&ララ', 'Little Twin Stars'];
      
      expect(multiFieldJapaneseMatch(fields, '')).toBe(false);
    });
  });

  describe('Real character search scenarios', () => {
    it('should find characters with various search patterns', () => {
      // Test data similar to actual character data
      const testCharacters = [
        { name: 'キキ&ララ', nameEn: 'Little Twin Stars', description: '双子の星の子' },
        { name: 'ハローキティ', nameEn: 'Hello Kitty', description: '白い子猫のキャラクター' },
        { name: 'マイメロディ', nameEn: 'My Melody', description: '白いうさぎのキャラクター' },
        { name: 'ぐでたま', nameEn: 'Gudetama', description: 'やる気のない卵' },
        { name: 'はなまるおばけ', nameEn: 'Hanamaru Obake', description: '不思議なおばけ' }
      ];

      // Test hiragana/katakana flexibility
      expect(multiFieldJapaneseMatch([testCharacters[0].name, testCharacters[0].nameEn], 'きき')).toBe(true);
      expect(multiFieldJapaneseMatch([testCharacters[1].name, testCharacters[1].nameEn], 'はろー')).toBe(true);
      
      // Test English search
      expect(multiFieldJapaneseMatch([testCharacters[0].name, testCharacters[0].nameEn], 'little')).toBe(true);
      expect(multiFieldJapaneseMatch([testCharacters[1].name, testCharacters[1].nameEn], 'hello')).toBe(true);
      
      // Test description search
      expect(multiFieldJapaneseMatch([testCharacters[1].name, testCharacters[1].nameEn, testCharacters[1].description], '子猫')).toBe(true);
      expect(multiFieldJapaneseMatch([testCharacters[3].name, testCharacters[3].nameEn, testCharacters[3].description], 'やる気')).toBe(true);
    });
  });
});
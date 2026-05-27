import { useEffect } from "react";

/**
 * 値が指定した遅延だけ変化しなかったときに effect を実行する。
 * Why: スライダーや検索入力で値が連続変化したときに、確定とみなせる
 * タイミングだけで副作用（GA イベントなど）を発火させたい。
 *
 * 注意: deps はプリミティブ前提。配列やオブジェクトを渡すと
 * 参照比較になりデバウンスが意図通り効かないので注意。
 */
export function useDebouncedEffect(effect: () => void, deps: unknown[], delayMs: number): void {
  // biome-ignore lint/correctness/useExhaustiveDependencies: 呼び出し側の deps を意図的に依存配列にする
  useEffect(() => {
    const timer = window.setTimeout(effect, delayMs);
    return () => window.clearTimeout(timer);
  }, [...deps, delayMs]);
}

import type React from "react";
import { useMemo } from "react";
import type { Character, RankingEntry } from "../../../shared/types";
import { getCharacterRankingStats } from "../../../shared/utils/DataProcessor";
import { CharacterSparkline } from "./CharacterSparkline";

interface CharacterSparklineCardProps {
  character: Character;
  rankings: RankingEntry[];
  yearRange: { min: number; max: number };
  color: string;
  onClick: () => void;
  style?: React.CSSProperties;
}

interface RankBadgeProps {
  latestRank: number;
}

const RankBadge: React.FC<RankBadgeProps> = ({ latestRank }) => {
  if (!latestRank) {
    return (
      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
        ランク外
      </span>
    );
  }
  const top3 = latestRank <= 3;
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-sm font-bold tabular-nums ${
        top3
          ? "bg-gradient-to-br from-pink-500 to-fuchsia-500 text-white shadow-sm"
          : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
      }`}
    >
      {latestRank}位
    </span>
  );
};

interface DeltaBadgeProps {
  delta: number | null;
}

const DeltaBadge: React.FC<DeltaBadgeProps> = ({ delta }) => {
  if (delta === null) return null;
  if (delta === 0) {
    return (
      <span className="inline-flex items-center gap-0.5 text-xs text-gray-500 dark:text-gray-400">
        <span aria-hidden="true">―</span>
        <span>変動なし</span>
      </span>
    );
  }
  const up = delta > 0;
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-xs font-medium tabular-nums ${
        up ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500 dark:text-rose-400"
      }`}
    >
      <span aria-hidden="true">{up ? "▲" : "▼"}</span>
      <span>{Math.abs(delta)}</span>
    </span>
  );
};

export const CharacterSparklineCard: React.FC<CharacterSparklineCardProps> = ({
  character,
  rankings,
  yearRange,
  color,
  onClick,
  style,
}) => {
  const stats = useMemo(
    () => getCharacterRankingStats(character.id, rankings),
    [character.id, rankings],
  );

  // 前年比（最新年と前年がともにランクインしているとき）。負＝順位を上げた、正＝下げた、として保持し
  // 表示時に「上げた=▲」と読み替える
  const delta = useMemo(() => {
    if (!stats.latestRank || !stats.latestYear) return null;
    const prev = rankings.find(
      (r) => r.characterId === character.id && r.year === stats.latestYear - 1 && r.rank > 0,
    );
    if (!prev) return null;
    return prev.rank - stats.latestRank; // +なら順位を上げた
  }, [character.id, rankings, stats.latestRank, stats.latestYear]);

  return (
    <button
      type="button"
      onClick={onClick}
      style={style}
      className="flex flex-col w-full text-left bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-3 py-2 transition-all duration-200 active:scale-[0.99] hover:border-pink-300 dark:hover:border-pink-600 hover:shadow-md cursor-pointer"
    >
      <div className="flex items-center justify-between gap-2 flex-shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <span
            aria-hidden="true"
            className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: color }}
          />
          <h4 className="font-semibold text-gray-800 dark:text-gray-100 truncate">
            {character.name}
          </h4>
          {stats.appearances > 0 && stats.bestRank > 0 && (
            <span className="text-[11px] text-gray-500 dark:text-gray-400 tabular-nums whitespace-nowrap flex-shrink-0">
              ベスト{" "}
              <span className="text-gray-700 dark:text-gray-200 font-semibold">
                {stats.bestRank}位
              </span>
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <DeltaBadge delta={delta} />
          <RankBadge latestRank={stats.latestRank} />
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <CharacterSparkline
          character={character}
          rankings={rankings}
          yearRange={yearRange}
          color={color}
        />
      </div>
    </button>
  );
};

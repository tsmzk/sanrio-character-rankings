export type MedalRank = 1 | 2 | 3;

interface MedalPalette {
  highlight: string;
  base: string;
  shadow: string;
  rim: string;
}

const MEDAL_PALETTES: Record<MedalRank, MedalPalette> = {
  1: {
    highlight: "#FFF6B3",
    base: "#FFD24C",
    shadow: "#B8860B",
    rim: "#7A5A09",
  },
  2: {
    highlight: "#FFFFFF",
    base: "#D8D8D8",
    shadow: "#7A7A7A",
    rim: "#4F4F4F",
  },
  3: {
    highlight: "#F2C295",
    base: "#CD7F32",
    shadow: "#7A4719",
    rim: "#4F2D10",
  },
};

const cache = new Map<string, HTMLCanvasElement>();

export function getMedalCanvas(rank: MedalRank, size: number): HTMLCanvasElement | null {
  if (typeof document === "undefined") return null;

  const key = `${rank}:${size}`;
  const cached = cache.get(key);
  if (cached) return cached;

  // Chart.js draws HTMLCanvasElement pointStyles using the canvas's intrinsic
  // width/height (see drawPointLegend in chart.js helpers), not our pointRadius.
  // So the backing store must match the visual CSS size or the point renders
  // 2–3× too large on HiDPI devices.
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  drawMedal(ctx, rank, size);

  cache.set(key, canvas);
  return canvas;
}

function drawMedal(ctx: CanvasRenderingContext2D, rank: MedalRank, size: number): void {
  const palette = MEDAL_PALETTES[rank];
  const cx = size / 2;
  const cy = size / 2;
  const outerRadius = size / 2 - Math.max(0.5, size * 0.04);
  const innerRadius = outerRadius - Math.max(0.75, size * 0.06);

  ctx.save();

  ctx.beginPath();
  ctx.arc(cx, cy, outerRadius, 0, Math.PI * 2);
  ctx.fillStyle = palette.rim;
  ctx.fill();

  const faceGradient = ctx.createRadialGradient(
    cx - innerRadius * 0.4,
    cy - innerRadius * 0.45,
    innerRadius * 0.1,
    cx,
    cy,
    innerRadius,
  );
  faceGradient.addColorStop(0, palette.highlight);
  faceGradient.addColorStop(0.55, palette.base);
  faceGradient.addColorStop(1, palette.shadow);

  ctx.beginPath();
  ctx.arc(cx, cy, innerRadius, 0, Math.PI * 2);
  ctx.fillStyle = faceGradient;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cx, cy, innerRadius, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(0, 0, 0, 0.18)";
  ctx.lineWidth = Math.max(0.5, size * 0.03);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(
    cx - innerRadius * 0.25,
    cy - innerRadius * 0.35,
    innerRadius * 0.45,
    Math.PI * 1.05,
    Math.PI * 1.6,
  );
  ctx.strokeStyle = "rgba(255, 255, 255, 0.55)";
  ctx.lineWidth = Math.max(0.5, size * 0.05);
  ctx.lineCap = "round";
  ctx.stroke();

  ctx.restore();
}

export function clearMedalCache(): void {
  cache.clear();
}

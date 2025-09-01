import { useEffect, useState } from "react";

interface AppViewport {
  chartHeight: number;
  windowWidth: number;
}

export const useAppViewport = (): AppViewport => {
  const [chartHeight, setChartHeight] = useState<number>(600);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1024,
  );

  useEffect(() => {
    const updateViewport = () => {
      const width = typeof window !== "undefined" ? window.innerWidth : 1024;
      setWindowWidth(width);

      // Dynamic chart height based on screen size
      if (width <= 480) {
        setChartHeight(300); // Very small screens
      } else if (width <= 768) {
        setChartHeight(350); // Mobile
      } else if (width <= 1024) {
        setChartHeight(450); // Tablet
      } else {
        setChartHeight(600); // Desktop
      }
    };

    updateViewport();

    if (typeof window !== "undefined") {
      window.addEventListener("resize", updateViewport);
      return () => window.removeEventListener("resize", updateViewport);
    }
  }, []);

  return {
    chartHeight,
    windowWidth,
  };
};

import { useEffect, useRef, useState } from "react";

interface UseChartResizeReturn {
  containerRef: React.RefObject<HTMLDivElement | null>;
  containerWidth: number;
}

export function useChartResize(): UseChartResizeReturn {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
      // Set initial width
      setContainerWidth(containerRef.current.offsetWidth);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return {
    containerRef,
    containerWidth,
  };
}

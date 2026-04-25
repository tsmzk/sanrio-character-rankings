import {
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  /** Snap heights as fraction of viewport height. Sorted ascending. */
  snapPoints?: number[];
  /** Initial snap index when opening. */
  defaultSnapIndex?: number;
  /** When dragged below this fraction, sheet closes. */
  dismissThreshold?: number;
}

const DEFAULT_SNAP_POINTS = [0.55, 0.9];
const DEFAULT_DISMISS_THRESHOLD = 0.25;

export function BottomSheet({
  isOpen,
  onClose,
  title,
  children,
  snapPoints = DEFAULT_SNAP_POINTS,
  defaultSnapIndex = 0,
  dismissThreshold = DEFAULT_DISMISS_THRESHOLD,
}: BottomSheetProps) {
  const titleId = useId();
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef<{
    startY: number;
    startHeight: number;
    pointerId: number;
  } | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  const [viewportHeight, setViewportHeight] = useState<number>(() =>
    typeof window === "undefined" ? 0 : window.innerHeight,
  );
  const [currentHeight, setCurrentHeight] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isMounted, setIsMounted] = useState(isOpen);

  // Track viewport height (visualViewport handles mobile keyboard / address bar)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => {
      const vv = window.visualViewport;
      setViewportHeight(vv ? vv.height : window.innerHeight);
    };
    update();
    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, []);

  // Mount / unmount with exit animation
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    } else {
      const t = setTimeout(() => setIsMounted(false), 250);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Set initial height when opening
  useLayoutEffect(() => {
    if (!isOpen || viewportHeight === 0) return;
    const safeIndex = Math.min(Math.max(defaultSnapIndex, 0), snapPoints.length - 1);
    setCurrentHeight(viewportHeight * snapPoints[safeIndex]);
  }, [isOpen, viewportHeight, defaultSnapIndex, snapPoints]);

  // Body scroll lock while open
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  // Focus management
  useEffect(() => {
    if (!isOpen) return;
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const id = window.setTimeout(() => {
      const closeButton = sheetRef.current?.querySelector<HTMLButtonElement>("[data-sheet-close]");
      closeButton?.focus();
    }, 50);
    return () => {
      window.clearTimeout(id);
      previouslyFocusedRef.current?.focus?.();
    };
  }, [isOpen]);

  // Escape to close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const snapToNearest = useCallback(
    (height: number) => {
      if (viewportHeight === 0) return;
      if (height < viewportHeight * dismissThreshold) {
        onClose();
        return;
      }
      const heights = snapPoints.map((p) => p * viewportHeight);
      const nearest = heights.reduce((prev, curr) =>
        Math.abs(curr - height) < Math.abs(prev - height) ? curr : prev,
      );
      setCurrentHeight(nearest);
    },
    [viewportHeight, snapPoints, dismissThreshold, onClose],
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStateRef.current = {
      startY: e.clientY,
      startHeight: currentHeight,
      pointerId: e.pointerId,
    };
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragStateRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    const delta = e.clientY - drag.startY;
    const next = Math.min(viewportHeight * 0.95, Math.max(0, drag.startHeight - delta));
    setCurrentHeight(next);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragStateRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    dragStateRef.current = null;
    setIsDragging(false);
    snapToNearest(currentHeight);
  };

  if (!isMounted) return null;

  return (
    <div
      className="fixed inset-0 z-40 lg:hidden"
      aria-hidden={!isOpen}
      style={{ pointerEvents: isOpen ? "auto" : "none" }}
    >
      {/* Backdrop — translucent so chart underneath stays visible */}
      <button
        type="button"
        aria-label="閉じる"
        tabIndex={-1}
        onClick={onClose}
        className={`absolute inset-0 bg-gray-900/20 dark:bg-black/40 transition-opacity duration-200 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`absolute left-0 right-0 bottom-0 bg-white dark:bg-gray-800 rounded-t-3xl shadow-2xl border-t border-gray-200/50 dark:border-gray-700/50 flex flex-col will-change-transform ${
          isDragging ? "" : "transition-transform duration-250 ease-out"
        }`}
        style={{
          height: `${currentHeight}px`,
          transform: isOpen ? "translateY(0)" : "translateY(100%)",
          transitionProperty: isDragging ? "none" : "transform, height",
          transitionDuration: isDragging ? "0ms" : "250ms",
          transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        {/* Drag handle area */}
        <div
          className="flex-shrink-0 cursor-grab active:cursor-grabbing touch-none select-none pt-3 pb-2"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div className="mx-auto w-10 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600" />
        </div>

        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between px-5 pb-3 border-b border-gray-200 dark:border-gray-700">
          <h2 id={titleId} className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {title}
          </h2>
          <button
            type="button"
            data-sheet-close
            onClick={onClose}
            aria-label="シートを閉じる"
            className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4">{children}</div>
      </div>
    </div>
  );
}

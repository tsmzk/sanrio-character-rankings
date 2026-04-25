import { type ReactNode, type RefObject, useCallback, useRef } from "react";
import { ScrollSyncContext } from "../contexts/scrollSyncContext";

interface ScrollSyncProviderProps {
  children: ReactNode;
}

export const ScrollSyncProvider = ({ children }: ScrollSyncProviderProps) => {
  const refs = useRef(new Set<RefObject<HTMLElement | null>>());
  const currentScrollLeft = useRef(0);
  // notify からの伝搬で onScroll が発火しても再 notify しないためのフラグ
  const isUpdating = useRef(false);

  const register = useCallback((ref: RefObject<HTMLElement | null>) => {
    refs.current.add(ref);
    if (ref.current && currentScrollLeft.current > 0) {
      ref.current.scrollLeft = currentScrollLeft.current;
    }
    return () => {
      refs.current.delete(ref);
    };
  }, []);

  const notify = useCallback((source: HTMLElement | null, scrollLeft: number) => {
    if (isUpdating.current) return;
    currentScrollLeft.current = scrollLeft;
    isUpdating.current = true;
    refs.current.forEach((r) => {
      if (r.current && r.current !== source) {
        r.current.scrollLeft = scrollLeft;
      }
    });
    requestAnimationFrame(() => {
      isUpdating.current = false;
    });
  }, []);

  const getCurrent = useCallback(() => currentScrollLeft.current, []);

  return (
    <ScrollSyncContext.Provider value={{ register, notify, getCurrent }}>
      {children}
    </ScrollSyncContext.Provider>
  );
};

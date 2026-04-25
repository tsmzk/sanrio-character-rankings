import { useCallback, useContext, useEffect, useRef } from "react";
import { ScrollSyncContext } from "../contexts/scrollSyncContext";

export const useScrollSync = () => {
  const ctx = useContext(ScrollSyncContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ctx) return;
    return ctx.register(ref);
  }, [ctx]);

  const onScroll = useCallback(() => {
    if (!ctx || !ref.current) return;
    ctx.notify(ref.current, ref.current.scrollLeft);
  }, [ctx]);

  return { ref, onScroll };
};

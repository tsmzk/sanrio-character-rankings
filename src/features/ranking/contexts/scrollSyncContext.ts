import { createContext, type RefObject } from "react";

export interface ScrollSyncContextValue {
  register: (ref: RefObject<HTMLElement | null>) => () => void;
  notify: (source: HTMLElement | null, scrollLeft: number) => void;
  getCurrent: () => number;
}

export const ScrollSyncContext = createContext<ScrollSyncContextValue | null>(null);

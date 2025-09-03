import type React from "react";
import { createElement } from "react";
import { debug } from "./debug";

// Performance monitoring utilities
const measurements = new Map<string, number>();

export const startMeasurement = (name: string): void => {
  measurements.set(name, performance.now());
  debug.performance(`Started measuring: ${name}`);
};

export const endMeasurement = (name: string): number => {
  const start = measurements.get(name);
  if (!start) {
    debug.warn(`No start time found for measurement: ${name}`);
    return 0;
  }

  const end = performance.now();
  const duration = end - start;

  measurements.delete(name);
  debug.performance(`${name}: ${duration.toFixed(2)}ms`);

  return duration;
};

export const measureAsync = <T>(name: string, asyncFn: () => Promise<T>): Promise<T> => {
  startMeasurement(name);
  return asyncFn().finally(() => {
    endMeasurement(name);
  });
};

export const measureSync = <T>(name: string, syncFn: () => T): T => {
  startMeasurement(name);
  const result = syncFn();
  endMeasurement(name);
  return result;
};

// Component render time tracking
export const trackComponentRender = (
  componentName: string,
  renderFn: () => React.JSX.Element,
): React.JSX.Element => {
  return measureSync(`${componentName} render`, renderFn);
};

// Bundle loading tracking
export const trackBundleLoad = (bundleName: string): void => {
  debug.performance(`Loading bundle: ${bundleName}`);
  // In a real app, you might integrate with analytics here
};

// Memory usage tracking
export const logMemoryUsage = (context: string): void => {
  if ("memory" in performance) {
    const memory = (
      performance as Performance & {
        memory: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number };
      }
    ).memory;
    debug.performance(`Memory usage (${context}):`, {
      used: `${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`,
      total: `${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)}MB`,
      limit: `${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)}MB`,
    });
  }
};

// Web Vitals tracking (simplified)
export const trackWebVitals = (): void => {
  // Track First Contentful Paint
  if ("performance" in window && "getEntriesByType" in performance) {
    const paintEntries = performance.getEntriesByType("paint");
    paintEntries.forEach((entry) => {
      debug.performance(`${entry.name}: ${entry.startTime.toFixed(2)}ms`);
    });
  }

  // Track Largest Contentful Paint (requires observer)
  if ("PerformanceObserver" in window) {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      debug.performance(`Largest Contentful Paint: ${lastEntry.startTime.toFixed(2)}ms`);
    });
    observer.observe({ entryTypes: ["largest-contentful-paint"] });
  }
};

// React Suspense loading tracker
export function withSuspenseTracking<T extends object>(
  Component: React.ComponentType<T>,
  componentName: string,
): React.ComponentType<T> {
  const TrackedComponent = (props: T) => {
    trackBundleLoad(componentName);
    return createElement(Component, props);
  };

  TrackedComponent.displayName = `SuspenseTracked(${componentName})`;
  return TrackedComponent;
}

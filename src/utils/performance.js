import React, { useMemo, useCallback, memo, useState, useEffect, useRef } from 'react';

/**
 * Performance optimization utilities
 */

// Memoized component wrapper
export const withMemo = (Component, areEqual) => {
  return memo(Component, areEqual);
};

// Custom hook for memoized callbacks
export const useStableCallback = (callback, deps) => {
  return useCallback(callback, deps);
};

// Custom hook for memoized values
export const useStableMemo = (factory, deps) => {
  return useMemo(factory, deps);
};

// Debounced callback hook
export const useDebouncedCallback = (callback, delay, deps = []) => {
  return useCallback(
    debounce(callback, delay),
    deps
  );
};

// Throttled callback hook
export const useThrottledCallback = (callback, delay, deps = []) => {
  return useCallback(
    throttle(callback, delay),
    deps
  );
};

// Debounce utility
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle utility
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Performance monitoring
export const withPerformanceMonitoring = (Component, componentName) => {
  return memo((props) => {
    const startTime = performance.now();
    
    const result = Component(props);
    
    const endTime = performance.now();
    console.log(`${componentName} render time: ${endTime - startTime}ms`);
    
    return result;
  });
};

// Lazy loading utility
export const lazyLoad = (importFunc) => {
  return React.lazy(importFunc);
};

// Intersection observer hook for lazy loading
export const useIntersectionObserver = (ref, options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      options
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);
  
  return isIntersecting;
};

// Virtual scrolling utilities
export const useVirtualScrolling = (items, itemHeight, containerHeight) => {
  const [scrollTop, setScrollTop] = useState(0);
  
  const visibleItems = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + 1,
      items.length
    );
    
    return items.slice(startIndex, endIndex).map((item, index) => ({
      ...item,
      index: startIndex + index,
      top: (startIndex + index) * itemHeight,
    }));
  }, [items, itemHeight, containerHeight, scrollTop]);
  
  const totalHeight = items.length * itemHeight;
  
  return {
    visibleItems,
    totalHeight,
    setScrollTop,
  };
};

// Memory usage monitoring
export const useMemoryMonitor = () => {
  const [memoryInfo, setMemoryInfo] = useState(null);
  
  useEffect(() => {
    const updateMemoryInfo = () => {
      if (performance.memory) {
        setMemoryInfo({
          used: performance.memory.usedJSHeapSize,
          total: performance.memory.totalJSHeapSize,
          limit: performance.memory.jsHeapSizeLimit,
        });
      }
    };
    
    updateMemoryInfo();
    const interval = setInterval(updateMemoryInfo, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return memoryInfo;
};

// Component render counter
export const useRenderCount = (componentName) => {
  const renderCount = useRef(0);
  renderCount.current += 1;
  
  useEffect(() => {
    console.log(`${componentName} rendered ${renderCount.current} times`);
  });
  
  return renderCount.current;
};

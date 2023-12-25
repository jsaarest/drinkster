import React, { useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

export const useViewportSizeObserver = () => {
  const observedElementRef = useRef<HTMLElement | null>(null);
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    return;
  }

  // Set the observed element to the root element
  useEffect(() => {
    observedElementRef.current = rootElement;
  }, [rootElement]);

  useEffect(() => {
    const updateViewportSizeVariables = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const { width, height } = entry.boundingClientRect;

          // Set viewport width and height as CSS variables on the "root" element
          document.getElementById('root')?.style.setProperty('--viewport-width', `${width}px`);
          document.getElementById('root')?.style.setProperty('--viewport-height', `${height}px`);
        }
      });
    };

    const observer = new IntersectionObserver(updateViewportSizeVariables);

    observer.observe(rootElement!);

    // Debounce the window resize event to avoid frequent updates
    const handleResize = debounce(() => {
      observer.disconnect();
      observer.observe(rootElement!);
    }, 200);

    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return observedElementRef;
};
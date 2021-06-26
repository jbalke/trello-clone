import { useEffect, useRef } from 'react';

type Fn = (e: MouseEvent) => void;

export const useClickOutside = <T extends HTMLElement>(
  callback: Fn,
  initialValue: T | null = null
) => {
  const elementRef = useRef<T>(initialValue);

  useEffect(() => {
    if (!elementRef.current) return;

    const handleOnClick = (e: MouseEvent) => {
      if (!elementRef.current?.contains(e.target as Node)) {
        callback(e);
      }
    };
    document.addEventListener('click', handleOnClick);

    return () => {
      document.removeEventListener('click', handleOnClick);
    };
  }, [callback]);

  return elementRef;
};

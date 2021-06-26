import { useEffect, useRef } from 'react';

type Fn = (e: MouseEvent) => void;

export const useClickOutside = (
  callback: Fn,
  initialValue: HTMLElement | null = null
) => {
  const elementRef = useRef<HTMLElement>(initialValue);

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

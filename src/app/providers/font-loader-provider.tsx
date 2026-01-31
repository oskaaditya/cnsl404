'use client';

import { useEffect, useState } from 'react';
import FontsLoadedContext from '@/app/contexts/fonts-loaded-context';

// Font Face Observer: wait for webfonts before SplitText runs (https://github.com/bramstein/fontfaceobserver)
const loadFontFaceObserver = (): typeof import('fontfaceobserver') | null => {
  if (typeof window === 'undefined') return null;
  try {
    return require('fontfaceobserver');
  } catch {
    return null;
  }
};

// Fonts used by the site (from _base.scss) – wait for these before running SplitText
const FONTS_TO_LOAD = [
  { family: 'Inter Display', weight: 400, style: 'normal' },
  { family: 'Inter Display', weight: 500, style: 'normal' },
  { family: 'Inter Display', weight: 600, style: 'normal' },
];

export default function FontLoaderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const FontFaceObserver = loadFontFaceObserver();
    if (!FontFaceObserver) {
      setFontsLoaded(true);
      document.documentElement.classList.add('fonts-loaded');
      return;
    }

    const observers = FONTS_TO_LOAD.map(
      (font) =>
        new FontFaceObserver(font.family, {
          weight: font.weight,
          style: font.style,
        })
    );

    Promise.all(observers.map((obs) => obs.load(null, 10000)))
      .then(() => {
        setFontsLoaded(true);
        if (typeof document !== 'undefined') {
          document.documentElement.classList.add('fonts-loaded');
        }
      })
      .catch((err) => {
        console.warn('Font loading failed, continuing without:', err);
        setFontsLoaded(true);
        document.documentElement.classList.add('fonts-loaded');
      });
  }, []);

  return (
    <FontsLoadedContext.Provider value={{ fontsLoaded }}>
      {children}
    </FontsLoadedContext.Provider>
  );
}

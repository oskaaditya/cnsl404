'use client';

import { createContext, useContext } from 'react';

export type FontsLoadedContextValue = {
  fontsLoaded: boolean;
};

const FontsLoadedContext = createContext<FontsLoadedContextValue>({
  fontsLoaded: false,
});

export function useFontsLoaded() {
  return useContext(FontsLoadedContext);
}

export default FontsLoadedContext;

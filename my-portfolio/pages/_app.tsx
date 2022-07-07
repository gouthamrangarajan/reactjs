import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { createContext, LegacyRef, useEffect, useRef } from 'react'
import { useRouter } from 'next/router';
import { appContextType } from '../models/dataType';

export const AppContext = createContext<appContextType>({
  scrollEl: undefined,
})

function MyApp({ Component, pageProps }: AppProps) {
  let scrollEl = useRef<HTMLDivElement>();
  let { pathname } = useRouter();
  useEffect(() => {
    if (scrollEl.current)
      scrollEl.current.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname])
  return (
    <AppContext.Provider value={{ scrollEl }}>
      <div
        className={`h-screen w-screen  overflow-x-hidden overflow-y-auto flex flex-col
     font-sans  scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300`}
        ref={scrollEl as LegacyRef<HTMLDivElement>}
      >
        <Component {...pageProps} />
      </div>
    </AppContext.Provider>
  )
}

export default MyApp

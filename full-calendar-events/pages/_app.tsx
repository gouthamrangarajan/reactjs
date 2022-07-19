import '../styles/globals.css'
import type { AppProps } from 'next/app'
import EventsContextProvider from '../contexts/EventsContextProvider';
import CalendarContextProvider from '../contexts/CalendarContextProvider';
import DragItemContextProvider from '../contexts/DragItemContextProvider';
import { useRouter } from 'next/router';
import { Ref, useEffect, useRef } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  let scrollEl = useRef<HTMLElement>();
  useEffect(() => {
    if (router.pathname != '/day' && scrollEl.current)
      scrollEl.current.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [router.pathname]);
  return (
    <main className='bg-white h-screen w-max-content overflow-x-hidden flex flex-col
      overflow-y-auto scrollbar-thin scrollbar-track-blue-300 scrollbar-thumb-blue-500'
      ref={scrollEl as Ref<HTMLElement>}>
      <EventsContextProvider>
        <CalendarContextProvider>
          <DragItemContextProvider>
            <Component {...pageProps} />
          </DragItemContextProvider>
        </CalendarContextProvider>
      </EventsContextProvider>
    </main>
  )
}

export default MyApp;

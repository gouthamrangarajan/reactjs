import '../styles/globals.css'
import type { AppProps } from 'next/app'
import EventsContextProvider from '../contexts/EventsContextProvider';
import CalendarContextProvider from '../contexts/CalendarContextProvider';
import DragItemContextProvider from '../contexts/DragItemContextProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (<main className='bg-white h-screen w-max-content overflow-x-hidden flex flex-col
  overflow-y-auto scrollbar-thin scrollbar-track-blue-300 scrollbar-thumb-blue-500
'>
    <EventsContextProvider>
      <CalendarContextProvider>
        <DragItemContextProvider>
          <Component {...pageProps} />
        </DragItemContextProvider>
      </CalendarContextProvider>
    </EventsContextProvider>
  </main>)
}

export default MyApp;

import type { NextPage } from 'next'
import Head from 'next/head'
import MonthCalendar from '../components/Month'
import Nav from '../components/Month/Nav'
import SidePanel from '../components/Month/SidePanel'
import DragItemContextProvider from '../contexts/DragItemContextProvider'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Full Calendar Events</title>
        <meta name="description" content="Full Calendar Events" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DragItemContextProvider>
        <Nav></Nav>
        <div className='flex'>
          <SidePanel></SidePanel>
          <div className='flex-1'>
            <MonthCalendar></MonthCalendar>
          </div>
        </div>
      </DragItemContextProvider>
    </>
  )
}

export default Home

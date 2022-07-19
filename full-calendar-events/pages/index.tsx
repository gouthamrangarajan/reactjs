import type { NextPage } from 'next'
import Head from 'next/head'
import MonthCalendar from '../components/Month'
import Nav from '../components/Month/Nav'
import SidePanel from '../components/SidePanel'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Month - Full Calendar Events</title>
        <meta name="description" content="Full Calendar Events, Month view" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav></Nav>
      <div className='flex'>
        <SidePanel></SidePanel>
        <div className='flex-1'>
          <MonthCalendar></MonthCalendar>
        </div>
      </div>
    </>
  )
}

export default Home

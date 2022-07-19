import type { NextPage } from 'next'
import Head from 'next/head'
import WeekCalendar from '../components/Week'
import SidePanel from '../components/SidePanel'
import Nav from '../components/Week/Nav'

const Week: NextPage = () => {
  return (
    <>
      <Head>
        <title>Week - Full Calendar Events</title>
        <meta name="description" content="Full Calendar Events, Week View" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav></Nav>
      <div className='flex'>
        <SidePanel></SidePanel>
        <div className='flex-1'>
          <WeekCalendar></WeekCalendar>
        </div>
      </div>
    </>
  )
}

export default Week

import type { NextPage } from 'next'
import Head from 'next/head'
import Calendar from '../components/Calendar'
import Nav from '../components/Home/Nav'
import SidePanel from '../components/Home/SidePanel'
import HomeContextProvider from '../contexts/HomeContextProvider'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Full Calendar Events</title>
        <meta name="description" content="Full Calendar Events" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeContextProvider>
        <Nav></Nav>
        <div className='flex'>
          <SidePanel></SidePanel>
          <div className='flex-1'>
            <Calendar></Calendar>
          </div>
        </div>
      </HomeContextProvider>
    </>
  )
}

export default Home

import { NextPage } from "next";
import Head from "next/head";
import DayCalendar from "../components/Day";
import Nav from "../components/Day/Nav";
import SidePanel from "../components/Day/SidePanel";

const Day: NextPage = () => {
    return (
        <>
            <Head>
                <title>Full Calendar Events</title>
                <meta name="description" content="Full Calendar Events" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Nav></Nav>
            <div className='flex'>
                <SidePanel></SidePanel>
                <div className='flex-1 relative'>
                    <DayCalendar></DayCalendar>
                </div>
            </div>
        </>
    )
}

export default Day;
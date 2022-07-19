import { NextPage } from "next";
import Head from "next/head";
import DayCalendar from "../components/Day";
import Nav from "../components/Day/Nav";
import SidePanel from "../components/SidePanel";
import DayDragItemContextProvider from "../contexts/Day/DayDragItemContextProvider";

const Day: NextPage = () => {
    return (
        <>
            <Head>
                <title>Day - Full Calendar Events</title>
                <meta name="description" content="Full Calendar Events, Day View" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Nav></Nav>
            <div className='flex'>
                <SidePanel></SidePanel>
                <DayDragItemContextProvider>
                    <div className='flex-1 relative'>
                        <DayCalendar></DayCalendar>
                    </div>
                </DayDragItemContextProvider>
            </div>
        </>
    )
}

export default Day;
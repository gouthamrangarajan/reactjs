import { NextPage } from "next";
import Head from "next/head";
import DayCalendar from "../components/Day";
import Nav from "../components/Day/Nav";
import SidePanel from "../components/Day/SidePanel";
import DragItemContextProvider from "../contexts/Day/DragItemContextProvider";

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
                <DragItemContextProvider>
                    <div className='flex-1 relative'>
                        <DayCalendar></DayCalendar>
                    </div>
                </DragItemContextProvider>
            </div>
        </>
    )
}

export default Day;
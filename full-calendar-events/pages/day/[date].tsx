import { NextPage } from "next";
import { useRouter } from "next/router";


const Day: NextPage = () => {
    const router = useRouter();
    const { date } = router.query;
    return (
        <div>day {date}</div>
    )
}

export default Day;
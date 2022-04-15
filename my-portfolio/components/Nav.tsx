import { motion } from "framer-motion"
import { headerTextParent, staggerParent } from "../utils/animationVariants"
import { ArrowLeftIcon } from '@heroicons/react/solid'
import { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"

const Nav: NextPage<navPropsType> = ({ menu }) => {
    let { pathname } = useRouter();
    return (
        <motion.nav
            className={` w-full py-2 px-4 lg:px-8 flex space-x-3 lg:justify-center items-center                          
                     ${pathname != "/" ? "bg-slate-800 sticky top-0 z-10 "
                    : "bg-slate-800 fixed xl:sticky bottom-0"}`}
            variants={pathname != "/" ? headerTextParent : staggerParent} initial="hidden" animate="show" >
            {
                pathname != "/" && (
                    <Link href="/">
                        <a className="transition duration-300  text-white p-2 rounded-md
                                hover:ring-2 hover:ring-white
                                focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-700">
                            <ArrowLeftIcon className="w-4 h-4"></ArrowLeftIcon>
                        </a>
                    </Link>
                )
            }
            {menu && menu}
        </motion.nav >
    )
}
type navPropsType = {
    menu?: React.ReactNode | React.ReactNode[];
}
export default Nav
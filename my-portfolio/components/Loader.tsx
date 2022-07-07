import { JellyTriangle } from '@uiball/loaders'
import { NextPage } from 'next';

const Loader: NextPage<LoaderPropsType> = ({ transparent = false }) => {
    return (
        <div className={`fixed top-0 left-0 h-screen w-screen bg-slate-800 flex items-center justify-center
                          ${transparent ? "bg-slate-800/50" : "bg-slate-800"}  `}>
            <JellyTriangle
                size={60}
                speed={1.75}
                color="#fff"
            />
        </div>
    )
}
type LoaderPropsType = {
    transparent?: boolean;
}
export default Loader
import { JellyTriangle } from '@uiball/loaders'

function Loader() {
    return (
        <div className="fixed top-0 left-0 h-screen w-screen bg-slate-800 flex items-center justify-center">
            <JellyTriangle
                size={60}
                speed={1.75}
                color="#fff"
            />
        </div>
    )
}

export default Loader
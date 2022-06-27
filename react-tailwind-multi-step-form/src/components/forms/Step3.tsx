function Step3() {
    return (
        <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-1">
                <label className="text-gray-700">Phone</label>
                <input type="text" className="appearance-none outline-none transition duration-300 border border-indigo-300
                focus:ring-1 focus:border-transparent focus:ring-offset-2 focus:ring-indigo-600 focus:ring-offset-indigo-50
                shadow shadow-purple-300 rounded">
                </input>
                <div className="flex w-full justify-end pt-1">
                    <button className="appearance-none outline-none py-2 px-4 rounded hover:opacity-90 bg-indigo-500
                    text-white transition duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600
                        focus:ring-offset-indigo-50 disabled:cursor-not-allowed disabled:bg-indigo-400"
                    >Send OTP</button>
                </div>
            </div>
            <div className="flex flex-col space-y-1">
                <label className="text-gray-700">OTP</label>
                <input type="number" className="appearance-none outline-none transition duration-300 border border-indigo-300
                focus:ring-1 focus:border-transparent focus:ring-offset-2 focus:ring-indigo-600 focus:ring-offset-indigo-50
                shadow shadow-purple-300 rounded">
                </input>
            </div>
        </div>
    )
}

export default Step3
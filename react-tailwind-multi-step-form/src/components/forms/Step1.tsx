
function Step1() {
    return (
        <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-1 mb-2">
                <span className="text-xl font-semibold text-blue-700">Welcome...</span>
                <span className="text-base">Please fill the following details</span>
            </div>
            <div className="flex flex-col space-y-1">
                <label className="text-gray-700">First Name</label>
                <input type="text" className="appearance-none outline-none transition duration-300 border border-indigo-300
                    focus:ring-1 focus:border-transparent focus:ring-offset-2 focus:ring-indigo-600 focus:ring-offset-indigo-50
                    shadow shadow-purple-300 rounded">
                </input>
            </div>
            <div className="flex flex-col space-y-1">
                <label className="text-gray-700">Last Name</label>
                <input type="text" className="appearance-none outline-none transition duration-300 border border-indigo-300
                    focus:ring-1 focus:border-transparent focus:ring-offset-2 focus:ring-indigo-600 focus:ring-offset-indigo-50
                    shadow shadow-purple-300 rounded">
                </input>
            </div>
        </div>
    )
}

export default Step1
function Step2() {
    return (
        <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-1">
                <label className="text-gray-700">Email</label>
                <input type="email" className="appearance-none outline-none transition duration-300 border border-indigo-300
                    focus:ring-1 focus:border-transparent focus:ring-offset-2 focus:ring-indigo-600 focus:ring-offset-indigo-50
                    shadow shadow-purple-300 rounded">
                </input>
            </div>
            <div className="flex flex-col space-y-1">
                <label className="text-gray-700">Password</label>
                <input type="password" className="appearance-none outline-none transition duration-300 border border-indigo-300
                    focus:ring-1 focus:border-transparent focus:ring-offset-2 focus:ring-indigo-600 focus:ring-offset-indigo-50
                    shadow shadow-purple-300 rounded">
                </input>
            </div>
            <div className="flex flex-col space-y-1">
                <label className="text-gray-700">Confirm Password</label>
                <input type="password" className="appearance-none outline-none transition duration-300 border border-indigo-300
                    focus:ring-1 focus:border-transparent focus:ring-offset-2 focus:ring-indigo-600 focus:ring-offset-indigo-50
                    shadow shadow-purple-300 rounded">
                </input>
            </div>
        </div>
    )
}

export default Step2
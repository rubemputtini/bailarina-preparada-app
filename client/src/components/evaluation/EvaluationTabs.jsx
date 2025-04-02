const EvaluationTabs = ({ selectedTab, setSelectedTab }) => {
    return (
        <div className="flex gap-4 mb-6 overflow-x-auto justify-center">
            <button
                onClick={() => setSelectedTab("FMS")}
                className={`px-5 py-2 rounded-full font-semibold focus:outline-none focus:ring-0 focus:ring-offset-0 ${selectedTab === "FMS" ? "bg-purple-700" : "bg-gray-800"}`}
            >
                FMS
            </button>

            <button
                onClick={() => setSelectedTab("CAPACIDADES")}
                className={`px-5 py-2 rounded-full font-semibold focus:outline-none focus:ring-0 focus:ring-offset-0 ${selectedTab === "CAPACIDADES" ? "bg-purple-700" : "bg-gray-800"}`}
            >
                Capacidades Físicas
            </button>
        </div>
    );
};

export default EvaluationTabs;
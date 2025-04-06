const EvaluationTabs = ({ selectedTab, setSelectedTab, showPhotosTab = true }) => {
    return (
        <div className="flex flex-wrap gap-3 md:gap-4 mb-6 justify-center">
            <button
                onClick={() => setSelectedTab("FMS")}
                className={`px-4 py-1.5 md:px-5 md:py-2 text-sm md:text-base rounded-full font-semibold focus:outline-none focus:ring-0 focus:ring-offset-0 ${selectedTab === "FMS" ? "bg-purple-700" : "bg-gray-800"}`}
            >
                FMS
            </button>

            <button
                onClick={() => setSelectedTab("CAPACIDADES")}
                className={`px-4 py-1.5 md:px-5 md:py-2 text-sm md:text-base rounded-full font-semibold focus:outline-none focus:ring-0 focus:ring-offset-0 ${selectedTab === "CAPACIDADES" ? "bg-purple-700" : "bg-gray-800"}`}
            >
                Capacidades Físicas
            </button>

            {showPhotosTab && (
                <button
                    onClick={() => setSelectedTab("FOTOS")}
                    className={`px-4 py-1.5 md:px-5 md:py-2 text-sm md:text-base rounded-full font-semibold focus:outline-none focus:ring-0 focus:ring-offset-0 ${selectedTab === "FOTOS" ? "bg-purple-700" : "bg-gray-800"}`}
                >
                    Fotos
                </button>
            )}
        </div>
    );
};

export default EvaluationTabs;
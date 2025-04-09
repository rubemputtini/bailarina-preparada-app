const SuggestedDateNotice = ({ date }) => {
    return (
        <div className="mt-6 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center text-gray-300 text-xl sm:text-2xl">
                <span>Próxima atualização sugerida:</span>
                <span className="font-bold sm:ml-2 sm:whitespace-nowrap">{date}</span>
            </div>
        </div>
    );
};

export default SuggestedDateNotice;  
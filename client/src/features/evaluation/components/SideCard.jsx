const SideCard = ({ label, data }) => (
    <div className="bg-gray-100 p-3 rounded-xl shadow-sm">
        <div className="font-semibold text-gray-600 mb-1">{label}</div>
        <div className="text-2xl font-bold">{data.score}</div>
    </div>
);

export default SideCard;
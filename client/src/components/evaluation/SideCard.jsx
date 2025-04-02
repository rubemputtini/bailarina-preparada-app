import Badge from "./Badge";
import ReferenceBox from "./ReferenceBox";

const SideCard = ({ label, data }) => (
    <div className="bg-gray-100 p-3 rounded-xl shadow-sm">
        <div className="font-semibold text-gray-600 mb-1">{label}</div>
        <div className="text-2xl font-bold">{data.score}</div>
        {data.ref?.classification && <Badge classification={data.ref.classification} />}
        {data.ref?.minValue != null && (
            <ReferenceBox minValue={data.ref.minValue} maxValue={data.ref.maxValue} />
        )}
    </div>
);

export default SideCard;
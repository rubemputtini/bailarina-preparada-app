import { InfoOutlined } from "@mui/icons-material";

const ObservationCard = ({ observation }) => (
    <div className="mt-3 text-sm text-gray-800 bg-yellow-100 border-l-4 border-yellow-400 rounded p-2">
        <InfoOutlined className="inline mr-2 text-yellow-600" />
        <strong>Observação:</strong> {observation}
    </div>
);

export default ObservationCard;
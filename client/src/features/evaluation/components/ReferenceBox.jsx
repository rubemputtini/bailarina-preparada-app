import { InfoOutlined } from "@mui/icons-material";

const ReferenceBox = ({ minValue, maxValue, onClick }) => {
    return (
        <div className="my-5 flex justify-center">
            <div
                onClick={onClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onClick()}
                className="bg-gray-200 text-gray-700 text-md px-2 py-1 rounded-md inline-flex items-center gap-1 cursor-pointer hover:bg-gray-300 transition"
            >
                <InfoOutlined className="text-gray-500 hover:text-gray-800 transition" fontSize="inherit" />
                Referência:{" "}
                <span className="font-medium">
                    {maxValue != null ? `${minValue} a ${maxValue}` : `${minValue} ou mais`}
                </span>
            </div>
        </div>
    );
};

export default ReferenceBox;
import { InfoOutlined } from "@mui/icons-material";

const ReferenceBox = ({ minValue, maxValue }) => {
    return (
        <div className="my-5 flex justify-center">
            <div className="bg-gray-200 text-gray-700 text-md px-2 py-1 rounded-md inline-flex items-center gap-1">
                <InfoOutlined className="text-gray-500" fontSize="inherit" />
                Referência:{" "}
                <span className="font-medium">
                    {maxValue != null ? `${minValue} a ${maxValue}` : `${minValue} ou mais`}
                </span>
            </div>
        </div>
    );
};

export default ReferenceBox;
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { trainingCategories } from "shared/utils/constants";

const CategorySelect = ({ value, onChange }) => {
    return (
        <div className="relative w-full md:w-[220px]">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full appearance-none px-4 py-2 pr-10 rounded-full bg-white text-purple-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300 font-semibold transition"
            >
                <option value="">Todas</option>
                {trainingCategories.map(({ name }) => (
                    <option key={name} value={name}>
                        {name}
                    </option>
                ))}
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-purple-400">
                <ChevronDownIcon className="h-4 w-4" />
            </div>
        </div>
    );
};

export default CategorySelect;

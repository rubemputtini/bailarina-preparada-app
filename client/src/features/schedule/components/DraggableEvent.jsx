import { useDrag } from "react-dnd";
import { FaTimes } from "react-icons/fa";
import { tasksColorsMap } from "../../../shared/utils/constants";

const DraggableEvent = ({ event, isEditing, setEvents, setDeletedIds }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "EVENT",
        item: {
            id: event.id,
            title: event.title,
            color: event.color,
            notes: event.notes,
            dayOfWeek: event.dayOfWeek,
            period: event.period,
            row: event.row,
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const handleDelete = () => {
        setEvents((prevEvents) => prevEvents.filter(e => e.id !== event.id));

        if (event.id) {
            setDeletedIds((prev) => [...prev, event.id]);
        }
    };

    return (
        <div
            ref={isEditing ? drag : null}
            className="relative flex items-center justify-center text-gray-900 font-semibold text-xs md:text-sm text-center p-2"
            style={{
                height: "100%",
                width: "100%",
                backgroundColor: tasksColorsMap[event.color]?.hex || "transparent",
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            {event.title}

            {isEditing && (
                <button
                    className="absolute top-1 right-1 p-1 text-gray-500 text-xs rounded-full hover:text-red-600"
                    onClick={handleDelete}
                >
                    <FaTimes size={10} />
                </button>
            )}
        </div>
    );
};

export default DraggableEvent;

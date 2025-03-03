import { useDrag } from "react-dnd";
import { FaTimes } from "react-icons/fa";
import { tasksColors } from "../utils/constants";
import { deleteScheduleTask } from "../services/scheduleTaskService";

const DraggableEvent = ({ event, isEditing, setEvents }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "EVENT",
        item: { id: event.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const handleDelete = async () => {
        await deleteScheduleTask(event.id);

        setEvents((prevEvents) => prevEvents.filter(e => e.id !== event.id));
    };

    return (
        <div
            ref={isEditing ? drag : null}
            className="relative flex items-center justify-center text-gray-900 font-semibold text-xs md:text-sm text-center p-2"
            style={{
                height: "100%",
                width: "100%",
                backgroundColor: tasksColors[event.color],
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

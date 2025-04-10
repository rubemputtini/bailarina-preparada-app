import { useDrag } from "react-dnd";
import { FaTimes } from "react-icons/fa";
import { tasksColorsMap } from "../../../shared/utils/constants";
import { IconButton, Tooltip } from "@mui/material";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

const DraggableEvent = ({ event, isEditing, setEvents, setDeletedIds, onDelete }) => {
    const bgColor = tasksColorsMap[event.color]?.hex || "#ffffff";

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "EVENT",
        item: {
            id: event.id,
            title: event.title,
            color: event.color,
            notes: event.notes,
            link: event.link,
            activityLinkId: event.activityLinkId,
            dayOfWeek: event.dayOfWeek,
            period: event.period,
            row: event.row,
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const handleDelete = (e) => {
        e.stopPropagation();
        onDelete?.();
    };

    return (
        <div
            ref={isEditing ? drag : null}
            className="uppercase relative flex items-center justify-center text-gray-900 font-semibold text-xs md:text-sm text-center p-2"
            style={{
                height: "100%",
                width: "100%",
                backgroundColor: bgColor,
                color: "#1f2937",
                textShadow: '0 0 1px rgba(0,0,0,0.4)',
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            {event.title}
            {event.link && !isEditing && (
                <div className="absolute top-0.5 right-0.5">
                    <Tooltip title="Acessar conteúdo" arrow>
                        <IconButton
                            href={event.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            size="small"
                            sx={{
                                padding: "1px",
                                fontSize: 14,
                                color: "#1f2937",
                                transition: "color 0.2s ease-in-out",
                                '&:hover': {
                                    color: '#111827'
                                }
                            }}
                        >
                            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                        </IconButton>
                    </Tooltip>
                </div>

            )}
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

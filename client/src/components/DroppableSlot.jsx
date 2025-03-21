import { useState } from "react";
import { useDrop } from "react-dnd";
import { FaCheck, FaTimes } from "react-icons/fa";
import DraggableEvent from "./DraggableEvent";
import { tasksColorsMap } from "../utils/constants";

const DroppableSlot = ({ colIndex, period, row, isEditing, setEvents, events }) => {
    const [newEventTitle, setNewEventTitle] = useState("");
    const [selectedColor, setSelectedColor] = useState("lightBlue");
    const [isAdding, setIsAdding] = useState(false);

    const colors = Object.keys(tasksColorsMap);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "EVENT",
        drop: (item) => {
            if (events.length > 0) return;

            setEvents((prevEvents) =>
                prevEvents.map(event =>
                    event.id === item.id
                        ? { ...event, dayOfWeek: colIndex, period: period.label, row: row }
                        : event
                )
            );
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const handleAddEvent = () => {
        if (!newEventTitle.trim()) return;
        setEvents((prevEvents) => [
            ...prevEvents,
            {
                id: null,
                title: newEventTitle,
                dayOfWeek: colIndex,
                period: period.label,
                row: row,
                color: selectedColor,
            }
        ]);
        setIsAdding(false);
        setNewEventTitle("");
    };

    return (
        <div
            ref={isEditing ? drop : null}
            className={`relative flex items-center justify-center border ${isOver ? "border-purple-700" : "border-gray-300"
                } bg-white w-full min-h-[60px]`}
            style={{
                backgroundColor: events.length > 0 ? tasksColorsMap[events[0].color]?.hex : "transparent",
            }}
        >
            {events.length === 0 && isEditing && !isAdding && (
                <button
                    className="text-gray-400 text-lg text-center w-full hover:text-green-600"
                    onClick={() => setIsAdding(true)}
                >
                    +
                </button>
            )}

            {isAdding && (
                <div className="flex flex-col items-center">
                    <input
                        type="text"
                        value={newEventTitle}
                        onChange={(e) => setNewEventTitle(e.target.value)}
                        className="p-1 w-full text-center text-xs md:text-sm"
                        placeholder="TREINO"
                    />
                    <div className="grid grid-cols-4 gap-2 mt-2 p-2">
                        {colors.map((color) => (
                            <button
                                key={color}
                                className={`w-5 h-5 rounded-full border-2 ${selectedColor === color ? "border-black" : "border-transparent"
                                    }`}
                                style={{ backgroundColor: tasksColorsMap[color]?.hex }}
                                onClick={() => setSelectedColor(color)}
                            />
                        ))}
                    </div>
                    <div className="flex gap-2 my-2">
                        <button
                            onClick={() => setIsAdding(false)}
                            className="text-red-500 hover:text-red-800"
                        >
                            <FaTimes size={16} />
                        </button>
                        <button
                            onClick={handleAddEvent}
                            className="text-green-600 hover:text-green-800"
                        >
                            <FaCheck size={16} />
                        </button>
                    </div>
                </div>
            )}

            {events.length > 0 && (
                <DraggableEvent event={events[0]} isEditing={isEditing} setEvents={setEvents} />
            )}
        </div>
    );
};

export default DroppableSlot;

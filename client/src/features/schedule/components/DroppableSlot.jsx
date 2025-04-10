import { useState } from "react";
import { useDrop } from "react-dnd";
import DraggableEvent from "./DraggableEvent";
import ScheduleActivityDialog from "./ScheduleActivityDialog";
import { tasksColorsMap } from "../../../shared/utils/constants";
import { PlusIcon } from "@heroicons/react/24/outline";

const DroppableSlot = ({ colIndex, period, row, isEditing, setEvents, events, setDeletedIds }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "EVENT",
        drop: (item) => {
            setEvents((prevEvents) => {
                let filteredEvents;

                if (item.id) {
                    filteredEvents = prevEvents.filter((e) => e.id !== item.id);
                } else {
                    // Tarefa ainda sem ID, usa posição original para identificar
                    filteredEvents = prevEvents.filter((e) =>
                        !(
                            e.dayOfWeek === item.dayOfWeek &&
                            e.period === item.period &&
                            e.row === item.row &&
                            e.title === item.title
                        )
                    );
                }

                const updatedItem = {
                    ...item,
                    dayOfWeek: colIndex,
                    period: period.label,
                    row: row,
                };

                return [...filteredEvents, updatedItem];
            });
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const handleSaveDialog = ({ title, link, color, activityLinkId }) => {
        const newEvent = {
            id: editingEvent?.id ?? null,
            title,
            link,
            dayOfWeek: colIndex,
            period: period.label,
            row,
            color,
            notes: null,
            activityLinkId: activityLinkId ?? null,
        };

        setEvents((prev) => {
            return prev.filter((e) => {
                if (editingEvent?.id != null) return e.id !== editingEvent.id;
                return !(e.dayOfWeek === colIndex && e.period === period.label && e.row === row);
            }).concat(newEvent);
        });

        setIsDialogOpen(false);
        setEditingEvent(null);
    };

    const openAddDialog = (e) => {
        e.stopPropagation();
        setEditingEvent(null);
        setIsDialogOpen(true);
    };

    const openEditDialog = () => {
        if (!isEditing || events.length === 0) return;
        const [event] = events;
        setEditingEvent({
            id: event.id,
            title: event.title,
            link: event.link || "",
            color: event.color,
            activityLinkId: event.activityLinkId || null,
        });

        setIsDialogOpen(true);
    };

    const handleDelete = () => {
        const [event] = events;
        if (!event) return;

        setEvents((prevEvents) => prevEvents.filter((e) => e !== event));

        if (event.id && typeof event.id === "number") {
            setDeletedIds((prev) => [...prev, event.id]);
        }

        setIsDialogOpen(false);
        setEditingEvent(null);
    };

    return (
        <div
            ref={isEditing ? drop : null}
            className={`relative flex items-center justify-center border ${isOver ? "border-purple-700" : "border-gray-300"} bg-white w-full min-h-[60px]`}
            style={{
                backgroundColor:
                    events.length > 0 ? tasksColorsMap[events[0].color]?.hex || "transparent" : "transparent",
            }}
            onClick={openEditDialog}
        >
            {events.length === 0 && isEditing && (
                <button
                    className="text-gray-400 text-lg hover:text-green-600"
                    onClick={openAddDialog}
                >
                    <PlusIcon className="w-6 h-6" />
                </button>
            )}

            {events.length > 0 && (
                <DraggableEvent
                    event={events[0]}
                    isEditing={isEditing}
                    onDelete={handleDelete}
                />
            )}

            <ScheduleActivityDialog
                open={isDialogOpen}
                onClose={() => {
                    setIsDialogOpen(false);
                    setEditingEvent(null);
                }}
                onSave={handleSaveDialog}
                initialData={editingEvent}
            />
        </div>
    );
};

export default DroppableSlot;

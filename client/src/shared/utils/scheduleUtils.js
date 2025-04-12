export const buildTaskPayload = (events) => {
    return events.map((event) => ({
        scheduleTaskId: event.id,
        dayOfWeek: event.dayOfWeek,
        slot: event.row,
        period: event.period,
        activity: event.title,
        notes: event.notes,
        color: event.color,
        link: event.link || null,
        activityLinkId: event.activityLinkId ?? null
    }));
};

export const areEventsEqual = (a, b) => {
    if (a.length !== b.length) return false;

    const sortById = (list) => [...list].sort((x, y) => (x.id ?? 0) - (y.id ?? 0));

    const sortedA = sortById(a);
    const sortedB = sortById(b);

    return sortedA.every((event, index) => {
        const other = sortedB[index];
        return (
            event.id === other.id &&
            event.title === other.title &&
            event.dayOfWeek === other.dayOfWeek &&
            event.period === other.period &&
            event.row === other.row &&
            event.color === other.color &&
            event.notes === other.notes &&
            event.link === other.link
        );
    });
};
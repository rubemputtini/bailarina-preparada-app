export const buildTrainedDatesMap = (calendarData) => {
    const map = new Map();

    calendarData.forEach(({ date, trainingCount }) => {
        const key = new Date(date).toISOString().split("T")[0];
        map.set(key, trainingCount);
    });

    return map;
};

export const generateMonthDays = (year, month, trainedDatesMap) => {
    const days = [];
    const firstDayOfMonth = new Date(year, month, 1);
    const startDay = (firstDayOfMonth.getDay() + 6) % 7; // começa na segunda
    const totalDays = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < startDay; i++) {
        days.push(null);
    }

    for (let day = 1; day <= totalDays; day++) {
        const d = new Date(year, month, day);
        const isoDate = d.toISOString().split("T")[0];
        
        days.push({
            day,
            isoDate,
            count: trainedDatesMap.get(isoDate) || 0,
        });
    }

    return days;
};

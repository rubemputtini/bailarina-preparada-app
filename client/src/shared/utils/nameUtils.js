export const getShortName = (fullName) => {
    if (!fullName) return "";

    const stopWords = ["de", "da", "do", "dos", "das"];
    const parts = fullName.trim().split(" ");

    if (parts.length <= 2) {
        return fullName;
    }

    if (stopWords.includes(parts[1].toLowerCase()) && parts.length > 2) {
        return `${parts[0]} ${parts[1]} ${parts[2]}`;
    }

    return `${parts[0]} ${parts[1]}`;
};
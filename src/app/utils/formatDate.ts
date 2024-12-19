const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    const time = new Intl.DateTimeFormat("ua-UA", {
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);

    const dayMonthYear = new Intl.DateTimeFormat("ua-UA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(date);

    return `${time}, ${dayMonthYear}`;
}

export default formatDate
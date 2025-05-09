export function formatDateToDay(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function groupByDate<T>(items: T[], dateKey: keyof T): Record<string, T[]> {
    return items.reduce((acc, item) => {
        const date = formatDateToDay(new Date(item[dateKey] as unknown as string));
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(item);
        return acc;
    }, {} as Record<string, T[]>);
}
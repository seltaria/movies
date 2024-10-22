export const toHoursAndMinutes = (totalMinutes: number | string) => {
    const hours = Math.floor(Number(totalMinutes) / 60);
    const minutes = Number(totalMinutes) % 60;

    return `${hours} ч ${minutes} мин`
}
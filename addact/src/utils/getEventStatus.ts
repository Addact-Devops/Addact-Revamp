export function getEventStatus(dateString: string | null | undefined, label = "Event"): string {
    if (!dateString) return `Past ${label}`;

    const eventDate = new Date(dateString);
    const today = new Date();

    const isSameDay =
        eventDate.getFullYear() === today.getFullYear() &&
        eventDate.getMonth() === today.getMonth() &&
        eventDate.getDate() === today.getDate();

    if (eventDate < today && !isSameDay) {
        return `Past ${label}`;
    } else if (isSameDay) {
        return `Ongoing ${label}`;
    } else {
        return `Upcoming ${label}`;
    }
}

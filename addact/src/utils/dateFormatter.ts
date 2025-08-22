export function formatDateTime(date: Date): string {
    const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });

    // Example output: "22-Aug-2025, 14:35:45"
    const parts = formatter.formatToParts(date);
    const dd = parts.find((p) => p.type === "day")?.value;
    const mmm = parts.find((p) => p.type === "month")?.value;
    const yyyy = parts.find((p) => p.type === "year")?.value;
    const hh = parts.find((p) => p.type === "hour")?.value;
    const min = parts.find((p) => p.type === "minute")?.value;
    const ss = parts.find((p) => p.type === "second")?.value;

    return `${dd}-${mmm}-${yyyy} ${hh}:${min}:${ss}`;
}

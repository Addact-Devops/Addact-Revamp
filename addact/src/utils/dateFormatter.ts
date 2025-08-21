export function formatDateTime(date: Date): string {
    const dd = String(date.getDate()).padStart(2, "0");
    const mmm = date.toLocaleString("en-US", { month: "short" });
    const yyyy = date.getFullYear();

    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    const ss = String(date.getSeconds()).padStart(2, "0");

    return `${dd}-${mmm}-${yyyy} ${hh}:${min}:${ss}`;
}

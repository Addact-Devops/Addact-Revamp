import fs from "fs";
import path from "path";

function getStaticRoutes(dir = ""): string[] {
    const appDir = path.resolve(process.cwd(), "src/app");
    const fullPath = path.join(appDir, dir);
    const entries = fs.readdirSync(fullPath, { withFileTypes: true });

    return entries.flatMap((entry) => {
        const subPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            return getStaticRoutes(subPath);
        }

        if (entry.name === "page.tsx" && !subPath.includes("[") && !subPath.includes("/sitemap")) {
            const route = "/" + dir.replace(/\\/g, "/");
            return route === "/index" ? "/" : route;
        }

        return [];
    });
}

export function getAllStaticRoutes(): string[] {
    return getStaticRoutes();
}

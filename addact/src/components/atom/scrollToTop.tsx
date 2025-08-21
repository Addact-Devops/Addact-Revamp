"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
    const pathname = usePathname();

    useEffect(() => {
        // whenever pathname changes, scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [pathname]);

    return null; // nothing to render
}

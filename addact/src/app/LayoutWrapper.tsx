// 👇 define client wrapper first
"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Header from "@/components/templates/header";
import Footer from "@/components/templates/Footer";

// 🔹 infer prop types directly from Header and Footer components
type HeaderProps = React.ComponentProps<typeof Header>;
type FooterProps = React.ComponentProps<typeof Footer>;

function LayoutWrapper({
    children,
    headerData,
    footerData,
}: {
    children: React.ReactNode;
    headerData: HeaderProps["headers"]; // type-safe!
    footerData: FooterProps["data"]; // type-safe!
}) {
    const pathname = usePathname();
    const hideHeaderFooter = pathname === "/sitecore-marketing-page";

    return (
        <>
            {!hideHeaderFooter && <Header headers={headerData} />}
            {children}
            {!hideHeaderFooter && <Footer data={footerData} />}
        </>
    );
}

export default LayoutWrapper;

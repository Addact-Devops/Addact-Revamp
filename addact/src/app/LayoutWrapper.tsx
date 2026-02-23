// 👇 define client wrapper first
"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Header from "@/components/templates/header";
import Footer from "@/components/templates/Footer";
import type { AddactHeaderData } from "@/graphql/queries/addact-header";

// 🔹 infer Footer prop type directly from Footer component
type FooterProps = React.ComponentProps<typeof Footer>;

function LayoutWrapper({
    children,
    headerData,
    footerData,
}: {
    children: React.ReactNode;
    headerData: AddactHeaderData;
    footerData?: FooterProps["data"];
}) {
    const pathname = usePathname();
    const hideHeaderFooter = pathname === "/hire-certified-sitecore-developer";

    return (
        <>
            {!hideHeaderFooter && <Header headerData={headerData} />}
            {children}
            {!hideHeaderFooter && footerData && <Footer data={footerData} />}
        </>
    );
}

export default LayoutWrapper;


// 👇 define client wrapper first
"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Header from "@/components/templates/header";
import Footer from "@/components/templates/Footer";
import ContactUs from "@/components/organisms/ContactUs";
import type { AddactHeaderData } from "@/graphql/queries/addact-header";
import type { CONTACTUS } from "@/graphql/queries/getHomePage";

// 🔹 infer Footer prop type directly from Footer component
type FooterProps = React.ComponentProps<typeof Footer>;

function LayoutWrapper({
  children,
  headerData,
  footerData,
  contactSidebarData,
}: {
  children: React.ReactNode;
  headerData: AddactHeaderData;
  footerData?: FooterProps["data"];
  contactSidebarData?: CONTACTUS;
}) {
  const pathname = usePathname();
  const [isContactSidebarOpen, setContactSidebarOpen] = React.useState(false);
  const hideHeaderFooter = pathname === "/hire-certified-sitecore-developer";

  const isAIPage = pathname === "/ai-services";
  const isUIUXPage = pathname === "/ui-ux-service";
  const isHomePage = pathname === "/";

  const isTransparentHeaderPage = isAIPage || isUIUXPage || isHomePage;

  React.useEffect(() => {
    setContactSidebarOpen(false);
  }, [pathname]);

  return (
    <>
      {!hideHeaderFooter && (
        <Header
          headerData={headerData}
          onContactClick={() => setContactSidebarOpen(true)}
          transparentHeader={isTransparentHeaderPage}
        />
      )}
      {children}
      {!hideHeaderFooter && footerData && <Footer data={footerData} />}
      {!hideHeaderFooter && contactSidebarData && (
        <ContactUs
          data={contactSidebarData}
          isDrawer
          isOpen={isContactSidebarOpen}
          onClose={() => setContactSidebarOpen(false)}
        />
      )}
    </>
  );
}

export default LayoutWrapper;

import { Geist, Geist_Mono, Montserrat, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "../styles/custom.scss";
import { getAddactHeaderData } from "@/graphql/queries/addact-header";
import { getFooterData } from "@/graphql/queries/footer";
import { getContactUsData } from "@/graphql/queries/getContactUs";
import ScrollToTop from "@/components/atom/scrollToTop";
import LayoutWrapper from "./LayoutWrapper";
import TidioWrapper from "@/components/organisms/TidioWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let headerRes;
  let footerData;
  let contactSidebarData;

  try {
    headerRes = await getAddactHeaderData();
  } catch (e) {
    console.error("[Header] getAddactHeaderData failed:", e);
    headerRes = { addactHeader: {} };
  }
  try {
    footerData = await getFooterData();
  } catch (e) {
    console.error("[Footer] getFooterData failed:", e);
    footerData = undefined;
  }
  try {
    const contactUsRes = await getContactUsData();
    contactSidebarData = contactUsRes?.contactus?.contactus;
  } catch (e) {
    console.error("[Contact Sidebar] getContactUsData failed:", e);
    contactSidebarData = undefined;
  }

  return (
    <html lang="en">
      <head>
        {/* ✅ Google site verification */}
        <meta
          name="google-site-verification"
          content="YqKQYm1Ppyy0SPQ6Fs2swuVEI9kcjqLNc1Ovys8rQlA"
        />
      </head>
      {/* ✅ Added poppins.variable to the body classes */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${poppins.variable} antialiased`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M4B35B8"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <ScrollToTop />
        <LayoutWrapper
          headerData={headerRes.addactHeader}
          footerData={footerData}
          contactSidebarData={contactSidebarData}
        >
          {children}
          <TidioWrapper />
        </LayoutWrapper>

        {/* ✅ Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-M4B35B8');
            `,
          }}
        />

        {/* ✅ Microsoft Clarity */}
        <Script
          id="clarity-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "mxup522myc");
            `,
          }}
        />
      </body>
    </html>
  );
}

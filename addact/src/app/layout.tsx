import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "../styles/custom.scss";
import { getHeaderData } from "@/graphql/queries/header";
import { getFooterData } from "@/graphql/queries/footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ScrollToTop from "@/components/atom/scrollToTop";
import LayoutWrapper from "./LayoutWrapper";
import TawkTo from "@/components/organisms/TwakTo";
// import SnowfallWrapper from "@/components/organisms/SnowfallWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const HeaderData = await getHeaderData();
  const footerData = await getFooterData();

  return (
    <html lang="en">
      <head>
        {/* ✅ Preconnect and Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />

        {/* ✅ Google site verification */}
        <meta
          name="google-site-verification"
          content="YqKQYm1Ppyy0SPQ6Fs2swuVEI9kcjqLNc1Ovys8rQlA"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
        {/* ✅ Wrap children in LayoutWrapper (from current code) */}
        <LayoutWrapper headerData={HeaderData} footerData={footerData}>
          {/* <SnowfallWrapper /> */}
          {children}
          <TawkTo />
        </LayoutWrapper>

        <SpeedInsights />

        {/* ✅ Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
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
          strategy="afterInteractive"
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

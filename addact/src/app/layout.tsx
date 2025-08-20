import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "../styles/custom.scss";
import Header from "@/components/templates/header";
import { getHeaderData } from "@/graphql/queries/header";
import Footer from "@/components/templates/Footer";
import { getFooterData } from "@/graphql/queries/footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const HeaderData = await getHeaderData();
    const footerData = await getFooterData();

    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100..900;1,100..900&display=swap"
                    rel="stylesheet"
                />
                <link
                    rel="preload"
                    href="https://code.tidio.co/widget-v4/fonts/inter_UcCo3FwrK3iLTcviYwYZ8UA3.woff2"
                    as="font"
                    type="font/woff2"
                />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-M4B35B8"
                        height="0"
                        width="0"
                        style={{ display: "none", visibility: "hidden" }}
                    ></iframe>
                </noscript>

                <Header headers={HeaderData} />
                {children}
                <Footer data={footerData} />

                <SpeedInsights />

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

                {/* Microsoft Clarity */}
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

                {/* Tidio Chat */}
                <Script
                    id="tidio"
                    src="https://code.tidio.co/alwcrztooa3ur96b7luzlflxidei5qnd.js"
                    strategy="beforeInteractive"
                />
            </body>
        </html>
    );
}

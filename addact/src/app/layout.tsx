import { Geist, Geist_Mono } from "next/font/google";
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
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Header headers={HeaderData} />
                {children}
                <Footer data={footerData} />
                <SpeedInsights />
            </body>
        </html>
    );
}

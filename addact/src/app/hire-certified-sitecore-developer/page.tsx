import SiteDetailClient from "./SiteDetailClient";
import Script from "next/script";

export const metadata = {
    robots: {
        index: false,
        follow: false, // change to true if you want links followed
    },
};

export default function Page() {
    return (
        <>
            {/* Google tag (gtag.js) */}
            <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-1046480411" />
            <Script id="google-ads-tracking">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'AW-1046480411');
        `}
            </Script>

            <SiteDetailClient />
        </>
    );
}

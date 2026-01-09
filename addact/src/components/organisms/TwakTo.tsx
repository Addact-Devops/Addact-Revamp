"use client";

import Head from "next/head";
import Script from "next/script";
import { Fragment } from "react";

export default function TawkTo() {
  return (
    <Fragment>
      <Head>
        <Script
          id="tawk-to"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
            (function () {
              var s1 = document.createElement("script"),
                  s0 = document.getElementsByTagName("script")[0];
              s1.async = true;
              s1.src = 'https://embed.tawk.to/695e37b1ffe983197e464287/1jec0j44v';
              s1.charset = 'UTF-8';
              s1.setAttribute('crossorigin', '*');
              s0.parentNode.insertBefore(s1, s0);
            })();
          `,
          }}
        />
      </Head>
    </Fragment>
  );
}

"use client";

import Script from "next/script";
import { Fragment } from "react";

export default function TidioChat() {
  return (
    <Fragment>
      <Script
        id="tidio-chat"
        src="//code.tidio.co/4b6kabbasns1b4k2ccn43s27qzbegiau.js"
        strategy="afterInteractive"
        async
      />
    </Fragment>
  );
}

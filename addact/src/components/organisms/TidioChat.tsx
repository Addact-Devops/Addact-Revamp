"use client";

import Script from "next/script";
import { Fragment } from "react";

export default function TidioChat() {
  return (
    <Fragment>
      <Script
        id="tidio-chat"
        src="//code.tidio.co/oghyzejza1z3jgu2jqoitsvdh10ki6us.js"
        strategy="afterInteractive"
        async
      />
    </Fragment>
  );
}

"use client";

import dynamic from "next/dynamic";

const TidioChat = dynamic(() => import("./TidioChat"), {
  ssr: false,
});

export default function TidioWrapper() {
  return <TidioChat />;
}

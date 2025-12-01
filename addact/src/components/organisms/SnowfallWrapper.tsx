"use client";

import Snowfall from "react-snowfall";

export default function SnowfallWrapper() {

  return (
    <Snowfall
      snowflakeCount={100}
      speed={[0.5, 1.5]}
      wind={[-0.5, 1.5]}
      radius={[0.5,1.5]}
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}

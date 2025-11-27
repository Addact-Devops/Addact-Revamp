"use client";

import Snowfall from "react-snowfall";

export default function SnowfallWrapper() {
 
  return (
    <Snowfall
      snowflakeCount={200}
      speed={[1, 3]}
      wind={[-0.5, 2]}
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

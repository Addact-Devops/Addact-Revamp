import React from "react";
import MagicBento from "./MagicBento";

const SolveProblemsWithAI = () => {
  return (
    <section className="bg-[#0F0F0F] py-12 md:py-16 lg:py-20 2xl:py-20">
      <div className="container-main">
        <MagicBento
          textAutoHide={true}
          enableStars={false}
          enableSpotlight
          enableBorderGlow={true}
          enableTilt
          enableMagnetism
          clickEffect
          spotlightRadius={350}
          particleCount={12}
          glowColor="0, 19, 237"
          disableAnimations={false}
        />
      </div>
    </section>
  );
};

export default SolveProblemsWithAI;

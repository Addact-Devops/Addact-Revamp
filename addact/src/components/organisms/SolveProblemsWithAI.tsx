import React from "react";
import MagicBento from "./MagicBento";

type AISolveProblemData = {
  title?: string;
  aiSolveProblemList?: Array<{
    list?:
      | {
          title?: string;
        }
      | Array<{
          title?: string;
        }>;
  }>;
};

interface SolveProblemsWithAIProps {
  data?: AISolveProblemData | null;
}

const SolveProblemsWithAI = ({ data }: SolveProblemsWithAIProps) => {
  const problemTitles =
    data?.aiSolveProblemList
      ?.flatMap((item) => {
        if (Array.isArray(item?.list)) {
          return item.list.map((entry) => entry?.title || "");
        }
        return [item?.list?.title || ""];
      })
      .filter((title): title is string => Boolean(title)) ?? [];

  return (
    <section className="bg-[#0F0F0F] py-12 md:py-16 lg:py-20 2xl:py-20">
      <div className="container-main">
        <MagicBento
          headingText={data?.title}
          problemTitles={problemTitles}
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

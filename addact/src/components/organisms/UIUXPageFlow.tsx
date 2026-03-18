import type { PageData } from "@/app/development-design/[...slug]/SiteDetailClient";
import React from "react";
import UIUXHeroBanner from "./UIUXHeroBanner";
import UIUXWhyImportant from "./UIUXWhyImportant";
import UIUXImpactSlider from "./UIUXImpactSlider";
import DesignProcess from "./DesignProcess";
import ProductExperienceChallenges from "./ProductExperienceChallenges";

const UIUXPageFlow = ({ data }: { data: PageData }) => {
  const bannerData = data?.Banner?.Banner?.[0] ?? null;
  return (
    <>
      <UIUXHeroBanner data={bannerData} />
      <UIUXWhyImportant />
      <UIUXImpactSlider />
      <DesignProcess />
      <ProductExperienceChallenges />
    </>
  );
};

export default UIUXPageFlow;

import type { PageData } from "@/app/development-design/[...slug]/SiteDetailClient";
import React from "react";
import UIUXHeroBanner from "./UIUXHeroBanner";
import UIUXWhyImportant from "./UIUXWhyImportant";

const UIUXPageFlow = ({ data }: { data: PageData }) => {
  const bannerData = data?.Banner?.Banner?.[0] ?? null;
  return (
    <>
      <UIUXHeroBanner data={bannerData} />
      <UIUXWhyImportant />
    </>
  );
};

export default UIUXPageFlow;

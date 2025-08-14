"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CMSResponse, getCMSExpertiseData } from "@/graphql/queries/getCmsExperts";
import Image from "../atom/image";
import RichText from "../atom/richText";

const OurCmsExperts = () => {
    const [data, setData] = useState<CMSResponse | null>(null);

    useEffect(() => {
        async function fetchData() {
            const response = await getCMSExpertiseData();
            setData(response);
        }
        fetchData();
    }, []);

    if (!data) {
        return null;
    }

    return (
        <section className="my-24 sm:my-32 md:my-40 lg:my-60 cms-list">
            <div className="container">
                <div className="flex gap-10 md:gap-20 lg:gap-[100px] flex-wrap lg:flex-nowrap items-center">
                    <h2 className="w-full lg:w-[40%] border-after !text-[28px] md:!text-5xl 2xl:!text-6xl !pb-4 xl:!pb-10">
                        {data?.ourExpertises[0]?.ExpertiseTitle[0]?.Title}
                    </h2>

                    <div className="w-full text-left">
                        <RichText html={data?.ourExpertises[0]?.ExpertiseTitle[0]?.Description} />
                    </div>
                </div>
                <section>
                    <div className="mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 mt-6 sm:mt-8 md:mt-14 lg:mt-24">
                        {data.ourExpertises[0].CMS.map((service) => {
                            const hoverColorMap: Record<string, string> = {
                                Sitecore: "hover:bg-[#EE3524]",
                                Umbraco: "hover:bg-[#3544B1]",
                                Kentico: "hover:bg-[#F05A22]",
                                Strapi: "hover:bg-[#4945FF]",
                                Contentful: "hover:bg-[#1773EB]",
                                Contentstack: "hover:bg-[#7C4DFF]",
                            };

                            const hoverColorClass = hoverColorMap[service?.Title] || "hover:bg-[#EE3524]";

                            return (
                                <Link
                                    className={`bg-[#1C1C1C] border border-gray-700 text-white py-4 px-4 md:py-20 md:px-14 flex justify-center items-center transition-colors duration-300 ${hoverColorClass}`}
                                    key={service?.id}
                                    href={service?.Links?.href}
                                    target={service?.Links?.isExternal ? "_blank" : "_self"}
                                >
                                    <Image
                                        src={service?.Icons?.url}
                                        alt={service?.Icons?.alternativeText || "Service Icon"}
                                        width={service?.Icons?.width}
                                        height={service?.Icons?.height}
                                        className="w-[113px] md:w-[310px]"
                                        unoptimized={false}
                                    />
                                </Link>
                            );
                        })}
                    </div>
                </section>
            </div>
        </section>
    );
};

export default OurCmsExperts;

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import RichText from "../atom/richText";
import { getIndustriesWeServe, IndustriesResponse } from "@/graphql/queries/getIndustries";
import Loader from "../atom/loader";

export default function IndustriesWeServe() {
    const [data, setData] = useState<IndustriesResponse["industriesWeServes"][0] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getIndustriesWeServe()
            .then((res) => {
                const firstItem = res.industriesWeServes?.[0];
                setData(firstItem || null);
            })
            .catch((err) => {
                console.error("Failed to load Industries data:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (!data) return null;

    const { TitleDescription, Industries } = data;

    return (
        <section className="my-[60px] xl:my-[100px] 2xl:my-[200px]">
            <div className="container">
                {/* Heading and description */}
                <div className="flex flex-wrap lg:flex-nowrap items-center">
                    <h2 className="w-full lg:w-[40%] border-after !text-[36px] xl:!text-[38px] 2xl:!text-[64px] !pb-4 xl:!pb-10">
                        {TitleDescription?.Title}
                    </h2>
                    <div className="w-full text-left">
                        <RichText html={TitleDescription?.Description ?? ""} />
                    </div>
                </div>

                {/* Grid of industries */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-16">
                    {Industries.map((item, i) => {
                        const icon = item.Icons;
                        const link = item.LinkIcons?.[0];
                        const hasLink = !!link?.href;

                        const content = (
                            <>
                                {icon?.url && (
                                    <Image
                                        src={icon.url}
                                        alt={icon.alternativeText || icon.name || "Industry Icon"}
                                        width={icon.width}
                                        height={icon.height}
                                        className="mx-auto mb-6 !w-[44px] !h-[44px] md:!w-[60px] md:!y-[60px] 2xl:!w-[80px] 2xl:!h-[80px]"
                                    />
                                )}
                                <h3 className="text-white !text-[12px] md:!text-base leading-snug">
                                    {(item.Title || icon?.name?.replace(".svg", "").replace(/[-_]/g, " ")) ??
                                        "Untitled"}
                                </h3>
                            </>
                        );

                        return (
                            <div
                                key={i}
                                className="bg-[#1C1C1C] text-center px-4 py-6 md:px-6 md:py-8 border border-[#2D2D2D] hover:border-[#3c4cff] transition-colors duration-300"
                            >
                                {hasLink ? (
                                    <Link
                                        href={link.href}
                                        target={link?.isExternal ? "_blank" : "_self"}
                                        className="block"
                                    >
                                        {content}
                                    </Link>
                                ) : (
                                    content
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

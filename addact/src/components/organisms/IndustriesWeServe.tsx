import React from "react";
import Link from "next/link";
import Image from "next/image";
import RichText from "../atom/richText";
import { getIndustriesWeServe, IndustriesResponse } from "@/graphql/queries/getIndustries";

export default async function IndustriesWeServe() {
    const results: IndustriesResponse = await getIndustriesWeServe();
    const data = results?.industriesWeServes?.[0];
    if (!data) return null;

    const { TitleDescription, Industries } = data;

    return (
        <section className='pt-24 sm:pt-32 md:pt-40 lg:pt-60 mb-24 sm:mb-32 md:mb-40 lg:mb-60'>
            <div className='container'>
                {/* Heading and description */}
                <div className='flex gap-10 md:gap-20 lg:gap-[100px] flex-wrap lg:flex-nowrap items-center'>
                    <h2 className='w-full lg:w-[40%] border-after !text-[28px] md:!text-5xl xl:!text-6xl !pb-4 xl:!pb-10'>
                        {TitleDescription?.Title}
                    </h2>
                    <div className='w-full text-left'>
                        <RichText html={TitleDescription?.Description ?? ""} />
                    </div>
                </div>

                {/* Grid of industries */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-16'>
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
                                        className='mx-auto mb-6'
                                    />
                                )}
                                <h3 className='text-white !text-sm md:!text-base leading-snug'>
                                    {(item.Title || icon?.name?.replace(".svg", "").replace(/[-_]/g, " ")) ??
                                        "Untitled"}
                                </h3>
                            </>
                        );

                        return (
                            <div
                                key={i}
                                className='bg-[#1C1C1C] text-center px-6 py-8 border border-[#2D2D2D] hover:border-[#3c4cff] transition-colors duration-300'
                            >
                                {hasLink ? (
                                    <Link href={link.href} target={link.target} className='block'>
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

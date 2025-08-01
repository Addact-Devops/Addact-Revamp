import React from "react";
import Link from "next/link";
import Image from "next/image";
import RichText from "../atom/richText";
import { OURSERVICES } from "@/graphql/queries/getHomePage";

interface IProps {
    data: OURSERVICES;
}

const OurServices = ({ data }: IProps) => {
    return (
        <section className='pt-24 sm:pt-32 md:pt-40 lg:pt-60 mb-24 sm:mb-32 md:mb-40 lg:mb-60'>
            <div className='container'>
                <div className='flex flex-col'>
                    <h2 className='border-after !text-[28px] md:!text-5xl xl:!text-6xl !pb-4 xl:!pb-10'>
                        {data.Title[0].h2}
                    </h2>
                    <section>
                        <div className='mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 sm:mt-14 lg:mt-24'>
                            {data.GlobalCard.map((service) => {
                                const href = service.Link?.href;
                                const isExternal = service.Link?.isExternal;

                                if (!href) return null;

                                return (
                                    <Link
                                        className='bg-[#1C1C1C] border border-transparent text-white p-7 hover:border-[#3c4cff]'
                                        key={service.id}
                                        href={href}
                                        target={isExternal ? "_blank" : "_self"}
                                    >
                                        {service?.Image?.url && (
                                            <Image
                                                src={service.Image.url}
                                                alt={service.Image.alternativeText || "Service Image"}
                                                width={service.Image.width}
                                                height={service.Image.height}
                                            />
                                        )}

                                        <h3 className='text-lg lg:text-3xl my-7'>{service.Title}</h3>
                                        <RichText html={service.Description} />
                                    </Link>
                                );
                            })}
                        </div>
                    </section>
                </div>
            </div>
        </section>
    );
};

export default OurServices;

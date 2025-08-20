import React from "react";
import Image from "next/image";
import RichText from "../atom/richText";
import { OURSERVICES } from "@/graphql/queries/getHomePage";

interface IProps {
    data: OURSERVICES;
}

const OurServices = ({ data }: IProps) => {
    return (
        <section className="my-[60px] xl:my-[150px] 2xl:my-[200px]">
            <div className="container">
                <div className="flex flex-col">
                    <h2 className="border-after !text-[28px] md:!text-[40px] 2xl:!text-[60px] !pb-4 xl:!pb-10 !pb-4 xl:!pb-10">
                        {data.Title[0].h2}
                    </h2>
                    <section>
                        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 sm:mt-14 2xl:mt-24 service-listing">
                            {data.GlobalCard.map((service) => (
                                <div
                                    className="bg-[#1C1C1C] border border-transparent text-white p-7 hover:border-[#3c4cff]"
                                    key={service.id}
                                >
                                    {service?.Image?.url && (
                                        <Image
                                            src={service?.Image?.url}
                                            alt={service.Image.alternativeText || "Service Image"}
                                            width={service.Image.width}
                                            height={service.Image.height}
                                            className="!w-[50px] !h-[50px] 2xl:!w-[80px] 2xl:!h-[80px]"
                                        />
                                    )}

                                    <h3 className="!text-[25px] 2xl:!text-3xl my-[30px]">{service.Title}</h3>
                                    <RichText html={service.Description} />
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </section>
    );
};

export default OurServices;

"use client";

import React from "react";
import Image from "next/image";
import RichText from "../atom/richText";
import { OURSERVICES } from "@/graphql/queries/getHomePage";
import { motion } from "framer-motion";
import SpotlightCard from "../atom/SpotlightCard";
import TechReveal from "../atom/TechReveal";

interface IProps {
    data: OURSERVICES;
}

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
};

const OurServices = ({ data }: IProps) => {
    return (
        <section className="my-[80px] lg:my-[100px] 2xl:my-[200px] relative">
            <div className="container">
                <div className="flex flex-col">
                    {/* Heading with AI accent dot */}
                    <motion.div
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <motion.h2 className="w-full lg:w-fit border-after m-0 text-black border-black/20 text-[28px]! md:text-[40px]! 2xl:text-[60px]! pb-4! xl:pb-10!">
                            <TechReveal text={data.Title[0].h2 || ""} duration={1.2} />
                        </motion.h2>
                    </motion.div>
 
                    <section>
                        <motion.div
                            className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 sm:mt-14 2xl:mt-24 service-listing"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ staggerChildren: 0.1 }}
                        >
                            {data.GlobalCard.map((service, index) => (
                                <motion.div
                                    key={service.id}
                                    variants={cardVariants}
                                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
                                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                                >
                                    <SpotlightCard className="h-full">
                                        <div className="text-black p-4 2xl:p-7 h-full">
                                            {service?.Image?.url && (
                                                <motion.div
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    whileInView={{ scale: 1, opacity: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
                                                    whileHover={{ rotate: [0, -5, 5, 0], transition: { duration: 0.4 } }}
                                                >
                                                    <Image
                                                        src={service?.Image?.url}
                                                        alt={service.Image.alternativeText || "Service Image"}
                                                        width={service.Image.width}
                                                        height={service.Image.height}
                                                        className="brand-blue-filter opacity-80 group-hover:opacity-100 transition-all duration-300"
                                                    />
                                                </motion.div>
                                            )}
                                            <h3 className="text-[25px]! 2xl:text-3xl! my-[30px] font-bold text-black">{service?.Title ?? ""}</h3>
                                            <div className="text-zinc-600 [&_p]:text-zinc-600">
                                                <RichText html={service.Description} />
                                            </div>
                                        </div>
                                    </SpotlightCard>
                                </motion.div>
                            ))}
                        </motion.div>
                    </section>
                </div>
            </div>
        </section>
    );
};

export default OurServices;

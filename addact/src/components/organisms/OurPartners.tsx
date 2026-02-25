"use client";
import { useEffect, useState } from "react";
import Image from "../atom/image";
import { getOurPartners, PartnerImage, PartnerTitle } from "@/graphql/queries/getOurPartners";
import "../../styles/components/ourPartners.scss";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import TechReveal from "../atom/TechReveal";

const NeuralParticles = dynamic(() => import("../atom/NeuralParticles"), { ssr: false });

type PartnerItem = {
    Title: PartnerTitle[];
    Image: PartnerImage[];
};

/* ✅ ADDED: optional props to override with industry data */
type OurPartnersProps = {
    titleBlocks?: PartnerTitle[];
    images?: PartnerImage[];
};

export default function OurPartners(/* ✅ ADDED */ props: OurPartnersProps) {
    const [partnerData, setPartnerData] = useState<PartnerItem | null>(null);

    /* ✅ ADDED: if industry props are present, set state from props and skip fetch */
    useEffect(() => {
        if (props?.titleBlocks?.length || props?.images?.length) {
            setPartnerData({
                Title: props.titleBlocks ?? [],
                Image: props.images ?? [],
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props?.titleBlocks, props?.images]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getOurPartners();
                setPartnerData(res.home.ourpartner);
            } catch (err) {
                console.error("Error loading partners:", err);
            }
        };

        /* ✅ ADDED: only fetch if no industry overrides */
        if (!(props?.titleBlocks?.length || props?.images?.length)) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderTitle = () => {
        /* ✅ ADDED: prefer props.titleBlocks when present */
        const overrideTitle = (props?.titleBlocks ?? [])[0];

        if (overrideTitle) {
            if ("h1" in overrideTitle && overrideTitle.h1) return overrideTitle.h1;
            if ("h2" in overrideTitle && overrideTitle.h2) return overrideTitle.h2;
            if ("h3" in overrideTitle && overrideTitle.h3) return overrideTitle.h3;
            if ("h5" in overrideTitle && overrideTitle.h5) return overrideTitle.h5;
            if ("h6" in overrideTitle && overrideTitle.h6) return overrideTitle.h6;
        }

        const title = partnerData?.Title?.[0];

        if (!title) return "Our Partners";

        if ("h1" in title) return title.h1;
        if ("h2" in title) return title.h2;
        if ("h3" in title) return title.h3;
        if ("h5" in title) return title.h5;
        if ("h6" in title) return title.h6;

        return "Our Partners";
    };

    return (
        <section className="partners py-[30px] md:py-[60px] border-t border-b border-black/10 relative overflow-hidden">
            {/* Neural network background */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                <NeuralParticles count={30} color="60, 76, 255" lineColor="60, 76, 255" connectDistance={130} />
            </div>

            <div className="container relative z-10">
                <div className="flex flex-col items-center gap-3 mb-[20px] md:mb-[50px] 2xl:mb-[80px]">
                    <motion.h2
                        className="w-full lg:w-fit border-after m-0 text-black text-[28px]! md:text-[40px]! 2xl:text-[60px]! pb-4! xl:pb-10! border-black/20"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <TechReveal text={renderTitle() || ""} as="span" duration={1} />
                    </motion.h2>
                </div>
            </div>

            <div className="overflow-hidden relative w-full py-4">
                <div className="partners__marquee-content flex gap-[40px] md:gap-[80px] w-fit">
                    {/* ✅ ADDED: prefer props.images when present, else partnerData.Image */}
                    {[
                        ...(props?.images || partnerData?.Image || []),
                        ...(props?.images || partnerData?.Image || []),
                    ].map((item, index) => (
                        <div key={index} className="min-w-[160px] flex items-center justify-center group">
                            {item?.Image?.url && (
                                <Image
                                    src={item?.Image?.url}
                                    alt={item.Image.alternativeText || `Partner Logo ${index + 1}`}
                                    width={164}
                                    height={64}
                                    className="max-w-full w-full h-[64px] object-contain brightness-0 opacity-60 group-hover:opacity-100 group-hover:[filter:brightness(0)_saturate(100%)_invert(27%)_sepia(89%)_saturate(3000%)_hue-rotate(224deg)_brightness(105%)] transition-all duration-500"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

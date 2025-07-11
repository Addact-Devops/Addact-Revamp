"use client";
import { useEffect, useState } from "react";
import Image from "../atom/image";
import { getOurPartners, PartnerImage, PartnerTitle } from "@/graphql/queries/getOurPartners";
import "../../styles/components/ourPartners.scss";

type PartnerItem = {
    Title: PartnerTitle[];
    Image: PartnerImage[];
};

export default function OurPartners() {
    const [partnerData, setPartnerData] = useState<PartnerItem | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getOurPartners();
                setPartnerData(res.home.ourpartner);
            } catch (err) {
                console.error("Error loading partners:", err);
            }
        };

        fetchData();
    }, []);

    const renderTitle = () => {
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
        <section className="partners my-[60px] sm:my-[100px] border-t border-b border-[#2E2E2E]">
            <div className="container">
                <h2 className="text-center text-white mb-[80px]">{renderTitle()}</h2>
            </div>

            <div className="overflow-hidden relative w-full py-4">
                <div className="partners__marquee-content flex gap-[80px] animate-marquee w-fit">
                    {partnerData?.Image?.map((item, index) => (
                        <div key={index} className="min-w-[160px] flex items-center justify-center">
                            <Image
                                src={item.Image.url}
                                alt={item.Image.alternativeText || `Partner Logo ${index + 1}`}
                                width={164}
                                height={64}
                                className="max-w-full w-full h-[64px] object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

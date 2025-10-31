"use client";

import { ContactUsResponse } from "@/graphql/queries/getContactUs";
import parse from "html-react-parser";
import { MdEmail, MdPhone } from "react-icons/md";

type Props = {
    addressContent: ContactUsResponse["contactus"]["AddressContent"];
};

export default function ContactUsAddress({ addressContent }: Props) {
    const { OfficeCountry, OfficeCity, Address, ContactUsEmailPhone, MapIframe } = addressContent;

    return (
        <section className="container my-[80px] lg:my-[100px] 2xl:my-[200px]" id="maps-component">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[50px] md:gap-20 lg:gap-30 items-start">
                {/* Left Side Content */}
                <div className="text-[#0A0A0A] space-y-5">
                    <p className="font-[500] text-[#155dfc] mb-[15px]">{OfficeCountry}</p>
                    <h2>{OfficeCity}</h2>
                    <p className="text-base text-black leading-relaxed">{Address}</p>

                    {/* Email & Phone */}
                    <div className="space-y-[22px] mt-[50px]">
                        {ContactUsEmailPhone.map((item, index) => (
                            <a
                                key={index}
                                href={item.Link}
                                className="flex items-center text-black font-semibold text-[18px] md:text-[20px]"
                            >
                                {item.Label.includes("@") ? (
                                    <MdEmail className="text-[#155dfc] w-6 h-6 mr-3" />
                                ) : (
                                    <MdPhone className="text-[#155dfc] w-6 h-6 mr-3" />
                                )}
                                {item.Label}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Right Side Map Iframe */}
                <div className="border-[3px] border-[#155dfc] rounded-[20px] md:rounded-[30px] overflow-hidden h-full">
                    {MapIframe && MapIframe.length > 0 && MapIframe[0].children.length > 0 && (
                        <div className="[&>iframe]:w-full [&>iframe]:h-[350px] w-full h-full">
                            {parse(MapIframe[0].children[0].text)}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

"use client";

import { ContactUsResponse } from "@/graphql/queries/getContactUs";
import parse from "html-react-parser";

type Props = {
    addressContent: ContactUsResponse["contactus"]["AddressContent"];
};

export default function ContactUsAddress({ addressContent }: Props) {
    const { OfficeCountry, OfficeCity, Address, ContactUsEmailPhone, MapIframe } = addressContent;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12 px-4 md:px-16">
            {/* Left Side Content */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">{OfficeCountry}</h3>
                <p className="text-gray-700 font-medium">{OfficeCity}</p>
                <p className="text-gray-600">{Address}</p>
                <div className="space-y-2 pt-4">
                    {ContactUsEmailPhone.map((item, index) => (
                        <a key={index} href={item.Link} className="block text-red-600 font-medium hover:underline">
                            {item.Label}
                        </a>
                    ))}
                </div>
            </div>

            {/* Right Side Iframe */}
            <div className="border-2 border-red-600 overflow-hidden rounded-xl">
                {MapIframe && MapIframe.length > 0 && MapIframe[0].children.length > 0 && (
                    <div className="w-full h-full [&>iframe]:w-full [&>iframe]:h-[450px]">
                        {parse(MapIframe[0].children[0].text)}
                    </div>
                )}
            </div>
        </div>
    );
}

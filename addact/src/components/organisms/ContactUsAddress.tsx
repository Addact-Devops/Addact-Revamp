"use client";

import React from "react";

type ContactUsAddressProps = {
    OfficeCountry: string;
    OfficeCity: string;
    Address: string;
    ContactUsEmailPhone: {
        Label: string;
        Link: string;
    }[];
    iframeHTML?: string; // expected to be a plain HTML string
};

const ContactUsAddress = ({
    OfficeCountry,
    OfficeCity,
    Address,
    ContactUsEmailPhone,
    iframeHTML,
}: ContactUsAddressProps) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
            <div className="space-y-4">
                <h4 className="text-lg font-semibold text-black">Address</h4>
                <p className="text-gray-700">{Address}</p>

                <h4 className="text-lg font-semibold text-black mt-6">Location</h4>
                <p className="text-gray-700">
                    {OfficeCity}, {OfficeCountry}
                </p>

                <h4 className="text-lg font-semibold text-black mt-6">Contact</h4>
                <ul className="text-gray-700 space-y-2">
                    {ContactUsEmailPhone?.map((item, index) => (
                        <li key={index}>
                            <a
                                href={item.Link}
                                className="hover:text-red-600 underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {item.Label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="w-full h-[300px] lg:h-full">
                {iframeHTML ? (
                    <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: iframeHTML }} />
                ) : (
                    <p className="text-gray-500">No map provided</p>
                )}
            </div>
        </div>
    );
};

export default ContactUsAddress;

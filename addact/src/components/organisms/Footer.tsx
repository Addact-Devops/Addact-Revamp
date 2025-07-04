"use client";

import Image from "next/image";
import Link from "next/link";

type FooterLink = {
    id?: string;
    href?: string;
    label?: string;
    target?: string;
    isExternal?: boolean;
};

type FooterColumn = {
    NavLink?: ({ Title?: string } | FooterLink)[];
};

type FooterProps = {
    data: {
        Logo?: {
            Image?: {
                url?: string;
                alternativeText?: string;
                width?: number;
                height?: number;
                name?: string;
            };
        };
        BackGroundImage?: {
            Image?: {
                url?: string;
                alternativeText?: string;
                width?: number;
                height?: number;
                name?: string;
            };
        };
        BackGroundImageMobile?: {
            Image?: {
                url?: string;
                alternativeText?: string;
                width?: number;
                height?: number;
                name?: string;
            };
        };
        AddressInfo?: {
            Title?: string;
            Description?: string;
        }[];
        footerlinks?: FooterColumn[];
        milestonestitle?: {
            CommonTitle?: {
                Title?: string;
                Description?: string;
            }[];
        };
        milestonesimage?: {
            Image?: {
                url?: string;
                alternativeText?: string;
                width?: number;
                height?: number;
                name?: string;
            } | null;
        }[];
        CopyrightText?: string;
        SiteSlog?: string;
    };
};

export default function Footer({ data }: FooterProps) {
    if (!data) return null;

    const { Logo, BackGroundImage, AddressInfo, footerlinks, milestonestitle, milestonesimage } = data;

    return (
        <footer
            className="relative bg-[#0F0F0F] text-white py-[60px] mt-[120px]
             bg-[length:10%_100%] 
             bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px)] 
             bg-repeat-x
             border-t border-b border-white/15"
        >
            {/* Background Image */}
            {BackGroundImage?.Image?.url && (
                <Image
                    src={BackGroundImage.Image.url}
                    alt="footer background"
                    width={1200}
                    height={1200}
                    className="absolute top-0 left-0 h-full w-auto z-0 object-cover opacity-100"
                />
            )}

            <div className="container mx-auto relative z-10 grid grid-cols-12 gap-6">
                {/* Logo Section */}
                <div className="col-span-3 flex flex-col justify-start">
                    {Logo?.Image?.url && (
                        <Image
                            src={Logo.Image.url}
                            alt={Logo.Image.alternativeText || ""}
                            width={380}
                            height={47}
                            className="mb-[30px]"
                        />
                    )}

                    {data?.SiteSlog && <p className="!text-[24px] !font-normal text-white">{data.SiteSlog}</p>}
                </div>

                {/* Spacer */}
                <div className="col-span-1" />

                {/* Links & Contact Info */}
                <div className="col-span-8">
                    {/* 4 Link Sections */}
                    <div className="grid grid-cols-4 gap-6">
                        {footerlinks?.slice(0, 4).map((column, index) => {
                            const links = column.NavLink || [];
                            const titleItem = links[0] as { Title?: string };
                            const linkItems = links.slice(1) as FooterLink[];

                            return (
                                <div key={index}>
                                    <div className="text-[24px] font-semibold mb-6">{titleItem?.Title}</div>

                                    <ul className="space-y-[15px]">
                                        {linkItems.map((link, i) => (
                                            <li key={link.id || i}>
                                                <Link
                                                    href={link.href || "/"}
                                                    target={link.target || "_self"}
                                                    rel={link.isExternal ? "noopener noreferrer" : undefined}
                                                    className="text-[20px] text-[#AEAEAE] font-medium hover:text-white"
                                                >
                                                    {link.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>

                    {/* Contact Info Below Link Sections */}
                    <div className="grid grid-cols-4 gap-6 mt-[60px]">
                        {AddressInfo?.map((item, i) => (
                            <div key={i}>
                                <div className="text-[24px] font-semibold mb-6">{item.Title}</div>
                                <div
                                    className="custom-html-content"
                                    dangerouslySetInnerHTML={{ __html: item.Description || "" }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Milestone + Copyright Section in one row */}
                <div className="col-span-12 grid grid-cols-12 mt-12 gap-6 items-end">
                    {/* Copyright Text - col-span-6 */}
                    {data?.CopyrightText && (
                        <div className="col-span-6 text-left text-[18px] font-medium text-white">
                            {data.CopyrightText}
                        </div>
                    )}

                    {/* Milestone Section - col-span-6 */}
                    {(milestonestitle?.CommonTitle?.[0]?.Title || milestonesimage?.some((i) => i.Image?.url)) && (
                        <div className="col-span-6 text-left">
                            <div className="text-[24px] font-semibold mb-[50px]">
                                {milestonestitle?.CommonTitle?.[0]?.Title}
                            </div>
                            <div className="flex flex-wrap gap-[65px]">
                                {milestonesimage
                                    ?.filter((m) => m.Image?.url)
                                    .map((item, i) => (
                                        <Image
                                            key={i}
                                            src={item.Image!.url!}
                                            alt={item.Image!.alternativeText || ""}
                                            width={item.Image!.width || 100}
                                            height={item.Image!.height || 100}
                                            className="h-16 w-auto object-contain"
                                        />
                                    ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </footer>
    );
}

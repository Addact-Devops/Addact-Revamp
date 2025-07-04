"use client";

import Image from "next/image";
import Link from "next/link";

type ImageType = {
    url?: string;
    alternativeText?: string;
    width?: number;
    height?: number;
    name?: string;
};

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

type AddressInformationItem = {
    __typename?: string;
    Title?: string;
    Description?: string;
};

type FooterProps = {
    data: {
        Logo?: { Image?: ImageType };
        BackGroundImage?: { Image?: ImageType };
        BackGroundImageMobile?: { Image?: ImageType };
        AddressInformationMobileBgImg?: { Image?: ImageType }[];
        AddressInformation?: AddressInformationItem[];
        footerlinks?: FooterColumn[];
        milestonestitle?: {
            CommonTitle?: {
                Title?: string;
                Description?: string;
            }[];
        };
        milestonesimage?: {
            Image?: ImageType | null;
        }[];
        CopyrightText?: string;
        SiteSlog?: string;
    };
};

export default function Footer({ data }: FooterProps) {
    if (!data) return null;

    const {
        Logo,
        BackGroundImage,
        AddressInformation,
        footerlinks,
        milestonestitle,
        milestonesimage,
        AddressInformationMobileBgImg,
        CopyrightText,
        SiteSlog,
    } = data;

    return (
        <footer className="relative bg-[#0F0F0F] text-white mt-[120px] pt-[60px] pb-[40px] border-t border-b border-white/15">
            {/* Desktop Background */}
            {BackGroundImage?.Image?.url && (
                <Image
                    src={BackGroundImage.Image.url}
                    alt={BackGroundImage.Image.alternativeText || "Background"}
                    width={1200}
                    height={1200}
                    className="absolute top-0 left-0 h-full w-auto z-0 object-cover opacity-100 hidden md:block"
                />
            )}

            {/* Mobile Contact Info with BG */}
            <div className="block md:hidden relative z-10 px-6 pb-6">
                {AddressInformationMobileBgImg?.[0]?.Image?.url && (
                    <Image
                        src={AddressInformationMobileBgImg[0].Image.url}
                        alt={AddressInformationMobileBgImg[0].Image.alternativeText || "Mobile Background"}
                        width={AddressInformationMobileBgImg[0].Image.width || 600}
                        height={AddressInformationMobileBgImg[0].Image.height || 600}
                        className="absolute top-0 left-0 w-full h-full object-cover z-0"
                    />
                )}

                <div className="relative z-10 py-8 text-white space-y-6">
                    {AddressInformation?.filter(Boolean).map((item, i) => (
                        <div key={i}>
                            {item?.Title && <h3 className="text-lg font-semibold mb-1">{item.Title}</h3>}
                            {item?.Description && (
                                <div className="text-sm" dangerouslySetInnerHTML={{ __html: item.Description }} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="container mx-auto relative z-10 px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Logo and Tagline */}
                    <div className="md:col-span-3 flex flex-col justify-start">
                        {Logo?.Image?.url && (
                            <Image
                                src={Logo.Image.url}
                                alt={Logo.Image.alternativeText || ""}
                                width={380}
                                height={47}
                                className="mb-[30px]"
                            />
                        )}
                        {SiteSlog && <p className="!text-[24px] !font-normal text-white">{SiteSlog}</p>}
                    </div>

                    {/* Spacer */}
                    <div className="hidden md:block md:col-span-1" />

                    {/* Footer Columns */}
                    <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                        {footerlinks?.slice(0, 4).map((column, index) => {
                            const links = column.NavLink || [];
                            const titleItem = links[0] as { Title?: string };
                            const linkItems = links.slice(1) as FooterLink[];

                            return (
                                <div key={index}>
                                    <div className="text-[20px] md:text-[24px] font-semibold mb-4 md:mb-6">
                                        {titleItem?.Title}
                                    </div>
                                    <ul className="space-y-[10px] md:space-y-[15px]">
                                        {linkItems.map((link, i) => (
                                            <li key={link.id || i}>
                                                <Link
                                                    href={link.href || "/"}
                                                    target={link.target || "_self"}
                                                    rel={link.isExternal ? "noopener noreferrer" : undefined}
                                                    className="text-[16px] md:text-[20px] text-[#AEAEAE] font-medium hover:text-white"
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

                    {/* Divider */}
                    <div className="hidden md:block md:col-span-12 my-[50px] border-t border-white/20" />

                    {/* Desktop Address Info */}
                    <div className="hidden md:grid md:col-span-12 grid-cols-3 gap-6">
                        {AddressInformation?.filter(Boolean).map((item, i) => (
                            <div key={i}>
                                {item?.Title && <div className="text-[24px] font-semibold mb-6">{item.Title}</div>}
                                {item?.Description && (
                                    <div
                                        className="custom-html-content"
                                        dangerouslySetInnerHTML={{ __html: item.Description }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Bottom Row */}
                    <div className="col-span-12 grid md:grid-cols-12 mt-12 gap-6 items-start md:items-end">
                        {/* Copyright */}
                        {CopyrightText && (
                            <div className="col-span-12 md:col-span-6 text-left text-[16px] md:text-[18px] font-medium text-white mb-4 md:mb-0">
                                {CopyrightText}
                            </div>
                        )}

                        {/* Milestones */}
                        {(milestonestitle?.CommonTitle?.[0]?.Title || milestonesimage?.some((i) => i.Image?.url)) && (
                            <div className="col-span-12 md:col-span-6 text-left">
                                {milestonestitle?.CommonTitle?.[0]?.Title && (
                                    <div className="text-[20px] md:text-[24px] font-semibold mb-6 md:mb-[50px]">
                                        {milestonestitle.CommonTitle[0].Title}
                                    </div>
                                )}
                                <div className="flex flex-wrap gap-[30px] md:gap-[65px]">
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
            </div>
        </footer>
    );
}

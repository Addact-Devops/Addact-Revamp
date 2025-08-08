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
        <>
            {/* Mobile Contact Info + Background */}
            <div className="block lg:hidden relative bg-[#0F0F0F] p-[40px] px-[25px]">
                {AddressInformationMobileBgImg?.[0]?.Image?.url && (
                    <Image
                        src={AddressInformationMobileBgImg[0].Image.url}
                        alt={AddressInformationMobileBgImg[0].Image.alternativeText || "Mobile Background"}
                        width={AddressInformationMobileBgImg[0].Image.width || 600}
                        height={AddressInformationMobileBgImg[0].Image.height || 600}
                        className="absolute top-0 left-0 w-full h-full object-cover z-0"
                    />
                )}
                <div className="relative text-white">
                    {/* Title Block - Contact Info */}
                    {AddressInformation?.[0] && (
                        <div>
                            {AddressInformation[0].Title && (
                                <div className="text-[28px] font-normal mb-[12px]">{AddressInformation[0].Title}</div>
                            )}
                            {AddressInformation[0].Description && (
                                <div
                                    className="text-[14px] font-normal"
                                    dangerouslySetInnerHTML={{ __html: AddressInformation[0].Description }}
                                />
                            )}
                        </div>
                    )}

                    {/* Grid for India and United States */}
                    <div className="grid grid-cols-2 gap-[15px] mt-6">
                        {AddressInformation?.slice(1, 3).map((item, i) => (
                            <div key={i}>
                                {item?.Title && (
                                    <div className="lg:text-[28px] text-[16px] font-[600] mb-[10px]">{item.Title}</div>
                                )}
                                {item?.Description && (
                                    <div
                                        className="text-[14px] font-normal footer-richtext"
                                        dangerouslySetInnerHTML={{ __html: item.Description }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Footer starts here */}
            <footer
                className="relative bg-[#0F0F0F] text-white lg:py-[60px] py-[40px]
                bg-[length:25%_100%] lg:bg-[length:10%_100%]
                bg-[linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px)] 
                bg-repeat-x border-t border-b border-white/15"
            >
                {/* Desktop BG Image */}
                {BackGroundImage?.Image?.url && (
                    <Image
                        src={BackGroundImage.Image.url}
                        alt="footer background"
                        width={1200}
                        height={1200}
                        className="absolute bottom-0 right-0 
                        max-h-[400px] h-full w-auto z-0 object-cover opacity-100 
                        scale-x-[-1] 
                        md:top-0 md:left-0 md:bottom-auto md:right-auto 
                        md:max-h-none md:scale-x-100"
                    />
                )}

                <div className="container relative grid grid-cols-12">
                    {/* Logo and Slogan */}
                    <div className="col-span-12 lg:col-span-3 flex flex-col justify-start">
                        {Logo?.Image?.url && (
                            <Image
                                src={Logo.Image.url}
                                alt={Logo.Image.alternativeText || ""}
                                width={380}
                                height={47}
                                className="
                                    mb-[10px]
                                    sm:mb-[15px]
                                    lg:mb-[20px]
                                    w-[120px] h-auto
                                    sm:w-[150px]
                                    lg:w-[200px]
                                    xl:w-[320px]
                                    2xl:w-[380px] 2xl:h-[47px]
                                "
                            />
                        )}
                        {SiteSlog && (
                            <p
                                className="
                                    text-[12px]
                                    sm:text-[14px]
                                    lg:text-[16px]
                                    xl:text-[20px]
                                    2xl:text-[24px]
                                    font-normal text-white
                                    "
                            >
                                {SiteSlog}
                            </p>
                        )}
                    </div>

                    {/* Spacer */}
                    <div className="hidden lg:block lg:col-span-1" />

                    {/* Links */}
                    <div className="col-span-12 lg:col-span-8">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                            {footerlinks?.slice(0, 4).map((column, index) => {
                                const links = column.NavLink || [];
                                const titleItem = links[0] as { Title?: string };
                                const linkItems = links.slice(1) as FooterLink[];

                                return (
                                    <div key={index}>
                                        <div className="text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[24px] font-semibold lg:mb-6 mb-2 mt-[25px] lg:mt-0">
                                            {titleItem?.Title}
                                        </div>
                                        <ul className="lg:space-y-[15px] space-y-[5px]">
                                            {linkItems.map((link, i) => (
                                                <li key={link.id || i}>
                                                    <Link
                                                        href={link.href || "/"}
                                                        target={link?.isExternal ? "_blank" : "_self"}
                                                        rel={link.isExternal ? "noopener noreferrer" : undefined}
                                                        className="2xl:text-[20px] xl:text-[18px] md:text-[17px] text-[16px] text-[#AEAEAE] font-medium hover:text-white"
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

                        {/* Desktop Address Info */}
                        <div className="hidden lg:grid 2xl:grid-cols-4 lg:grid-cols-3 2xl:gap-4 xl:gap-6 mt-[60px]">
                            {AddressInformation?.filter(Boolean).map((item, i) => (
                                <div key={i}>
                                    {item?.Title && (
                                        <div className="2xl:text-[24px] xl:text-[20px] md:text-[18px] font-semibold mb-6">
                                            {item.Title}
                                        </div>
                                    )}
                                    {item?.Description && (
                                        <div
                                            className="custom-html-content"
                                            dangerouslySetInnerHTML={{ __html: item.Description }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="col-span-12 flex flex-col-reverse 2xl:grid lg:grid-cols-12 lg:mt-12 2xl:gap-6 lg:gap-[50px] items-end">
                        {/* Copyright - shown last on mobile */}
                        {CopyrightText && (
                            <div className="w-full lg:col-span-6 2xl:text-left text-center lg:text-[18px] text-[14px] font-medium text-[#AEAEAE]">
                                {CopyrightText}
                            </div>
                        )}

                        {/* Milestones - shown first on mobile */}
                        {(milestonestitle?.CommonTitle?.[0]?.Title || milestonesimage?.some((i) => i.Image?.url)) && (
                            <div className="w-full lg:col-span-6 2xl:text-left md:text-center mb-[40px] lg:mb-0">
                                <div className="text-[16px] md:text-[22px] xl:text-[24px] font-semibold 2xl:mb-[50px] xl:mb-[20px] mb-[15px] mt-[25px] lg:mt-0">
                                    {milestonestitle?.CommonTitle?.[0]?.Title}
                                </div>
                                <div className="flex flex-wrap gap-[5px] lg:gap-[65px] md:justify-center 2xl:justify-start">
                                    {milestonesimage
                                        ?.filter((m) => m.Image?.url)
                                        .map((item, i) => (
                                            <Image
                                                key={i}
                                                src={item.Image!.url!}
                                                alt={item.Image!.alternativeText || ""}
                                                width={item.Image!.width || 100}
                                                height={item.Image!.height || 100}
                                                className="
                                                    max-w-[60px]
                                                    sm:max-w-[70px]
                                                    lg:max-w-[90px]
                                                    xl:max-w-[100px]
                                                    h-auto object-contain
                                                "
                                            />
                                        ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </footer>
        </>
    );
}

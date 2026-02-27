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
            {/* Mobile Contact Section */}
            <div className="block lg:hidden relative bg-[#0F0F0F] p-[40px] px-[25px] border-t border-white/10">
                {AddressInformationMobileBgImg?.[0]?.Image?.url && (
                    <Image
                        src={AddressInformationMobileBgImg[0].Image.url}
                        alt={AddressInformationMobileBgImg[0].Image.alternativeText || "Mobile Background"}
                        width={AddressInformationMobileBgImg[0].Image.width || 600}
                        height={AddressInformationMobileBgImg[0].Image.height || 600}
                        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-10"
                    />
                )}
                <div className="relative text-white">
                    {AddressInformation?.[0] && (
                        <div className="mb-5">
                            {AddressInformation[0].Title && (
                                <div className="text-[11px] font-bold text-white uppercase tracking-widest mb-1">{AddressInformation[0].Title}</div>
                            )}
                            {AddressInformation[0].Description && (
                                <div className="text-[14px] font-normal text-white/60" dangerouslySetInnerHTML={{ __html: AddressInformation[0].Description }} />
                            )}
                        </div>
                    )}
                    <div className="grid grid-cols-2 gap-[15px] mt-4">
                        {AddressInformation?.slice(1, 3).map((item, i) => (
                            <div key={i}>
                                {item?.Title && <div className="text-[11px] font-bold text-white uppercase tracking-widest mb-1">{item.Title}</div>}
                                {item?.Description && (
                                    <div className="text-[13px] font-normal text-white/55 footer-richtext"
                                        dangerouslySetInnerHTML={{ __html: item.Description }} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ════════════ MAIN FOOTER ════════════ */}
            <footer className="relative bg-[#0F0F0F] text-white z-4 overflow-hidden">

                {/* Glow blobs */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute top-0 left-[30%] w-[600px] h-[300px] bg-[#3C4CFF]/6 blur-[100px]" />
                </div>

                {/* Watermark */}
                {BackGroundImage?.Image?.url && (
                    <Image
                        src={BackGroundImage.Image.url}
                        alt=""
                        width={1200}
                        height={1200}
                        className="absolute top-0 left-0 h-full w-auto z-0 opacity-[0.15] pointer-events-none select-none"
                    />
                )}

                {/* Top gradient line */}
                <div className="h-px w-full bg-linear-to-r from-transparent via-[#3C4CFF]/60 to-transparent" />

                {/* ────── Section 1: Logo + Nav Links ────── */}
                <div className="relative z-1 container py-12 lg:py-16">
                    <div className="grid grid-cols-12 gap-8 xl:gap-12">

                        {/* Logo col */}
                        <div className="col-span-12 lg:col-span-3">
                            {Logo?.Image?.url && (
                                <Link href="/" className="inline-block mb-4">
                                    <Image
                                        src={Logo.Image.url}
                                        alt={Logo.Image.alternativeText || "Logo"}
                                        width={380}
                                        height={47}
                                        className="w-[140px] lg:w-[160px] xl:w-[200px] h-auto brightness-0 invert"
                                    />
                                </Link>
                            )}
                            {SiteSlog && (
                                <p className="text-[14px] text-white/70 leading-relaxed mb-4 max-w-[180px]">
                                    {SiteSlog}
                                </p>
                            )}
                            <span className="inline-block w-6 h-[2px] bg-[#3C4CFF] rounded-full" />
                        </div>

                        {/* Nav link columns */}
                        <div className="col-span-12 lg:col-span-9">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                                {footerlinks?.slice(0, 4).map((column, index) => {
                                    const links = column.NavLink || [];
                                    const titleItem = links[0] as { Title?: string };
                                    const linkItems = links.slice(1) as FooterLink[];
                                    return (
                                        <div key={index}>
                                            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white mb-3">
                                                {titleItem?.Title}
                                            </p>
                                            <ul className="space-y-[10px]">
                                                {linkItems.map((link, i) => (
                                                    <li key={link.id || i}>
                                                        <Link
                                                            href={link.href || "/"}
                                                            target={link?.isExternal ? "_blank" : "_self"}
                                                            rel={link.isExternal ? "noopener noreferrer" : undefined}
                                                            className="text-[12px] lg:text-[13px] text-white/75 hover:text-white transition-colors duration-200 block"
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
                        </div>
                    </div>
                </div>

                {/* Separator */}
                <div className="relative z-1 container">
                    <div className="border-t border-white/7" />
                </div>

                {/* ────── Section 2: Address Strip (aligned to same grid) ────── */}
                <div className="relative z-1 container hidden lg:block py-7">
                    <div className="grid grid-cols-12 gap-8 xl:gap-12">

                        {/* CONTACT INFO — under logo */}
                        <div className="col-span-3">
                            {AddressInformation?.[0]?.Title && (
                                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white mb-1.5">
                                    {AddressInformation[0].Title}
                                </p>
                            )}
                            {AddressInformation?.[0]?.Description && (
                                <div
                                    className="custom-html-content text-[11px] text-white/75 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: AddressInformation[0].Description }}
                                />
                            )}
                        </div>

                        {/* INDIA + UNITED STATES — under nav columns */}
                        <div className="col-span-9">
                            <div className="grid grid-cols-4 gap-8">
                                {AddressInformation?.slice(1).filter(Boolean).map((item, i) => (
                                    <div key={i}>
                                        {item?.Title && (
                                            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white mb-1.5">
                                                {item.Title}
                                            </p>
                                        )}
                                        {item?.Description && (
                                            <div
                                                className="custom-html-content text-[11px] text-white/75 leading-relaxed"
                                                dangerouslySetInnerHTML={{ __html: item.Description }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Separator */}
                <div className="relative z-1 container">
                    <div className="border-t border-white/7" />
                </div>

                {/* ────── Section 3: Milestones + Copyright ────── */}
                <div className="relative z-1 container py-5 flex flex-col sm:flex-row items-center justify-between gap-5">
                    {/* Milestones */}
                    {(milestonestitle?.CommonTitle?.[0]?.Title || milestonesimage?.some((i) => i.Image?.url)) && (
                        <div className="flex flex-wrap items-center gap-4">
                            {milestonestitle?.CommonTitle?.[0]?.Title && (
                                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 whitespace-nowrap">
                                    {milestonestitle.CommonTitle[0].Title}
                                </span>
                            )}
                            <div className="flex flex-wrap gap-2 items-center">
                                {milestonesimage?.filter((m) => m.Image?.url).map((item, i) => (
                                    <div key={i} className="p-1.5 rounded-lg border border-white/7 hover:border-[#3C4CFF]/40 transition-colors duration-200">
                                        <Image
                                            src={item.Image!.url!}
                                            alt={item.Image!.alternativeText || ""}
                                            width={item.Image!.width || 100}
                                            height={item.Image!.height || 100}
                                            className="max-w-[44px] lg:max-w-[52px] h-auto object-contain"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Copyright */}
                    {CopyrightText && (
                        <p className="text-[12px] text-white/55 text-center sm:text-right">
                            {CopyrightText}
                        </p>
                    )}
                </div>

                {/* Bottom line */}
                <div className="h-px bg-linear-to-r from-transparent via-[#3C4CFF]/30 to-transparent" />
            </footer>
        </>
    );
}

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
    };
};

export default function Footer({ data }: FooterProps) {
    if (!data) return null;

    const { Logo, BackGroundImage, BackGroundImageMobile, AddressInfo, footerlinks, milestonestitle, milestonesimage } =
        data;

    return (
        <footer className="relative bg-[#111] text-white pt-20 pb-10 px-6 overflow-hidden">
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
                {/* col-span-3: Logo & tagline */}
                <div className="col-span-3 flex flex-col justify-start">
                    {Logo?.Image?.url && (
                        <Image
                            src={Logo.Image.url}
                            alt={Logo.Image.alternativeText || ""}
                            width={380}
                            height={47}
                            className="mb-3"
                        />
                    )}
                    <p className="text-base">We add Values!</p>
                </div>

                {/* offset col-span-1 */}
                <div className="col-span-1"></div>

                {/* col-span-2: Services */}
                {footerlinks?.slice(0, 4).map((column, index) => {
                    const links = column.NavLink || [];
                    const titleItem = links[0] as { Title?: string };
                    const linkItems = links.slice(1) as FooterLink[];

                    return (
                        <div key={index} className="col-span-2">
                            <h4 className="text-lg font-medium mb-3">{titleItem?.Title}</h4>
                            <ul className="space-y-2">
                                {linkItems.map((link, i) => (
                                    <li key={link.id || i}>
                                        <Link
                                            href={link.href || "/"}
                                            target={link.target || "_self"}
                                            rel={link.isExternal ? "noopener noreferrer" : undefined}
                                            className="text-sm text-gray-300 hover:text-white"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}

                {/* col-span-2: Contact Info (right side column) */}
                <div className="col-span-2">
                    <h4 className="text-lg font-medium mb-3">Contact Info</h4>
                    {AddressInfo?.map((item, i) => (
                        <div key={i} className="mb-4">
                            <h5 className="text-base font-semibold mb-1">{item.Title}</h5>
                            <div
                                className="text-sm text-gray-300"
                                dangerouslySetInnerHTML={{ __html: item.Description || "" }}
                            />
                        </div>
                    ))}
                </div>

                {/* Milestone Section */}
                {(milestonestitle?.CommonTitle?.[0]?.Title || milestonesimage?.some((i) => i.Image?.url)) && (
                    <div className="col-span-12 mt-12 text-center">
                        <h3 className="text-2xl font-semibold mb-6">{milestonestitle?.CommonTitle?.[0]?.Title}</h3>
                        <div className="flex flex-wrap justify-center gap-6">
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

                {/* Copyright */}
                <div className="col-span-12 mt-10 text-sm text-gray-400">© Addact - 2025 All Rights Reserved</div>
            </div>
        </footer>
    );
}

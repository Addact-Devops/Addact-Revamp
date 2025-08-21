"use client";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HeaderResponse } from "@/graphql/queries/header";

interface HeaderProps {
    headers: HeaderResponse;
}

const Header = ({ headers }: HeaderProps) => {
    const headerData = headers.headers[0];

    const pathname = usePathname();
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);

    const handleDropdownToggle = (title: string) => {
        setOpenDropdown((prev) => (prev === title ? null : title));
    };

    const dropdownRef = useRef<HTMLDivElement>(null);

    // close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                !(event.target as HTMLElement).closest("[data-dropdown-button]")
            ) {
                setOpenDropdown(null);
            }
        }

        if (openDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openDropdown]);

    useEffect(() => {
        // This runs whenever the route/path changes
        setOpenDropdown(null);
        setOpenMobileDropdown(null);
        setMobileMenuOpen(false);
    }, [pathname]);

    return (
        <header className="fixed top-0 w-full z-50 bg-[#0F0F0F]">
            <div className="mx-auto w-full flex items-center justify-between container px-4 py-4 lg:px-0 lg:py-0">
                <Link href="/">
                    {headerData?.HeaderLogo?.url ? (
                        <Image
                            src={headerData?.HeaderLogo?.url}
                            alt={headerData?.HeaderLogo?.alternativeText || "Company Logo"}
                            className="w-[100px] h-[13px] lg:w-[160px] lg:h-[20px] xl:w-[220px] xl:h-[27px]"
                            width={headerData?.HeaderLogo?.width}
                            height={headerData?.HeaderLogo?.height}
                        />
                    ) : null}
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center space-x-6">
                    {headerData?.main_navigations?.map((item) => {
                        const isActive = openDropdown === item.ReferenceTitle;

                        return (
                            <div key={item.ReferenceTitle} className="group mr-5 xl:mr-10">
                                <div className="flex flex-col items-center">
                                    <button
                                        onClick={() => handleDropdownToggle(item.ReferenceTitle)}
                                        data-dropdown-button
                                        className="flex items-center gap-1 text-[17px] xl:text-lg font-medium hover:text-blue-500 focus:outline-none transition-colors duration-200 cursor-pointer py-[46px]"
                                    >
                                        {item.ReferenceTitle}
                                        {isActive ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </button>

                                    {isActive && <div className="absolute bottom-0 w-[45px] h-[5px] bg-white" />}
                                </div>

                                {/* Dropdown Full Width */}
                                {/* Dropdown Full Width */}
                                <div
                                    ref={dropdownRef}
                                    className={`
    container absolute left-0 right-0 top-full w-full bg-[#0F0F0F] text-white shadow-lg z-40 !p-0 rounded-[20px] mt-[10px] border border-[#3C4CFF80]
    transform transition-all duration-500 ease-out
    ${isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}
  `}
                                >
                                    <div className="mx-auto p-[20px] md:pr-[20px] 2xl:pr-[60px] flex md:gap-[30px] 2xl:gap-[60px] items-center">
                                        {/* Left image */}
                                        <div className="w-[100%] relative md:max-w-[320px] 2xl:max-w-[375px]">
                                            <Image
                                                src={item.SubNavImage.url}
                                                alt={
                                                    item.SubNavImage.alternativeText ||
                                                    item.ReferenceTitle ||
                                                    "Dropdown image"
                                                }
                                                width={328}
                                                height={328}
                                                className="object-cover w-full h-full rounded-lg"
                                            />
                                            <div className="absolute inset-0 flex items-start justify-center text-white text-2xl font-semibold pt-[45px]">
                                                {item.ReferenceTitle}
                                            </div>
                                        </div>

                                        {/* Right grid */}
                                        <ul className="grid grid-cols-2 md:gap-x-[25px] xl:gap-x-[40px] 2xl:gap-x-[60px] md:gap-y-[25px] xl:gap-y-[40px] 2xl:gap-y-[50px] xl:py-0 2xl:py-[40px] h-fit">
                                            {item.SubNavLink.map((child) => (
                                                <li key={child.id}>
                                                    <Link
                                                        href={child.href}
                                                        target={child?.isExternal ? "_blank" : "_self"}
                                                        className="block"
                                                    >
                                                        <div className="flex items-start gap-[15px] 2xl:gap-[24px]">
                                                            {child.Icon?.url && (
                                                                <Image
                                                                    src={child.Icon.url}
                                                                    alt={child.Icon.alternativeText}
                                                                    width={child.Icon.width || 24}
                                                                    height={child.Icon.height || 24}
                                                                    className="md:w-[70px] 2xl:w-[100px] md:h-[70px] 2xl:h-[100px]"
                                                                />
                                                            )}
                                                            <div className="flex flex-col">
                                                                <div className="md:text-[20px] 2xl:text-[24px] pt-5px font-[500]">
                                                                    {child.label}
                                                                </div>
                                                                {child.SubDisc && (
                                                                    <span
                                                                        className="text-[14px] 2xl:text-[16px] mt-[8px] font-[400] block"
                                                                        style={{
                                                                            display: "-webkit-box",
                                                                            WebkitLineClamp: 4,
                                                                            WebkitBoxOrient: "vertical",
                                                                            overflow: "hidden",
                                                                            textOverflow: "ellipsis",
                                                                        }}
                                                                    >
                                                                        {child.SubDisc}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Contact Button */}
                    <Link
                        href={headerData?.contact_us[0]?.href}
                        className="ml-4 bg-[#3C4CFF] px-4 py-2 rounded-[6px] md:rounded-[8px] text-white lg:py-4 lg:px-7 font-[600] hover:bg-[#3440CB]"
                        target={headerData?.contact_us[0]?.isExternal ? "_blank" : "_self"}
                    >
                        {headerData?.contact_us[0]?.label}
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden flex items-center space-x-4">
                    <Link
                        href={headerData?.contact_us[0]?.href}
                        target={headerData?.contact_us[0]?.isExternal ? "_blank" : "_self"}
                        className="bg-[#3C4CFF] mr- px-[12px] py-[3px] rounded-[6px] text-white font-[600] text-[12px] hover:bg-[#3440CB]"
                    >
                        {headerData?.contact_us[0]?.label}
                    </Link>
                    <button onClick={() => setMobileMenuOpen(true)}>
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-50 bg-black text-white overflow-auto">
                    {/* Top Bar */}
                    <div className="flex items-center justify-between border-b border-gray-700 px-4 py-4">
                        <Link href="/">
                            <Image
                                src={headerData?.HeaderLogo?.url}
                                alt={headerData?.HeaderLogo?.alternativeText || "Company Logo"}
                                width={100}
                                height={30}
                            />
                        </Link>
                        <div className="flex items-center space-x-4">
                            <Link
                                href={headerData?.contact_us[0]?.href}
                                target={headerData?.contact_us[0]?.isExternal ? "_blank" : "_self"}
                                className="bg-[#3C4CFF] mr- px-[12px] py-[3px] rounded-[6px] text-white font-[600] text-[12px]"
                            >
                                {headerData?.contact_us[0]?.label}
                            </Link>
                            <button onClick={() => setMobileMenuOpen(false)}>
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Navigation Items */}
                    <div className="divide-y divide-gray-700">
                        {headerData?.main_navigations?.map((item) => {
                            const isOpen = openMobileDropdown === item.ReferenceTitle;
                            return (
                                <div key={item.ReferenceTitle}>
                                    <button
                                        onClick={() => setOpenMobileDropdown(isOpen ? null : item.ReferenceTitle)}
                                        className="w-full flex justify-between items-center px-4 py-5 text-[16px] font-medium cursor-pointer"
                                    >
                                        {item.ReferenceTitle}
                                        <ChevronDown
                                            size={20}
                                            className={`transform transition-transform duration-300 ${
                                                isOpen ? "rotate-180" : ""
                                            }`}
                                        />
                                    </button>
                                    {isOpen && (
                                        <ul className="px-4 pb-4 grid grid-cols-2 gap-4 text-sm bg-black">
                                            {item.SubNavLink.map((child) => (
                                                <li key={child.id}>
                                                    <Link
                                                        href={child.href}
                                                        target={child.isExternal ? "_blank" : "_self"}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            {child.Icon?.url && (
                                                                <Image
                                                                    src={child.Icon.url}
                                                                    alt={child.Icon.alternativeText}
                                                                    width={child.Icon.width || 20}
                                                                    height={child.Icon.height || 20}
                                                                    className="w-[40px] h-[40px] mt-1"
                                                                />
                                                            )}
                                                            <div className="flex flex-col">
                                                                <span className="font-medium text-[14px]md:text-[18px]">
                                                                    {child.label}
                                                                </span>
                                                                {/* {child.SubDisc && (
                                                                    <span className="text-xs text-gray-400 mt-1">
                                                                        {child.SubDisc}
                                                                    </span>
                                                                )} */}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;

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

    // Close dropdown on outside click
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

    return (
        <header className='bg-black text-white w-full fixed top-0 z-50'>
            <div className='container mx-auto flex items-center justify-between px-4 py-4 lg:px-0 lg:py-0'>
                <Link href='/'>
                    <Image
                        src={headerData?.HeaderLogo?.url}
                        alt={headerData?.HeaderLogo?.alternativeText || "Company Logo"}
                        className='w-[100px] h-[13px] lg:w-[220px] lg:h-[27px]'
                        width={headerData?.HeaderLogo?.width}
                        height={headerData?.HeaderLogo?.height}
                    />
                </Link>

                {/* Desktop Nav */}
                <div className='hidden lg:flex items-center space-x-6 relative'>
                    {headerData?.main_navigations?.map((item) => {
                        const isActive = openDropdown === item.ReferenceTitle;

                        return (
                            <div key={item.ReferenceTitle} className='group mr-10'>
                                <div className='relative flex flex-col items-center'>
                                    <button
                                        onClick={() => handleDropdownToggle(item.ReferenceTitle)}
                                        data-dropdown-button
                                        className={`flex items-center gap-1 text-lg py-[46px] font-medium hover:text-blue-500 focus:outline-none transition-colors duration-200 cursor-pointer`}
                                    >
                                        {item.ReferenceTitle}
                                        {isActive ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </button>

                                    {isActive && <div className='absolute bottom-0 w-[45px] h-[5px] bg-white' />}
                                </div>

                                {/* Only render dropdown once, positioned at far-left */}
                                {isActive && (
                                    <div
                                        ref={dropdownRef}
                                        className='absolute left-0 top-[112px] mt-2 bg-black border border-gray-700 p-4 shadow-lg flex gap-8 w-[610px] z-40'
                                    >
                                        <div className='w-1/2 relative'>
                                            <Image
                                                src={item.SubNavImage.url}
                                                alt={
                                                    item.SubNavImage.alternativeText ||
                                                    item.ReferenceTitle ||
                                                    "Dropdown image"
                                                }
                                                width={328}
                                                height={328}
                                                className='object-cover w-full h-full'
                                            />

                                            <div className='absolute bottom-4 left-4 text-white text-3xl font-semibold'>
                                                {item.ReferenceTitle}
                                            </div>
                                        </div>
                                        <ul className='w-1/2 text-sm space-y-2 self-center'>
                                            {item.SubNavLink.map((child) => (
                                                <li
                                                    key={child.id}
                                                    className='hover:text-blue-400 cursor-pointer text-lg font-medium leading-7 mb-4'
                                                >
                                                    <Link href={child.href} target={child.target}>
                                                        {child.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    <Link
                        href={headerData?.contact_us[0]?.href}
                        className={`ml-4 bg-blue-600 px-4 py-2 rounded text-white lg:py-4 lg:px-7 ${
                            pathname === headerData?.contact_us[0]?.href ? "border-b-2 border-white" : ""
                        }`}
                    >
                        {headerData?.contact_us[0]?.label}
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className='lg:hidden flex items-center space-x-4'>
                    <Link
                        href={headerData?.contact_us[0]?.href}
                        className='bg-blue-600 mr- px-4 py-2 rounded text-white text-sm'
                    >
                        {headerData?.contact_us[0]?.label}
                    </Link>
                    <button onClick={() => setMobileMenuOpen(true)}>
                        <Menu className='w-6 h-6' />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className='lg:hidden fixed inset-0 z-50 bg-black text-white overflow-auto'>
                    {/* Top Bar */}
                    <div className='flex items-center justify-between border-b border-gray-700 px-4 py-4'>
                        <Link href='/'>
                            <Image
                                src={headerData?.HeaderLogo?.url}
                                alt={headerData?.HeaderLogo?.alternativeText || "Company Logo"}
                                width={100}
                                height={30}
                            />
                        </Link>
                        <div className='flex items-center space-x-4'>
                            <Link
                                href={headerData?.contact_us[0]?.href}
                                className='bg-blue-600 text-sm px-4 py-2 rounded font-medium hover:bg-blue-500'
                            >
                                {headerData?.contact_us[0]?.label}
                            </Link>
                            <button onClick={() => setMobileMenuOpen(false)}>
                                <X className='w-6 h-6' />
                            </button>
                        </div>
                    </div>

                    {/* Navigation Items */}
                    <div className='divide-y divide-gray-700'>
                        {headerData?.main_navigations?.map((item) => {
                            const isOpen = openMobileDropdown === item.ReferenceTitle;
                            return (
                                <div key={item.ReferenceTitle}>
                                    <button
                                        onClick={() => setOpenMobileDropdown(isOpen ? null : item.ReferenceTitle)}
                                        className='w-full flex justify-between items-center px-4 py-5 text-base font-medium cursor-pointer'
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
                                        <ul className='px-4 pb-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm bg-black'>
                                            {item.SubNavLink.map((child) => (
                                                <li key={child.id} className='hover:text-blue-400 cursor-pointer py-1'>
                                                    <Link href={child.href} target={child.target}>
                                                        {child.label}
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

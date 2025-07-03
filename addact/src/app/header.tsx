"use client";
import React, { useState } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/Logo.svg";
import bannerImg from "../../public/dropdown-banner.png";
import { usePathname } from "next/navigation";

const navItems = [
    {
        title: "Services",
        children: ["Sitecore", "Umbraco", "Contentful", "Kentico", "Contentstack", "Strapi"],
    },
    {
        title: "Hire Developers",
        children: ["Developer 01", "Developer 02", "Developer 03", "Developer 04", "Developer 05"],
    },
    {
        title: "Industries",
        children: ["Industry 01", "Industry 02", "Industry 03", "Industry 04", "Industry 05"],
    },
    {
        title: "Resources",
        children: ["Blog & Insights", "Case Study", "Press Release", "Events", "Webinar", "Videos"],
    },
    {
        title: "Company",
        children: ["About Us", "Careers", "Our Story", "Let's Talk"],
    },
];

const Header = () => {
    const pathname = usePathname();
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);

    const handleDropdownToggle = (title: string) => {
        setOpenDropdown((prev) => (prev === title ? null : title));
    };

    return (
        <header className='bg-black text-white w-full sticky top-0 z-50'>
            <div className='container mx-auto flex items-center justify-between px-4 py-4 lg:px-0 lg:py-0'>
                <Link href='/'>
                    <Image src={logo} alt='Logo' className='w-[100px] h-[30px] lg:w-[220px] lg:h-[27px]' />
                </Link>

                {/* Desktop Nav */}
                <div className='hidden lg:flex items-center space-x-6 relative'>
                    {navItems.map((item) => {
                        const isActive = openDropdown === item.title;
                        return (
                            <div key={item.title} className='group mr-10'>
                                <div className='relative flex flex-col items-center'>
                                    <button
                                        onClick={() => handleDropdownToggle(item.title)}
                                        className={`flex items-center gap-1 text-lg py-[46px] font-medium hover:text-blue-500 focus:outline-none transition-colors duration-200`}
                                    >
                                        {item.title}
                                        {isActive ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </button>

                                    {isActive && <div className='absolute bottom-0 w-[45px] h-[5px] bg-white' />}
                                </div>

                                {/* Only render dropdown once, positioned at far-left */}
                                {isActive && (
                                    <div className='absolute left-0 top-[112px] mt-2 bg-black border border-gray-700 p-4 shadow-lg flex gap-8 w-[812px] z-40'>
                                        <div className='w-1/2 relative'>
                                            <Image
                                                src={bannerImg}
                                                alt='banner'
                                                width={328}
                                                height={328}
                                                className='object-cover w-full h-full'
                                            />
                                            <div className='absolute bottom-4 left-4 text-white text-3xl font-semibold'>
                                                {item.title}
                                            </div>
                                        </div>
                                        <ul className='w-1/2 text-sm space-y-2 self-center'>
                                            {item.children.map((child) => (
                                                <li
                                                    key={child}
                                                    className='hover:text-blue-400 cursor-pointer text-lg font-medium leading-7 mb-4'
                                                >
                                                    {child}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    <Link
                        href='/contact'
                        className={`ml-4 bg-blue-600 px-4 py-2 rounded text-white lg:py-4 lg:px-7 ${
                            pathname === "/contact" ? "border-b-2 border-white" : ""
                        }`}
                    >
                        Contact us
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className='lg:hidden flex items-center space-x-4'>
                    <Link href='/contact' className='bg-blue-600 mr- px-4 py-2 rounded text-white text-sm'>
                        Contact us
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
                            <Image src={logo} alt='Logo' width={100} height={30} />
                        </Link>
                        <div className='flex items-center space-x-4'>
                            <Link
                                href='/contact'
                                className='bg-blue-600 text-sm px-4 py-2 rounded font-medium hover:bg-blue-500'
                            >
                                Contact us
                            </Link>
                            <button onClick={() => setMobileMenuOpen(false)}>
                                <X className='w-6 h-6' />
                            </button>
                        </div>
                    </div>

                    {/* Navigation Items */}
                    <div className='divide-y divide-gray-700'>
                        {navItems.map((item) => {
                            const isOpen = openMobileDropdown === item.title;
                            return (
                                <div key={item.title}>
                                    <button
                                        onClick={() => setOpenMobileDropdown(isOpen ? null : item.title)}
                                        className='w-full flex justify-between items-center px-4 py-5 text-base font-medium'
                                    >
                                        {item.title}
                                        <ChevronDown
                                            size={20}
                                            className={`transform transition-transform duration-300 ${
                                                isOpen ? "rotate-180" : ""
                                            }`}
                                        />
                                    </button>
                                    {isOpen && (
                                        <ul className='px-4 pb-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm bg-black'>
                                            {item.children.map((child) => (
                                                <li key={child} className='hover:text-blue-400 cursor-pointer py-1'>
                                                    {child}
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

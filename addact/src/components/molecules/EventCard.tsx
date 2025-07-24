"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

type EventCardProps = {
    title: string;
    date: string;
    location?: string;
    description: string;
    imageUrl: string;
    slug: string;
    pageType: string;
};

export default function EventCard({ title, date, location, description, imageUrl, slug, pageType }: EventCardProps) {
    const pathname = usePathname(); // e.g. “/event”
    const base = pathname.replace(/\/$/, ""); // strip trailing “/”
    const cleanSlug = slug.replace(/^\//, ""); // strip leading “/”
    const href = `${base}/${cleanSlug}`;

    const eventDate = new Date(date);
    const today = new Date();

    // Normalize to ignore time portion
    const isSameDay =
        eventDate.getFullYear() === today.getFullYear() &&
        eventDate.getMonth() === today.getMonth() &&
        eventDate.getDate() === today.getDate();

    let status = `Upcoming ${pageType}`;
    if (eventDate < today && !isSameDay) {
        status = `Past ${pageType}`;
    } else if (isSameDay) {
        status = `Ongoing ${pageType}`;
    }

    return (
        <div className='container flex flex-col md:flex-row gap-6 mb-24 rounded-2xl shadow-md overflow-hidden'>
            {/* Image */}
            <div className='md:w-1/3 px-3 w-full h-64 md:h-auto relative'>
                <Image src={imageUrl} alt={title} fill className='object-cover md:rounded-xl rounded-xl' />
            </div>

            {/* Content */}
            <div className='md:w-2/3 px-3 py-2 w-full flex flex-col justify-between'>
                <div className='space-y-2'>
                    <span className='bg-gray-200 text-sm px-3 py-1 mb-4 rounded-md inline-block w-max font-bold text-black'>
                        {status}
                    </span>

                    <h3 className='!font-bold text-white !text-3xl mb-6'>{title}</h3>

                    <div className='flex font-medium items-center gap-2 text-base text-white'>
                        <CalendarDays size={18} className='text-blue-600' />
                        <span>{date}</span>
                    </div>

                    {location && (
                        <div className='flex font-medium items-center gap-2 text-base text-white mb-6'>
                            <MapPin size={18} className='text-blue-600' />
                            <span>{location}</span>
                        </div>
                    )}

                    <p className='!text-base font-light line-clamp-4 text-white mb-4'>{description}</p>
                </div>

                <div className='mt-4'>
                    <Link
                        href={href}
                        className='inline-flex items-center px-6 py-3 bg-blue-600 font-medium text-white !text-base rounded-full hover:bg-indigo-700 transition'
                    >
                        Explore <ArrowRight size={16} className='ml-2' />
                    </Link>
                </div>
            </div>
        </div>
    );
}

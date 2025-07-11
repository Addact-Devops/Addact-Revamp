"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
    title?: string | null;
    description?: string | null;
    imageUrl?: string | null;
    imageAlt?: string | null;
    linkUrl?: string | null;
    showSearchbox?: boolean | null;
};

const DynamicHeroBanner = ({ title, description, imageUrl, imageAlt, linkUrl, showSearchbox }: Props) => {
    return (
        <section className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden text-white">
            {imageUrl && (
                <Image
                    src={imageUrl}
                    alt={imageAlt || "Banner Image"}
                    fill
                    className="object-cover object-center z-0"
                    priority
                />
            )}

            <div className="relative z-10 h-full flex items-center justify-center px-4">
                <div className="max-w-4xl text-center">
                    {title && (
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">{title}</h1>
                    )}

                    {description && (
                        <p
                            className="text-white/90 text-lg sm:text-xl leading-relaxed mb-8"
                            dangerouslySetInnerHTML={{ __html: description }}
                        />
                    )}

                    {linkUrl && (
                        <Link
                            href={linkUrl}
                            className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md text-lg font-medium transition"
                        >
                            Explore More
                        </Link>
                    )}

                    {showSearchbox && (
                        <div className="mt-8">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="px-4 py-2 rounded-md text-black w-full max-w-md"
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default DynamicHeroBanner;

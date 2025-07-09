import Image from "next/image";

type QuoteProps = {
    authorImage: {
        url: string;
        alternativeText?: string | null;
    };
    authorMessage: string;
    authorName: string;
};

export default function Quote({ authorImage, authorMessage, authorName }: QuoteProps) {
    return (
        <section className="py-[100px]">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative">
                    {/* Image */}
                    <div className="flex justify-center md:justify-start">
                        <Image
                            src={authorImage.url}
                            alt={authorImage.alternativeText || "Author"}
                            width={420}
                            height={420}
                            className="rounded-2xl object-cover w-full max-w-[420px] h-auto"
                        />
                    </div>

                    {/* Quote Section */}
                    <div className="relative text-left">
                        {/* Opening Quote */}
                        <div className="absolute -top-10 -left-10 text-[80px] font-serif text-black leading-none select-none">
                            “
                        </div>

                        {/* Quote Text */}
                        <p className="text-[28px] md:text-[32px] font-bold text-gray-900 leading-relaxed z-10 relative">
                            {authorMessage}
                        </p>

                        {/* Author */}
                        <p className="mt-6 text-pink-600 font-semibold text-[18px] z-10 relative">{authorName}</p>

                        {/* Closing Quote */}
                        <div className="absolute bottom-0 right-0 text-[80px] font-serif text-black leading-none select-none">
                            ”
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

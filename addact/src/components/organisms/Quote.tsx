import TechReveal from "../atom/TechReveal";
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
        <section className="my-[80px] sm:my-[120px]">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center relative">
                    {/* Image - full width of grid column */}
                    <div className="flex justify-center md:justify-start md:pr-[30px] relative">
                         {/* Subtle Glow behind image */}
                        <div className="absolute -inset-4 bg-[#3C4CFF]/5 blur-2xl rounded-3xl -z-10" />
                        <Image
                            src={authorImage.url}
                            alt={authorImage.alternativeText || "Author"}
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="rounded-3xl object-cover w-full h-auto shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
                        />
                    </div>

                    {/* Quote Section */}
                    <div className="relative text-left flex flex-col justify-center">
                        {/* Opening Quote */}
                        <div className="absolute -top-12 -left-4 text-[150px] sm:text-[180px] font-serif text-black/5 leading-none select-none italic">
                            “
                        </div>

                        {/* Quote Text */}
                        <div className="text-[20px] sm:text-[28px] 2xl:text-[34px] font-bold text-black leading-tight relative z-10 tracking-tight italic">
                            {authorMessage}
                        </div>

                        {/* Author */}
                        <div className="mt-[30px] text-[#3C4CFF] font-bold text-[22px] 2xl:text-[26px] relative z-10 tracking-wide uppercase">
                            <TechReveal text={authorName} duration={1} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

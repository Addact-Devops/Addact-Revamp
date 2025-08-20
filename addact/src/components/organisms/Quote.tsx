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
        <section className="my-[60px] sm:my-[60px]">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative">
                    {/* Image - full width of grid column */}
                    <div className="flex justify-center md:justify-start md:pr-[30px]">
                        <Image
                            src={authorImage.url}
                            alt={authorImage.alternativeText || "Author"}
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="rounded-2xl object-cover w-full h-auto"
                        />
                    </div>

                    {/* Quote Section */}
                    <div className="relative text-left">
                        {/* Opening Quote */}
                        <div className="absolute -top-6 left-0 text-[120px] sm:text-[80px] md:text-[100px] font-serif text-black leading-none select-none">
                            “
                        </div>

                        {/* Quote Text */}
                        <div className="text-[18px] sm:text-[25px] 2xl:text-[30px] font-bold text-black leading-[1.6] px-[60px] relative z-10">
                            {authorMessage}
                        </div>

                        {/* Author */}
                        <p className="mt-[20px] text-[#3C4CFF] font-medium text-[20px] px-[60px] relative z-10">
                            {authorName}
                        </p>

                        {/* Closing Quote */}
                        <div
                            className="absolute -bottom-2 right-0 text-[120px] sm:text-[80px] md:text-[100px] font-serif text-black leading-none select-none transform scale-x-[-1] rotate-180
"
                        >
                            ”
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

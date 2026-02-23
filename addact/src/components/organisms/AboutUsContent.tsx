import Image from "next/image";
import RichText from "../atom/richText";

type Props = {
    subtitle: string;
    title: string;
    content: string;
    image: {
        url: string;
        alternativeText?: string | null;
    };
};

const AboutUsContent = ({ subtitle, title, content, image }: Props) => {
    return (
        <section className="py-[70px] sm:py-[90px]" id="overview">
            <div className="container">
                <div className="flex flex-col lg:flex-row items-center gap-[50px] lg:gap-[80px]">

                    {/* Left: Text */}
                    <div className="w-full lg:w-[55%]">
                        {/* Pill label */}
                        <div className="inline-flex items-center gap-[8px] bg-[#3C4CFF]/8 border border-[#3C4CFF]/20 text-[#3C4CFF] text-[12px] font-semibold uppercase tracking-[2px] px-[14px] py-[6px] rounded-full mb-[20px]">
                            <span className="w-[6px] h-[6px] rounded-full bg-[#3C4CFF] inline-block" />
                            {subtitle}
                        </div>

                        <h2 className="text-zinc-900 font-bold text-[28px] md:text-[40px] 2xl:text-[50px] leading-[1.15] mb-[16px]">
                            {title}
                        </h2>

                        <div className="w-[48px] h-[3px] rounded-full bg-[#3C4CFF] mb-[24px]" />

                        <div className="text-zinc-600 [&_p]:text-[16px] [&_p]:leading-[1.85] [&_p]:mb-[14px] [&_a]:text-zinc-600 [&_a]:no-underline">
                            <RichText html={content} />
                        </div>
                    </div>

                    {/* Right: Image */}
                    <div className="w-full lg:w-[45%] shrink-0">
                        <Image
                            src={image.url}
                            alt={image.alternativeText || "About Us"}
                            width={700}
                            height={520}
                            className="w-full h-[280px] sm:h-[360px] lg:h-[440px] rounded-2xl object-cover shadow-lg"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutUsContent;

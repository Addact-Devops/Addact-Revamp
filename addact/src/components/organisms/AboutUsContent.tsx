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
        <section className="py-[70px] sm:py-[90px] bg-white relative overflow-hidden" id="overview">
            {/* Ambient glow */}
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#3C4CFF]/4 blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#3C4CFF]/3 blur-[100px] pointer-events-none" />

            <div className="container relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-[50px] lg:gap-[80px]">

                    {/* Left: Text */}
                    <div className="w-full lg:w-[55%]">
                        {/* Subtitle label */}
                        <p className="text-[#3C4CFF] text-[12px] font-semibold uppercase tracking-[2px] mb-5">
                            {subtitle}
                        </p>

                        <h2 className="text-zinc-900 font-bold text-[28px] md:text-[40px] 2xl:text-[50px] leading-[1.15] mb-6">
                            {title}
                        </h2>

                        {/* Blue underline accent */}
                        <div className="w-12 h-[3px] bg-[#3C4CFF] rounded-full mb-6" />

                        <div className="text-zinc-600 [&_p]:text-[16px] [&_p]:leading-[1.85] [&_p]:mb-[14px] [&_a]:text-zinc-600 [&_a]:no-underline">
                            <RichText html={content} />
                        </div>
                    </div>

                    {/* Right: Image */}
                    <div className="w-full lg:w-[45%] shrink-0 relative">
                        {/* Decorative frame behind image */}
                        <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-[#3C4CFF]/20 pointer-events-none" />

                        <Image
                            src={image.url}
                            alt={image.alternativeText || "About Us"}
                            width={700}
                            height={520}
                            className="w-full h-[280px] sm:h-[360px] lg:h-[480px] rounded-2xl object-cover shadow-2xl shadow-black/10 relative z-10"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutUsContent;

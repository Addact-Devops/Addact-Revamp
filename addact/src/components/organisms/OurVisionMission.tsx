import Image from "next/image";

type ParagraphBlock = {
    type: "paragraph";
    children: {
        type: string;
        text: string;
    }[];
};

type Item = {
    SubTitle: string;
    Title: string;
    Description: ParagraphBlock[];
    Image: {
        url: string;
        alternativeText?: string | null;
    };
};

type Props = {
    data: Item[];
};

const icons = [
    <svg key="vision" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
    </svg>,
    <svg key="mission" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="6"/>
        <circle cx="12" cy="12" r="2"/>
    </svg>,
];

const OurVisionMission = ({ data }: Props) => {
    const getDescription = (blocks: ParagraphBlock[]): string => {
        return blocks
            ?.filter((b) => b.type === "paragraph")
            .map((b) => b.children.map((c) => c.text).join(""))
            .join(" ");
    };

    return (
        <section className="py-[70px] sm:py-[90px] bg-[#F5F7FF]" id="vision-mission">
            <div className="container">
                {/* Section Header */}
                <div className="text-center mb-[50px] md:mb-[60px]">
                    <h2 className="text-zinc-900 font-bold text-[28px] md:text-[38px] 2xl:text-[48px] leading-tight">
                        Vision &amp; Mission
                    </h2>
                    <div className="w-[48px] h-[3px] rounded-full bg-[#3C4CFF] mx-auto mt-[14px]" />
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] lg:gap-[28px]">
                    {data?.map((item, index) => {
                        const description = getDescription(item.Description);

                        return (
                            <div
                                key={index}
                                className="group bg-white border border-zinc-100 rounded-2xl overflow-hidden hover:border-[#3C4CFF]/30 hover:shadow-lg transition-all duration-300"
                            >
                                {/* Image */}
                                <div className="relative w-full h-[220px] sm:h-[260px] overflow-hidden">
                                    <Image
                                        src={item.Image.url}
                                        alt={item.Image.alternativeText || item.Title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />

                                    {/* Floating chip */}
                                    <div className="absolute top-[14px] left-[14px] bg-[#3C4CFF] text-white text-[11px] font-semibold uppercase tracking-widest px-[12px] py-[5px] rounded-full shadow-sm">
                                        {item.SubTitle}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-[28px] sm:p-[36px]">
                                    {/* Icon */}
                                    <div className="w-[44px] h-[44px] rounded-xl bg-[#3C4CFF]/10 text-[#3C4CFF] flex items-center justify-center mb-[16px]">
                                        {icons[index] ?? icons[0]}
                                    </div>

                                    <h3 className="text-zinc-900 font-bold text-[22px] md:text-[26px] leading-tight mb-[10px]">
                                        {item.Title}
                                    </h3>

                                    <div className="w-[36px] h-[3px] rounded-full bg-[#3C4CFF] mb-[16px]" />

                                    <p className="text-zinc-600 text-[15px] md:text-[16px] leading-[1.85]">
                                        {description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default OurVisionMission;

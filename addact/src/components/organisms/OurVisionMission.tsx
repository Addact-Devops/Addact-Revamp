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
    </svg>,
    <svg key="mission" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v8M8 12h8" />
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
                    <h2 className="text-black font-bold text-[28px] md:text-[38px] 2xl:text-[48px] leading-tight mb-0">
                        Vision &amp; Mission
                    </h2>
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
                                </div>

                                {/* Content */}
                                <div className="p-[28px] sm:p-[36px]">
                                    {/* Icon */}
                                    <div className="text-[#3C4CFF] flex items-center mb-[16px]">
                                        {icons[index] ?? icons[0]}
                                    </div>

                                    <h3 className="text-black font-bold text-[22px] md:text-[26px] leading-tight mb-[16px]">
                                        {item.Title}
                                    </h3>

                                    <p className="text-black text-[15px] md:text-[16px] leading-[1.85]">
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

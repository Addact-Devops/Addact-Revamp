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

const OurVisionMission = ({ data }: Props) => {
    const getDescription = (blocks: ParagraphBlock[]): string => {
        return blocks
            ?.filter((b) => b.type === "paragraph")
            .map((b) => b.children.map((c) => c.text).join(""))
            .join(" ");
    };

    return (
        <section className="py-[70px] sm:py-[90px] bg-[#f8f9ff] relative overflow-hidden" id="vision-mission">
            {/* Top subtle border */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#3C4CFF]/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#3C4CFF]/20 to-transparent" />

            {/* Ambient blobs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#3C4CFF]/4 blur-[100px] pointer-events-none" />

            <div className="container relative z-10">
                {/* Section Header */}
                <div className="text-center mb-[50px] md:mb-[70px]">
                    <h2 className="text-black font-bold text-[28px] md:text-[38px] 2xl:text-[48px] leading-tight">
                        Vision & Mission
                    </h2>
                    <div className="flex justify-center mt-4">
                        <div className="w-10 h-[3px] bg-[#3C4CFF] rounded-full" />
                    </div>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {data?.map((item, index) => {
                        const description = getDescription(item.Description);

                        return (
                            <div
                                key={index}
                                className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-[#3C4CFF]/10 hover:border-[#3C4CFF]/25 transition-all duration-500 hover:-translate-y-1"
                            >
                                {/* Gradient top bar */}
                                <div className="h-[3px] w-full bg-gradient-to-r from-[#3C4CFF] to-[#6C7FFF]" />

                                {/* Image */}
                                <div className="relative w-full h-[220px] sm:h-[260px] overflow-hidden">
                                    <Image
                                        src={item.Image.url}
                                        alt={item.Image.alternativeText || item.Title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="p-7 sm:p-9">
    
                                    <h3 className="text-black font-bold text-[22px] md:text-[26px] leading-tight mb-4 group-hover:text-[#3C4CFF] transition-colors duration-300">
                                        {item.Title}
                                    </h3>

                                    {/* Animated divider */}
                                    <div className="w-8 h-[2px] bg-[#3C4CFF]/25 rounded-full mb-4 group-hover:w-12 group-hover:bg-[#3C4CFF]/60 transition-all duration-500" />

                                    <p className="text-zinc-500 text-[15px] md:text-[16px] leading-[1.85]">
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

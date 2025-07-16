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
    const renderText = (blocks: ParagraphBlock[]) => {
        return blocks?.map((block, i) => {
            if (block.type === "paragraph") {
                return (
                    <p key={i} className="text-[#000] mb-[30px] md:mb-0">
                        {block.children.map((child) => child.text)}
                    </p>
                );
            }
            return null;
        });
    };

    return (
        <section className="my-[60px] sm:my-[100px]">
            <div className="container">
                <div className="bg-white px-[20px] lg:px-[100px] py-[15px] lg:py-[60px] rounded-2xl flex flex-col gap-[60px]">
                    {data.map((item, index) => {
                        const isEven = index % 2 === 0;

                        return (
                            <div
                                key={index}
                                className={`flex flex-col md:flex-row ${
                                    !isEven ? "md:flex-row-reverse" : ""
                                } justify-between items-center`}
                            >
                                {/* Content with inner spacing */}
                                <div
                                    className={`w-full md:w-[50%] text-left ${
                                        isEven ? "md:pr-[60px]" : "md:pl-[60px]"
                                    }`}
                                >
                                    <p className="text-[#e97777] text-[17px] mb-[15px] leading-[26px]">
                                        {item.SubTitle}
                                    </p>
                                    <h3 className="text-[#000] font-[400] 2xl:mb-[40px] mb-[20px]">{item.Title}</h3>
                                    <div>{renderText(item.Description)}</div>
                                </div>

                                {/* Image side — stick to edge with no margin/padding */}
                                <div className="w-full md:w-[50%]">
                                    <Image
                                        src={item.Image.url}
                                        alt={item.Image.alternativeText || item.Title}
                                        width={600}
                                        height={400}
                                        className="rounded-xl object-cover w-full max-w-full"
                                    />
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

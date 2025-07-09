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
                    <p key={i} className="text-gray-700 text-base leading-relaxed mb-4">
                        {block.children.map((child) => child.text)}
                    </p>
                );
            }
            return null;
        });
    };

    return (
        <section className="bg-white py-[100px]">
            <div className="container">
                {data.map((item, index) => (
                    <div key={index} className="flex flex-col gap-6 text-center md:text-left">
                        <h4 className="text-pink-600 text-sm font-semibold uppercase">{item.SubTitle}</h4>
                        <h2 className="text-3xl font-bold text-gray-900">{item.Title}</h2>
                        <div>{renderText(item.Description)}</div>
                        <div className="flex justify-center md:justify-start mt-4">
                            <Image
                                src={item.Image.url}
                                alt={item.Image.alternativeText || item.Title}
                                width={600}
                                height={400}
                                className="rounded-xl object-cover w-full max-w-[600px]"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default OurVisionMission;

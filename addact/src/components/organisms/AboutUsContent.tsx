import Image from "next/image";

type ParagraphBlock = {
    type: "paragraph";
    children: {
        type: string;
        text: string;
    }[];
};

type Props = {
    subtitle: string;
    title: string;
    content: ParagraphBlock[];
    image: {
        url: string;
        alternativeText?: string | null;
    };
};

const AboutUsContent = ({ subtitle, title, content, image }: Props) => {
    const renderContent = () =>
        content?.map((block, i) => {
            if (block.type === "paragraph") {
                return (
                    <p key={i} className="text-[#000]">
                        {block.children.map((child) => child.text)}
                    </p>
                );
            }
            return null;
        });

    return (
        <section className="my-[60px] sm:my-[100px]" id="overview">
            <div className="container">
                <p className="text-[#3C4CFF] text-[17px] mb-[15px] leading-[26px]">{subtitle}</p>
                <h3 className="text-[#000] font-[400] 2xl:mb-[40px] mb-[30px]">{title}</h3>
                {renderContent()}
                <Image
                    src={image.url}
                    alt={image.alternativeText || "About Us Image"}
                    width={800}
                    height={500}
                    className="w-full h-auto max-h-[500px] rounded-xl object-cover lg:mt-[50px] mt-[30px]"
                />
            </div>
        </section>
    );
};

export default AboutUsContent;

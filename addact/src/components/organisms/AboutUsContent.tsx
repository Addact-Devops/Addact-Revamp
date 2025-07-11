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
                    <p key={i} className="text-gray-700 text-base leading-relaxed mb-4">
                        {block.children.map((child) => child.text)}
                    </p>
                );
            }
            return null;
        });

    return (
        <section className="my-[60px] sm:my-[100px]">
            <div className="container">
                <h4 className="text-pink-600 text-sm font-semibold uppercase mb-2">{subtitle}</h4>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
                {renderContent()}
                <Image
                    src={image.url}
                    alt={image.alternativeText || "About Us Image"}
                    width={800}
                    height={500}
                    className="w-full h-auto max-h-[500px] rounded-xl object-cover"
                />
            </div>
        </section>
    );
};

export default AboutUsContent;

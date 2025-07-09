import Image from "next/image";

type Props = {
    subtitle: string;
    title: string;
    content: any[];
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
                        {block.children.map((child: any, index: number) => child.text)}
                    </p>
                );
            }
            return null;
        });

    return (
        <section className="py-[100px]">
            <div className="container">
                <h4 className="text-pink-600 text-sm font-semibold uppercase mb-2">{subtitle}</h4>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
                {renderContent()}

                <Image
                    src={image.url}
                    alt={image.alternativeText || "About Us Image"}
                    width={500}
                    height={400}
                    className="rounded-xl object-cover w-full max-w-[500px]"
                />
            </div>
        </section>
    );
};

export default AboutUsContent;

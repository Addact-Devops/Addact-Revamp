import Image from "next/image";

type RichTextBlock = {
    type: string;
    children: {
        text: string;
    }[];
};

type ContactUsFormProps = {
    ContactUsFormBlock: {
        LeftTitle: string;
        LeftDescription: RichTextBlock[] | string[];
        LeftBackgroundImage: {
            url: string;
            alternativeText: string | null;
            width: number;
            height: number;
        };
        RightTitle: string;
        RightDescription: RichTextBlock[] | string[];
    };
};

// ✅ Type guard to check if array is RichTextBlock[]
function isRichTextBlocks(blocks: unknown): blocks is RichTextBlock[] {
    return (
        Array.isArray(blocks) &&
        blocks.length > 0 &&
        blocks[0] !== null &&
        typeof blocks[0] === "object" &&
        "type" in blocks[0] &&
        "children" in blocks[0]
    );
}

const renderRichText = (blocks: RichTextBlock[] | string[], isLeft = false) => {
    if (!blocks || blocks.length === 0) return null;

    if (typeof blocks[0] === "string") {
        return (blocks as string[]).map((text, index) => (
            <p key={index} className={`text-sm leading-relaxed mb-2 ${isLeft ? "text-white" : "text-gray-600"}`}>
                {text}
            </p>
        ));
    }

    if (isRichTextBlocks(blocks)) {
        return blocks.map((block, index) => {
            if (block.type === "paragraph") {
                return (
                    <p
                        key={index}
                        className={`text-sm leading-relaxed mb-2 ${isLeft ? "text-white" : "text-gray-600"}`}
                    >
                        {block.children?.map((child, childIndex) => (
                            <span key={childIndex}>{child.text}</span>
                        ))}
                    </p>
                );
            }
            return null;
        });
    }

    return null;
};

export default function ContactUsForm({ ContactUsFormBlock }: ContactUsFormProps) {
    const { LeftTitle, LeftDescription, LeftBackgroundImage, RightTitle, RightDescription } = ContactUsFormBlock;

    return (
        <section className="bg-white py-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-lg">
                    {/* Left side - 2/5 => ~40% */}
                    <div className="w-full md:w-2/5 relative min-h-[500px] md:min-h-[600px]">
                        <Image
                            src={LeftBackgroundImage.url}
                            alt={LeftBackgroundImage.alternativeText || ""}
                            fill
                            className="object-cover z-0"
                        />
                        <div className="absolute inset-0 z-10 p-10 flex flex-col justify-end text-white">
                            <h3 className="text-3xl font-bold mb-4">{LeftTitle}</h3>
                            {renderRichText(LeftDescription, true)}
                        </div>
                    </div>

                    {/* Right side - 3/5 => ~60% */}
                    <div className="w-full md:w-3/5 bg-gray-100 p-10 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">{RightTitle}</h3>
                        <div className="text-gray-600 mb-6">{renderRichText(RightDescription)}</div>

                        <form className="space-y-4">
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                            <input
                                type="text"
                                placeholder="Company Name"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                            <textarea
                                placeholder="Requirements"
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                            <button
                                type="submit"
                                className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-all"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

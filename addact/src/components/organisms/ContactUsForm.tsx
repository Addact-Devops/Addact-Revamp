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
            <p key={index} className={`text-[#000000] ${isLeft ? "text-white" : "text-[#000000]"}`}>
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
                        className={`text-base leading-relaxed mb-2 ${isLeft ? "text-white" : "text-[#000]"}`}
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
        <section
            className="container !px-0 md:px-[25px] pb-[60px] lg:pb-[100px] mt-[60px] lg:mt-[100px]"
            id="contact-page-form"
        >
            <div className="flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-md">
                {/* Left Side */}
                <div className="relative w-full md:w-[35%] min-h-[300px] sm:min-h-[400px] md:min-h-[unset]">
                    <div className="absolute inset-0">
                        <Image
                            src={LeftBackgroundImage.url}
                            alt={LeftBackgroundImage.alternativeText || ""}
                            fill
                            priority
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="absolute inset-0 z-10 p-6 sm:p-8 flex flex-col justify-end">
                        <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-semibold mb-4">{LeftTitle}</h2>
                        {renderRichText(LeftDescription, true)}
                    </div>
                </div>

                {/* Right Side */}
                <div className="w-full md:w-[65%] px-6 sm:px-[50px] xl:px-[110px] py-8 md:py-[40px] bg-white">
                    <h2 className="text-[#000000] text-xl sm:text-2xl md:text-3xl font-semibold mb-[10px]">
                        {RightTitle}
                    </h2>
                    <div className="mb-[50px]">{renderRichText(RightDescription)}</div>

                    <form className="space-y-10">
                        {/* Row 1 */}
                        <div className="flex flex-col md:flex-row gap-[40px]">
                            {/* Full Name */}
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    id="fullName"
                                    placeholder=" "
                                    className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-md text-black placeholder-transparent focus:outline-none focus:border-[#155dfc]"
                                />
                                <label
                                    htmlFor="fullName"
                                    className="absolute left-3 -top-3.5 bg-white px-1 mb-[5px] text-gray-500 text-sm transition-all duration-200 transform scale-90 origin-left
                                    peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-base peer-placeholder-shown:text-black 
                                    peer-focus:-top-3.5 peer-focus:scale-90 peer-focus:text-sm peer-focus:text-[#155dfc]"
                                >
                                    Full Name*
                                </label>
                            </div>

                            {/* Business Email */}
                            <div className="relative w-full">
                                <input
                                    type="email"
                                    id="email"
                                    placeholder=" "
                                    className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-md text-black placeholder-transparent focus:outline-none focus:border-[#155dfc]"
                                />
                                <label
                                    htmlFor="email"
                                    className="absolute left-3 -top-3.5 bg-white px-1 mb-[5px] text-gray-500 text-sm transition-all duration-200 transform scale-90 origin-left
                                    peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-base peer-placeholder-shown:text-black 
                                    peer-focus:-top-3.5 peer-focus:scale-90 peer-focus:text-sm peer-focus:text-[#155dfc]"
                                >
                                    Business Email*
                                </label>
                            </div>
                        </div>

                        {/* Company Name */}
                        <div className="relative">
                            <input
                                type="text"
                                id="companyName"
                                placeholder=" "
                                className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-md text-black placeholder-transparent focus:outline-none focus:border-[#155dfc]"
                            />
                            <label
                                htmlFor="companyName"
                                className="absolute left-3 -top-3.5 bg-white px-1 mb-[5px] text-gray-500 text-sm transition-all duration-200 transform scale-90 origin-left
                                peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-base peer-placeholder-shown:text-black 
                                peer-focus:-top-3.5 peer-focus:scale-90 peer-focus:text-sm peer-focus:text-[#155dfc]"
                            >
                                Company Name*
                            </label>
                        </div>

                        {/* Requirements */}
                        <div className="relative">
                            <textarea
                                id="requirements"
                                placeholder=" "
                                rows={4}
                                className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-md text-black placeholder-transparent focus:outline-none focus:border-[#155dfc]"
                            />
                            <label
                                htmlFor="requirements"
                                className="absolute left-3 -top-3.5 bg-white px-1 mb-[5px] text-gray-500 text-sm transition-all duration-200 transform scale-90 origin-left
                                peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-base peer-placeholder-shown:text-black 
                                peer-focus:-top-3.5 peer-focus:scale-90 peer-focus:text-sm peer-focus:text-[#155dfc]"
                            >
                                Describe Your Requirements (Optional)
                            </label>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-[20px] py-[10px] rounded-md font-semibold transition text-lg text-[15px]"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

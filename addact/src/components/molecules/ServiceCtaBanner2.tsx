import Link from "next/link";
import { RightArrowIcon } from "../atom/icons";
import { CTA2 } from "@/graphql/queries/getServieceDetail";

interface IProps {
    data: CTA2;
}

const ServiceCtaBanner2 = ({ data }: IProps) => {
    const backgroundImage = `url(${data.CtaImage.url})`;

    const cta = data.CtaLink;
    const href = cta.href;
    const label = cta.label;
    const target = cta?.isExternal ? "_blank" : "_self";

    return (
        <section data-ref="cta-banner2">
            <div
                className="text-white bg-center bg-cover bg-no-repeat w-full h-full shadow-md"
                style={{ backgroundImage }}
            >
                <div className="container">
                    <div className="flex flex-col md:justify-center md:items-center py-[40px] md:py-24 md:text-center">
                        <h2 className="!text-[28px] md:!text-[40px] 2xl:!text-[60px] 2xl:leading-[85px]">
                            {data.CtaTitle}
                        </h2>
                        <Link href={href} target={target}>
                            <button className="mt-[40px] md:mt-12 bg-white text-[#3C4CFF] text-[16px] lg:text-lg px-4 py-2 lg:px-5 lg:py-4 rounded hover:bg-gray-200 flex items-center gap-5 font-semibold cursor-pointer">
                                {label}
                                <RightArrowIcon />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceCtaBanner2;

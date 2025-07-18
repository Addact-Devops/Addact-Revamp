import Link from "next/link";
import { CTA } from "@/graphql/queries/getHomePage";
import { RightArrowIcon } from "../atom/icons";

interface IProps {
    data: CTA;
}

const CtaBanner = ({ data }: IProps) => {
    const backgroundImage = `url(${data?.CTAImage[0].Image?.url})`;

    const cta = data.CTALink[0];
    const href = cta.href;
    const label = cta.label;
    const target = cta.target === "_blank" ? "_blank" : undefined;

    return (
        <section>
            <div
                className='text-white bg-center bg-cover bg-no-repeat w-full h-full shadow-md'
                style={{ backgroundImage }}
            >
                <div className='container'>
                    <div className='py-24'>
                        <h2 className='!text-[28px] md:!text-5xl xl:!text-6xl w-[312px] md:w-[412px] lg:w-[750px] leading-[85px]'>
                            {data.Title[0].h2}
                        </h2>
                        <Link href={href} target={target}>
                            <button className='mt-12 bg-white text-[#3C4CFF] text-[16px] lg:text-lg px-4 py-2 lg:px-5 lg:py-4 rounded hover:bg-gray-200 flex items-center gap-5 font-semibold cursor-pointer'>
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

export default CtaBanner;

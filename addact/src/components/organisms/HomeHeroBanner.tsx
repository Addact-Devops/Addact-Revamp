import Link from "next/link";
import { BANNER } from "@/graphql/queries/getHomePage";
import RichText from "../atom/richText";
import VerticalLines from "../molecules/VerticalLines";

interface IProps {
    data: BANNER;
}

const HomeHeroBanner = ({ data }: IProps) => {
    const src = data?.Banner[0]?.BannerImage?.url ?? "#";
    return (
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden mt-[120px]">
            <video className="absolute top-0 left-0 w-full h-full object-cover z-0" autoPlay muted loop playsInline>
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="relative w-full h-full">
                    <VerticalLines />
                </div>
            </div>
            <div className="relative z-20 max-w-[1234px] w-full">
                <div className="text-white px-10 xl:px-0">
                    <h1 className="text-4xl sm:text-5xl lg:!text-[110px] !font-bold uppercase !leading-[47px] lg:!leading-[95px] mb-5 lg:mb-14">
                        {data?.Banner?.[0]?.BannerTitle}
                    </h1>

                    <div className="flex flex-col sm:flex-row sm:items-center lg:gap-9">
                        <div className="text-base sm:!text-base lg:!text-2xl font-medium max-w-[910px]">
                            <RichText html={data?.Banner?.[0]?.BannerDescription} />
                        </div>

                        <Link
                            href={data?.Banner?.[0]?.BannerLink.href}
                            target={data?.Banner?.[0]?.BannerLink?.isExternal ? "_blank" : "_self"}
                            className="inline-block group relative shrink-0"
                        >
                            <div className="relative w-[80px] h-[80px] lg:w-[120px] lg:h-[120px] rounded-full bg-[#3C4CFF] overflow-visible float-right">
                                <div className="absolute w-[80px] h-[80px] lg:w-[120px] lg:h-[120px] left-[-20px] hover:left-0 duration-100 lg:left-[-30px] top-1/2 -translate-y-1/2 text-white">
                                    <div className="hidden lg:block">
                                        <svg
                                            width="120"
                                            height="120"
                                            viewBox="0 0 120 120"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M72.1525 29.6502L102.502 60.0002L72.1525 90.3502"
                                                stroke="white"
                                                strokeWidth="4.3875"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M17.498 59.9999L101.648 59.9999"
                                                stroke="white"
                                                strokeWidth="4.3875"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                    <div className="block lg:hidden">
                                        <svg
                                            width="80"
                                            height="80"
                                            viewBox="0 0 80 80"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M48.1016 19.7668L68.3349 40.0002L48.1016 60.2335"
                                                stroke="white"
                                                strokeWidth="3"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M11.666 40H67.766"
                                                stroke="white"
                                                strokeWidth="3"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeHeroBanner;

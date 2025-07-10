import Image from "next/image";
import { Whyaddact } from "@/graphql/queries/getHomePage";
import RichText from "../atom/richText";

interface IProps {
    data: Whyaddact;
}

const WhyAddact = ({ data }: IProps) => {
    return (
        <section className='my-28 lg:my-48 xl:my-60'>
            <div className='container'>
                <div className='flex flex-col'>
                    <h2 className='border-after !text-[28px] md:!text-5xl xl:!text-6xl !pb-4 xl:!pb-10'>
                        {data?.Title[0].h2}
                    </h2>
                    <section>
                        <div className='mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6  mt-10 sm:mt-14 lg:mt-24'>
                            {data?.GlobalCard.slice(0, 6).map((service, index) => (
                                <div key={service.id} className='relative'>
                                    <div className='text-white p-7'>
                                        <div className='w-10 lg:w-14 lg:h-14 2xl:w-20 h-10 2xl:h-20 rounded-sm mb-4'>
                                            <Image
                                                src={service.Image.url}
                                                alt={service.Image.alternativeText ?? ""}
                                                width={service.Image.width}
                                                height={service.Image.height}
                                            />
                                        </div>
                                        <h3 className='text-lg lg:text-3xl my-7'>{service.Title}</h3>
                                        <p className='text-base 2xl:text-xl text-white'>
                                            <RichText html={service.Description.replace(/^<p>|<\/p>$/g, "")} />
                                        </p>
                                    </div>
                                    {(index + 1) % 3 !== 0 && (
                                        <div className='absolute top-1/4 right-0 h-3/4 w-[1px] bg-white opacity-40'></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </section>
    );
};

export default WhyAddact;

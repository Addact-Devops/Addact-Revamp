import Image from "next/image";
import RichText from "../atom/richText";

type Props = {
    subtitle: string;
    title: string;
    content: string;
    image: {
        url: string;
        alternativeText?: string | null;
    };
};

const AboutUsContent = ({ subtitle, title, content, image }: Props) => {
    return (
        <section className='my-[60px] sm:my-[100px]' id='overview'>
            <div className='container'>
                <p className='text-[#3C4CFF] text-[17px] mb-[15px] leading-[26px]'>{subtitle}</p>
                <h3 className='text-[#000] font-[400] 2xl:mb-[40px] mb-[30px]'>{title}</h3>
                <RichText html={content} />
                <Image
                    src={image.url}
                    alt={image.alternativeText || "About Us Image"}
                    width={800}
                    height={500}
                    className='w-full h-auto max-h-[500px] rounded-xl object-cover lg:mt-[50px] mt-[30px]'
                />
            </div>
        </section>
    );
};

export default AboutUsContent;

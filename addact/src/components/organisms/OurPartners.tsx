"use client";
import Image from "../atom/image";
import "../../styles/components/ourPartners.scss";

const logos = [
    "https://dfr7gdtg8j0s1.cloudfront.net/src/images/client-logo/ram-info.svg",
    "https://dfr7gdtg8j0s1.cloudfront.net/src/images/client-logo/sitecore.svg",
    "https://dfr7gdtg8j0s1.cloudfront.net/src/images/client-logo/quasar.svg",
    "https://dfr7gdtg8j0s1.cloudfront.net/src/images/client-logo/coveo.svg",
    "https://dfr7gdtg8j0s1.cloudfront.net/src/images/client-logo/blue-fountain-media.svg",
    "https://dfr7gdtg8j0s1.cloudfront.net/src/images/client-logo/pactera-edge.svg",
    "https://dfr7gdtg8j0s1.cloudfront.net/src/images/client-logo/mcd.svg",
    "https://dfr7gdtg8j0s1.cloudfront.net/src/images/client-logo/advaiya.svg",
    "https://dfr7gdtg8j0s1.cloudfront.net/src/images/client-logo/suyati.svg",
];

export default function OurPartners() {
    return (
        <section className='partners py-[100px] border-t border-b border-grayCustom'>
            <div className='container'>
                <h2 className='text-center text-white mb-[80px]'>Our Partners</h2>
            </div>

            <div className='overflow-hidden relative w-full py-4'>
                <div className='partners__marquee-content flex gap-[80px] animate-marquee w-fit'>
                    {logos.concat(logos).map((logo, index) => (
                        <div key={index} className='min-w-[160px] flex items-center justify-center'>
                            <Image
                                src={logo}
                                alt={`Partner Logo ${index + 1}`}
                                width={164}
                                height={64}
                                className='max-w-full w-full h-[64px] object-contain'
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

import Image from "next/image";
import { RichTextBlock } from "@/graphql/queries/getContactUs";

type ImageType = {
    url: string;
    alternativeText: string | null;
    width: number;
    height: number;
};

type AvailabilityItem = {
    Days: string;
    Availability: string;
};

type ContactUsTeamProps = {
    AddactTeamImage?: ImageType;
    TitleLine1?: string;
    TitleLine2?: string;
    Descriptions?: RichTextBlock[];
    ContactUsAvailability?: AvailabilityItem[];
};

const ContactUsTeam = ({
    AddactTeamImage,
    TitleLine1,
    TitleLine2,
    Descriptions,
    ContactUsAvailability,
}: ContactUsTeamProps) => {
    const safeArray = ContactUsAvailability || [];
    return (
        <section className="my-[60px] lg:my-[60px]" id="weekday-component">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center text-center md:text-left">
                {/* Left Image */}
                <div>
                    {AddactTeamImage && (
                        <Image
                            src={AddactTeamImage.url}
                            alt={AddactTeamImage.alternativeText || "Team Image"}
                            width={AddactTeamImage.width}
                            height={AddactTeamImage.height}
                            className="w-full h-auto rounded-2xl object-cover"
                        />
                    )}
                </div>

                {/* Right Content */}
                <div>
                    <h2 className="text-[#155dfc] mb-[5px]">{TitleLine1}</h2>
                    <h2 className="text-[#000000] mb-[15px]">{TitleLine2}</h2>

                    {/* Descriptions */}
                    {Descriptions?.map((block, index) => (
                        <p key={index} className="text-base text-[#111111] mb-4">
                            {block?.children?.map((child, idx) => (
                                <span key={idx}>{child?.text || ""}</span>
                            ))}
                        </p>
                    ))}

                    {/* Availability */}
                    {safeArray?.length > 0 && (
                        <div className="mt-[35px] flex flex-col gap-[20px]">
                            {safeArray.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex text-[25px] md:text-[35px] font-[600] gap-[60px] m-auto md:m-[0]"
                                >
                                    <span className="text-black">{item.Days}</span>
                                    <span
                                        className={
                                            item.Availability.toLowerCase() === "online"
                                                ? "text-[#155dfc]"
                                                : "text-black"
                                        }
                                    >
                                        {item.Availability}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ContactUsTeam;

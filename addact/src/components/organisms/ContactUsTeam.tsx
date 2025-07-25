import Image from "next/image";
import { Fragment } from "react";

type RichTextBlock = {
    type: string;
    children: {
        text: string;
    }[];
};

type ContactUsTeamProps = {
    AddactTeamImage: {
        url: string;
        alternativeText: string | null;
        width: number;
        height: number;
    } | null;
    TitleLine1: string | null;
    TitleLine2: string | null;
    Descriptions: RichTextBlock[] | null;
    ContactUsAvailability:
        | {
              Days: string;
              Availability: string;
          }[]
        | null;
};

export default function ContactUsTeam({
    AddactTeamImage,
    TitleLine1,
    TitleLine2,
    Descriptions,
    ContactUsAvailability,
}: ContactUsTeamProps) {
    return (
        <section className="container my-[60px] lg:my-[100px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[100px] items-center">
                {/* Left: Image */}
                {AddactTeamImage?.url && (
                    <div>
                        <Image
                            src={AddactTeamImage.url}
                            alt={AddactTeamImage.alternativeText || "Team"}
                            width={AddactTeamImage.width}
                            height={AddactTeamImage.height}
                            className="w-full rounded-[20px] object-cover max-h-[400px]"
                        />
                    </div>
                )}

                {/* Right: Content */}
                <div className="flex flex-col gap-4">
                    {TitleLine1 && <h2 className="text-2xl font-semibold text-blue-600">{TitleLine1}</h2>}
                    {TitleLine2 && <h2 className="text-2xl font-semibold text-black">{TitleLine2}</h2>}

                    {/* Descriptions */}
                    {Descriptions && Descriptions.length > 0 && (
                        <div className="text-gray-700 space-y-2">
                            {Descriptions.map((block, index) => (
                                <p key={index}>
                                    {block.children?.map((child, i) => (
                                        <Fragment key={i}>{child.text}</Fragment>
                                    ))}
                                </p>
                            ))}
                        </div>
                    )}

                    {/* Availability Grid */}
                    {ContactUsAvailability && ContactUsAvailability.length > 0 && (
                        <div className="mt-[35px] space-y-2">
                            {ContactUsAvailability.map((item, index) => (
                                <div key={index} className="flex gap-[60px]">
                                    <span className="text-[#000000]">{item.Days}</span>
                                    <span
                                        className={
                                            item.Availability?.toLowerCase?.() === "online"
                                                ? "text-blue-600 font-semibold"
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
}

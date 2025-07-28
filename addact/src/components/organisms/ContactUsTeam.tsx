// components/ContactUsTeam.tsx
import Image from "next/image";
import { RichTextBlock } from "@/graphql/queries/getContactUs"; // Use shared type

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
    AddactTeamImage: ImageType;
    TitleLine1: string;
    TitleLine2: string;
    Descriptions: RichTextBlock[];
    ContactUsAvailability: AvailabilityItem[];
};

const ContactUsTeam = ({
    AddactTeamImage,
    TitleLine1,
    TitleLine2,
    Descriptions,
    ContactUsAvailability,
}: ContactUsTeamProps) => {
    return (
        <section className="py-10 md:py-16 bg-white">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* Left Image */}
                <div>
                    <Image
                        src={AddactTeamImage.url}
                        alt={AddactTeamImage.alternativeText || "Team Image"}
                        width={AddactTeamImage.width}
                        height={AddactTeamImage.height}
                        className="w-full h-auto object-contain rounded-xl"
                    />
                </div>

                {/* Right Content */}
                <div>
                    <h4 className="text-red-600 text-lg font-semibold mb-2">{TitleLine1}</h4>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">{TitleLine2}</h2>

                    {/* Descriptions - rich text */}
                    {Descriptions?.map((block, index) => (
                        <p className="text-gray-700 mb-4" key={index}>
                            {block.children.map((child, idx) => (
                                <span key={idx}>{child.text}</span>
                            ))}
                        </p>
                    ))}

                    {/* Availability */}
                    {ContactUsAvailability?.length > 0 && (
                        <div className="mt-6">
                            <h5 className="text-lg font-semibold text-gray-700 mb-2">Availability:</h5>
                            <ul className="text-gray-600 space-y-1">
                                {ContactUsAvailability.map((item, idx) => (
                                    <li key={idx}>
                                        <span className="font-medium">{item.Days}:</span>{" "}
                                        <span
                                            className={
                                                item.Availability.toLowerCase() === "online"
                                                    ? "text-blue-600 font-semibold"
                                                    : ""
                                            }
                                        >
                                            {item.Availability}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ContactUsTeam;

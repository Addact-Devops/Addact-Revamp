import { gql } from "graphql-request";
import client from "../client";

type ParagraphBlock = {
    type: "paragraph";
    children: {
        type: string;
        text: string;
    }[];
};

export type VisionMissionItem = {
    SubTitle: string;
    Title: string;
    Description: ParagraphBlock[];
    Image: {
        url: string;
        alternativeText?: string | null;
    };
};

export type OurVisionMissionData = {
    aboutUs: {
        OurVisionMission: VisionMissionItem[];
    };
};

export const getOurVisionMission = async (): Promise<OurVisionMissionData> => {
    const query = gql`
        query AboutUs {
            aboutUs {
                OurVisionMission {
                    SubTitle
                    Title
                    Description
                    Image {
                        alternativeText
                        url
                    }
                }
            }
        }
    `;
    const data = await client.request(query);
    return data as OurVisionMissionData;
};

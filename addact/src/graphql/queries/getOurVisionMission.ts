import { gql } from "graphql-request";
import client from "../client";

export type VisionMissionItem = {
    SubTitle: string;
    Title: string;
    Description: any[];
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

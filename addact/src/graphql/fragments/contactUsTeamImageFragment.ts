import { Image } from "@/types/common";
// Re-using RichTextBlock from contactUsAddressFragment
import { type RichTextBlock } from "./contactUsAddressFragment";

export const CONTACT_US_TEAM_IMAGE_FIELDS = `
  AddactTeamImage {
    ...ImageFields
  }
  TitleLine1
  TitleLine2
  Descriptions
  ContactUsAvailability {
    Days
    Availability
  }
`;

export type ContactUsAvailabilityItem = {
  Days: string;
  Availability: string;
};

export type ContactUsTeamImageData = {
  AddactTeamImage: Image;
  TitleLine1: string;
  TitleLine2: string;
  Descriptions: RichTextBlock[];
  ContactUsAvailability: ContactUsAvailabilityItem[];
};

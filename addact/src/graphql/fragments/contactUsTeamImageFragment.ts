import { Image, type RichTextBlock } from "@/types/common";
import {
  CONTACT_US_AVAILABILITY_FIELDS,
  type ContactUsAvailabilityItem,
} from "./contactUsAvailabilityFragment";

export const CONTACT_US_TEAM_IMAGE_FIELDS = `
  AddactTeamImage {
    ...ImageFields
  }
  TitleLine1
  TitleLine2
  Descriptions
  ${CONTACT_US_AVAILABILITY_FIELDS}
`;

export type ContactUsTeamImageData = {
  AddactTeamImage: Image;
  TitleLine1: string;
  TitleLine2: string;
  Descriptions: RichTextBlock[];
  ContactUsAvailability: Required<ContactUsAvailabilityItem>[];
};

export type { ContactUsAvailabilityItem };

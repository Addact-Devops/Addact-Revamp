import { WEBINAR_AUTHOR_FIELDS, type WebinarAuthorType } from "./webinarHostFragment";

export const WEBINAR_SPEAKERS_FIELDS = `
  Speakers {
    ${WEBINAR_AUTHOR_FIELDS}
  }
`;

export type WebinarSpeakersType = {
  Speakers: WebinarAuthorType[];
};

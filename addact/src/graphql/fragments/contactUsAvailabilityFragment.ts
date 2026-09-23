export type ContactUsAvailabilityItem = {
  Days?: string;
  Availability?: string;
};

export const CONTACT_US_AVAILABILITY_FIELDS = `
  ContactUsAvailability {
    Days
    Availability
  }
`;

export type ContactUsAvailabilityType = {
  ContactUsAvailability?: ContactUsAvailabilityItem[];
};


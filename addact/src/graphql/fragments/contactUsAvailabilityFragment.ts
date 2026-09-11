export type ContactUsAvailabilityType = {
  ContactUsAvailability?: {
    Days?: string;
    Availability?: string;
  };
};

export const CONTACT_US_AVAILABILITY_FIELDS = `
  ContactUsAvailability {
    Days
    Availability
  }
`;


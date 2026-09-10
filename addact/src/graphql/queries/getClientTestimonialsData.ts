// src/graphql/queries/getClientTestimonialsData.ts

import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { CLIENT_TESTIMONIALS_FIELDS, type ClientTestimonialResponse } from "../fragments/clientTestimonialsFragment";
import client from "../client";

export type { TestimonialItem } from "../fragments/clientTestimonialsItemFragment";
export type { ClientTestimonialResponse } from "../fragments/clientTestimonialsFragment";

export const GET_CLIENT_TESTIMONIALS = gql`
  ${IMAGE_FRAGMENT}
  query GetClientTestimonials {
    ${CLIENT_TESTIMONIALS_FIELDS}
  }
`;

export async function getClientTestimonialsData(): Promise<
  ClientTestimonialResponse["clientTestimonials"][0] | null
> {
  const data = await client.request<ClientTestimonialResponse>(GET_CLIENT_TESTIMONIALS);
  return data.clientTestimonials?.[0] || null;
}

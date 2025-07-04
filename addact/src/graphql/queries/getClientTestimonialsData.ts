// src/graphql/queries/getClientTestimonialsData.ts

import { gql } from "graphql-request";
import client from "../client";

export const GET_CLIENT_TESTIMONIALS = gql`
    query GetClientTestimonials {
        clientTestimonials {
            Title
            Item {
                quote
                author_name
                author_position
                rating
            }
        }
    }
`;

export type TestimonialItem = {
    quote: {
        type: string;
        children: {
            text: string;
            type: string;
        }[];
    }[];
    author_name: string;
    author_position: string;
    rating: string; // Expected format: "star1", "star2", etc.
};

export type ClientTestimonialResponse = {
    clientTestimonials: {
        Title: string;
        Item: TestimonialItem[];
    }[];
};

export async function getClientTestimonialsData(): Promise<ClientTestimonialResponse["clientTestimonials"][0] | null> {
    const data = await client.request<ClientTestimonialResponse>(GET_CLIENT_TESTIMONIALS);
    return data.clientTestimonials?.[0] || null;
}

import { GraphQLClient } from "graphql-request";

const endpoint = process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_ENDPOINT!;

const client = new GraphQLClient(endpoint, {
    headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
    },
});

export default client;

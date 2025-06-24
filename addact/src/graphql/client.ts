// graphql/client.ts

import { GraphQLClient } from "graphql-request";

const endpoint = process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_ENDPOINT || "https://uatcms.addact.net/graphql";

const client = new GraphQLClient(endpoint);

export default client;

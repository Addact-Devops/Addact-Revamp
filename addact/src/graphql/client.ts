// import { GraphQLClient } from "graphql-request";

import { GraphQLClient } from "../../node_modules/graphql-request/build/entrypoints/main";

const endpoint = process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_ENDPOINT || "https://your-strapi.com/graphql";

const client = new GraphQLClient(endpoint, {
   headers: {
      // Add your token if needed
      // Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
   },
});

export default client;

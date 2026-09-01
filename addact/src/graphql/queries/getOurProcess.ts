import client from "../client";
import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { HEADING_FRAGMENT } from "../fragments/headingFragment";
import { OUR_PROCESS_FIELDS } from "../fragments/ourProcessFragment";

type Heading = {
  h1?: string;
  h2?: string;
  h3?: string;
  h4?: string;
  h5?: string;
  h6?: string;
};

type ProcessItem = {
  id: string;
  Title: string;
  Description: string;
};

export type OurProcessData = {
  home: {
    ourprocess: {
      Title: Heading[];
      ProcessData: ProcessItem[];
    };
  };
};

export const getOurProcess = async (): Promise<OurProcessData> => {
  const query = gql`
  ${IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
  ${HEADING_FRAGMENT}
    query Home {
      home {
        ourprocess { ${OUR_PROCESS_FIELDS} }
      }
    }
  `;

  const data = await client.request<OurProcessData>(query); // ✅ type assertion here
  return data;
};

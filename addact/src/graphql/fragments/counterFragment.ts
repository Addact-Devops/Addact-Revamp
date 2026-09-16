import { gql } from "graphql-request";

export const COUNTER_FRAGMENT = gql`
  fragment CounterFields on ComponentCounterCounter {
    id
    CounterTitle
    NumberCount
  }
`;

export type CounterFragmentType = {
  id: string;
  CounterTitle: string;
  NumberCount: number;
};

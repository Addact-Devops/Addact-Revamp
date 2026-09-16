import type { OurServiceList } from "./hireServiceListFragment";

export const HIRE_OUR_SERVICE_FIELDS = `
  ourService {
    ... on ComponentHomeHireServiceList { ...HireServiceListFields }
  }
`;

export type HireOurServiceType = {
  ourService: OurServiceList[];
};


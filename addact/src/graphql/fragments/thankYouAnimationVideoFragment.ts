import { ImageFragmentType } from "./imageFragment";

export type ThankYouAnimationVideoType = {
  AnimationVideo?: ImageFragmentType;
};

export interface AnimationVideo {
  alternativeText: string;
  name: string;
  url: string;
}

export const THANK_YOU_ANIMATION_VIDEO_FIELDS = `
  AnimationVideo {
    ...ImageFields
  }
`;



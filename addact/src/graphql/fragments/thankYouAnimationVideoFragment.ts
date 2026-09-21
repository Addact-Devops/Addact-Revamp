import type { ImageFragmentType } from "./imageFragment";

export type AnimationVideo = ImageFragmentType;

export type ThankYouAnimationVideoType = {
  AnimationVideo?: AnimationVideo;
};

export const THANK_YOU_ANIMATION_VIDEO_FIELDS = `
  AnimationVideo {
    ...ImageFields
  }
`;







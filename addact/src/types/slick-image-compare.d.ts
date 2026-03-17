declare module "slick-image-compare" {
  type SlickImageCompareOptions = {
    beforeImage?: string;
    afterImage?: string;
    startPos?: number;
    smooth?: boolean;
    smoothAmount?: number;
    animateOnClick?: boolean;
    handleMinDistance?: number;
    [key: string]: unknown;
  };

  export default class SlickImageCompare {
    constructor(target: Element | string, options?: SlickImageCompareOptions);
    destroy?(): void;
  }
}

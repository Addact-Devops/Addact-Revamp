import { CursorVariant } from "@/components/atom/Customcursor";
import { useCallback } from "react";

export function useCursor(variant: CursorVariant) {
  const onMouseEnter = useCallback(() => {
    window.dispatchEvent(new CustomEvent<CursorVariant>("cursor-variant", { detail: variant }));
  }, [variant]);

  const onMouseLeave = useCallback(() => {
    window.dispatchEvent(new CustomEvent<CursorVariant>("cursor-variant", { detail: "default" }));
  }, []);

  return { onMouseEnter, onMouseLeave };
}

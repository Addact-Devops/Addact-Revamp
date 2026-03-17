"use client";

import Orb from "../Orb";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

export default function AnimatedBackground({ children, className }: Props) {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* ReactBits Background */}
      <Orb hue={0} hoverIntensity={2} rotateOnHover forceHoverState={false} />
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

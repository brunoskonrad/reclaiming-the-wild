"use client";

import { BarContainer } from "./BarContainer";
import type { PointContainerProps } from "./type";

export function MagicContainer(props: PointContainerProps) {
  return (
    <div>
      <p>Magic</p>
      <BarContainer {...props} type="magic" />
    </div>
  );
}

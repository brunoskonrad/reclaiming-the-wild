"use client";

import { BarContainer } from "./BarContainer";
import type { PointContainerProps } from "./type";

export function StaminaContainer(props: PointContainerProps) {
  return (
    <div>
      <p>Stamina</p>
      <BarContainer {...props} type="stamina" />
    </div>
  );
}

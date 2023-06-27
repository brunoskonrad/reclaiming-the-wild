"use client";

import { Heart } from "../Heart";
import type { PointContainerProps, Point } from "./type";

export function HeartContainer({ point }: PointContainerProps) {
  const hearts = parseHearts(point);
  const temporaryHearts = parseTemporaryHearts(point);

  return (
    <div className="flex flex-row flex-wrap w-[300px] items-start">
      {hearts.map((heart, index) => (
        <Heart key={index} current={heart} type="health" />
      ))}

      {temporaryHearts.map((heart, index) => (
        <Heart key={index} current={heart} type="temporary" />
      ))}
    </div>
  );
}

export function parseHearts({ maximum, current }: Point): number[] {
  const numberOfHearts = Math.ceil(maximum / 4);
  return doTheTrick(numberOfHearts, current);
}

export function parseTemporaryHearts({ temporary }: Point): number[] {
  if (temporary === 0) return [];

  const numberOfHearts = Math.ceil(temporary / 4);
  return doTheTrick(numberOfHearts, temporary);
}

function doTheTrick(numberOfHearts: number, currentPoint: number): number[] {
  return new Array(numberOfHearts).fill(0).map((_, index) => {
    const something = currentPoint - index * 4;

    return Math.max(0, Math.min(4, something));
  });
}

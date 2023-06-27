"use client";

import clsx from "clsx";
import type { PointContainerProps } from "./type";

export interface BarContainerProps extends PointContainerProps {
  type: "magic" | "stamina";
}

export function BarContainer({
  point: { current, maximum },
  type,
}: BarContainerProps) {
  const percentage = (current / maximum) * 300;

  return (
    <div
      data-point={`${current}/${maximum}`}
      className={clsx(
        "h-8 bg-slate-600 w-[300px] rounded relative",
        "before:absolute before:left-[50%] before:right-[50%] before:w-[40px] before:ml-[-20px] before:top-1 hover:before:content-[attr(data-point)]"
      )}
    >
      <div
        style={{
          width: `${percentage}px`,
        }}
        className={clsx(
          "h-full rounded transition-all",
          { "bg-blue-600 ": type === "magic" },
          { "bg-green-600 ": type === "stamina" }
        )}
      />
    </div>
  );
}

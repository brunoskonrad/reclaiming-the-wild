"use client";

import clsx from "clsx";

type HeartType = "health" | "temporary";

export type HeartProps = {
  current: number;
  type: HeartType;
};

export function Heart({ current, type }: HeartProps) {
  return (
    <div
      className={clsx(
        "relative mask-heart rounded-full w-[30px] h-[30px] bg-slate-600",
        { "hover:scale-110": current > 0 },
        "flex flex-row flex-wrap" // Hack
      )}
    >
      {/* Definitely a hack. Like, legit. */}
      <HeartPiece type={type} visible={current >= 1} />
      <HeartPiece type={type} visible={current === 4} />
      <HeartPiece type={type} visible={current >= 2} />
      <HeartPiece type={type} visible={current >= 3} />
    </div>
  );
}

/**
 * TODO: This is plainly, simply a hack. I'll fix this in the future. Probably.
 */
function HeartPiece({ type, visible }: { type: HeartType; visible: boolean }) {
  return (
    <div
      className={clsx(
        "w-[15px] h-[15px]",
        {
          "bg-red-400": type === "health" && visible,
        },
        {
          "bg-yellow-500": type === "temporary" && visible,
        },
        {
          "bg-transparent": !visible,
        }
      )}
    ></div>
  );
}

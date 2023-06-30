import { clsx } from "clsx";

interface WrapperProps extends React.HTMLProps<HTMLDivElement> {}

export function Wrapper({ children, className, ...props }: WrapperProps) {
  return (
    <div
      className={clsx("m-auto px-2 lg:px-4 max-w-[1536px]", className)}
      {...props}
    >
      {children}
    </div>
  );
}

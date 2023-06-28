import { clsx } from "clsx";

interface WrapperProps extends React.HTMLProps<HTMLDivElement> {}

export function Wrapper({ children, className, ...props }: WrapperProps) {
  return (
    <div className={clsx("m-auto max-w-[1536px]", className)} {...props}>
      {children}
    </div>
  );
}

import { clsx } from "clsx";

interface WrapperProps extends React.HTMLProps<HTMLDivElement> {}

export function Wrapper({ children, className, ...props }: WrapperProps) {
  return (
    <div className={clsx("max-w-[1024px] m-auto", className)} {...props}>
      {children}
    </div>
  );
}

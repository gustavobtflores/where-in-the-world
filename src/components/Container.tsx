import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
  return <div className={`px-8 max-w-[1440px] mx-auto ${className}`}>{children}</div>;
}

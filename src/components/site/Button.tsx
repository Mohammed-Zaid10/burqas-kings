import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "label-xs inline-flex min-h-11 items-center justify-center gap-2 px-6 transition-colors duration-300 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const variants: Record<Variant, string> = {
  solid: "bg-foreground text-background hover:bg-foreground/85",
  outline: "border border-foreground/30 text-foreground hover:border-foreground hover:bg-foreground hover:text-background",
  ghost: "text-foreground hover:bg-muted",
};

const sizes: Record<Size, string> = { md: "min-h-11 px-6", lg: "min-h-14 px-9" };

export const btnClass = (variant: Variant = "solid", size: Size = "md", className?: string) =>
  cn(base, variants[variant], sizes[size], className);

export function Button({
  variant = "solid",
  size = "md",
  className,
  children,
  ...rest
}: ComponentProps<"button"> & { variant?: Variant; size?: Size; children: ReactNode }) {
  return (
    <button className={btnClass(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}

type AnyLinkProps = { variant?: Variant; size?: Size; className?: string; children: ReactNode } & Record<
  string,
  unknown
>;

const AnyLink = Link as unknown as (props: Record<string, unknown>) => ReactNode;

export function ButtonLink({ variant = "solid", size = "md", className, children, ...rest }: AnyLinkProps) {
  return (
    <AnyLink {...rest} className={btnClass(variant, size, className)}>
      {children}
    </AnyLink>
  );
}


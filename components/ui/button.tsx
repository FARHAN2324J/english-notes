import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import Link from "next/link";

type ButtonVariant =
  | "primary"
  | "accent"
  | "secondary"
  | "danger"
  | "icon";

type ButtonSize = "sm" | "md" | "lg";

type ButtonProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    children?: ReactNode;
  };

const baseClasses =
  "group inline-flex items-center justify-center gap-2 border-2 border-[#11110f] font-[var(--font-space-grotesk)] font-bold transition-[transform,background-color,box-shadow,color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#11110f] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[#11110f] text-[#f4f1e8] shadow-[3px_3px_0_#d7ff3f] hover:translate-x-[1px] hover:translate-y-[1px] hover:bg-[#11110f] hover:text-[#f4f1e8] hover:shadow-[2px_2px_0_#d7ff3f] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",

  accent:
    "bg-[#d7ff3f] text-[#11110f] shadow-[3px_3px_0_#11110f] hover:translate-x-[1px] hover:translate-y-[1px] hover:bg-[#d7ff3f] hover:text-[#11110f] hover:shadow-[2px_2px_0_#11110f] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",

  secondary:
    "bg-[#f4f1e8] text-[#11110f] shadow-[2px_2px_0_#11110f] hover:translate-x-[1px] hover:translate-y-[1px] hover:bg-[#f4f1e8] hover:text-[#11110f] hover:shadow-[1px_1px_0_#11110f] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",

  danger:
    "bg-[#e5484d] text-white shadow-[3px_3px_0_#11110f] hover:translate-x-[1px] hover:translate-y-[1px] hover:bg-[#e5484d] hover:text-white hover:shadow-[2px_2px_0_#11110f] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",

  icon:
    "size-10 shrink-0 rounded-lg bg-[#f4f1e8] p-0 text-[#11110f] shadow-[2px_2px_0_#11110f] hover:translate-x-[1px] hover:translate-y-[1px] hover:bg-[#11110f] hover:text-[#f4f1e8] hover:shadow-[1px_1px_0_#11110f] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
};

const sizeClasses: Record<
  Exclude<ButtonVariant, "icon">,
  Record<ButtonSize, string>
> = {
  primary: {
    sm: "min-h-9 rounded-lg px-3 text-xs",
    md: "min-h-10 rounded-lg px-4 text-sm",
    lg: "min-h-12 rounded-lg px-5 text-sm",
  },

  accent: {
    sm: "min-h-9 rounded-lg px-3 text-xs",
    md: "min-h-10 rounded-lg px-4 text-sm",
    lg: "min-h-12 rounded-lg px-5 text-sm",
  },

  secondary: {
    sm: "min-h-9 rounded-lg px-3 text-xs",
    md: "min-h-10 rounded-lg px-4 text-sm",
    lg: "min-h-12 rounded-lg px-5 text-sm",
  },

  danger: {
    sm: "min-h-9 rounded-lg px-3 text-xs",
    md: "min-h-10 rounded-lg px-4 text-sm",
    lg: "min-h-12 rounded-lg px-5 text-sm",
  },
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  children,
  ...props
}: ButtonProps) {
  const sizeClass =
    variant === "icon"
      ? ""
      : sizeClasses[variant][size];

  return (
    <button
      type={type}
      className={[
        baseClasses,
        variantClasses[variant],
        sizeClass,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}

type ButtonLinkProps = {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
};

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ariaLabel,
}: ButtonLinkProps) {
  const sizeClass =
    variant === "icon"
      ? ""
      : sizeClasses[variant][size];

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={[
        baseClasses,
        variantClasses[variant],
        sizeClass,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Link>
  );
}
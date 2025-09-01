import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:opacity-90",
        secondary: "bg-secondary text-secondary-foreground hover:opacity-90",
        ghost: "bg-transparent hover:bg-accent hover:text-accent-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:opacity-90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        sm: "h-8 px-3",
        md: "h-9 px-4",
        lg: "h-10 px-6",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);
export const Button = React.forwardRef(
  ({ className, variant, size, ...props }, ref) => {
    return _jsx("button", {
      className: cn(buttonVariants({ variant, size, className })),
      ref: ref,
      ...props,
    });
  },
);
Button.displayName = "Button";
export { buttonVariants };
export function ButtonScrollToBottom({
  scrollToBottom,
  isAtBottom,
  className,
  textClassName,
  ...props
}) {
  return _jsxs(Button, {
    variant: "outline",
    size: "icon",
    className: cn(
      "absolute right-4 top-1 z-10 bg-background transition-opacity duration-300 sm:right-8 md:top-2",
      isAtBottom ? "opacity-0" : "opacity-100",
      className,
    ),
    onClick: scrollToBottom,
    ...props,
    children: [
      _jsxs("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "16",
        height: "16",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": "true",
        children: [
          _jsx("title", { children: "Arrow Down" }),
          _jsx("path", { d: "m6 9 6 6 6-6" }),
        ],
      }),
      _jsx("span", {
        className: cn("sr-only", textClassName),
        children: "Scroll to bottom",
      }),
    ],
  });
}

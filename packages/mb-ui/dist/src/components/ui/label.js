"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "",
        required:
          'after:content-["*"] after:text-red-500 after:ml-1 after:text-lg after:font-bold after:leading-none',
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
const Label = React.forwardRef(({ className, variant, ...props }, ref) =>
  _jsx(LabelPrimitive.Root, {
    ref: ref,
    className: cn(labelVariants({ variant, className })),
    ...props,
  }),
);
Label.displayName = LabelPrimitive.Root.displayName;
export { Label };

"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "../../lib/utils";
const Checkbox = ({ className, ...props }) => {
  const custom = Boolean(props?.custom);
  return _jsx(CheckboxPrimitive.Root, {
    ref: props.ref,
    className: cn(
      "peer size-4 shrink-0 rounded-sm border border-primary ring-offset-background group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 group-data-[state=checked]:bg-primary group-data-[state=checked]:text-primary-foreground",
      className,
    ),
    ...props,
    children: _jsx(CheckboxPrimitive.Indicator, {
      forceMount: custom || undefined,
      asChild: custom || undefined,
      className: cn(
        "flex relative items-center justify-center text-current h-full transition-opacity",
      ),
      children:
        custom && props?.checkboxconfig
          ? _jsxs("div", {
              children: [
                _jsx("span", {
                  className:
                    "flex items-center transition-all opacity-0 group-data-[state=checked]:opacity-100 group-data-[state=checked]:relative absolute origin-right",
                  children: props?.checkboxconfig?.check,
                }),
                _jsx("span", {
                  className:
                    "flex items-center transition-all opacity-0 group-data-[state=unchecked]:opacity-100 group-data-[state=unchecked]:relative absolute origin-right",
                  children: props?.checkboxconfig?.uncheck,
                }),
                _jsx("span", {
                  className:
                    "flex items-center transition-all opacity-0 group-data-[state=indeterminate]:opacity-100 group-data-[state=indeterminate]:relative absolute",
                  children: props?.checkboxconfig?.indeterminate,
                }),
              ],
            })
          : _jsx(Check, { className: "size-4" }),
    }),
  });
};
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
export { Checkbox };

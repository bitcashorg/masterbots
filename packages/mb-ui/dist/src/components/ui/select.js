"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";
const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) =>
    _jsxs(SelectPrimitive.Trigger, {
      ref: ref,
      className: cn(
        "flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      ),
      ...props,
      children: [
        children,
        _jsx(SelectPrimitive.Icon, {
          asChild: true,
          children: _jsx(ChevronsUpDown, { className: "opacity-50" }),
        }),
      ],
    }),
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectContent = React.forwardRef(
  ({ className, children, position = "popper", ...props }, ref) =>
    _jsx(SelectPrimitive.Portal, {
      children: _jsx(SelectPrimitive.Content, {
        ref: ref,
        className: cn(
          "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80",
          position === "popper" && "translate-y-1",
          className,
        ),
        position: position,
        ...props,
        children: _jsx(SelectPrimitive.Viewport, {
          className: cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
          ),
          children: children,
        }),
      }),
    }),
);
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) =>
  _jsx(SelectPrimitive.Label, {
    ref: ref,
    className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className),
    ...props,
  }),
);
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) =>
  _jsxs(SelectPrimitive.Item, {
    ref: ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-muted focus:text-muted-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    ),
    ...props,
    children: [
      _jsx("span", {
        className:
          "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
        children: _jsx(SelectPrimitive.ItemIndicator, {
          children: _jsx(Check, { className: "size-4" }),
        }),
      }),
      _jsx(SelectPrimitive.ItemText, { children: children }),
    ],
  }),
);
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) =>
  _jsx(SelectPrimitive.Separator, {
    ref: ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props,
  }),
);
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};

"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as React from "react";
import { cn } from "../../lib/utils";
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) =>
  _jsx(DialogPrimitive.Overlay, {
    ref: ref,
    className: cn(
      "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    ),
    ...props,
  }),
);
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(
  ({ className, children, ...props }, ref) =>
    _jsxs(DialogPortal, {
      children: [
        _jsx(DialogOverlay, {}),
        _jsx(DialogPrimitive.Content, {
          ref: ref,
          className: cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]  border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
            className,
          ),
          ...props,
          children: children,
        }),
      ],
    }),
);
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = ({ className, children, ...props }) =>
  _jsxs("div", {
    className: cn(
      "flex flex-col space-y-1.5 md:text-center sm:text-left",
      className,
    ),
    ...props,
    children: [
      children,
      _jsxs(DialogPrimitive.Close, {
        className:
          "absolute right-[3.5rem] md:right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
        children: [
          _jsx("span", { className: "sr-only", children: "Close" }),
          _jsxs("svg", {
            className: "size-4",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            fill: "none",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            role: "img",
            "aria-labelledby": "dialog-close-title",
            children: [
              _jsx("title", { id: "dialog-close-title", children: "Close" }),
              _jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
              _jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" }),
            ],
          }),
        ],
      }),
    ],
  });
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) =>
  _jsx("div", {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    ),
    ...props,
  });
DialogFooter.displayName = "DialogFooter";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) =>
  _jsx(DialogPrimitive.Title, {
    ref: ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className,
    ),
    ...props,
  }),
);
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) =>
  _jsx(DialogPrimitive.Description, {
    ref: ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props,
  }),
);
DialogDescription.displayName = DialogPrimitive.Description.displayName;
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};

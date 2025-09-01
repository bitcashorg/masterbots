import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";
import { buttonVariants } from "./button";
const Pagination = ({ className, ...props }) =>
  _jsx("nav", {
    "aria-label": "pagination",
    className: cn("mx-auto flex w-full justify-center", className),
    ...props,
  });
const PaginationContent = React.forwardRef(({ className, ...props }, ref) =>
  _jsx("ul", {
    ref: ref,
    className: cn("flex flex-row items-center gap-1", className),
    ...props,
  }),
);
PaginationContent.displayName = "PaginationContent";
const PaginationItem = React.forwardRef(({ className, ...props }, ref) =>
  _jsx("li", { ref: ref, className: cn("", className), ...props }),
);
PaginationItem.displayName = "PaginationItem";
const PaginationLink = ({ className, isActive, size = "icon", ...props }) =>
  _jsx(PaginationItem, {
    children: _jsx("a", {
      "aria-current": isActive ? "page" : undefined,
      className: cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className,
      ),
      ...props,
    }),
  });
PaginationLink.displayName = "PaginationLink";
const PaginationPrevious = ({ className, ...props }) =>
  _jsxs(PaginationLink, {
    "aria-label": "Go to previous page",
    className: cn("gap-1 pl-2.5", className),
    ...props,
    children: [
      _jsx(ChevronLeft, { className: "size-4" }),
      _jsx("span", { children: "Previous" }),
    ],
  });
PaginationPrevious.displayName = "PaginationPrevious";
const PaginationNext = ({ className, ...props }) =>
  _jsxs(PaginationLink, {
    "aria-label": "Go to next page",
    className: cn("gap-1 pr-2.5", className),
    ...props,
    children: [
      _jsx("span", { children: "Next" }),
      _jsx(ChevronRight, { className: "size-4" }),
    ],
  });
const PaginationEllipsis = ({ className, ...props }) =>
  _jsxs("span", {
    "aria-hidden": true,
    className: cn("flex h-9 w-9 items-center justify-center", className),
    ...props,
    children: [
      _jsx(MoreHorizontal, { className: "size-4" }),
      _jsx("span", { className: "sr-only", children: "More pages" }),
    ],
  });
export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};

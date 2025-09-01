"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
export const ThreadPopupBase = React.forwardRef(
  (
    {
      title,
      isOpen,
      onClose,
      children,
      className,
      isBrowseView = false,
      headerActions,
    },
    ref,
  ) => {
    if (!isOpen) return null;
    return _jsx("div", {
      ref: ref,
      className: cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50",
        className,
      ),
      children: _jsxs("div", {
        className:
          "relative w-full max-w-4xl max-h-[90vh] mx-4 bg-background rounded-lg shadow-lg overflow-hidden",
        children: [
          _jsx("div", {
            className:
              "relative rounded-t-[8px] px-2.5 md:px-[32px] py-[20px] dark:bg-[#1E293B] bg-[#E4E4E7]",
            children: _jsxs("div", {
              className: "flex items-center justify-between gap-6",
              children: [
                _jsx("div", {
                  className:
                    "items-center block overflow-y-auto whitespace-pre-line max-h-28 scrollbar small-thumb",
                  children: _jsx("h2", {
                    className: "text-lg font-semibold",
                    children: title,
                  }),
                }),
                _jsxs("div", {
                  className: "flex items-center gap-2",
                  children: [
                    headerActions,
                    _jsxs(Button, {
                      variant: "ghost",
                      size: "sm",
                      onClick: onClose,
                      className: "h-8 w-8 p-0",
                      children: [
                        _jsx("span", {
                          className: "sr-only",
                          children: "Close",
                        }),
                        "\u00D7",
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
          _jsx("div", {
            className: cn(
              "flex flex-col gap-3 p-2.5 dark:bg-[#18181b] bg-white grow rounded-b-[8px] scrollbar h-full",
              isBrowseView ? "pb-2 md:pb-4" : "pb-[120px] md:pb-[180px]",
            ),
            children: children,
          }),
        ],
      }),
    });
  },
);
ThreadPopupBase.displayName = "ThreadPopupBase";

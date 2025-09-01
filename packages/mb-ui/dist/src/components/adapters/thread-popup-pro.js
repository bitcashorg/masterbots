"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { ThreadPopupBase } from "./thread-popup-base";
export const ThreadPopupPro = React.forwardRef(
  (
    {
      title,
      isOpen,
      onClose,
      children,
      className,
      isBrowseView = false,
      onConvertToDocument,
      showConvertButton = false,
      isConverting = false,
    },
    ref,
  ) => {
    const headerActions =
      showConvertButton && onConvertToDocument
        ? _jsx(Button, {
            variant: "outline",
            size: "sm",
            onClick: onConvertToDocument,
            disabled: isConverting,
            className: "text-xs",
            children: isConverting ? "Converting..." : "Convert to Document",
          })
        : null;
    return _jsx(ThreadPopupBase, {
      ref: ref,
      title: title,
      isOpen: isOpen,
      onClose: onClose,
      className: cn("animate-in fade-in-0 duration-200", className),
      isBrowseView: isBrowseView,
      headerActions: headerActions,
      children: children,
    });
  },
);
ThreadPopupPro.displayName = "ThreadPopupPro";

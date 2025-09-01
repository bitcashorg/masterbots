"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
export const ChatPanelPro = React.forwardRef(
  (
    {
      children,
      className,
      onSaveDocument,
      showSaveButton = false,
      isSaving = false,
      saveDialogOpen = false,
      onSaveDialogClose,
      saveDialogTitle = "Save Document",
      saveDialogContent,
    },
    ref,
  ) => {
    return _jsxs("div", {
      ref: ref,
      className: cn("flex flex-col h-full w-full relative", className),
      children: [
        showSaveButton &&
          onSaveDocument &&
          _jsx("div", {
            className: "flex justify-end p-4 border-b",
            children: _jsx(Button, {
              variant: "outline",
              size: "sm",
              onClick: onSaveDocument,
              disabled: isSaving,
              children: isSaving ? "Saving..." : "Save Document",
            }),
          }),
        _jsx("div", {
          className: "flex-1 overflow-hidden",
          children: children,
        }),
        saveDialogOpen &&
          onSaveDialogClose &&
          _jsx(Dialog, {
            open: saveDialogOpen,
            onOpenChange: onSaveDialogClose,
            children: _jsxs(DialogContent, {
              children: [
                _jsx(DialogHeader, {
                  children: _jsx(DialogTitle, { children: saveDialogTitle }),
                }),
                saveDialogContent,
              ],
            }),
          }),
      ],
    });
  },
);
ChatPanelPro.displayName = "ChatPanelPro";

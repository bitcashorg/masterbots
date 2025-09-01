import * as SheetPrimitive from "@radix-ui/react-dialog";
import { type VariantProps } from "class-variance-authority";
import * as React from "react";
declare const Sheet: React.FC<SheetPrimitive.DialogProps>;
declare const SheetTrigger: React.ForwardRefExoticComponent<
  SheetPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>
>;
declare const SheetClose: React.ForwardRefExoticComponent<
  SheetPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>
>;
declare const SheetPortal: React.FC<SheetPrimitive.DialogPortalProps>;
declare const SheetOverlay: React.ForwardRefExoticComponent<
  Omit<
    SheetPrimitive.DialogOverlayProps & React.RefAttributes<HTMLDivElement>,
    "ref"
  > &
    React.RefAttributes<HTMLDivElement>
>;
declare const sheetVariants: (
  props?:
    | ({
        side?: "top" | "bottom" | "left" | "right" | null | undefined;
      } & import("class-variance-authority/types").ClassProp)
    | undefined,
) => string;
interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}
declare const SheetContent: React.ForwardRefExoticComponent<
  SheetContentProps & React.RefAttributes<HTMLDivElement>
>;
declare const SheetHeader: {
  ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
  displayName: string;
};
declare const SheetFooter: {
  ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
  displayName: string;
};
declare const SheetTitle: React.ForwardRefExoticComponent<
  Omit<
    SheetPrimitive.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>,
    "ref"
  > &
    React.RefAttributes<HTMLHeadingElement>
>;
declare const SheetDescription: React.ForwardRefExoticComponent<
  Omit<
    SheetPrimitive.DialogDescriptionProps &
      React.RefAttributes<HTMLParagraphElement>,
    "ref"
  > &
    React.RefAttributes<HTMLParagraphElement>
>;
export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
};
//# sourceMappingURL=sheet.d.ts.map

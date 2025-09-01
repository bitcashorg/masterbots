import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import type * as React from "react";
declare const Checkbox: {
  ({
    className,
    ...props
  }: CheckboxPrimitive.CheckboxProps &
    React.RefAttributes<HTMLButtonElement> & {
      custom?: string;
      checkboxconfig?: {
        check?: React.ReactNode;
        uncheck?: React.ReactNode;
        indeterminate?: React.ReactNode;
      };
    }): import("react/jsx-runtime").JSX.Element;
  displayName: string | undefined;
};
export { Checkbox };
//# sourceMappingURL=checkbox.d.ts.map

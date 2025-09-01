import * as LabelPrimitive from "@radix-ui/react-label";
import { type VariantProps } from "class-variance-authority";
import * as React from "react";
declare const Label: React.ForwardRefExoticComponent<
  Omit<
    LabelPrimitive.LabelProps & React.RefAttributes<HTMLLabelElement>,
    "ref"
  > &
    VariantProps<
      (
        props?:
          | ({
              variant?: "default" | "required" | null | undefined;
            } & import("class-variance-authority/types").ClassProp)
          | undefined,
      ) => string
    > &
    React.RefAttributes<HTMLLabelElement>
>;
export { Label };
//# sourceMappingURL=label.d.ts.map

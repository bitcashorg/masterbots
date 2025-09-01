import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";
declare const ToggleGroup: React.ForwardRefExoticComponent<
  ((
    | Omit<
        ToggleGroupPrimitive.ToggleGroupSingleProps &
          React.RefAttributes<HTMLDivElement>,
        "ref"
      >
    | Omit<
        ToggleGroupPrimitive.ToggleGroupMultipleProps &
          React.RefAttributes<HTMLDivElement>,
        "ref"
      >
  ) &
    VariantProps<
      (
        props?:
          | ({
              variant?: "default" | "outline" | null | undefined;
              size?: "default" | "sm" | "lg" | null | undefined;
            } & import("class-variance-authority/types").ClassProp)
          | undefined,
      ) => string
    >) &
    React.RefAttributes<HTMLDivElement>
>;
declare const ToggleGroupItem: React.ForwardRefExoticComponent<
  Omit<
    ToggleGroupPrimitive.ToggleGroupItemProps &
      React.RefAttributes<HTMLButtonElement>,
    "ref"
  > &
    VariantProps<
      (
        props?:
          | ({
              variant?: "default" | "outline" | null | undefined;
              size?: "default" | "sm" | "lg" | null | undefined;
            } & import("class-variance-authority/types").ClassProp)
          | undefined,
      ) => string
    > &
    React.RefAttributes<HTMLButtonElement>
>;
export { ToggleGroup, ToggleGroupItem };
//# sourceMappingURL=toggle-group.d.ts.map

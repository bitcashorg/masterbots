import { type VariantProps } from "class-variance-authority";
import * as React from "react";
declare const buttonVariants: (
  props?:
    | ({
        variant?:
          | "default"
          | "secondary"
          | "ghost"
          | "destructive"
          | "outline"
          | null
          | undefined;
        size?: "sm" | "md" | "lg" | "icon" | null | undefined;
      } & import("class-variance-authority/types").ClassProp)
    | undefined,
) => string;
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}
export declare const Button: React.ForwardRefExoticComponent<
  ButtonProps & React.RefAttributes<HTMLButtonElement>
>;
export { buttonVariants };
interface ButtonScrollToBottomProps extends ButtonProps {
  scrollToBottom: () => void;
  isAtBottom?: boolean;
  textClassName?: string;
}
export declare function ButtonScrollToBottom({
  scrollToBottom,
  isAtBottom,
  className,
  textClassName,
  ...props
}: ButtonScrollToBottomProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=button.d.ts.map

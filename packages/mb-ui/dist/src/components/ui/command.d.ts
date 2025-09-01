import type { DialogProps } from "@radix-ui/react-dialog";
import * as React from "react";
declare const Command: React.ForwardRefExoticComponent<
  Omit<
    {
      children?: React.ReactNode;
    } & Pick<
      Pick<
        React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLDivElement>,
          HTMLDivElement
        >,
        "key" | keyof React.HTMLAttributes<HTMLDivElement>
      > & {
        ref?: React.Ref<HTMLDivElement>;
      } & {
        asChild?: boolean;
      },
      "key" | "asChild" | keyof React.HTMLAttributes<HTMLDivElement>
    > & {
        label?: string;
        shouldFilter?: boolean;
        filter?: (value: string, search: string, keywords?: string[]) => number;
        defaultValue?: string;
        value?: string;
        onValueChange?: (value: string) => void;
        loop?: boolean;
        disablePointerSelection?: boolean;
        vimBindings?: boolean;
      } & React.RefAttributes<HTMLDivElement>,
    "ref"
  > &
    React.RefAttributes<HTMLDivElement>
>;
interface CommandDialogProps extends DialogProps {}
declare const CommandDialog: ({
  children,
  ...props
}: CommandDialogProps) => import("react/jsx-runtime").JSX.Element;
declare const CommandInput: React.ForwardRefExoticComponent<
  Omit<
    Omit<
      Pick<
        Pick<
          React.DetailedHTMLProps<
            React.InputHTMLAttributes<HTMLInputElement>,
            HTMLInputElement
          >,
          "key" | keyof React.InputHTMLAttributes<HTMLInputElement>
        > & {
          ref?: React.Ref<HTMLInputElement>;
        } & {
          asChild?: boolean;
        },
        "key" | "asChild" | keyof React.InputHTMLAttributes<HTMLInputElement>
      >,
      "type" | "value" | "onChange"
    > & {
      value?: string;
      onValueChange?: (search: string) => void;
    } & React.RefAttributes<HTMLInputElement>,
    "ref"
  > &
    React.RefAttributes<HTMLInputElement>
>;
declare const CommandList: React.ForwardRefExoticComponent<
  Omit<
    {
      children?: React.ReactNode;
    } & Pick<
      Pick<
        React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLDivElement>,
          HTMLDivElement
        >,
        "key" | keyof React.HTMLAttributes<HTMLDivElement>
      > & {
        ref?: React.Ref<HTMLDivElement>;
      } & {
        asChild?: boolean;
      },
      "key" | "asChild" | keyof React.HTMLAttributes<HTMLDivElement>
    > & {
        label?: string;
      } & React.RefAttributes<HTMLDivElement>,
    "ref"
  > &
    React.RefAttributes<HTMLDivElement>
>;
declare const CommandEmpty: React.ForwardRefExoticComponent<
  Omit<
    {
      children?: React.ReactNode;
    } & Pick<
      Pick<
        React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLDivElement>,
          HTMLDivElement
        >,
        "key" | keyof React.HTMLAttributes<HTMLDivElement>
      > & {
        ref?: React.Ref<HTMLDivElement>;
      } & {
        asChild?: boolean;
      },
      "key" | "asChild" | keyof React.HTMLAttributes<HTMLDivElement>
    > &
      React.RefAttributes<HTMLDivElement>,
    "ref"
  > &
    React.RefAttributes<HTMLDivElement>
>;
declare const CommandGroup: React.ForwardRefExoticComponent<
  Omit<
    {
      children?: React.ReactNode;
    } & Omit<
      Pick<
        Pick<
          React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
          >,
          "key" | keyof React.HTMLAttributes<HTMLDivElement>
        > & {
          ref?: React.Ref<HTMLDivElement>;
        } & {
          asChild?: boolean;
        },
        "key" | "asChild" | keyof React.HTMLAttributes<HTMLDivElement>
      >,
      "value" | "heading"
    > & {
        heading?: React.ReactNode;
        value?: string;
        forceMount?: boolean;
      } & React.RefAttributes<HTMLDivElement>,
    "ref"
  > &
    React.RefAttributes<HTMLDivElement>
>;
declare const CommandSeparator: React.ForwardRefExoticComponent<
  Omit<
    Pick<
      Pick<
        React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLDivElement>,
          HTMLDivElement
        >,
        "key" | keyof React.HTMLAttributes<HTMLDivElement>
      > & {
        ref?: React.Ref<HTMLDivElement>;
      } & {
        asChild?: boolean;
      },
      "key" | "asChild" | keyof React.HTMLAttributes<HTMLDivElement>
    > & {
      alwaysRender?: boolean;
    } & React.RefAttributes<HTMLDivElement>,
    "ref"
  > &
    React.RefAttributes<HTMLDivElement>
>;
declare const CommandItem: React.ForwardRefExoticComponent<
  Omit<
    {
      children?: React.ReactNode;
    } & Omit<
      Pick<
        Pick<
          React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
          >,
          "key" | keyof React.HTMLAttributes<HTMLDivElement>
        > & {
          ref?: React.Ref<HTMLDivElement>;
        } & {
          asChild?: boolean;
        },
        "key" | "asChild" | keyof React.HTMLAttributes<HTMLDivElement>
      >,
      "disabled" | "value" | "onSelect"
    > & {
        disabled?: boolean;
        onSelect?: (value: string) => void;
        value?: string;
        keywords?: string[];
        forceMount?: boolean;
      } & React.RefAttributes<HTMLDivElement>,
    "ref"
  > &
    React.RefAttributes<HTMLDivElement>
>;
declare const CommandShortcut: {
  ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLSpanElement>): import("react/jsx-runtime").JSX.Element;
  displayName: string;
};
export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
};
//# sourceMappingURL=command.d.ts.map

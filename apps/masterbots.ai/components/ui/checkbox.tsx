"use client"

import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithRef<typeof CheckboxPrimitive.Root> & {
    custom?: boolean;
    customSettings?: {
      check?: React.ReactNode,
      uncheck?: React.ReactNode,
      indeterminate?: React.ReactNode,
    }
  }
>(({ className, ...props }, ref) => {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "peer size-4 shrink-0 rounded-sm border border-primary ring-offset-background group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 group-data-[state=checked]:bg-primary group-data-[state=checked]:text-primary-foreground",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        forceMount={props?.custom || undefined}
        asChild={props?.custom || undefined}
        className={cn(
          "flex relative items-center justify-center text-current h-full transition-opacity",
        )}
      >
        {
          props?.custom && props?.customSettings
            ? (
              <>
                <span className="flex items-center transition-all opacity-0 group-data-[state=checked]:opacity-100 group-data-[state=checked]:relative absolute origin-right">
                  {props?.customSettings?.check}
                </span>
                <span className="flex items-center transition-all opacity-0 group-data-[state=unchecked]:opacity-100 group-data-[state=unchecked]:relative absolute origin-right">
                  {props?.customSettings?.uncheck}
                </span>
                <span className="flex items-center transition-all opacity-0 group-data-[state=indeterminate]:opacity-100 group-data-[state=indeterminate]:relative absolute">
                  {props?.customSettings?.indeterminate}
                </span>
              </>
            )
            : <Check className="size-4" />
        }
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }

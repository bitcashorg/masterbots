"use client"

import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = ({
  className,
  ...props
}: React.ComponentProps<'button'> &
  typeof CheckboxPrimitive.Root & {
  custom?: true
  checkboxconfig?: {
    check?: React.ReactNode
    uncheck?: React.ReactNode
    indeterminate?: React.ReactNode
  }
}) => {
  return (
    <CheckboxPrimitive.Root
      ref={props.ref}
      className={cn(
        'peer size-4 shrink-0 rounded-sm border border-primary ring-offset-background group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 group-data-[state=checked]:bg-primary group-data-[state=checked]:text-primary-foreground',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        forceMount={props?.custom || undefined}
        asChild={props?.custom || undefined}
        className={cn(
          'flex relative items-center justify-center text-current h-full transition-opacity',
        )}
      >
        {props?.custom && props?.checkboxconfig ? (
          <div>
            <span className="flex items-center transition-all opacity-0 group-data-[state=checked]:opacity-100 group-data-[state=checked]:relative absolute origin-right">
              {props?.checkboxconfig?.check}
            </span>
            <span className="flex items-center transition-all opacity-0 group-data-[state=unchecked]:opacity-100 group-data-[state=unchecked]:relative absolute origin-right">
              {props?.checkboxconfig?.uncheck}
            </span>
            <span className="flex items-center transition-all opacity-0 group-data-[state=indeterminate]:opacity-100 group-data-[state=indeterminate]:relative absolute">
              {props?.checkboxconfig?.indeterminate}
            </span>
          </div>
        ) : (
          <Check className="size-4" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }

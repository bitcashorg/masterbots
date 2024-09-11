"use client"

import React, { forwardRef, useEffect, useRef } from 'react'
import { Checkbox as ShadcnCheckbox } from "@/components/shared/checkbox"
import { cn } from "@/lib/utils"

interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof ShadcnCheckbox> {
  label?: string;
  indeterminate?: boolean;
  wrapperClassName?: string;
}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ id, label, checked, onCheckedChange, className, disabled = false, indeterminate = false, wrapperClassName, ...props }, forwardedRef) => {
    const internalRef = useRef<HTMLButtonElement>(null);
    const ref = (forwardedRef as React.RefObject<HTMLButtonElement>) || internalRef;

    useEffect(() => {
      if (ref.current) {
        ref.current.indeterminate = indeterminate;
      }
    }, [ref, indeterminate]);

    return (
      <div className={cn("flex items-center space-x-2", wrapperClassName)}>
        <ShadcnCheckbox
          ref={ref}
          id={id}
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          className={className}
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            props.onClick?.(e);
          }}
          {...props}
        />
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "text-sm font-medium leading-none select-none",
              "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              disabled && "cursor-not-allowed opacity-70"
            )}
          >
            {label}
          </label>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox';
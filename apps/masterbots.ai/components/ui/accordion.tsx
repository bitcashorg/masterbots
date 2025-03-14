"use client"

import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = ({ className, ref, ...props }: AccordionPrimitive.AccordionItemProps & React.RefAttributes<HTMLDivElement>) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
)
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = ({ className, children, ref, ...props }: AccordionPrimitive.AccordionTriggerProps & React.RefAttributes<HTMLButtonElement>) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="size-4 shrink-0 !top-1 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
)
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = ({ className, children, ref, ...props }: AccordionPrimitive.AccordionContentProps & React.RefAttributes<HTMLDivElement>) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
)

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }


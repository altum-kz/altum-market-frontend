"use client"

import * as React from "react"
import { motion, type Transition } from "motion/react";

import { Accordion as AccordionPrimitive } from "radix-ui"

import { cn } from "@/shared/lib/utils"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("not-last:border-b", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-start justify-between rounded-lg border border-transparent py-2.5 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring disabled:pointer-events-none disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-6 **:data-[slot=accordion-trigger-icon]:text-muted-foreground",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon data-slot="accordion-trigger-icon" className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden" />
        <ChevronUpIcon data-slot="accordion-trigger-icon" className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

const ACCORDION_TRANSITION: Transition = {
    duration: 0.3,
    ease: [0.04, 0.62, 0.23, 0.98],
}

type ConflictingHandlers =
    | "onDrag"
    | "onDragStart"
    | "onDragEnd"
    | "onAnimationStart"
    | "onAnimationEnd"
    | "onAnimationIteration"

type AccordionContentInnerProps = Omit<React.ComponentProps<"div">, ConflictingHandlers> & {
    "data-state"?: "open" | "closed"
}

const AccordionContentInner = React.forwardRef<HTMLDivElement, AccordionContentInnerProps>(
    ({ children, className, style, "data-state": dataState, ...props }, ref) => {
        const isOpen = dataState === "open"

        return (
            <motion.div
                ref={ref}
                data-state={dataState}
                initial={false}
                animate={isOpen ? "open" : "closed"}
                variants={{
                    open: { height: "auto", opacity: 1 },
                    closed: { height: 0, opacity: 0 },
                }}
                transition={ACCORDION_TRANSITION}
                style={{ overflow: "hidden", ...style }}
                {...props}
            >
                <div
                    className={cn(
                        "pt-0 pb-2.5 text-sm [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
                        className
                    )}
                >
                    {children}
                </div>
            </motion.div>
        )
    }
)
AccordionContentInner.displayName = "AccordionContentInner"

function AccordionContent({
    className,
    children,
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
    return (
        <AccordionPrimitive.Content
            forceMount
            asChild
            data-slot="accordion-content"
            {...props}
        >
            <AccordionContentInner className={className}>
                {children}
            </AccordionContentInner>
        </AccordionPrimitive.Content>
    )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

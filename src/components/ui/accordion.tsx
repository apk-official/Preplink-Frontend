import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { LightbulbFilamentIcon } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <div
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-2 text-left text-sm font-medium transition-all outline-none cursor-default focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className
        )}
      >
        {children}
        <AccordionPrimitive.Trigger data-slot="accordion-trigger" {...props}>
          {" "}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-5 h-5 rounded-full flex items-center justify-center border border-[#131515] cursor-pointer">
                <LightbulbFilamentIcon
                  className="text-muted-foreground pointer-events-none size-4 shrink-0  transition-transform duration-200 cursor-pointer"
                  weight="bold"
                  size={12}
                  color="#131515"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent className="flex flex-col gap-0.5">
              <p className="font-medium">Show AI Suggested Answer</p>
            </TooltipContent>
          </Tooltip>
        </AccordionPrimitive.Trigger>
      </div>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

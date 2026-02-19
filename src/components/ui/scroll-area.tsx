"use client";

import * as React from "react";

function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

type ScrollAreaProps = React.ComponentPropsWithoutRef<"div">;

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="scroll-area"
        className={cn("relative overflow-auto", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
ScrollArea.displayName = "ScrollArea";

type ScrollBarProps = React.ComponentPropsWithoutRef<"div"> & {
  orientation?: "vertical" | "horizontal";
};

const ScrollBar = React.forwardRef<HTMLDivElement, ScrollBarProps>(
  ({ className, orientation = "vertical", ...props }, ref) => {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        data-slot="scroll-area-scrollbar"
        className={cn(
          "pointer-events-none absolute",
          orientation === "vertical" && "inset-y-0 right-0 w-2.5",
          orientation === "horizontal" && "inset-x-0 bottom-0 h-2.5",
          className,
        )}
        {...props}
      />
    );
  },
);
ScrollBar.displayName = "ScrollBar";

export { ScrollArea, ScrollBar };

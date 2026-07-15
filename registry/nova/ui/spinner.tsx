import * as React from "react";
import { LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";

function Spinner({
  className,
  ...props
}: React.ComponentProps<typeof LoaderCircle>) {
  return (
    <LoaderCircle
      role="status"
      aria-label="Loading"
      data-slot="spinner"
      className={cn(
        "size-4 animate-spin text-current motion-reduce:animate-[pulse_1.5s_ease-in-out_infinite]",
        className,
      )}
      {...props}
    />
  );
}

export { Spinner };

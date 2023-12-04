import { cn } from "@/utils/cn";
import { ComponentProps, forwardRef } from "react";

export type BaseButtonProps = Omit<ComponentProps<"button">, "ref">;

export const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(
  ({ children, className, type = "button", ...rest }, ref): JSX.Element => {
    return (
      <button
        ref={ref}
        className={cn(
          "flex cursor-pointer items-center justify-center",
          className,
        )}
        type={type}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

BaseButton.displayName = "BaseButton";

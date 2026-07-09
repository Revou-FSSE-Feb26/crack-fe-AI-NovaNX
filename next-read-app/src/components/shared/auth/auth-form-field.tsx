import type { ComponentProps } from "react";
import Image from "next/image";

import eyeOffIcon from "@/assets/icons/eye-off.svg";
import eyeIcon from "@/assets/icons/eye.svg";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AuthFormFieldProps = Omit<ComponentProps<typeof Input>, "type"> & {
  id: string;
  label: string;
  error?: string;
  type?: ComponentProps<typeof Input>["type"];
  showPassword?: boolean;
  onTogglePassword?: () => void;
};

export function AuthFormField({
  id,
  label,
  error,
  type = "text",
  showPassword = false,
  onTogglePassword,
  ...inputProps
}: AuthFormFieldProps) {
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex w-full flex-col gap-0.5">
      <Label
        htmlFor={id}
        className="text-sm font-bold leading-7 text-foreground"
      >
        {label}
      </Label>
      <div className="relative w-full">
        <Input
          id={id}
          type={inputType}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className="h-12 rounded-num-30504000 border-border bg-secondary px-4 py-2 pr-12 text-sm font-semibold text-foreground shadow-[inset_0_0_0_1px_rgba(255,_255,_255,_0.04)] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/30 dark:bg-secondary"
          {...inputProps}
        />
        {isPassword && (
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={onTogglePassword}
            className="absolute right-4 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center"
          >
            <Image
              src={showPassword ? eyeIcon : eyeOffIcon}
              alt=""
              width={20}
              height={20}
              aria-hidden="true"
            />
          </button>
        )}
      </div>
      {error && (
        <p
          id={`${id}-error`}
          className="text-sm font-semibold leading-6 text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  );
}

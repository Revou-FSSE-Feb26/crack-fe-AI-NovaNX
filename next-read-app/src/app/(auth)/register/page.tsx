"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { AuthFormField } from "@/components/shared/auth/auth-form-field";
import { AuthPageShell } from "@/components/shared/auth/auth-page-shell";
import { Button } from "@/components/ui/button";
import type { RegisterFormValues } from "@/types/auth";

const initialFormValues: RegisterFormValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    defaultValues: initialFormValues,
    reValidateMode: "onChange",
  });

  const onSubmit = (values: RegisterFormValues) => {
    localStorage.setItem(
      "registeredUser",
      JSON.stringify({
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
      }),
    );

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    router.push("/login");
  };

  return (
    <AuthPageShell
      title="Create account"
      description="Join NexRead and start managing your reading journey."
    >
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <AuthFormField
          id="name"
          label="Name"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name", {
            required: "Name is required.",
          })}
        />
        <AuthFormField
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address.",
            },
          })}
        />
        <AuthFormField
          id="phone"
          label="Nomor Handphone"
          type="tel"
          autoComplete="tel"
          error={errors.phone?.message}
          {...register("phone", {
            required: "Phone number is required.",
            pattern: {
              value: /^[0-9+\-\s()]+$/,
              message: "Please enter a valid phone number.",
            },
          })}
        />
        <AuthFormField
          id="password"
          label="Password"
          type="password"
          autoComplete="new-password"
          error={errors.password?.message}
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword((current) => !current)}
          {...register("password", {
            required: "Password is required.",
          })}
        />
        <AuthFormField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          showPassword={showConfirmPassword}
          onTogglePassword={() =>
            setShowConfirmPassword((current) => !current)
          }
          {...register("confirmPassword", {
            required: "Confirm password is required.",
            validate: (value) =>
              value === getValues("password") || "Passwords do not match.",
          })}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full rounded-num-30504000 text-base font-extrabold shadow-[0px_10px_15px_-3px_rgba(0,_211,_243,_0.25),_0px_4px_6px_-4px_rgba(0,_211,_243,_0.25)]"
        >
          Submit
        </Button>

        <p className="text-center text-base font-semibold text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-extrabold text-primary">
            Log In
          </Link>
        </p>
      </form>
    </AuthPageShell>
  );
}

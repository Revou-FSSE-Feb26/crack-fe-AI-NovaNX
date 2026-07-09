"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { AuthFormField } from "@/components/shared/auth/auth-form-field";
import { AuthPageShell } from "@/components/shared/auth/auth-page-shell";
import { Button } from "@/components/ui/button";
import type { LoginFormValues } from "@/types/auth";

const initialFormValues: LoginFormValues = {
  email: "",
  password: "",
};

type StoredRegisteredUser = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: initialFormValues,
    reValidateMode: "onChange",
  });

  const onSubmit = (values: LoginFormValues) => {
    const savedUser = localStorage.getItem("registeredUser");

    if (!savedUser) {
      setError("root", {
        type: "server",
        message: "Please register an account before logging in.",
      });

      return;
    }

    const registeredUser = JSON.parse(savedUser) as StoredRegisteredUser;
    const isValidUser =
      registeredUser.email === values.email &&
      registeredUser.password === values.password;

    if (isValidUser) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          name: registeredUser.name,
          email: registeredUser.email,
        }),
      );

      router.push("/");
      return;
    }

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    setError("root", {
      type: "server",
      message: "The email or password is incorrect.",
    });
  };

  return (
    <AuthPageShell
      title="Welcome back"
      description="Sign in to continue exploring your NexRead library."
    >
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
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
            onChange: () => clearErrors("root"),
          })}
        />
        <AuthFormField
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          error={errors.password?.message}
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword((current) => !current)}
          {...register("password", {
            required: "Password is required.",
            onChange: () => clearErrors("root"),
          })}
        />

        {errors.root?.message && (
          <p
            role="alert"
            className="text-center text-sm font-semibold text-destructive"
          >
            {errors.root.message}
          </p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full rounded-num-30504000 text-base font-extrabold shadow-[0px_10px_15px_-3px_rgba(0,_211,_243,_0.25),_0px_4px_6px_-4px_rgba(0,_211,_243,_0.25)]"
        >
          Login
        </Button>

        <p className="text-center text-base font-semibold text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-extrabold text-primary">
            Register
          </Link>
        </p>
      </form>
    </AuthPageShell>
  );
}

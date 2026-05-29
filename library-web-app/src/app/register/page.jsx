"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { clsx } from "clsx";
import logoIcon from "@/assets/icons/Logo.svg";
import eyeIcon from "@/assets/icons/eye.svg";
import eyeOffIcon from "@/assets/icons/eye-off.svg";

function cn(...inputs) {
  return clsx(inputs);
}

function Button({ className, children, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-6 py-2 text-base font-bold tracking-[-0.02em] text-primary-foreground shadow-[0_12px_28px_rgba(28,101,218,0.24)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1558c4] hover:shadow-[0_16px_34px_rgba(28,101,218,0.30)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function Input({ className, rightIcon, ...props }) {
  return (
    <div className="relative w-full">
      <input
        className={cn(
          "flex h-12 w-full rounded-xl border border-border bg-white px-4 py-2 text-sm text-foreground shadow-[0_1px_0_rgba(10,13,18,0.02)] transition-colors placeholder:text-transparent focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 aria-invalid:border-destructive",
          rightIcon && "pr-12",
          className,
        )}
        {...props}
      />
      {rightIcon ? (
        <div className="absolute inset-y-0 right-4 flex items-center text-foreground">
          {rightIcon}
        </div>
      ) : null}
    </div>
  );
}

function Label({ children, htmlFor }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-bold leading-7 tracking-[-0.02em] text-foreground"
    >
      {children}
    </label>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-[11.786px]">
      <Image
        src={logoIcon}
        alt="Booky"
        width={33}
        height={33}
        className="h-8.25 w-8.25"
      />
      <p className="text-[25.143px] font-bold leading-[33px] text-foreground">
        Booky
      </p>
    </div>
  );
}

function Field({
  id,
  label,
  type = "text",
  hasEye = false,
  autoComplete,
  value,
  onChange,
  error,
  showPassword = false,
  onTogglePassword,
}) {
  const inputType = hasEye ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex w-full flex-col gap-0.5 bg-white">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={inputType}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        autoComplete={autoComplete}
        rightIcon={
          hasEye ? (
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={onTogglePassword}
              className="flex size-5 items-center justify-center"
            >
              <Image
                src={showPassword ? eyeIcon : eyeOffIcon}
                alt=""
                width={20}
                height={20}
                aria-hidden="true"
              />
            </button>
          ) : null
        }
      />
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

const initialFormValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export default function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { id, value } = event.target;

    setFormValues((prev) => ({
      ...prev,
      [id]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [id]: "",
    }));
  };

  const validateForm = () => {
    const nextErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9+\-\s()]+$/;

    if (!formValues.name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!formValues.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!emailPattern.test(formValues.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formValues.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    } else if (!phonePattern.test(formValues.phone)) {
      nextErrors.phone = "Please enter a valid phone number.";
    }

    if (!formValues.password) {
      nextErrors.password = "Password is required.";
    }

    if (!formValues.confirmPassword) {
      nextErrors.confirmPassword = "Confirm password is required.";
    } else if (formValues.confirmPassword !== formValues.password) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateForm();
    setErrors(nextErrors);
  };

  return (
    <main className="min-h-screen w-full bg-background text-foreground">
      <section className="mx-auto flex w-full max-w-[400px] flex-col items-start gap-5 px-6 pb-10 pt-[94px] sm:px-0">
        <Logo />

        <div className="flex w-full flex-col items-start gap-2">
          <h1 className="text-[28px] font-bold leading-[38px] tracking-[-0.02em] text-foreground">
            Register
          </h1>
          <p className="text-base font-semibold leading-[30px] tracking-[-0.02em] text-muted-foreground">
            Create your account to start borrowing books.
          </p>
        </div>

        <form
          className="flex w-full flex-col items-center gap-4"
          onSubmit={handleSubmit}
          noValidate
        >
          <Field
            id="name"
            label="Name"
            autoComplete="name"
            value={formValues.name}
            onChange={handleChange}
            error={errors.name}
          />
          <Field
            id="email"
            label="Email"
            type="email"
            autoComplete="email"
            value={formValues.email}
            onChange={handleChange}
            error={errors.email}
          />
          <Field
            id="phone"
            label="Nomor Handphone"
            type="tel"
            autoComplete="tel"
            value={formValues.phone}
            onChange={handleChange}
            error={errors.phone}
          />
          <Field
            id="password"
            label="Password"
            autoComplete="new-password"
            value={formValues.password}
            onChange={handleChange}
            error={errors.password}
            hasEye
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword((prev) => !prev)}
          />
          <Field
            id="confirmPassword"
            label="Confirm Password"
            autoComplete="new-password"
            value={formValues.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            hasEye
            showPassword={showConfirmPassword}
            onTogglePassword={() => setShowConfirmPassword((prev) => !prev)}
          />

          <Button type="submit" className="mt-0">
            Submit
          </Button>

          <div className="flex w-full items-center justify-center gap-1 whitespace-nowrap text-base leading-[30px] tracking-[-0.02em]">
            <span className="font-semibold text-foreground">
              Already have an account?
            </span>
            <Link
              className="font-bold text-primary transition-colors hover:text-[#1558c4]"
              href="/login"
            >
              Log In
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}

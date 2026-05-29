"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logoIcon from "@/assets/icons/Logo.svg";
import eyeIcon from "@/assets/icons/eye.svg";
import eyeOffIcon from "@/assets/icons/eye-off.svg";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const formFields = [
  {
    id: "email",
    label: "Email",
    type: "email",
  },
  {
    id: "password",
    label: "Password",
    type: "password",
  },
];

const brand = {
  name: "Booky",
  heading: "Login",
  description: "Sign in to manage your library account.",
  cta: "Login",
  footerText: "Don't have an account?",
  footerLink: "Register",
};

const initialFormValues = {
  email: "",
  password: "",
};

const PropertyUser = () => {
  const [showPassword, setShowPassword] = useState(false);
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
      form: "",
    }));
  };

  const validateForm = () => {
    const nextErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formValues.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!emailPattern.test(formValues.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formValues.password) {
      nextErrors.password = "Password is required.";
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({
      form: "The email or password is incorrect.",
    });
  };

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto flex min-h-screen w-full max-w-360 items-center justify-center px-6 py-12">
        <Card className="w-full max-w-100 border-0 bg-transparent shadow-none ring-0">
          <CardContent className="p-0">
            <div className="flex flex-col items-start gap-5">
              <header className="inline-flex items-center gap-[11.79px]">
                <Image
                  src={logoIcon}
                  alt="Booky"
                  width={33}
                  height={33}
                  className="h-8.25 w-8.25"
                />
                <span className="text-[25.1px] font-bold leading-8.25 tracking-normal text-[#0a0d12]">
                  {brand.name}
                </span>
              </header>
              <div className="flex w-72.5 flex-col items-start gap-2">
                <h1 className="text-[28px] font-bold leading-9.5 tracking-[-0.56px] text-black">
                  {brand.heading}
                </h1>
                <p className="text-base font-semibold leading-7.5 tracking-[-0.32px] text-[#414651]">
                  {brand.description}
                </p>
              </div>
              <form
                className="flex w-full flex-col items-center gap-4"
                onSubmit={handleSubmit}
                noValidate
              >
                {formFields.map((field) => {
                  const isPassword = field.id === "password";
                  const errorMessage = errors[field.id];

                  return (
                    <div
                      key={field.id}
                      className="flex w-full flex-col items-start gap-0.5 bg-white"
                    >
                      <Label
                        htmlFor={field.id}
                        className="text-sm font-bold leading-7 tracking-[-0.28px] text-[#0a0d12]"
                      >
                        {field.label}
                      </Label>
                      <div className="relative w-full">
                        <Input
                          id={field.id}
                          type={
                            isPassword
                              ? showPassword
                                ? "text"
                                : "password"
                              : field.type
                          }
                          value={formValues[field.id]}
                          onChange={handleChange}
                          aria-invalid={Boolean(errorMessage)}
                          aria-describedby={
                            errorMessage ? `${field.id}-error` : undefined
                          }
                          className="h-12 rounded-xl border-[#d5d7da] bg-white px-4 py-2 pr-12 text-sm text-[#0a0d12] shadow-none placeholder:text-[#98a2b3] focus-visible:ring-0 focus-visible:ring-offset-0 aria-invalid:border-destructive"
                        />
                        {isPassword && (
                          <button
                            type="button"
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0a0d12]"
                          >
                            {showPassword ? (
                              <Image
                                src={eyeIcon}
                                alt=""
                                width={20}
                                height={20}
                                aria-hidden="true"
                              />
                            ) : (
                              <Image
                                src={eyeOffIcon}
                                alt=""
                                width={20}
                                height={20}
                                aria-hidden="true"
                              />
                            )}
                          </button>
                        )}
                      </div>
                      {errorMessage && (
                        <p
                          id={`${field.id}-error`}
                          className="text-sm font-semibold leading-6 text-destructive"
                        >
                          {errorMessage}
                        </p>
                      )}
                    </div>
                  );
                })}

                {errors.form && (
                  <p
                    role="alert"
                    className="w-full text-center text-sm font-semibold leading-6 text-destructive"
                  >
                    {errors.form}
                  </p>
                )}

                <Button
                  type="submit"
                  className="h-auto w-full rounded-[100px] bg-[#1c65da] px-2 py-2 text-base font-bold leading-7.5 tracking-[-0.32px] text-[#fdfdfd] hover:bg-[#1c65da]/95"
                >
                  {brand.cta}
                </Button>
                <p className="flex w-88 items-center justify-center gap-1 text-center">
                  <span className="text-base font-semibold leading-7.5 tracking-[-0.32px] text-[#0a0d12]">
                    {brand.footerText}
                  </span>
                  <Link
                    href="/register"
                    className="text-base font-bold leading-7.5 tracking-[-0.32px] text-[#1c65da]"
                  >
                    {brand.footerLink}
                  </Link>
                </p>
              </form>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default PropertyUser;

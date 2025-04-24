"use client";

import Input from "@/components/ui/AMInput";
import Link from "next/link";
import { useForm } from "react-hook-form";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Registration submitted:", data);
  };

  const password = watch("password");

  return (
    <div className="w-full md:w-1/2 p-5 md:p-10 bg-white">
      <h2 className="text-3xl font-bold font-lobster text-black mb-10 sm:mb-16">
        Register
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Name"
          type="text"
          error={errors.name?.message}
          register={register("name", {
            required: "Enter your full name",
          })}
        />

        <Input
          label="Email"
          type="email"
          error={errors.email?.message}
          register={register("email", {
            required: "Enter your email address",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Enter a valid email address",
            },
          })}
        />

        <Input
          label="Password"
          type="password"
          error={errors.password?.message}
          register={register("password", {
            required: "Enter your password",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />

        <Input
          label="Confirm Password"
          type="password"
          error={errors.confirmPassword?.message}
          register={register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-black/90 cursor-pointer transition"
        >
          Sign Up
        </button>
      </form>

      <p className="text-sm text-gray-500 mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-black hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;

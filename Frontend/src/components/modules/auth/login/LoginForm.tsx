"use client";
import Input from "@/components/ui/input";
import Link from "next/link";
// import { useForm } from "react-hook-form";
import { useForm } from "react-hook-form";
interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
  };
  return (
    <div className="w-full md:w-1/2 p-5 md:p-10 bg-white">
      <h2 className="text-3xl font-bold font-lobster text-black mb-10 sm:mb-16">
        Login
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              message: "Enter at least 6 characters",
            },
          })}
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-black/90 cursor-pointer transition"
        >
          Sign In
        </button>
      </form>

      <p className="text-sm text-gray-500 mt-4">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-black hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;

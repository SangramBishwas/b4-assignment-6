/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Input from "@/components/ui/AMInput";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { loginUser } from "@/services/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { fetchUser } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const tostId = toast.loading("Logging in...");
    try {
      const res = await loginUser(data);
      if (res?.success) {
        await fetchUser();
        toast.success(res?.message, { id: tostId });
        router.push("/dashboard/my-account");
      } else {
        toast.error(res?.message, { id: tostId });
      }
    } catch (error: any) {
      console.error("login form error", error);
      toast.error(error?.message, { id: tostId });
    }
  };

  const handleAdminLogin = async () => {
    const tostId = toast.loading("Logging in...");
    const data = {
      email: "admin@gmail.com",
      password: "123456",
    };
    try {
      const res = await loginUser(data);
      if (res?.success) {
        await fetchUser();
        toast.success("Admin logged in successfully", { id: tostId });
        router.push("/dashboard/my-account");
      } else {
        toast.error(res?.message, { id: tostId });
      }
    } catch (error: any) {
      console.error("login form error", error);
      toast.error(error?.message, { id: tostId });
    }
  };
  return (
    <div className="w-full md:w-1/2 p-5 md:p-10 bg-white">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold font-lobster text-black mb-10 sm:mb-16">
          Login
        </h2>
        <Button onClick={handleAdminLogin} size={"sm"}>
          Admin Login
        </Button>
      </div>

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
          className="w-full active:scale-95 bg-black text-white py-2 rounded-lg hover:bg-black/90 cursor-pointer transition"
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

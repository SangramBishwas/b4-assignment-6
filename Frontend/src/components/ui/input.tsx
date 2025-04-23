"use client";

import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { AiOutlineExclamationCircle } from "react-icons/ai";

interface InputProps {
  label: string;
  type: string;
  register?: object;
  error?: string;
}

const Input: React.FC<InputProps> = ({ type, label, error, register }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-black">{label}</label>
      <div className="relative">
        <input
          placeholder={label}
          {...register}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-black focus:ring-blue-500"
          }`}
        />
        {type === "password" && (
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-2.5 right-3 cursor-pointer text-gray-500"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </div>
        )}
      </div>
      {error?.length && (
        <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
          <AiOutlineExclamationCircle className="text-base" />
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;

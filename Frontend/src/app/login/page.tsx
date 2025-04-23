import LoginForm from "@/components/modules/auth/login/LoginForm";
import login from "../../assets/login.svg";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen font-madimi flex items-center justify-center bg-gradient-to-r from-white to-gray-100">
      <div className="flex w-full max-w-5xl mx-5 border-[1px] rounded-2xl overflow-hidden">
        <LoginForm />
        <div className="hidden sm:flex sm:w-[100vw] md:w-1/2 relative">
          <Image src={login} alt="login" className="object-cover" />
        </div>
      </div>
    </div>
  );
}

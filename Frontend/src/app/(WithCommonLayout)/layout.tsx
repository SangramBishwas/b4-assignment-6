import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { Suspense } from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Suspense>
        <Navbar />
      </Suspense>
      {children}
      <Footer />
    </div>
  );
};

export default layout;

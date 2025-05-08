"use client";

import UserProvider from "@/context/UserContext";
import ScrollToTop from "@/utils/scrollToTop";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <ScrollToTop />
      {children}
    </UserProvider>
  );
};

export default Providers;

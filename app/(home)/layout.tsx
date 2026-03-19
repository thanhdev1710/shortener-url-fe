import FooterHome from "@/components/layout/FooterHome";
import HeaderHome from "@/components/layout/HeaderHome";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-svh flex flex-col justify-between">
      <HeaderHome />
      {children}
      <FooterHome />
    </div>
  );
}

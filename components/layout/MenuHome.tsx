"use client";
import { MENU_APP } from "@/consts/base";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MenuHome() {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <ul className="flex items-center gap-6">
      {MENU_APP.map((e) => (
        <li
          className={`${e.url === pathname ? "text-primary font-semibold border-b-2 border-b-primary" : ""} pb-0.5`}
          key={e.url}
        >
          <Link href={e.url}>{e.name}</Link>
        </li>
      ))}
    </ul>
  );
}

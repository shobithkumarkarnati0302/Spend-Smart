"use client";
import React from "react"; // Removed unnecessary useEffect import
import Image from "next/image";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Sidenav() {
  const menulist = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
    {
      id: 4,
      name: "Upgrade",
      icon: ShieldCheck,
      path: "/dashboard/upgrade",
    },
  ];

  const path = usePathname();

  return (
    <div className="h-screen p-8 shadow-2xl">
      <Image src="/logo3.png" alt="Spend Smart Logo" width={200} height={200} />
      <div className="mt-10">
        {menulist.map((menu) => (
          <Link href={menu.path} key={menu.id}>
            <h2
              className={`flex gap-3 items-center text-black-300 font-medium mb-2 p-5 cursor-pointer rounded-md hover:text-white hover:bg-primary
                ${path === menu.path ? 'bg-primary text-white' : ''}`}
            >
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className="fixed bottom-10 p-5 flex gap-2 items-center cursor-pointer">
        <UserButton />
        Profile
      </div>
    </div>
  );
}

export default Sidenav;

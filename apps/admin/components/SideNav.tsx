"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@ui/lib/utils";

import AdminLogo from "@/components/AdminLogo";

import { LINKS } from "@/constants/link";

import LogoutModal from "./LogoutModal";

interface NavItemProps {
  href: string;
  title: string;
  isActive: boolean;
}

const NavItem = (props: NavItemProps) => {
  const { href, title, isActive } = props;

  const isDisabled = href === "/qr-scan";

  return (
    <div className="flex items-center justify-start gap-3">
      <div className={cn("h-4 w-[2.5px]", isActive && "bg-black")}></div>

      {isDisabled ? (
        <div className="flex h-16 items-center justify-start gap-1.5 text-[#8989A1] hover:cursor-pointer">
          <p className="text-lg font-medium">{title}</p>
          <p className="-mt-1 text-xs font-light">mobile only</p>
        </div>
      ) : (
        <Link
          href={href}
          key={href}
          className={cn(
            "flex h-16 grow items-center text-lg font-medium text-[#8989A1]",
            isActive && "font-bold text-black",
          )}
        >
          {title}
        </Link>
      )}
    </div>
  );
};

const SideNav = () => {
  const pathname = usePathname();
  const links = [LINKS[1], LINKS[2], LINKS[0]];

  return (
    <div className="flex h-full w-52 flex-col gap-5 px-6 pb-20 pt-10">
      <AdminLogo logo_style="w-24" font_style="font-medium text-xs" />
      <div className="text-sm">
        <p className="text-[#5E5E6E]">
          <span className="text-brand">소리터 관리자님,</span>
          <span>안녕하세요.</span>
        </p>
      </div>
      <div className="h-[0.5px] w-full bg-[#CCCCCC]"></div>
      <div className="grow py-8">
        {links.map(({ href, title }) => (
          <NavItem
            key={href}
            href={href}
            title={title}
            isActive={pathname === href}
          />
        ))}
      </div>
      <LogoutModal isMobile={false} />
    </div>
  );
};

export default SideNav;

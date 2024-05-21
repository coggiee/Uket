import { useLocation } from "react-router-dom";
import React from "react";
import { cn } from "@uket/ui/lib/utils";
import { Button } from "@uket/ui/components/ui/button";

import { useAuth } from "@/hooks/useAuth";

import Logo from "./Logo";

import { Link, Path } from "@/router";

const PRIVATE: Path[] = ["/login", "/signup"];

// TODO: 로그인한 사용자의 경우 로그인 버튼을 프로필 이미지와 이름으로 대체
const Nav = () => {
  const { pathname } = useLocation();
  const isPrivatePath = PRIVATE.includes(pathname as Path);
  const isAuthenticated = useAuth();
  const ladingPageTextColor = pathname === "/" && "text-white";
  const profileComponent = isAuthenticated ? (
    <Button
      variant="link"
      className={cn("p-0 pt-1 font-bold", ladingPageTextColor)}
    >
      로그인됨
    </Button>
  ) : (
    <Link to="/login">
      <Button
        variant="link"
        className={cn("p-0 pt-1 font-bold", ladingPageTextColor)}
      >
        로그인
      </Button>
    </Link>
  );

  return (
    <nav className="container my-2 flex h-10 w-full items-center justify-between self-stretch">
      <Logo />
      {!isPrivatePath && profileComponent}
    </nav>
  );
};

export default Nav;
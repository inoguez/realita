"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Home, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "@/app/(login)/actions";
import { usePathname, useRouter } from "next/navigation";
import { User } from "@/lib/db/schema";
import useSWR from "swr";
import Image from "next/image";

import logo from "@/assets/Realita.svg";
import { cn } from "@/lib/utils";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function UserMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: user, mutate } = useSWR<User>("/api/user", fetcher);
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    mutate();
    router.push("/");
  }

  if (!user) {
    return (
      <>
        <Link
          href="/"
          className="text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          Inicio
        </Link>
        <Link
          href="/pricing"
          className="text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          Precio
        </Link>
        <Link
          href="/contact"
          className="text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          Contacto
        </Link>
        <Link
          href="/sign-in"
          className="text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          Iniciar sesion
        </Link>
        <Button asChild className="rounded-full">
          <Link href="/sign-up">Registrarse</Link>
        </Button>
      </>
    );
  }

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer size-9">
          <AvatarImage alt={user.name || ""} />
          <AvatarFallback>
            {user.email
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col gap-1">
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/dashboard" className="flex w-full items-center">
            <Home className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <form action={handleSignOut} className="w-full">
          <button type="submit" className="flex w-full">
            <DropdownMenuItem className="w-full flex-1 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Header() {
  return (
    <header className="sticky top-5 bg-black/10 backdrop-blur-md rounded-4xl   px-4 sm:px-6 lg:px-4 py-3 flex justify-between items-center z-50 ">
      <Link href="/" className="flex items-center ">
        <Image src={logo} alt="Realita logo" />
        <span className="ml-2 text-xl font-semibold text-gray-900   mix-blend-difference">
          Realita
        </span>
      </Link>
      <div className="flex items-center space-x-4">
        <Suspense fallback={<div className="h-9" />}>
          <UserMenu />
        </Suspense>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-auto py-4 text-center text-sm text-gray-500">
      &copy; {new Date().getFullYear()} Realita. All rights reserved.
    </footer>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const isInDashBoard = pathName?.startsWith("/dashboard");
  return (
    <section
      className={cn("flex flex-col min-h-screen  mx-auto ", {
        "container p-5": !isInDashBoard,
      })}
    >
      {!isInDashBoard && <Header />}
      {children}
      {/*<Footer />*/}
    </section>
  );
}

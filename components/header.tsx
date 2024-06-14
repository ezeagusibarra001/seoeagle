"use client";
import Link from "next/link";
import Button from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { Aperture, List } from "@phosphor-icons/react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { navigation } from "@/constant/nav";
import { useApp } from "@/context/AppContext";

export function Header() {
  const { project } = useApp();
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white shadow-sm sm:px-6 lg:px-8">
      <Link className="flex items-center gap-2 sm:w-1/4" href="#">
        <Aperture className="h-6 w-6" />
        <span className="text-lg font-semibold">Seo Eagle</span>
      </Link>
      <nav className="hidden sm:flex items-center gap-6">
        {navigation
          .filter((n) => (n.isProtected ? !!project : true))
          .map((n) => (
            <Link
              key={n.label}
              className="text-sm font-medium hover:text-gray-900 "
              href={n.href}
            >
              {n.label}
            </Link>
          ))}
      </nav>
      <div className="flex items-center justify-end gap-4 sm:w-1/4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <Sheet>
          <SheetTrigger asChild className="block sm:hidden">
            <Button>
              <>
                <List className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </>
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:hidden" side="right">
            <div className="grid gap-4 p-4">
              <Link
                className="text-sm font-medium hover:text-gray-900 "
                href="#"
              >
                Home
              </Link>
              <Link
                className="text-sm font-medium hover:text-gray-900 "
                href="#"
              >
                About
              </Link>
              <Link
                className="text-sm font-medium hover:text-gray-900 "
                href="#"
              >
                Features
              </Link>
              <Link
                className="text-sm font-medium hover:text-gray-900 "
                href="#"
              >
                Contact
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

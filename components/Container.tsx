"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Footer from "./Footer";
import Header from "./Header";

export const Container = (props: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      <Header />
      <UserButton afterSignOutUrl="/" />
      <header>
        <Link href="/">Duckling</Link>
      </header>
      <div>{props.children}</div>
      <Footer />
    </div>
  );
};

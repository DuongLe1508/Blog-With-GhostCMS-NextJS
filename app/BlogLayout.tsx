"use client";

import { Settings } from "@tryghost/content-api";
import { ThemeProvider } from "next-themes";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({
  children,
  setting,
}: {
  children: React.ReactNode;
  setting: Settings;
}) {
  return (
    <ThemeProvider attribute="class">
      <Header setting={setting}></Header>
      {children}
      <Footer setting={setting}></Footer>
    </ThemeProvider>
  );
}

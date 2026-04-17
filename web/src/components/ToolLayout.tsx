"use client";
import SiteHeader from "@/components/SiteHeader";

interface ToolLayoutProps {
  children: React.ReactNode;
}

export default function ToolLayout({ children }: ToolLayoutProps) {
  return (
    <>
      <SiteHeader />
      {children}
    </>
  );
}

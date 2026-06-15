import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PageIntro from "@/components/PageIntro";
import ScrollRefresh from "@/components/ScrollRefresh";
import Cursor from "@/components/Cursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aparna's Portfolio",
  description: "Personal portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <PageIntro />
        <ScrollRefresh />
        <Navbar />
        <Cursor />
        <div style={{ paddingTop: "60px" }}>{children}</div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aparna's Portfolio",
  description: "Personal portfolio",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
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
        <Navbar />
        <Cursor />
        <div style={{ paddingTop: "60px" }}>{children}</div>
      </body>
    </html>
  );
}

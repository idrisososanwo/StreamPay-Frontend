import type { Metadata } from "next";
import { PageTransition } from "@/components/ui/page-transition";
import "./globals.css";

export const metadata: Metadata = {
  title: "StreamPay - Payment Streaming",
  description: "Real-time payment streaming on Stellar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}

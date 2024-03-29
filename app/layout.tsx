
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from '@/auth'
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Roboto({
  subsets: ["latin"],
  weight: ["400"]
});

export const metadata: Metadata = {
  title: "Реестр договоров",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className} suppressHydrationWarning={true}>
          <Toaster richColors />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { ReactQueryProvider } from "@/src/lib/react-query";
import { Toaster } from "sonner";
import genralSans from "@/src/lib/font";

export const metadata: Metadata = {
  title: "Dentispark - Dental School Guidance & Mentorship",
  description:
    "Get expert guidance and mentorship for dental school applications. Access tools, resources, and 1:1 support to achieve your dental career goals.",
  icons: {
    icon: [
      {
        url: "/favicon.png",
        type: "image/png",
        sizes: "any",
      },
      {
        url: "/favicon.ico",
        sizes: "16x16",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={genralSans.className}>
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>

        <Toaster richColors />
      </body>
    </html>
  );
}

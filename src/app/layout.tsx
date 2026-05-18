import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import FloatingCTA from "@/components/ui/FloatingCTA";
import ViewerCaptureModal from "@/components/ui/ViewerCaptureModal";

export const metadata: Metadata = {
  title: "Weru TV & Radio — Watch. Listen. Connect.",
  description:
    "Kenya's premier broadcast experience. Watch live TV, listen to FM radio, and stay updated with the latest news from Weru Digital.",
  openGraph: {
    title: "Weru TV & Radio",
    description: "Kenya's premier broadcast experience. Watch. Listen. Connect.",
    siteName: "Weru Digital",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weru TV & Radio",
    description: "Kenya's premier broadcast experience.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <FloatingCTA />
        <ViewerCaptureModal />
      </body>
    </html>
  );
}

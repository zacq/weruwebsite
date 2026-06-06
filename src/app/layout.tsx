import type { Metadata } from "next";
import { Space_Grotesk, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import FloatingCTA from "@/components/ui/FloatingCTA";
import ViewerCaptureModal from "@/components/ui/ViewerCaptureModal";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://werutv.co.ke"),
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
    <html lang="en" className={`h-full ${spaceGrotesk.variable} ${dmSerifDisplay.variable}`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <FloatingCTA />
        <ViewerCaptureModal />
      </body>
    </html>
  );
}

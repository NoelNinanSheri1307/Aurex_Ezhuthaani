import type { Metadata } from "next";
import { Noto_Sans_Tamil, Instrument_Serif } from "next/font/google";
import { AuthProvider } from "@/lib/auth";
import EzhuthaaniAIChatbot from "@/components/EzhuthaaniAIChatbot";
import "./globals.css";

const notoTamil = Noto_Sans_Tamil({
  subsets: ["tamil", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-tamil",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic", "normal"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ezhuthaani — Gamified Tamil Learning Masterclass",
  description: "A milestone-based Tamil learning experience, from your first letter to reading real Tamil books with stroke-tracing precision.",
  icons: {
    icon: "/assets/mascotlanding.png",
    shortcut: "/assets/mascotlanding.png",
    apple: "/assets/mascotlanding.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${notoTamil.variable} ${instrumentSerif.variable} dark`}>
      <body className="min-h-screen bg-[#07070a] text-zinc-100 font-sans antialiased selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden">
        <AuthProvider>
          {children}
          <EzhuthaaniAIChatbot />
        </AuthProvider>
      </body>
    </html>
  );
}

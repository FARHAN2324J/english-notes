import type { Metadata } from "next";
import {
  IBM_Plex_Mono,
  Inter,
  Space_Grotesk,
} from "next/font/google";

import "./globals.css";
import { ConvexProviderWrapper } from "@/components/convex-provider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "English Notes",
    template: "%s — English Notes",
  },
  description:
    "Public English workspaces for grammar, vocabulary, examples, and notes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={[
          spaceGrotesk.variable,
          inter.variable,
          plexMono.variable,
        ].join(" ")}
      >
        <ConvexProviderWrapper>
          {children}
        </ConvexProviderWrapper>
      </body>
    </html>
  );
}
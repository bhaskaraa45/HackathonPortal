import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SuperTokensProvider } from './components/supertokensProvider'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hackathon | E-Cell IIT Hyderabad - NPCI",
  description: "Join the hackathon conducted by E-Cell IIT Hyderabad and NPCI. Showcase your skills and get chance to win exciting prizes..",
  keywords: "Hackathon IITH, Hackathon Ecell, IIT Hyderabad, E-Cell, NPCI Hackathon, NPCI , coding, competition, contest"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SuperTokensProvider>
        <body className={inter.className}>{children}</body>
      </SuperTokensProvider>
    </html>
  );
}

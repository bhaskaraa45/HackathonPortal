import "./globals.css";
import { Inter } from "next/font/google";
import { ChakraProvider, background, extendTheme } from "@chakra-ui/react";
import { SuperTokensProvider } from "@/app/components/supertokensProvider";
import React, { ReactNode } from 'react';
import customTheme from "../theme/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hackathon | E-Cell IIT Hyderabad - NPCI",
  description: "Join the hackathon conducted by E-Cell IIT Hyderabad and NPCI. Showcase your skills and get chance to win exciting prizes.",
  keywords: "Hackathon IITH, Hackathon Ecell, IIT Hyderabad, E-Cell, NPCI Hackathon, NPCI , coding, competition, contest"
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SuperTokensProvider>
          <ChakraProvider>
            {children}
          </ChakraProvider>
        </SuperTokensProvider>
      </body>
    </html>
  );
}

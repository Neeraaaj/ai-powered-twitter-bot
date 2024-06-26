import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from 'geist/font/sans'
import { cn } from "@/lib/utils";
import GridPattern from "@/components/magicui/grid-pattern";
import { TooltipProvider } from "@/components/ui/tooltip";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(GeistSans.variable, "font-sans")}>
        <GridPattern width={60} height={60} className="z-5 opacity-200"/>
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}

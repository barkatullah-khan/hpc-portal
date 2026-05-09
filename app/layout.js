import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// 1. Import your new MainLayout instead of just Navbar/Footer
import MainLayout from "@/components/layout/MainLayout"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "HPC Cluster | UET Mardan FYP",
  description: "Web Managed High-Performance Computing Cluster",
};

export default function RootLayout({ children }) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning 
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen">
        {/* 
           2. Wrap everything in MainLayout. 
           MainLayout already contains the Navbar, Footer, 
           and the animated background.
        */}
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
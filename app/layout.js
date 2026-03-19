import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      <body className="bg-slate-50 text-slate-900 flex flex-col min-h-screen">
        {/* The Navbar will now show on every page */}
        <Navbar />
        
        {/* This main tag contains your page content */}
        <main className="grow">
          {children}
        </main>

        {/* The Footer will now show at the bottom of every page */}
        <Footer />
      </body>
    </html>
  );
}
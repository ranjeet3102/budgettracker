import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "$martSpend",
  description: "used for students to manage their budget",
  icons: {
    icon: '/favicon.ico',
  }
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider 
    >

    <html lang="en">
      <body
        className={`${inter.className}`}
        >
        {/* header */}A
        <Header/>

        <main className="min-h-screen">
          {children}
          </main>
          <Toaster richColors/>

        {/* footer */}

       
        
      </body>
    </html>
        </ClerkProvider>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "LinkedIn Clone",
  description: "For educational purposes only",
  icons: {
    icon: "https://links.papareact.com/b3z"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen flex flex-col">
          {/* Toaster */}
          <Toaster position="bottom-left" />


          {/* Header */}
          <header className="border-b sticky top-0 bg-white z-50">
            <Header />
          </header>

          
          <div className="bg-[#F4F2ED] flex-1 w-full">
            <main className="max-w-7xl mx-auto" >{children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}

import Header  from "@/components/Header";
import "./globals.css";
import {Inter} from "next/font/google";
import {ClerkProvider} from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner"


const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Reflection Hub",
  description: "A Journaling App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Light mode favicon */}
        <link
          rel="icon"
          href="/favicon-morning.png"
          media="(prefers-color-scheme: light)"
        />
        {/* Dark mode favicon */}
        <link
          rel="icon"
          href="/favicon-night.png"
          media="(prefers-color-scheme: dark)"
        />
      </head>
      <ClerkProvider>
        <body className={`${inter.className}`}>
          <Header />
          <main className="min-h-screen">{children} </main>
          <Toaster richColors />
          <footer className="bg-orange-100 py-12 bg-opacity-10">
            <div className="mx-auto px-4 text-center">
              <p>Keep Journaling</p>
            </div>
          </footer>
        </body>
      </ClerkProvider>
    </html>
  );
}

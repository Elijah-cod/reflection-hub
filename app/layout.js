import Header  from "@/components/Header";
import "./globals.css";
import {Inter} from "next/font/google";

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Reflection Hub",
  description: "A Journaling App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Header />
        <main className="min-h-screen">{children} </main>
        <footer className="bg-orange-100 py-12 bg-opacity-10">
          <div className="mx-auto px-4 text-center">
            <p>Keep Journaling</p>
          </div>
        </footer>
        <script src="https://cdn.tailwindcss.com/4.0.0-alpha.16"></script>
      </body>
    </html>
  );
}

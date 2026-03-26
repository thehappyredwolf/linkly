import { Outfit } from "next/font/google";
import "../globals.css";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Dashboard - Linkly",
  description: "Manage your links, customize your page, and track analytics.",
  icons: {
    icon: "/favicon.svg",
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.className} suppressHydrationWarning>
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
          <main className="flex-1">
            <div className="max-w-6xl mx-auto px-6 py-8">{children}</div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

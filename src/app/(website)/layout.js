import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Outfit } from "next/font/google";
import "../globals.css";
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
export const metadata = {
  title: "Linkly - Your One Link for Everything",
  description:
    "Create a beautiful landing page with all your links, socials, and contact info in one place.",
  icons: {
    icon: "/favicon.svg",
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.className} suppressHydrationWarning>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <div className="max-w-4xl mx-auto p-6">{children}</div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

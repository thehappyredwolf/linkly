import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Outfit } from "next/font/google";
import "../../globals.css";
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
export const metadata = {
  title: "Linkly - Your Personal Link Landing Page",
  description: "Discover all the links in one beautiful page",
  icons: {
    icon: "/favicon.svg",
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.className} suppressHydrationWarning>
        <div className="flex flex-col min-h-screen">
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

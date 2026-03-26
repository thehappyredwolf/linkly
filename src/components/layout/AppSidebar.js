"use client";
import LogoutButton from "@/components/buttons/LogoutButton";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function AppSidebar() {
  const path = usePathname();
  return (
    <nav className="inline-flex mx-auto flex-col gap-1 text-slate-600">
      <Link
        href={"/account"}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
          path === "/account"
            ? "bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 font-semibold"
            : "hover:bg-slate-50"
        }`}
      >
        <FontAwesomeIcon icon={faFileLines} className="w-5 h-5" />
        <span>My Page</span>
      </Link>
      <Link
        href={"/analytics"}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
          path === "/analytics"
            ? "bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 font-semibold"
            : "hover:bg-slate-50"
        }`}
      >
        <FontAwesomeIcon icon={faChartLine} className="w-5 h-5" />
        <span>Analytics</span>
      </Link>
      <div className="border-t border-slate-200 my-2"></div>
      <LogoutButton
        iconLeft={true}
        className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition"
        iconClasses="w-5 h-5"
      />
    </nav>
  );
}

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "@/components/buttons/LogoutButton";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getServerSession } from "next-auth";
import Link from "next/link";
export default async function Header() {
  const session = await getServerSession(authOptions);
  return (
    <header className="bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl flex justify-between items-center mx-auto px-6 py-4">
        <Link
          href={"/"}
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
            <FontAwesomeIcon icon={faLink} className="text-white text-sm" />
          </div>
          <span className="font-poppins font-bold text-slate-900">Linkly</span>
        </Link>
        <nav className="flex items-center gap-6">
          {!!session && (
            <>
              <Link
                href={"/account"}
                className="text-sm text-slate-600 hover:text-slate-900 transition font-medium"
              >
                {session?.user?.name}
              </Link>
              <LogoutButton className="text-sm text-slate-600 hover:text-slate-900 transition" />
            </>
          )}
          {!session && (
            <>
              <Link
                href={"/login"}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-purple-300 transition"
              >
                Get Started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

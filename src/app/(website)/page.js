import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import HeroForm from "@/components/forms/HeroForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/account");
  }
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-poppins font-bold text-slate-900 leading-tight mb-6">
              One link
              <span className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">
                {" "}
                for everything
              </span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Create a beautiful landing page with all your links, socials, and
              contact info. Share one link instead of many.
            </p>
          </div>
          <HeroForm user={session?.user} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/50 backdrop-blur">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-poppins font-bold text-slate-900 text-center mb-12">
            Why choose Linkly?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Lightning Fast
              </h3>
              <p className="text-sm text-slate-600">
                Optimized for speed, your page loads instantly
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Fully Customizable
              </h3>
              <p className="text-sm text-slate-600">
                Choose colors, fonts, and layouts that match your brand
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Track Analytics
              </h3>
              <p className="text-sm text-slate-600">
                See how many clicks your links are getting
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

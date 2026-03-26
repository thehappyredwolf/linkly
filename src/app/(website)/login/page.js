import LoginWithGoogle from "@/components/buttons/LoginWithGoogle";
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-purple-200 to-transparent rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-32 left-10 w-96 h-96 bg-gradient-to-tr from-pink-200 to-transparent rounded-full blur-3xl opacity-20"></div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-poppins font-bold text-slate-900 mb-3">
            Get started
          </h1>
          <p className="text-slate-600 text-lg">
            Create your Linkly page or sign in to your existing account
          </p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 p-8">
          <LoginWithGoogle />

          <div className="mt-8 pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-600 mb-4">
              <span className="font-medium text-slate-900">
                What you can do:
              </span>
            </p>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex gap-2">
                <span className="text-purple-600 font-semibold">✓</span>
                <span>Create a beautiful link-in-bio page in seconds</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-600 font-semibold">✓</span>
                <span>Add unlimited links, social media, and contact info</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-600 font-semibold">✓</span>
                <span>Track clicks and page views with built-in analytics</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-600 font-semibold">✓</span>
                <span>
                  Customize colors, fonts, and design to match your brand
                </span>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          No credit card required. Start for free.
        </p>
      </div>
    </div>
  );
}

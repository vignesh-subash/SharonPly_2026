"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/images/sharon-corporate-logo.webp" alt="SharonPly" className="h-8 w-auto object-contain rounded" />
          <span className="font-semibold text-gray-900">Admin Panel</span>
        </div>
        <button onClick={logout} className="text-sm text-gray-500 hover:text-red-600 transition-colors flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"/></svg>
          Logout
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-500 text-sm mb-8">Manage your dealers and sales team members</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Link href="/admin/dealers" className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md hover:border-[#00793A]/30 transition-all">
            <div className="w-12 h-12 bg-[#00793A]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#00793A]/15 transition-colors">
              <svg className="w-6 h-6 text-[#00793A]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016 2.993 2.993 0 0 0 2.25-1.016 3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"/>
              </svg>
            </div>
            <h2 className="font-bold text-gray-900 text-lg mb-1">Manage Dealers</h2>
            <p className="text-sm text-gray-500">Add, edit, or remove dealer listings shown on the public Dealers page</p>
            <div className="mt-4 text-[#00793A] text-sm font-medium flex items-center gap-1">
              Open <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>
            </div>
          </Link>

          <Link href="/admin/sales-team" className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md hover:border-[#00793A]/30 transition-all">
            <div className="w-12 h-12 bg-[#00793A]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#00793A]/15 transition-colors">
              <svg className="w-6 h-6 text-[#00793A]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"/>
              </svg>
            </div>
            <h2 className="font-bold text-gray-900 text-lg mb-1">Manage Sales Team</h2>
            <p className="text-sm text-gray-500">Add, edit, or remove team members shown on the Find Us page</p>
            <div className="mt-4 text-[#00793A] text-sm font-medium flex items-center gap-1">
              Open <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>
            </div>
          </Link>
        </div>

        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700">
          <strong>Admin login</strong> is set by <code className="bg-amber-100 px-1 rounded">ADMIN_USERNAME</code> and <code className="bg-amber-100 px-1 rounded">ADMIN_PASSWORD</code> in the server&apos;s environment settings.
        </div>
      </div>
    </div>
  );
}

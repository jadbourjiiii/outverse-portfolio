"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "./components/Sidebar";
import Projects from "./components/Projects";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("Projects");
  const router = useRouter();

  const renderSection = () => {
    switch (activeSection) {
      case "Projects":
      default:
        return <Projects />;
    }
  };

  const handleLogout = () => {
    router.push("/admin");
  };

  return (
    <div className="admin-dashboard min-h-screen bg-[#050507] text-[#f5f5f7]">

      {/* DESKTOP */}
      <div className="hidden min-h-screen md:flex">

        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          onLogout={handleLogout}
        />

        <main className="relative min-w-0 flex-1 overflow-hidden">

          <div className="pointer-events-none absolute inset-0 overflow-hidden">

            <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#e8251c]/[0.045] blur-[120px]" />

            <div className="absolute -bottom-40 left-1/3 h-[450px] w-[450px] rounded-full bg-[#d6336c]/[0.04] blur-[120px]" />

            <div
              className="absolute inset-0 opacity-[0.018]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />

          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 py-7 lg:px-8 xl:px-10">
            {renderSection()}
          </div>

        </main>
      </div>


      {/* MOBILE */}
      <div className="min-h-screen md:hidden">

        <header className="sticky top-0 z-40 border-b border-[#1e1e26] bg-[#050507]/90 backdrop-blur-xl">

          <div className="flex h-[68px] items-center justify-between px-5">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#e8251c,#d6336c)] shadow-[0_6px_20px_rgba(232,37,28,.2)]">
                <span className="text-sm font-black text-white">
                  O
                </span>
              </div>

              <div>
                <h1 className="text-[13px] font-bold tracking-[0.15em]">
                  OUTVERSE
                </h1>

                <p className="mt-0.5 text-[8px] uppercase tracking-[0.15em] text-[#9a9aa5]">
                  Admin Panel
                </p>
              </div>

            </div>

            <div className="flex items-center gap-2 rounded-full border border-[#1e1e26] bg-white/[0.025] px-3 py-2">

              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,.8)]" />

              <span className="text-[8px] font-semibold uppercase tracking-[0.12em] text-[#9a9aa5]">
                Online
              </span>

            </div>

          </div>

        </header>


        <main className="relative min-h-screen overflow-hidden px-4 pb-28 pt-6">

          <div className="pointer-events-none absolute -right-32 -top-20 h-72 w-72 rounded-full bg-[#e8251c]/[0.05] blur-[100px]" />

          <div className="pointer-events-none absolute bottom-20 -left-32 h-72 w-72 rounded-full bg-[#d6336c]/[0.04] blur-[100px]" />

          <div className="relative z-10">
            {renderSection()}
          </div>

        </main>


        {/* MOBILE BOTTOM NAV */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#1e1e26] bg-[#08080b]/95 px-2 pb-2 pt-2 backdrop-blur-xl">

          <div className="grid grid-cols-2 gap-2">

            <button
              type="button"
              onClick={() => setActiveSection("Projects")}
              className="rounded-xl bg-[linear-gradient(100deg,#e8251c,#d6336c)] px-2 py-3 text-[10px] font-semibold text-white shadow-[0_5px_20px_rgba(232,37,28,.18)]"
            >
              Projects
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl border border-white/[0.08] bg-white/[0.025] px-2 py-3 text-[10px] font-semibold text-[#9999a5] transition hover:bg-white/[0.06] hover:text-white"
            >
              Logout
            </button>

          </div>

        </nav>

      </div>

    </div>
  );
}

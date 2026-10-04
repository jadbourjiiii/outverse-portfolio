"use client";

export default function Sidebar({
  activeSection,
  setActiveSection,
  onLogout,
}) {
  return (
    <aside className="flex w-[260px] shrink-0 flex-col border-r border-[#1e1e26] bg-[#08080b]">

      {/* BRAND */}
      <div className="border-b border-[#1e1e26] px-6 py-6">
        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#e8251c,#d6336c)] shadow-[0_8px_25px_rgba(232,37,28,.2)]">
            <span className="text-sm font-black text-white">
              O
            </span>
          </div>

          <div>
            <h1 className="text-[13px] font-bold tracking-[0.15em] text-white">
              OUTVERSE
            </h1>

            <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-[#777783]">
              Admin Panel
            </p>
          </div>

        </div>
      </div>


      {/* ONLY PROJECTS */}
      <div className="flex-1 px-4 py-6">

        <div className="mb-3 px-3 text-[9px] font-bold uppercase tracking-[0.2em] text-[#555560]">
          Management
        </div>

        <button
          type="button"
          onClick={() => setActiveSection("Projects")}
          className={`w-full rounded-xl px-4 py-3 text-left transition ${
            activeSection === "Projects"
              ? "bg-[linear-gradient(100deg,#e8251c,#d6336c)] text-white shadow-[0_8px_25px_rgba(232,37,28,.16)]"
              : "text-[#777783] hover:bg-white/[0.035] hover:text-white"
          }`}
        >
          <div className="text-sm font-semibold">
            Projects
          </div>

          <div
            className={`mt-1 text-[10px] ${
              activeSection === "Projects"
                ? "text-white/70"
                : "text-[#555560]"
            }`}
          >
            Manage projects
          </div>
        </button>

      </div>


      {/* LOGOUT */}
      <div className="border-t border-[#1e1e26] p-4">

        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 text-xs font-semibold text-[#9999a5] transition hover:border-red-500/20 hover:bg-red-500/[0.05] hover:text-red-400"
        >
          Logout
        </button>

      </div>

    </aside>
  );
}

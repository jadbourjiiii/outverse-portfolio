"use client";

import { useState } from "react";

export default function Dashboard() {
  const [showAddMenu, setShowAddMenu] = useState(false);

  const stats = [
    {
      title: "Projects",
      value: "12",
      change: "+3",
      label: "this month",
      icon: "◆",
    },
    {
      title: "Images",
      value: "34",
      change: "+8",
      label: "this month",
      icon: "▧",
    },
    {
      title: "Content",
      value: "24",
      change: "+5",
      label: "updated",
      icon: "✦",
    },
    {
      title: "Views",
      value: "2.4K",
      change: "+18%",
      label: "this month",
      icon: "↗",
    },
  ];

  const projects = [
    {
      name: "Outverse Portfolio",
      category: "Web Design",
      status: "Live",
    },
    {
      name: "E-Commerce Platform",
      category: "Development",
      status: "Draft",
    },
    {
      name: "Brand Identity",
      category: "Branding",
      status: "Live",
    },
  ];

  return (
    <div className="relative min-h-full w-full overflow-hidden text-white">

      {/* Background glow */}
      <div className="pointer-events-none absolute -left-40 top-0 h-80 w-80 rounded-full bg-red-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-40 h-72 w-72 rounded-full bg-pink-600/10 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <div className="mb-3 flex items-center gap-2">

              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.8)]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
                Admin Dashboard
              </span>

            </div>

            <h1 className="text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
              Good evening,{" "}
              <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                Ali.
              </span>
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-white/40">
              Manage your website, projects, content and media from one place.
            </p>
          </div>

          {/* Add New */}
          <div className="relative">

            <button
              onClick={() => setShowAddMenu(!showAddMenu)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 px-5 py-3 text-sm font-bold text-white shadow-[0_12px_35px_rgba(232,37,28,.2)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(232,37,28,.3)] sm:w-auto"
            >
              <span className="text-lg leading-none">+</span>
              Add New
            </button>

            {showAddMenu && (
              <div className="absolute right-0 top-full z-50 mt-3 w-full min-w-[220px] overflow-hidden rounded-2xl border border-white/10 bg-[#101015]/95 p-2 shadow-2xl backdrop-blur-xl sm:w-[220px]">

                <button className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-white/[0.05]">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                    ◆
                  </span>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Project
                    </p>

                    <p className="text-xs text-white/35">
                      Add a new project
                    </p>
                  </div>
                </button>

                <button className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-white/[0.05]">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-500/10 text-pink-400">
                    ▧
                  </span>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Image
                    </p>

                    <p className="text-xs text-white/35">
                      Upload new media
                    </p>
                  </div>
                </button>

                <button className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-white/[0.05]">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                    ✦
                  </span>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Content
                    </p>

                    <p className="text-xs text-white/35">
                      Edit website content
                    </p>
                  </div>
                </button>

              </div>
            )}

          </div>
        </header>


        {/* =====================================================
            STATS
        ===================================================== */}

        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">

          {stats.map((stat) => (
            <div
              key={stat.title}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d0d12] p-4 shadow-[0_15px_50px_rgba(0,0,0,.2)] transition duration-300 hover:-translate-y-1 hover:border-red-500/30"
            >

              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-red-600/10 blur-2xl transition duration-500 group-hover:bg-pink-600/20" />

              <div className="relative">

                <div className="mb-4 flex items-center justify-between">

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-red-500/15 to-pink-500/10 text-red-400">
                    {stat.icon}
                  </div>

                  <span className="rounded-full border border-emerald-400/10 bg-emerald-400/10 px-2 py-1 text-[9px] font-bold text-emerald-400">
                    {stat.change}
                  </span>

                </div>

                <p className="text-[11px] font-medium text-white/35">
                  {stat.title}
                </p>

                <p className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {stat.value}
                </p>

                <p className="mt-1 text-[10px] text-white/25">
                  {stat.label}
                </p>

              </div>
            </div>
          ))}

        </div>


        {/* =====================================================
            MAIN GRID
        ===================================================== */}

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.4fr_0.6fr]">

          {/* PROJECTS */}

          <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d0d12] shadow-[0_20px_60px_rgba(0,0,0,.18)]">

            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-5">

              <div>
                <h2 className="text-sm font-bold text-white sm:text-base">
                  Recent Projects
                </h2>

                <p className="mt-1 text-[11px] text-white/30">
                  Manage your latest work
                </p>
              </div>

              <button className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-[10px] font-semibold text-white/45 transition hover:border-red-500/30 hover:text-white">
                View all
              </button>

            </div>

            <div className="divide-y divide-white/[0.05]">

              {projects.filter(Boolean).map((project) => (
                <div
                  key={project.name}
                  className="group flex items-center gap-3 px-5 py-4 transition hover:bg-white/[0.025]"
                >

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-pink-600 text-sm font-bold text-white shadow-[0_8px_25px_rgba(232,37,28,.18)]">
                    {project.name.charAt(0)}
                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="truncate text-sm font-semibold text-white">
                      {project.name}
                    </p>

                    <p className="mt-1 text-[10px] text-white/30">
                      {project.category}
                    </p>

                  </div>

                  <span
                    className={`hidden rounded-full border px-2.5 py-1 text-[9px] font-bold sm:block ${
                      project.status === "Live"
                        ? "border-emerald-400/10 bg-emerald-400/10 text-emerald-400"
                        : "border-yellow-400/10 bg-yellow-400/10 text-yellow-400"
                    }`}
                  >
                    {project.status}
                  </span>

                  <button
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/25 transition hover:bg-white/[0.06] hover:text-white"
                    title="Edit project"
                  >
                    ✎
                  </button>

                </div>
              ))}

            </div>
          </section>


          {/* QUICK ACTIONS */}

          <section className="rounded-2xl border border-white/[0.07] bg-[#0d0d12] p-5 shadow-[0_20px_60px_rgba(0,0,0,.18)]">

            <div className="mb-5">

              <h2 className="text-sm font-bold text-white sm:text-base">
                Quick Actions
              </h2>

              <p className="mt-1 text-[11px] text-white/30">
                Jump directly into your workspace
              </p>

            </div>

            <div className="space-y-2.5">

              {[
                ["✦", "Edit Content", "Update your website"],
                ["▧", "Manage Images", "Upload and organize"],
                ["◆", "Manage Projects", "Add, edit or remove"],
                ["⚙", "Settings", "Configure your site"],
              ].map(([icon, title, description]) => (
                <button
                  key={title}
                  className="group flex w-full items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.015] p-3 text-left transition hover:border-red-500/20 hover:bg-red-500/[0.04]"
                >

                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-500/10 to-pink-500/10 text-red-400 transition group-hover:scale-105">
                    {icon}
                  </span>

                  <span className="min-w-0 flex-1">

                    <span className="block text-sm font-semibold text-white">
                      {title}
                    </span>

                    <span className="mt-1 block text-[10px] text-white/30">
                      {description}
                    </span>

                  </span>

                  <span className="text-white/20 transition group-hover:translate-x-1 group-hover:text-red-400">
                    →
                  </span>

                </button>
              ))}

            </div>
          </section>

        </div>


        {/* =====================================================
            MEDIA
        ===================================================== */}

        <section className="mt-5 rounded-2xl border border-white/[0.07] bg-[#0d0d12] p-5 shadow-[0_20px_60px_rgba(0,0,0,.18)]">

          <div className="mb-5 flex items-end justify-between">

            <div>

              <h2 className="text-sm font-bold text-white sm:text-base">
                Media Library
              </h2>

              <p className="mt-1 text-[11px] text-white/30">
                Your latest uploaded images
              </p>

            </div>

            <button className="hidden rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-[10px] font-bold text-red-400 transition hover:bg-red-500/15 sm:block">
              + Add Image
            </button>

          </div>


          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

            {[
              ["O", "Outverse"],
              ["01", "Project image"],
              ["02", "Project image"],
            ].map(([icon, title], index) => (
              <div
                key={title + index}
                className={`group relative aspect-square overflow-hidden rounded-xl border border-white/[0.06] ${
                  index === 0
                    ? "bg-gradient-to-br from-red-600 to-pink-600"
                    : index === 1
                    ? "bg-gradient-to-br from-red-500/80 to-orange-500/70"
                    : "bg-gradient-to-br from-pink-600/80 to-red-500/70"
                }`}
              >

                <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white/70">
                  {icon}
                </div>

                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-black/65 p-3 text-[10px] font-medium text-white backdrop-blur transition duration-300 group-hover:translate-y-0">
                  {title}
                </div>

              </div>
            ))}


            <button className="flex aspect-square flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.015] text-white/25 transition hover:border-red-500/40 hover:bg-red-500/[0.04] hover:text-red-400">

              <span className="text-2xl">
                +
              </span>

              <span className="mt-1 text-[10px] font-bold">
                Add Image
              </span>

            </button>

          </div>

        </section>


        {/* =====================================================
            ACTIVITY
        ===================================================== */}

        <section className="mt-5 rounded-2xl border border-white/[0.07] bg-[#0d0d12] p-5 shadow-[0_20px_60px_rgba(0,0,0,.18)]">

          <div className="mb-5">

            <h2 className="text-sm font-bold text-white sm:text-base">
              Recent Activity
            </h2>

            <p className="mt-1 text-[11px] text-white/30">
              Latest actions in your admin panel
            </p>

          </div>


          <div className="grid gap-4 md:grid-cols-3">

            {[
              ["✦", "Admin dashboard opened", "Just now"],
              ["▧", "Media system ready", "Recently"],
              ["✓", "Admin authentication connected", "Recently"],
            ].map(([icon, title, time]) => (
              <div
                key={title}
                className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.015] p-3"
              >

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-sm text-red-400">
                  {icon}
                </div>

                <div className="min-w-0">

                  <p className="truncate text-xs font-medium text-white/80">
                    {title}
                  </p>

                  <p className="mt-1 text-[10px] text-white/25">
                    {time}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </section>

      </div>
    </div>
  );
}
